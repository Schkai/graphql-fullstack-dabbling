const { ApolloServer } = require('apollo-server')
const resolvers = require('./resolvers')
const typeDefs = require('./schema')
const { models, db } = require('./db')

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context() {
        const user = db.get('user').value()
        return { models, db, user }
    },
})

server.listen().then(({ url }) => {
    console.log(`Server listening at ${url}`)
})
