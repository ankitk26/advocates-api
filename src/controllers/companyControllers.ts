import { Company, PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { API_URL } from "../constants";
import { checkBody } from "../utils/checkBody";
import { formatSearchParams } from "../utils/formatSearchParams";
import { getCompanyFilterParams } from "../utils/getFilterParams";
import { getCompanySortParams } from "../utils/getSortParams";

const prisma = new PrismaClient();

export const getCompanies = async (req: Request, res: Response) => {
  try {
    const { limit, page, query, sortby } = formatSearchParams(req.query);

    const sortParams = getCompanySortParams(sortby);
    const filterParams = getCompanyFilterParams(query);

    const companiesCount = await prisma.company.count({
      where: {
        OR: filterParams as any,
      },
    });

    const companiesList = await prisma.company.findMany({
      where: {
        OR: filterParams as any,
      },
      take: limit,
      skip: (page - 1) * limit,
      include: {
        advocates: true,
      },
      orderBy: sortParams as any,
    });

    res.status(200).json({
      results: companiesCount,
      limit,
      totalPages: Math.ceil(companiesCount / limit),
      page,
      companies: companiesList,
    });
  } catch (e) {
    res.status(500).json({ error: (e as any).message });
  }
};

export const getCompanyById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const company = await prisma.company.findUnique({
      where: { id },
      include: {
        advocates: true,
      },
    });
    res.status(200).json({ company });
  } catch (e) {
    res.status(500).json({ error: (e as any).message });
  }
};

export const addCompany = async (req: Request, res: Response) => {
  try {
    const body = req.body as Company;

    const fieldsRequired = ["name", "logo", "summary"];
    const { data, errorBody } = checkBody(body, fieldsRequired, "Company");

    if (!data) {
      res.status(400).json({ error: errorBody });
      return;
    }

    const newCompany = await prisma.company.create({
      data: {
        name: data.name,
        logo: data.logo,
        summary: data.summary,
      },
    });

    const companyId = newCompany.id;

    const updatedCompany = await prisma.company.update({
      where: {
        id: companyId,
      },
      data: {
        url: `${API_URL}/api/companies/${companyId}`,
      },
    });

    res.status(201).json({
      status: 201,
      message: "Company added",
      advocate: updatedCompany,
    });
  } catch (e) {
    res.status(500).json({ error: (e as any).message });
  }
};
