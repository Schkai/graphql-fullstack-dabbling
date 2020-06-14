const nanoid = require('nanoid')

const createAnimalModel = (db) => {
    return {
        findMany(filter) {
            return db.get('animal').filter(filter).value()
        },

        findOne(filter) {
            return db.get('animal').find(filter).value()
        },

        create(animal) {
            const newAnimal = { id: nanoid(), createdAt: Date.now(), ...animal }

            db.get('animal').push(newAnimal).write()

            return newAnimal
        },
    }
}

module.exports = createAnimalModel
