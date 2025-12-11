const { spec, request } = require('pactum');

request.setBaseUrl('http://lojaebac.ebaconline.art.br');

let token;
let productId;

before(async () => {

  token = await spec()
    .post('/public/authUser')
    .withJson({
      email: 'admin@admin.com',
      password: 'admin123'
    })
    .expectStatus(200)
    .returns('data.token');

  productId = await spec()
    .post('/api/addProduct')
    .withHeaders('authorization', token)
    .withJson({
      name: 'Produto Setup Teste',
      description: 'Criada no setup global',
      price: 10,
      quantity: 1,
      visible: true
    })
    .expectStatus(200)
    .returns('data._id');

  console.log("Produto criado no setup:", productId);
});

module.exports = {
  getProductId: () => productId,
  getToken: () => token
};
