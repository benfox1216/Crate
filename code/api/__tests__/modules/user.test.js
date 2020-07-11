import request from 'supertest';
import express from 'express';
import graphqlHTTP from 'express-graphql';
import schema from '../../src/setup/schema';
import models from '../../src/setup/models';

describe("User queries", () => {
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
      .expect(200)

    token = response.body.data.userLogin.token
  });

  // it('Updates a user style', async () => {
  //   let user = await models.User.findOne({ where: { email: "user@crate.com" } })
  //   const userDetails = user.get()
  //   // console.log(userDetails)
  //
  //
  //   const response = await request(server)
  //     .post('/')
  //     .set('Accept', 'application/json')
  //     .send({ query: `mutation { styleUpdate(style: \"Vintage\", auth: { user: ${userDetails} }) { name } }` })
  //     // .expect(200)
  //   console.log(response.body.data)
  //
  //   // expect(response.body.data.styleUpdate.name).toEqual('The User');
  //   // expect(response.body.data.styleUpdate.id).toEqual(2);
  // });

  it('Gets all users', async () => {
    const response = await request(server)
    .get('/')
    .send({ query: 'query { users{ name } }' })
    .expect(200)

    expect(response.body.data.users[0]).toEqual({ name: "The Admin" })
    expect(response.body.data.users[1]).toEqual({ name: "The User" })
  });

  it('Gets user by ID', async () => {
    const response = await request(server)
    .get('/')
    .send({ query: 'query { user(id: 1) { name } }' })
    .expect(200)

    expect(response.body.data.user).toEqual({ name: "The Admin" })
  });

  it('Logs a user in', async () => {
    const response = await request(server)
      .get('/')
      .send({ query: 'query { userLogin(email: \"user@crate.com\", password: \"123456\") { token } }' })
      .expect(200)

    expect(response.body.data.userLogin.token).toEqual(expect.anything())
  });
})
