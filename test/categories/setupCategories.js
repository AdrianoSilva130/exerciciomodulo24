const { spec, request } = require('pactum');

request.setBaseUrl('http://lojaebac.ebaconline.art.br');

let token;
let categoryId;

before(async () => {

  token = await spec()
    .post('/public/authUser')
    .withJson({
      email: 'admin@admin.com',
      password: 'admin123'
    })
    .expectStatus(200)
    .returns('data.token');

  categoryId = await spec()
    .post('/api/addCategory')
    .withHeaders('authorization', token)
    .withJson({
      name: 'Categoria Setup Teste',
      description: 'Criada no setup global'
    })
    .expectStatus(200)
    .returns('data._id');

  console.log("Categoria criada no setup:", categoryId);
});

module.exports = {
  getCategoryId: () => categoryId,
  getToken: () => token
};
