"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.API_URL = exports.prisma = void 0;
const client_1 = require("@prisma/client");
exports.prisma = new client_1.PrismaClient();
exports.API_URL = "http://localhost:5000";
//# sourceMappingURL=index.js.map