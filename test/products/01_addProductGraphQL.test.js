const pactum = require('pactum');
const { like, eachLike } = require('pactum-matchers');

let userToken;
beforeEach(async () => {

  userToken = await pactum.spec()
    .post('http://lojaebac.ebaconline.art.br/graphql')
    .withGraphQLQuery(`
      mutation AuthUser($email: String!, $password: String!) {
        authUser(email: $email, password: $password) {
          success
          token
        }
      }
    `)
    .withGraphQLVariables({
      email: "admin@admin.com",
      password: "admin123"
    })
    .returns('userToken', 'data.authUser.token')
    .expectStatus(200)
    .expectJson('data.authUser.success', true)
    .stores('userToken', 'data.authUser.token');
});

it('Graphql - adicionar produto', async () => {

  await pactum.spec()
    .post('http://lojaebac.ebaconline.art.br/graphql')
    .withHeaders('Authorization', 'Bear $S{userToken}')
    .withGraphQLQuery(`
        mutation Mutation($name: String, $price: Float, $quantity: Float, $visible: Boolean) {
  addProduct(name: $name, price: $price, quantity: $quantity, visible: $visible) {
    name
    price
    quantity
    visible
  }
}
`)
    .withGraphQLVariables({
      input: {
        name: ('Produto Dinâmico'),
        price: 99.99,
        quantity: 10,
        visible: (true)
      }
    })
    .expectStatus(200)
    .expectJsonMatch({
  "data": {
    "addProduct": {
      "name": like("Sapato"),
      "price": like(20),
      "quantity": like(100),
      "visible": true
    }
  }
    })
})
