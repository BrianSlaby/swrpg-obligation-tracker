import { useState } from "react"
import AddObligation from "./forms/AddObligation"
import EditObligation from "./forms/EditObligation"

export default function Character({ character, editCharacter }) {
    const [ areDetailsOpen, setAreDetailsOpen ] = useState(false)

    const characterObligations = Object.entries(character).filter(entry => {
        return entry[0] !== "name"
    })
    // [[key1, value1], [key2, value2]]

    const toggleIcon = areDetailsOpen ? "up" : "down"

    function toggleCharacterDetails() {
        setAreDetailsOpen(prevState => !prevState)
    }

    return (
        <div>
            <div className="container-flex">
                <button
                    className="toggle-view-btn"
                    onClick={toggleCharacterDetails}
                >
                <img 
                    src={`/icons/angle-${toggleIcon}-solid.svg`}
                    alt=""
                />
                </button>
                <h3>{character.name}</h3>
            </div>
            
            
            {areDetailsOpen &&
             <AddObligation 
                character={character}
                editCharacter={editCharacter}
             />
            }

            { areDetailsOpen && characterObligations.length > 0 &&
                characterObligations.map(obligation => {
                    const obligationKey = obligation[0]
                    const name = obligation[1].name
                    const value = obligation[1].value
                    
                    return (
                        <div key={name}>
                        <p>{name}</p>
                        <EditObligation 
                            character={character}
                            editCharacter={editCharacter}
                            obligationKey={obligationKey}
                            name={name}
                            value={value}
                            />
                    </div>
                )
            })
        }

    
            <hr></hr>
        </div>
    )
}