import { useState } from "react"
import { 
    deleteObligationFromDB, 
    deleteCharacterFromDB 
} from "../firebase/firestore"
import AddObligation from "./forms/AddObligation"
import EditObligation from "./forms/EditObligation"

export default function Character({ character }) {
    const [ areDetailsOpen, setAreDetailsOpen ] = useState(false)

    const characterObligations = Object.entries(character.obligations).filter(entry => {
        return entry[0] !== "name"
    })
    // [[key1, value1], [key2, value2]]

    const toggleIcon = areDetailsOpen ? "up" : "down"

    function toggleCharacterDetails() {
        setAreDetailsOpen(prevState => !prevState)
    }

    function handleDeleteObligation(event) {
        const keyToRemove = event.target.dataset.obligation

        deleteObligationFromDB(keyToRemove, character.id)
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
                <span className="character-name-span">{character.name}</span>
                </button>
                
                <button
                    className="btn delete-btn"
                    onClick={() => deleteCharacterFromDB(character.id)}
                >Delete</button>
            </div>
            
            
            {areDetailsOpen &&
             <AddObligation 
                character={character}
             />
            }

            { areDetailsOpen && characterObligations.length > 0 &&
                characterObligations.map(obligation => {
                    const obligationKey = obligation[0]
                    const name = obligation[1].name
                    const value = obligation[1].value
                    
                    return (
                        <div key={name}>
                            <div className="container-flex">
                                <p>{name}</p>
                                <button
                                    className="btn delete-btn"
                                    data-obligation={obligationKey}
                                    onClick={handleDeleteObligation}
                                >Delete</button>
                            </div>
                        
                        <EditObligation 
                            character={character}
                            obligationKey={obligationKey}
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