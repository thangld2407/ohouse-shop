const { isFloat } = require("../utils/validation");

module.exports = {
  pagination(page, limit, total) {
    let totalPage = total / limit;
    let is_float = isFloat(totalPage);
    if (is_float) {
      totalPage = Math.floor(totalPage) + 1;
    } else {
      totalPage = totalPage;
    }
    let start = (page - 1) * limit;
    let end = page * limit;
    let total_page = totalPage;
    let current_page = page;
    let per_page = limit;
    return {
      total_page,
      current_page,
      per_page,
      start,
      end,
    };
  },
};
