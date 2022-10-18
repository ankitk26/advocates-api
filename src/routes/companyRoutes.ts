import { Router } from "express";
import {
  addCompany,
  getCompanies,
  getCompanyById,
} from "../controllers/companyControllers";

import apicache from "apicache";
const cache = apicache.middleware;

const router = Router();

router.get("/", cache("1 minute"), getCompanies);
router.get("/:id", cache("1 minute"), getCompanyById);
router.post("/", addCompany);

export { router };
