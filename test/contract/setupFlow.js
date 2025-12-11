const { reporter } = require("pactum-flow-plugin");

before(async () => {
  await reporter.start();
});

after(async () => {
  await reporter.end();
});
