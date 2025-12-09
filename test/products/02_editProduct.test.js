const { spec } = require('pactum');
const { getToken, getProductId, randomPrice } = require('./setupProducts');

it("API - Deve editar o produto criado", async () => {
  if (!productId) throw new Error("Produto não foi criado para edição");

  const token = getToken();

  await spec()
    .put(`/api/editProduct/${productId}`)
    .withHeaders('authorization', token)
    .withJson({
      name: "Produto Editado Automático",
      price: randomPrice(),
      quantity: 20,
      categories: ["693860846a9a40875825cca0"],
      description: "Atualizado via teste automático",
      photos: ["https://picsum.photos/301"],
      popular: true,
      visible: false,
      location: "Loja",
      additionalDetails: "Detalhes atualizados",
      specialPrice: randomPrice()
    })
    .expectStatus(200)
    .expectJsonLike({
      success: true
    });
});