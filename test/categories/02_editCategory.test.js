const { spec } = require('pactum');
const { getCategoryId, getToken } = require('./setupCategories');

it('API - Deve editar a categoria pelo ID', async () => {
   const token = getToken();
  const categoryId = getCategoryId();

  await spec()
    .put(`/api/editCategory/${categoryId}`)
    .withHeaders('authorization', token)
    .withJson({
      
      name: 'Categoria Editada Automático',
      description: 'Categoria atualizada via teste automático'
    })
    .expectStatus(200)
    .expectJsonLike({
      success: true
    });
});
