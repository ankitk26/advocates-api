"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addAdvocate = exports.getAdvocateById = exports.getAdvocatesAndLinks = void 0;
const client_1 = require("@prisma/client");
const prisma_exclude_1 = require("prisma-exclude");
const constants_1 = require("../constants");
const checkBody_1 = require("../utils/checkBody");
const formatSearchParams_1 = require("../utils/formatSearchParams");
const getFilterParams_1 = require("../utils/getFilterParams");
const getSortParams_1 = require("../utils/getSortParams");
const prisma = new client_1.PrismaClient();
const exclude = (0, prisma_exclude_1.prismaExclude)(prisma);
const getAdvocatesAndLinks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { limit, page, query, sortby } = (0, formatSearchParams_1.formatSearchParams)(req.query);
        const sortParams = (0, getSortParams_1.getAdvocateSortParams)(sortby);
        const filterParameters = (0, getFilterParams_1.getAdvocateFilterParams)(query);
        const advocatesCount = yield prisma.advocate.count({
            where: {
                OR: filterParameters,
            },
        });
        const advocatesList = yield prisma.advocate.findMany({
            where: {
                OR: filterParameters,
            },
            take: limit,
            skip: (page - 1) * limit,
            include: {
                company: true,
                links: {
                    select: exclude("link", ["id", "advocateId"]),
                },
            },
            orderBy: sortParams,
        });
        res.status(200).json({
            total: advocatesCount,
            limit,
            totalPages: Math.ceil(advocatesCount / limit),
            page,
            advocates: advocatesList,
        });
    }
    catch (e) {
        res.status(500).json({ error: e.message });
    }
});
exports.getAdvocatesAndLinks = getAdvocatesAndLinks;
const getAdvocateById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const advocate = yield prisma.advocate.findUnique({
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
    }
    catch (e) {
        res.status(500).json({ error: e.message });
    }
});
exports.getAdvocateById = getAdvocateById;
const addAdvocate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
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
        const { data, errorBody } = (0, checkBody_1.checkBody)(body, fieldsRequired, "Advocate");
        if (!data) {
            res.status(400).json({ error: errorBody });
            return;
        }
        const links = (_a = body.links) !== null && _a !== void 0 ? _a : [];
        const newAdvocate = yield prisma.advocate.create({
            data: {
                firstName: data.firstName,
                lastName: (_b = data.lastName) !== null && _b !== void 0 ? _b : null,
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
        const updatedAdvocate = yield prisma.advocate.update({
            where: {
                id: advocateId,
            },
            data: {
                url: `${constants_1.API_URL}/api/advocates/${advocateId}`,
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
    }
    catch (e) {
        res.status(500).json({ error: e.message });
    }
});
exports.addAdvocate = addAdvocate;
//# sourceMappingURL=advocateControllers.js.map