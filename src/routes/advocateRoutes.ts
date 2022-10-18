import { Router } from "express";
import {
  addAdvocate,
  getAdvocateById,
  getAdvocatesAndLinks,
} from "../controllers/advocateControllers";

import apicache from "apicache";
const cache = apicache.middleware;

const router = Router();

router.get("/", cache("1 minute"), getAdvocatesAndLinks);
router.get("/:id", cache("1 minute"), getAdvocateById);
router.post("/", addAdvocate);

export { router };
