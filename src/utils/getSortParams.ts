export const getAdvocateSortParams = (sortby: string) => {
  const sortParams = [] as Object[];

  sortby.split(",").forEach((param) => {
    let field = param[0] === "-" ? param.slice(1) : param;
    const sortingOrder = param[0] === "-" ? "desc" : "asc";

    if (field === "name") {
      field = "firstName";
    }
    if (field === "experience") {
      field = "advocateSince";
    }

    if (field === "firstName" || field === "advocateSince") {
      const sortObj = {} as any;
      sortObj[field] = sortingOrder;
      sortParams.push(sortObj);
    }
  });

  // Return default response without any sorting
  if (sortParams.length === 0) {
    return {
      id: "asc",
    };
  }

  // Return sorting params
  return sortParams;
};

export const getCompanySortParams = (sortby: string) => {
  const sortParams = [] as Object[];

  sortby.split(",").forEach((param) => {
    let field = param[0] === "-" ? param.slice(1) : param;
    const sortingOrder = param[0] === "-" ? "desc" : "asc";

    if (field === "name") {
      sortParams.push({
        name: sortingOrder,
      });
    }
  });

  // Return default response without any sorting
  if (sortParams.length === 0) {
    return {
      id: "asc",
    };
  }

  // Return sorting params
  return sortParams;
};
