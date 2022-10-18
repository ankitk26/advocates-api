"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatSearchParams = void 0;
const formatSearchParams = (params) => {
    var _a, _b, _c, _d;
    let limit = (_a = params.limit) !== null && _a !== void 0 ? _a : 100;
    let page = (_b = params.page) !== null && _b !== void 0 ? _b : 1;
    const query = (_c = params.query) !== null && _c !== void 0 ? _c : "";
    const sortby = (_d = params.sortby) !== null && _d !== void 0 ? _d : "";
    if (typeof limit === "string") {
        limit = parseInt(limit);
    }
    if (typeof page === "string") {
        page = parseInt(page);
    }
    return { limit, page, query, sortby };
};
exports.formatSearchParams = formatSearchParams;
//# sourceMappingURL=formatSearchParams.js.map