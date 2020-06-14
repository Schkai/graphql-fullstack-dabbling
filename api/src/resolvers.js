// Resolvers for Schemas. Must match type definitions

module.exports = {
    Query: {
        animals(_, { input }, { models }) {
            return models.Animal.findMany(input || {})
        },
        animal(_, { id }, { models }) {
            return models.animal.findOne({ id })
        },
        user(_, __, { models }) {
            return models.User.findOne()
        },
    },
    Mutation: {
        addAnimal(_, { input }, { models, user }) {
            const animal = models.Animal.create({ ...input, user: user.id })
            return animal
        },
    },
    Animal: {
        owner(animal, _, { models }) {
            return models.User.findOne({ id: animal.user })
        },
        img(animal) {
            return animal.type === 'Goat'
                ? 'https://placegoat.net/350/350'
                : 'http://placekitten.com/350/350'
        },
    },
    User: {
        animal(user, _, { models }) {
            return models.animal.findMany({ user: user.id })
        },
    },
}
