const { ApolloServer } = require('apollo-server')
const resolvers = require('./resolvers')
const types = require('./schema')
const { models, db } = require('./db')

const server = new ApolloServer()

server.listen().then(({ url }) => {
    console.log(`Server listening at ${url}`)
})
