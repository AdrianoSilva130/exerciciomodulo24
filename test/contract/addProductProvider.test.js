const { spec } = require("pactum");
const { like } = require("pactum-matchers");

let token;

describe("PROVIDER - Add Product", () => {

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

  it("Backend deve cumprir o contrato REAL ao adicionar um produto", async () => {
    await spec()
      .post("http://lojaebac.ebaconline.art.br/api/addProduct")
      .withHeaders("authorization", token)
      .withJson({
        name: "Produto Automático",
        price: 20,
        quantity: 100,
        visible: true
      })
      .expectStatus(200)
      .expectJsonMatch({
        success: true,
        data: {
          _id: like("string"),
          name: "Produto Automático",
          price: like(20),
          quantity: like(100),
          visible: like(true),
          createdAt: like("string"),
          updatedAt: like("string"),
          __v: like(0)
        }
      });
  });

});
