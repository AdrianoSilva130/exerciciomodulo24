const { spec } = require("pactum");
const { like } = require("pactum-matchers");

let token;

describe("PROVIDER - Add Category", () => {

  before(async () => {
   
    token = await spec()
      .post("http://lojaebac.ebaconline.art.br/public/authUser")
      .withJson({
        email: "admin@admin.com",
        password: "admin123"
      })
      .expectStatus(200)
      .returns("data.token");
  });

  it("Backend deve cumprir o contrato esperado", async () => {
    await spec()
      .post("http://lojaebac.ebaconline.art.br/api/addCategory")
      .withHeaders("authorization", token)
      .withJson({
        name: "Categoria Automática",
        description: "Criada para o teste"
      })
      .expectStatus(200)
      .expectJsonMatch({
  success: true,
  data: {
    _id: like("string"),
    name: "Categoria Automática",
    createdAt: like("string"),
    updatedAt: like("string"),
    __v: like(0)
  }
});
  });
});
