const paginateResults = (data, pageNum) => {
  const page = parseInt(pageNum);
  const limit = 8;

  const start = (page - 1) * limit;
  const end = page * limit;

  const results = {};

  if (end < data.length) {
    results.next = {
      page: page + 1,
    };
  }

  if (start > 0) {
    results.previous = {
      page: page - 1,
    };
  }

  results.results = data.slice(start, end);
  paginatedResults = results;
  return paginatedResults;
};

module.exports = paginateResults;
