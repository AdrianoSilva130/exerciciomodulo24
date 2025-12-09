import pactum from 'pactum';
import { setupProductsGraphQL, getToken, getCategoryId, randomPrice } from './setupProductsGraphQL.js';

const { spec, request } = pactum;

before(async () => {
  await setupProductsGraphQL();
});

// Define o baseUrl do GraphQL
request.setBaseUrl('http://lojaebac.ebaconline.art.br/graphql');

describe("GraphQL - Criar produto dinamicamente", () => {
  it("Deve criar um produto com todos os campos corretos", async () => {
    const token = getToken();
    const categoryId = getCategoryId();

    const query = `
      mutation {
        addProduct(input: {
          name: "Produto Dinâmico ${Math.floor(Math.random() * 1000)}",
          price: ${randomPrice()},
          quantity: 10,
          categories: ["${categoryId}"],
          description: "Produto criado dinamicamente",
          photos: ["https://picsum.photos/300"],
          popular: false,
          visible: true,
          location: "Armazém",
          additionalDetails: "Detalhes adicionais",
          specialPrice: ${randomPrice()}
        }) {
          _id
          name
        }
      }
    `;

    await spec()
      .post('') // baseUrl já definido
      .withHeaders('authorization', token)
      .withJson({ query })
      .expectStatus(200)
      .expectJsonLike({
        data: {
          addProduct: {
            name: /Produto Dinâmico/
          }
        }
      });
  });
});

