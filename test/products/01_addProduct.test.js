const { spec } = require('pactum');
const { getToken, randomPrice } = require('./setupProducts');

describe("API - Fluxo completo de produtos", () => {
  let productId;
  const token = getToken();

  it("Deve criar um produto com todos os campos", async () => {
    const response = await spec()
      .post('/api/addProduct')
      .withHeaders('authorization', token)
      .withJson({
        name: "Produto Automático",
        price: randomPrice(),
        quantity: 10,
        categories: ["693861db6a9a40875825cca8"], // ID válido de categoria
        description: "Criado no teste automático",
        photos: ["https://picsum.photos/300"],
        popular: false,
        visible: true,
        location: "Armazém",
        additionalDetails: "Detalhes adicionais do produto",
        specialPrice: randomPrice()
      })
      .expectStatus(201);

    productId = response.body.id;
    if (!productId) throw new Error("Produto não retornou ID");
  })
})