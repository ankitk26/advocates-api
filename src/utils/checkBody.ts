export const checkBody = (
  body: any,
  fieldsRequired: string[],
  modelName: string
) => {
  const errorBody = {
    message: "Missing input",
    status: 400,
    detail: `${modelName} cannot added due to missing input data`,
  };

  for (const field of fieldsRequired) {
    if (!body[field]) {
      return {
        data: null,
        errorBody,
      };
    }
  }

  return { data: body, errorBody: null };
};
