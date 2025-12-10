const lookCurator = require("../agents/lookCurator");

describe("lookCurator curate", () => {
  test("returns top rated products", () => {
    const products = [{ rating: 3 }, { rating: 5 }, { rating: 4 }];
    const result = lookCurator.curate(products);
    expect(result).toEqual([{ rating: 5 }, { rating: 4 }, { rating: 3 }]);
  });
});
