import request from 'supertest';
import express from 'express';
import graphqlHTTP from 'express-graphql';
import schema from '../../src/setup/schema'

describe("User mutations", () => {
  let server = express();
  let token = ""
  beforeAll(async () => {
    server.use(
      '/',
      graphqlHTTP({
        schema: schema,
        graphiql: false
      })
    );

    const response = await request(server)
      .get('/')
      .send({ query: 'query { userLogin(email: \"user@crate.com\", password: \"123456\") { token } }' })
    token = response.body.data.userLogin.token
  });

  it('Gets all users', async () => {
    const response = await request(server)
      .get('/')
      .send({ query: 'query { users{ name } }' })
      .expect(200)
    expect(response.body.data.users[0]).toEqual({ name: "The Admin" })
    expect(response.body.data.users[1]).toEqual({ name: "The User" })
  });

  it('Updates a user style', async () => {
    const response = await request(server)
      .post('/')
      .set('Accept', 'application/json')
      .send({ query: 'mutation { styleUpdate(style: \"Vintage\") { name } }' })
      .expect(200)
    console.log(response.body)
    // expect(response.body.data.styleUpdate.name).toEqual('The User');
    // expect(response.body.data.styleUpdate.id).toEqual(2);
    // expect(response.body.data.styleUpdate.style).toEqual('Elliot is a brony');
  });
})
