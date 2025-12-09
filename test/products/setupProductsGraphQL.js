import { spec } from 'pactum';

const BASE_URL = 'http://lojaebac.ebaconline.art.br/graphql';
let token;
let categoryId;
let productId;

export function randomPrice() {
  return Number((Math.random() * 100).toFixed(2));
}

export async function setupProductsGraphQL() {
  // Autenticação
  const authQuery = `
    mutation {
      authUser(email: "admin@admin.com", password: "admin123") {
        token
      }
    }
  `;

  token = await spec()
    .post(BASE_URL)
    .withJson({ query: authQuery })
    .expectStatus(200)
    .returns('data.authUser.token');

  // Criar categoria
  const createCategory = `
    mutation {
      addCategory(input: { 
        name: "Categoria Automática Produto", 
        description: "Criada no setup para produtos" 
      }) {
        _id
      }
    }
  `;

  categoryId = await spec()
    .post(BASE_URL)
    .withHeaders('authorization', token)
    .withJson({ query: createCategory })
    .expectStatus(200)
    .returns('data.addCategory._id');

  console.log("Categoria criada:", categoryId);

  // Criar produto
  const createProduct = `
    mutation {
      addProduct(input: {
        name: "Produto Automático",
        price: ${randomPrice()},
        quantity: 10,
        categories: ["${categoryId}"],
        description: "Produto criado no setup",
        photos: ["https://picsum.photos/300"],
        popular: false,
        visible: true,
        location: "Armazém",
        additionalDetails: "Detalhes adicionais",
        specialPrice: ${randomPrice()}
      }) {
        _id
      }
    }
  `;

  productId = await spec()
    .post(BASE_URL)
    .withHeaders('authorization', token)
    .withJson({ query: createProduct })
    .expectStatus(200)
    .returns('data.addProduct._id');

  console.log("Produto criado no setup:", productId);
}

export function getToken() {
  return token;
}

export function getCategoryId() {
  return categoryId;
}

export function getProductId() {
  return productId;
}
