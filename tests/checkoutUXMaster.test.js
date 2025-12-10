const checkoutUXMaster = require("../agents/checkoutUXMaster");

describe("checkoutUXMaster check", () => {
  test("returns true for valid cart", () => {
    const cart = { items: [{ id: 1 }], total: 100 };
    expect(checkoutUXMaster.check(cart)).toBe(true);
  });

  test("returns false for empty cart", () => {
    const cart = { items: [], total: 0 };
    expect(checkoutUXMaster.check(cart)).toBe(false);
  });
});
