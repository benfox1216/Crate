import request from 'supertest';
import express from 'express';
import graphqlHTTP from 'express-graphql';
import schema from '../../src/setup/schema';
import models from '../../src/setup/models';
import authentication from '../../src/setup/authentication'



describe("User queries", () => {
  let server = express();
  let token = ""
  beforeAll(async () => {
    server.use(authentication)
    // API (GraphQL on route `/`)
    server.use('/', graphqlHTTP(request => ({
      schema,
      graphiql: false,
      context: {
        auth: {
          user: request.user,
          isAuthenticated: request.user && request.user.id > 0
        }
      }
    })));

    const loginResponse = await request(server)
      .get('/')
      .send({ query: 'query { userLogin(email: \"user@crate.com\", password: \"123456\") { token } }' })
      .expect(200)

    token = 'Bearer ' + loginResponse.body.data.userLogin.token
  });

  it('Updates a user style', async () => {
    const fakeStyle = `${(new Date()).getYear()}:${(new Date()).getSeconds()}`

    const response = await request(server)
      .post('/')
      .set('Authorization', token)
      .send({ query: `mutation{ styleUpdate(style: \"${fakeStyle}\") { name id style }}` })
      .expect(200)

    let user = await models.User.findOne({ where: { email: "user@crate.com" } })
    const userDetails = user.get()

    expect(response.body.data.styleUpdate.name).toEqual(userDetails.name);
    expect(response.body.data.styleUpdate.style).toEqual(userDetails.style);
  });

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
