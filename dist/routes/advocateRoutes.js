"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const advocateControllers_1 = require("../controllers/advocateControllers");
const apicache_1 = __importDefault(require("apicache"));
const cache = apicache_1.default.middleware;
const router = (0, express_1.Router)();
exports.router = router;
router.get("/", cache("1 minute"), advocateControllers_1.getAdvocatesAndLinks);
router.get("/:id", cache("1 minute"), advocateControllers_1.getAdvocateById);
router.post("/", advocateControllers_1.addAdvocate);
//# sourceMappingURL=advocateRoutes.js.map