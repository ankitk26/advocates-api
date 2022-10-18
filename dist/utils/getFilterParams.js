"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCompanyFilterParams = exports.getAdvocateFilterParams = void 0;
const getAdvocateFilterParams = (query) => {
    const fields = ["firstName", "lastName", "shortBio", "longBio"];
    const filterParams = [];
    const filterConfig = {
        contains: query,
        mode: "insensitive",
    };
    fields.forEach((field) => {
        const fieldObj = {};
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
exports.getAdvocateFilterParams = getAdvocateFilterParams;
const getCompanyFilterParams = (query) => {
    const filterConfig = {
        contains: query,
        mode: "insensitive",
    };
    return [{ name: filterConfig }, { summary: filterConfig }];
};
exports.getCompanyFilterParams = getCompanyFilterParams;
//# sourceMappingURL=getFilterParams.js.map