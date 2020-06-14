const { gql } = require('apollo-server')

const typeDefs = gql`
    enum AnimalType {
        CAT
        DOG
    }
    type User {
        id: ID!
        username: String!
        animals: [Animal]!
    }
    type Animal {
        id: ID!
        type: AnimalType!
        name: String!
        owner: User!
        img: String!
        createdAt: Int!
    }
    input NewAnimalInput {
        name: String!
        type: AnimalType!
    }
    input AnimalsInput {
        type: AnimalType
    }
    type Query {
        user: User!
        animals(input: AnimalsInput): [Animal]!
        animal(id: ID!): Animal!
    }
    type Mutation {
        addAnimal(input: NewAnimalInput!): Animal!
    }
`

module.exports = typeDefs
