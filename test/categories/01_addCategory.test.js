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
});

it('API - Deve adicionar uma categoria com sucesso', async () => {
  categoryId = await spec()
    .post('/api/addCategory')
    .withHeaders('authorization', token)
    .withJson({
      name: 'Categoria Automática',
      description: 'Criada para o teste'
    })
    .expectStatus(200)
    .returns('data._id');

  console.log("ID criada:", categoryId);
});

it('API - Não deve adicionar categoria sem token de autorização', async () => {
  await spec()
    .post('/api/addCategory')
    .withJson({
      name: 'Categoria Automática',
      description: 'Criada para o teste'
    })
    .expectStatus(403)
    .expectJson('success', false);
});