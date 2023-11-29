const { gql } = require('apollo-server-express');

const typeDefs = gql`
type Book {
    id: ID!
    title: String!
    author: String!
    description: String
    image: String
    link: String
  }
  
  type User {
    id: ID!
    username: String!
    email: String!
    savedBooks: [Book]
  }
  
  type Query {
    userSavedBooks(userId: ID!): [Book]
  }
  
  type Mutation {
    addBookToSaved(userId: ID!, bookDetails: BookInput!): User
    removeBookFromSaved(userId: ID!, bookId: ID!): User
  }

  input BookInput {
    authors: [String]
    description: String
    bookId: ID!
    image: String
    link: String
    title: String
  }
`;

module.exports = typeDefs;