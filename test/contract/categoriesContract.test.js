const { spec } = require('pactum');
const { like, eachLike } = require('pactum-matchers');

const BASE = process.env.BASE_URL || 'http://localhost:3000';

describe('Contract - Categories', () => {
  it('GET /categories should follow contract', async () => {
    await spec()
      .get(`${BASE}/categories`)
      .expectStatus(200)
      .expectJsonMatch([
        {
          id: like('uuid-or-id'),
          name: like('Categoria Exemplo'),
          description: like('Descrição qualquer')
        }
      ])
      .toss();
  });
});
