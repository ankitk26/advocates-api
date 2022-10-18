"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const advocateRoutes_1 = require("./routes/advocateRoutes");
const companyRoutes_1 = require("./routes/companyRoutes");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/api/advocates", advocateRoutes_1.router);
app.use("/api/companies", companyRoutes_1.router);
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log("Server started");
});
//# sourceMappingURL=index.js.map