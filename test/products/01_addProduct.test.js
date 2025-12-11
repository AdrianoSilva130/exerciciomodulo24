const { spec, request, } = require('pactum');

request.setBaseUrl('http://lojaebac.ebaconline.art.br');

let token;
let productId;

function randomPrice() {
  return Number((Math.random() * 100).toFixed(2));
}

function randomName() {
  return `Produto-${Math.floor(Math.random() * 10000)}`;
}


before(async () => {
  token = await spec()
    .post('/public/authUser')
    .withJson({
      email: 'admin@admin.com',
      password: 'admin123'
    })
    .expectStatus(200)
    .returns('data.token');
});

it('API - Deve adicionar um produto com sucesso', async () => {
  productId = await spec()
    .post('/api/addProduct')
    .withHeaders('authorization', token)
    .withJson({
      name: randomName(),
      price: randomPrice(),
      quantity: Math.floor(Math.random() * 100),
      visible: true
    })
    .expectStatus(200)
    .returns('data._id');

  console.log("ID criada:", productId);
});
