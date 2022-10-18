"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCompanySortParams = exports.getAdvocateSortParams = void 0;
const getAdvocateSortParams = (sortby) => {
    const sortParams = [];
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
            const sortObj = {};
            sortObj[field] = sortingOrder;
            sortParams.push(sortObj);
        }
    });
    if (sortParams.length === 0) {
        return {
            id: "asc",
        };
    }
    return sortParams;
};
exports.getAdvocateSortParams = getAdvocateSortParams;
const getCompanySortParams = (sortby) => {
    const sortParams = [];
    sortby.split(",").forEach((param) => {
        let field = param[0] === "-" ? param.slice(1) : param;
        const sortingOrder = param[0] === "-" ? "desc" : "asc";
        if (field === "name") {
            sortParams.push({
                name: sortingOrder,
            });
        }
    });
    if (sortParams.length === 0) {
        return {
            id: "asc",
        };
    }
    return sortParams;
};
exports.getCompanySortParams = getCompanySortParams;
//# sourceMappingURL=getSortParams.js.map