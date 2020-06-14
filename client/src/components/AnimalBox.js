import React from 'react'

const AnimalBox = ({ animal }) => (
    <div className="animal">
        <figure>
            <img src={animal.img + `?animal=${animal.id}`} alt="" />
        </figure>
        <div className="animal-name">{animal.name}</div>
        <div className="animal-type">{animal.type}</div>
    </div>
)

export default AnimalBox
