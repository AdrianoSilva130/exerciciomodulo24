const { reporter } = require("pactum");
const pf = require("pactum-flow-plugin");

if (process.env.ENABLE_FLOW === "true") {
  pf.config.url = "http://127.0.0.1:8081";
  pf.config.projectId = "exercicio-front";
  pf.config.projectName = "Exercicio Front";
  pf.config.version = Date.now().toString();
  pf.config.username = "scanner";
  pf.config.password = "scanner";
  pf.config.auto = true;

  reporter.add(pf.reporter);
}
