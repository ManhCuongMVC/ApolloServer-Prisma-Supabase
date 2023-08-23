export const productGraphql = `#graphql
  type Product {
    id: Int
    name: String
    desc: String
  }

  input ProductCreateInput {
    name: String!
    desc: String
  }

  type Query {
    products: [Product]
  }

  type Mutation {
    createProduct(input: ProductCreateInput!): Product
  }
`;