import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { prismaExclude } from "prisma-exclude";
import { API_URL, SearchParams } from "../constants";
import { checkBody } from "../utils/checkBody";
import { formatSearchParams } from "../utils/formatSearchParams";
import { getAdvocateFilterParams } from "../utils/getFilterParams";
import { getAdvocateSortParams } from "../utils/getSortParams";

const prisma = new PrismaClient();
const exclude = prismaExclude(prisma);

export const getAdvocatesAndLinks = async (
  req: Request<{}, {}, {}, SearchParams>,
  res: Response
) => {
  try {
    const { limit, page, query, sortby } = formatSearchParams(req.query);

    const sortParams = getAdvocateSortParams(sortby);
    const filterParameters = getAdvocateFilterParams(query);

    const advocatesCount = await prisma.advocate.count({
      where: {
        OR: filterParameters as any,
      },
    });

    const advocatesList = await prisma.advocate.findMany({
      where: {
        OR: filterParameters as any,
      },
      take: limit,
      skip: (page - 1) * limit,
      include: {
        company: true,
        links: {
          select: exclude("link", ["id", "advocateId"]),
        },
      },
      orderBy: sortParams as any,
    });

    res.status(200).json({
      total: advocatesCount,
      limit,
      totalPages: Math.ceil(advocatesCount / limit),
      page,
      advocates: advocatesList,
    });
  } catch (e) {
    res.status(500).json({ error: (e as any).message });
  }
};

export const getAdvocateById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const advocate = await prisma.advocate.findUnique({
      where: {
        id: id,
      },
      include: {
        company: true,
        links: {
          select: exclude("link", ["id", "advocateId"]),
        },
      },
    });
    res.status(200).json(advocate);
  } catch (e) {
    res.status(500).json({ error: (e as any).message });
  }
};

export const addAdvocate = async (req: Request, res: Response) => {
  try {
    const body = req.body;

    const fieldsRequired = [
      "firstName",
      "advocateSince",
      "shortBio",
      "longBio",
      "profilePic",
      "companyId",
    ];
    const { data, errorBody } = checkBody(body, fieldsRequired, "Advocate");

    if (!data) {
      res.status(400).json({ error: errorBody });
      return;
    }

    const links = body.links ?? [];

    const newAdvocate = await prisma.advocate.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName ?? null,
        advocateSince: new Date(data.advocateSince),
        longBio: data.longBio,
        shortBio: data.shortBio,
        profilePic: data.profilePic,
        companyId: data.companyId,
        links: {
          create: links,
        },
      },
    });

    const advocateId = newAdvocate.id;
    const updatedAdvocate = await prisma.advocate.update({
      where: {
        id: advocateId,
      },
      data: {
        url: `${API_URL}/api/advocates/${advocateId}`,
      },
      include: {
        links: true,
      },
    });

    res.status(201).json({
      status: 201,
      message: "Advocate added",
      advocate: updatedAdvocate,
    });
  } catch (e) {
    res.status(500).json({ error: (e as any).message });
  }
};
