// Imports
import { GraphQLString, GraphQLInt } from 'graphql'

// App Imports
import { UserType } from './types'
import { create, remove } from './resolvers'

// Create
// This is the JSON to be returned from the POST method
export const userSignup = {
  type: UserType,
  args: {
    name: {
      name: 'name',
      type: GraphQLString
    },

    email: {
      name: 'email',
      type: GraphQLString
    },

    password: {
      name: 'password',
      type: GraphQLString
    }
  },
  // This links to the resolvers create method
  resolve: create
}

// Looks like we will need an Update method here to add style in

// Remove
// This is the JSON to be returned from the DELETE method
export const userRemove = {
  type: UserType,
  args: {
    id: {
      name: 'id',
      type: GraphQLInt
    }
  },
  // This links to the resolvers delete method
  resolve: remove
}

// This file shows what the POST, PUT, PATCH and DELETE requests will return
// This shows the JSON format to be returned
// These methods link to the resolvers file (based on final line of each)
