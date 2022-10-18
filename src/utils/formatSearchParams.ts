import { SearchParams } from "../constants";

export const formatSearchParams = (params: SearchParams) => {
  let limit = params.limit ?? 100;
  let page = params.page ?? 1;
  const query = params.query ?? "";
  const sortby = params.sortby ?? "";

  if (typeof limit === "string") {
    limit = parseInt(limit);
  }

  if (typeof page === "string") {
    page = parseInt(page);
  }

  return { limit, page, query, sortby };
};
