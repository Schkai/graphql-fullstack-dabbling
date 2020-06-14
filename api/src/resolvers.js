// Resolvers for Schemas. Must match type definitions

module.exports = {
    Query: {},
    Mutation: {},
    Animal: {
        img(pet) {
            return pet.type === 'Goat'
                ? 'https://placegoat.net/350/350'
                : 'http://placekitten.com/350/350'
        },
    },
    User: {},
}
