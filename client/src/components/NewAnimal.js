import React, { useState } from 'react'
import Select from 'react-select'

const options = [
    { value: 'GOAT', label: 'Goat' },
    { value: 'CAT', label: 'Cat' },
]

export default function NewAnimal({ onSubmit, onCancel }) {
    const [type, setType] = useState('GOAT')
    const [name, setName] = useState('')

    const activeOption = options.find((o) => o.value === type)

    const submit = (e) => {
        e.preventDefault()
        onSubmit({ name, type })
    }

    const cancel = (e) => {
        e.preventDefault()
        onCancel()
    }

    return (
        <div className="new-animal page">
            <h1>New Animal</h1>
            <div className="box">
                <form onSubmit={submit}>
                    <Select
                        value={activeOption}
                        defaultValue={options[0]}
                        onChange={(e) => setType(e.value)}
                        options={options}
                    />

                    <input
                        className="input"
                        type="text"
                        placeholder="animal name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <a className="error button" onClick={cancel}>
                        Cancel
                    </a>
                    <button type="submit" name="submit">
                        Add Animal
                    </button>
                </form>
            </div>
        </div>
    )
}
