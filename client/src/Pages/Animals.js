import React, { useState } from 'react'
import gql from 'graphql-tag'
import AnimalBox from '../components/AnimalBox'
import NewAnimal from '../components/NewAnimal'
import { useQuery, useMutation } from '@apollo/react-hooks'
import Loader from '../components/Loader'

// Details
const ANIMAL_DETAILS = gql`
    fragment AnimalDetails on Animal {
        id
        type
        name
        img
        vacinated @client
    }
`
// Queries
const GET_ANIMALS = gql`
    query animalsList($input: AnimalsInput) {
        animals(input: $input) {
            ...AnimalDetails
        }
    }
    ${ANIMAL_DETAILS}
`
//Create Animal
const CREATE_ANIMAL = gql`
    mutation CreateAnimal($input: NewAnimalInput!) {
        addAnimal(input: $input) {
            ...AnimalDetails
        }
    }
    ${ANIMAL_DETAILS}
`

export default function Animals() {
    const [modal, setModal] = useState(false)
    const animals = useQuery(GET_ANIMALS)

    const [createAnimal, newAnimal] = useMutation(CREATE_ANIMAL, {
        update(cache, { data: { addAnimal } }) {
            const { animals } = cache.readQuery({ query: GET_ANIMALS })

            cache.writeQuery({
                query: GET_ANIMALS,
                data: { animals: [addAnimal, ...animals] },
            })
        },
    })

    if (animals.loading) return <Loader />
    if (animals.error || newAnimal.error) return <p>Oooopsie, Error.</p>

    const onSubmit = (input) => {
        setModal(false)
        createAnimal({
            variables: { input },

            optimisticResponse: {
                __typename: 'Mutation',
                addAnimal: {
                    __typename: 'Animal',
                    id: Math.round(Math.random() * -1000000) + '',
                    type: input.type,
                    name: input.name,
                    img: 'http://placegoat.com/300',
                    lovely: true,
                },
            },
        })
    }

    const animalsList = animals.data.Animals.map((animal) => (
        <div className="col-xs-11 col-md-3 col" key={animal.id}>
            <div className="box">
                <AnimalBox animal={animal} />
            </div>
        </div>
    ))

    if (modal) {
        return (
            <div className="row center-xs">
                <div className="col-xs-7">
                    <NewAnimal
                        onSubmit={onSubmit}
                        onCancel={() => setModal(false)}
                    />
                </div>
            </div>
        )
    }

    return (
        <div className="page animals-page">
            <section>
                <div className="row betwee-xs middle-xs">
                    <div className="col-xs-10">
                        <h1>Animals</h1>
                    </div>

                    <div className="col-xs-2">
                        <button onClick={() => setModal(true)}>
                            new Animal
                        </button>
                    </div>
                </div>
            </section>
            <section>
                <div className="row">{animalsList}</div>
            </section>
        </div>
    )
}
