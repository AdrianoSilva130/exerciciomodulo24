const { spec } = require('pactum');
const { getCategoryId, getToken } = require('./setupCategories');

it('API - Deve deletar a categoria pelo ID', async () => {
   const token = getToken();
  const categoryId = getCategoryId();

  await spec()
    .delete(`/api/deleteCategory/${categoryId}`)
    .withHeaders('authorization', token)
    .expectStatus(200)
    .expectJsonLike({
      success: true
    });
});
