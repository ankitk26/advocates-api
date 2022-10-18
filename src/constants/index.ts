import { PrismaClient } from "@prisma/client";

export interface SearchParams {
  query?: string;
  limit?: number;
  page?: number;
  sortby?: string;
}

export const prisma = new PrismaClient();

export const API_URL = "http://localhost:5000";
