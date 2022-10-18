export const getAdvocateFilterParams = (query: string) => {
  const fields = ["firstName", "lastName", "shortBio", "longBio"];

  const filterParams = [] as any[];

  const filterConfig = {
    contains: query,
    mode: "insensitive",
  };

  fields.forEach((field) => {
    const fieldObj = {} as any;
    fieldObj[field] = filterConfig;
    filterParams.push(fieldObj);
  });

  return [
    ...filterParams,
    {
      company: {
        name: filterConfig,
      },
    },
  ];
};

export const getCompanyFilterParams = (query: string) => {
  const filterConfig = {
    contains: query,
    mode: "insensitive",
  };

  return [{ name: filterConfig }, { summary: filterConfig }];
};
