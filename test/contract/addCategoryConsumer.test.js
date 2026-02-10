const { reporter, flow, handler, mock } = require('pactum');
const pf = require('pactum-flow-plugin');
const { like } = require('pactum-matchers');

const ENABLE_FLOW = process.env.ENABLE_FLOW === 'true';

function addFlowReporter() {
  pf.config.url = 'http://127.0.0.1:8081';
  pf.config.projectId = 'exercicio-front';
  pf.config.projectName = 'Exercicio Front';
  pf.config.version = Date.now().toString();
  pf.config.username = 'scanner';
  pf.config.password = 'scanner';
  pf.config.auto = true;
  reporter.add(pf.reporter);
}

before(async () => {
  if (ENABLE_FLOW) {
    addFlowReporter();
  }
  await mock.start(4000);
});

after(async () => {
  await mock.stop();

  // Só tenta finalizar o reporter se o Flow estiver ligado
  if (ENABLE_FLOW) {
    try {
      await reporter.end();
    } catch (err) {
      console.warn('⚠️ Pactum Flow não disponível, ignorando finalização.');
    }
  }
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
