const { reporter, flow, handler, mock } = require('pactum');
const pf = require('pactum-flow-plugin');
const { like } = require('pactum-matchers');

function addFlowReporter() {
  pf.config.url = 'http://localhost:8081';
  pf.config.projectId = 'exercicio-front';
  pf.config.projectName = 'Exercicio Front';
  pf.config.version = Date.now().toString();
  pf.config.username = 'scanner';
  pf.config.password = 'scanner';
  pf.config.auto = true;
  reporter.add(pf.reporter);
}

handler.addInteractionHandler('Add Product Response', () => {
  return {
    provider: 'exercicio-api',
    flow: 'Add Product',
    request: {
      method: 'POST',
      path: '/api/addProduct',
      body: {
        name: like('Produto Automático'),
        price: like(99.9),
        quantity: like(10),
        visible: like(true)
      }
    },
    response: {
      status: 200,
      body: {
        success: true,
        data: {
          _id: like('679f50eb0cf0a913258b999'),
          name: like('Produto Automático'),
          price: like(99.9),
          quantity: like(10),
          visible: like(true)
        }
      }
    }
  };
});


it('CONTRATO - deve validar o contrato ao adicionar produto', async () => {
  await flow('Add Product')
    .useInteraction('Add Product Response')
    .post('http://localhost:4000/api/addProduct')
    .withJson({
      name: 'Produto Automático',
      price: 99.9,
      quantity: 10,
      visible: true
    })
    .expectStatus(200)
    .expectJsonMatch({
      success: true,
      data: {
        _id: like('679f50eb0cf0a913258b999'),
        name: like('Produto Automático'),
        price: like(99.9),
        quantity: like(10),
        visible: like(true)
      }
    });
});
