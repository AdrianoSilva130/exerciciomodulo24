const { spec } = require('pactum');
const { getProductId, getToken } = require('./setupProducts');

it('API - Deve deletar o produto', async () => {
   const token = getToken();
  const productId = getProductId();

  await spec()
    .delete(`/api/deleteProduct/${productId}`)
    .withHeaders('authorization', token)
    .expectStatus(200)
    .expectJsonLike({
      success: true
    });
    console.log('Produto deletado com sucesso:', productId);
});
