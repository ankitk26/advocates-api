"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkBody = void 0;
const checkBody = (body, fieldsRequired, modelName) => {
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
exports.checkBody = checkBody;
//# sourceMappingURL=checkBody.js.map