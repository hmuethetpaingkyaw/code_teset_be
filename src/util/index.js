export function getPaginationAttribute(req, totalCount) {
  let limit = 1;
  let offset = 0;
  let page = 1;
  if (req.query.page) {
    page = Number(req.query.page);
    if (page > 1) {
      offset = (page - 1) * limit;
    }
  }

  let totalPage = Math.ceil(totalCount / limit);
  if (totalPage < 1) totalPage = 1;

  return {
    limit,
    offset,
    page,
    totalPage,
  };
}
