import gql from "graphql-tag";

export const commonApiExtensions = gql`
  type Example implements Node {
    id: ID!
    createdAt: DateTime!
    updatedAt: DateTime!
    name: String!
    precio_dolar: Float!
  }

  type ExampleList implements PaginatedList {
    items: [Example!]!
    totalItems: Int!
  }

  extend type Query {
    examples(options: ExampleListOptions): ExampleList!
    example(id: ID!): Example
  }

  # Auto-generated at runtime
  input ExampleListOptions
`;

export const shopApiExtensions = gql`
  ${commonApiExtensions}
`;

export const adminApiExtensions = gql`
  ${commonApiExtensions}

  extend type Mutation {
    createExample(input: CreateExampleInput!): Example!
    updateExample(input: UpdateExampleInput!): Example!
  }

  input CreateExampleInput {
    name: String!
    precio_dolar: Float!
  }

  input UpdateExampleInput {
    id: ID!
    name: String!
    precio_dolar: Float!
  }
`;
