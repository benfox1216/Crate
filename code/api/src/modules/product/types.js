// Imports methods from the 'graphql' file
// Imports
import { GraphQLObjectType, GraphQLString, GraphQLInt } from 'graphql'

// Defines the GraphQL object as a product
// Product type
const ProductType = new GraphQLObjectType({
  name: 'product',
  description: 'Product Type',

  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    slug: { type: GraphQLString },
    type: { type: GraphQLInt },
    gender: { type: GraphQLInt },
    description: { type: GraphQLString },
    image: { type: GraphQLString },
    // Feature: Add style attribute
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString }
  })
})

// Defines the GraphQL object type as the gender of a product
// User Gender type
const ProductTypesType = new GraphQLObjectType({
  name: 'productTypesType',
  description: 'User Types Type',

  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString }
  })
})

// Allows these constants to be imported by other files
export { ProductType, ProductTypesType }
