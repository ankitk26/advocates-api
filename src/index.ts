import cors from "cors";
import express from "express";
import { router as advocateRoutes } from "./routes/advocateRoutes";
import { router as companyRoutes } from "./routes/companyRoutes";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/advocates", advocateRoutes);
app.use("/api/companies", companyRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Server started");
});
