const fitAIAssistant = require("../agents/fitAIAssistant");

describe("fitAIAssistant recommend", () => {
  test("returns L for large measurements", () => {
    expect(fitAIAssistant.recommend({ bust: 110, waist: 100, hips: 105 })).toBe(
      "L",
    );
  });

  test("returns S for small measurements", () => {
    expect(fitAIAssistant.recommend({ bust: 80, waist: 70, hips: 85 })).toBe(
      "S",
    );
  });
});
