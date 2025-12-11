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

before(async () => {
  addFlowReporter();
  await mock.start(4000);
});

after(async () => {
  await mock.stop();
  await reporter.end();
});

handler.addInteractionHandler('Add Category Response', () => {
  return {
    provider: 'exercicio-api',
    flow: 'Add Category',
    request: {
      method: 'POST',
      path: '/api/addCategory',
      body: {
        name: like('Categoria Automática'),
        description: like('Criada para o teste')
      }
    },
    response: {
      status: 200,
      body: {
        success: true,
        data: {
          _id: like('679f50eb0cf0a913258b286c'),
          name: like('Categoria Automática'),
          description: like('Criada para o teste')
        }
      }
    }
  };
});


it('CONTRATO - deve validar o contrato ao adicionar categoria', async () => {
  await flow('Add Category')
    .useInteraction('Add Category Response')
    .post('http://localhost:4000/api/addCategory')
    .withJson({
      name: 'Categoria Automática',
      description: 'Criada para o teste'
    })
    .expectStatus(200)
    .expectJsonMatch({
      success: true,
      data: {
        _id: like('679f50eb0cf0a913258b286c'),
        name: like('Categoria Automática'),
        description: like('Criada para o teste')
      }
    });
});
