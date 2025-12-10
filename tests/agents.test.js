const agents = require("../agents");

test("agents index exports all modules", () => {
  expect(agents).toHaveProperty("deployScriptMaster");
  expect(agents).toHaveProperty("testRunnerGPT");
  expect(agents).toHaveProperty("refactorAgentJS");
  expect(agents).toHaveProperty("docuGen");
  expect(agents).toHaveProperty("taskResolver");
  expect(agents).toHaveProperty("compararTalla");
  expect(agents).toHaveProperty("recomendarPrenda");
  expect(agents).toHaveProperty("reaccionPau");
  expect(agents).toHaveProperty("validarDonacion");
  expect(agents).toHaveProperty("generarAvatar");
  expect(agents).toHaveProperty("brandGuardian");
  expect(agents).toHaveProperty("fitAIAssistant");
  expect(agents).toHaveProperty("lookCurator");
  expect(agents).toHaveProperty("checkoutUXMaster");
});
