const { spec } = require('pactum');
const { getToken, getProductId } = require('./setupProducts');

it("API - Deve deletar o produto criado", async () => {
  if (!productId) throw new Error("Produto não foi criado para exclusão");

  const token = getToken();

  await spec()
    .delete(`/api/deleteProduct/${productId}`)
    .withHeaders('authorization', token)
    .expectStatus(200)
    .expectJsonLike({
      success: true
    });
});