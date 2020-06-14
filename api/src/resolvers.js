module.exports = {
    Query: {
        animals(_, { input }, { models }) {
            return models.Animal.findMany(input || {})
        },
        animal(_, { id }, { models }) {
            return models.Animal.findOne({ id })
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
            return animal.type === 'GOAT'
                ? 'https://placedog.net/300/300'
                : 'http://placekitten.com/300/300'
        },
    },
    User: {
        animals(user, _, { models }) {
            return models.Animal.findMany({ user: user.id })
        },
    },
}
