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
exports.addCompany = exports.getCompanyById = exports.getCompanies = void 0;
const client_1 = require("@prisma/client");
const constants_1 = require("../constants");
const checkBody_1 = require("../utils/checkBody");
const formatSearchParams_1 = require("../utils/formatSearchParams");
const getFilterParams_1 = require("../utils/getFilterParams");
const getSortParams_1 = require("../utils/getSortParams");
const prisma = new client_1.PrismaClient();
const getCompanies = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { limit, page, query, sortby } = (0, formatSearchParams_1.formatSearchParams)(req.query);
        const sortParams = (0, getSortParams_1.getCompanySortParams)(sortby);
        const filterParams = (0, getFilterParams_1.getCompanyFilterParams)(query);
        const companiesCount = yield prisma.company.count({
            where: {
                OR: filterParams,
            },
        });
        const companiesList = yield prisma.company.findMany({
            where: {
                OR: filterParams,
            },
            take: limit,
            skip: (page - 1) * limit,
            include: {
                advocates: true,
            },
            orderBy: sortParams,
        });
        res.status(200).json({
            results: companiesCount,
            limit,
            totalPages: Math.ceil(companiesCount / limit),
            page,
            companies: companiesList,
        });
    }
    catch (e) {
        res.status(500).json({ error: e.message });
    }
});
exports.getCompanies = getCompanies;
const getCompanyById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const company = yield prisma.company.findUnique({
            where: { id },
            include: {
                advocates: true,
            },
        });
        res.status(200).json({ company });
    }
    catch (e) {
        res.status(500).json({ error: e.message });
    }
});
exports.getCompanyById = getCompanyById;
const addCompany = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const fieldsRequired = ["name", "logo", "summary"];
        const { data, errorBody } = (0, checkBody_1.checkBody)(body, fieldsRequired, "Company");
        if (!data) {
            res.status(400).json({ error: errorBody });
            return;
        }
        const newCompany = yield prisma.company.create({
            data: {
                name: data.name,
                logo: data.logo,
                summary: data.summary,
            },
        });
        const companyId = newCompany.id;
        const updatedCompany = yield prisma.company.update({
            where: {
                id: companyId,
            },
            data: {
                url: `${constants_1.API_URL}/api/companies/${companyId}`,
            },
        });
        res.status(201).json({
            status: 201,
            message: "Company added",
            advocate: updatedCompany,
        });
    }
    catch (e) {
        res.status(500).json({ error: e.message });
    }
});
exports.addCompany = addCompany;
//# sourceMappingURL=companyControllers.js.map