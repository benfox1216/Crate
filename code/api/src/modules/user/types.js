// Imports methods from the 'graphql' file
// Imports
import { GraphQLObjectType, GraphQLString, GraphQLInt } from 'graphql'

// Defines the GraphQL object type as a user
// User type
const UserType = new GraphQLObjectType({
  name: 'user',
  description: 'User type',

  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    role: { type: GraphQLString },
    // Feature: Add style attribute
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString }
  })
})

// Defines the GraphQL object type as Login
// User Login type
const UserLoginType = new GraphQLObjectType({
  name: 'userAuth',
  description: 'User Authentication Type',

  fields: () => ({
    user: { type: UserType },
    token: { type: GraphQLString }
  })
})

// Defines the GraphQL object type as a user's gender
// User Gender type
const UserGenderType = new GraphQLObjectType({
  name: 'userGender',
  description: 'User Gender Type',

  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString }
  })
})

// Allows these constants to be imported by other files
export { UserType, UserLoginType, UserGenderType }
