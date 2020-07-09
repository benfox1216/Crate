import request from 'supertest';
import express from 'express';
import graphqlHTTP from 'express-graphql';
import schema from '../../src/setup/schema'

describe("User mutations", () => {
  let server;
  beforeAll(()=> {
    server = express();
    server.use(
      '/',
      graphqlHTTP({
        schema: schema,
        graphiql: false
      })
    );
    const response = await request(server)
    .post('/')
    .send({ query: 'query { userLogin(style: \"Elliot is a brony\") { name id style } }'})
  });
  it('Updates a user style', async () => {
     const response = await request(server)
     .post('/')
     .send({ query: 'mutation { styleUpdate(style: \"Elliot is a brony\") { name id style } }'})
     .expect(200)
     console.log(response.body.data)
     expect(response.body.data.styleUpdate.name).toEqual('The User')
     expect(response.body.data.styleUpdate.id).toEqual(2)
     expect(response.body.data.styleUpdate.style).toEqual('Elliot is a brony')
   })
})
