const { spec } = require('pactum');
const { getProductId, getToken, } = require('./setupProducts');

function randomName() {
  return `Produto Editado-${Math.floor(Math.random() * 10000)}`;
}

function randomPrice() {
  return Number((Math.random() * 100).toFixed(2));
}

function randomQuantity() {
  return Math.floor(Math.random() * 100);
}

it('API - Deve editar o Produto pelo ID', async () => {
  const token = getToken();
  const productId = getProductId();

  await spec()
    .put(`/api/editProduct/${productId}`)
    .withHeaders('authorization', token)
    .withJson({
      
      name: randomName(),
      price: randomPrice(),
      quantity: randomQuantity(),
      visible: true,
      description: 'Produto atualizado via teste automático'
    })
    .expectStatus(200)
    .expectJsonLike({
      success: true
    });
    console.log('Produto editado com sucesso:', productId);
});
