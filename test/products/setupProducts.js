const { spec, request } = require('pactum');

request.setBaseUrl('http://lojaebac.ebaconline.art.br');

let token;
let categoryId;
let productId;

function randomPrice() {
  return Number((Math.random() * 100).toFixed(2));
}

before(async () => {

  token = await spec()
    .post('/public/authUser')
    .withJson({
      email: "admin@admin.com",
      password: "admin123"
    })
    .expectStatus(200)
    .returns("data.token");

  categoryId = await spec()
    .post('/api/addCategory')
    .withHeaders('authorization', token)
    .withJson({
      name: "Categoria Automática Produto",
      description: "Criada no setup para produtos"
    })
    .expectStatus(200)
    .returns("data._id");

  console.log("Categoria criada:", categoryId);

  productId = await spec()
    .post('/api/addProduct')
    .withHeaders('authorization', token)
    .withJson({
      name: "Produto Automático",
      price: randomPrice(),
      description: "Criado no setup",
      category: categoryId,
      image: "https://picsum.photos/300"
    })
    .expectStatus(200)
    .returns("data._id");

  console.log("Produto criado no setup:", productId);
});

module.exports = {
  getToken: () => token,
  getCategoryId: () => categoryId,
  getProductId: () => productId,
  randomPrice
};
