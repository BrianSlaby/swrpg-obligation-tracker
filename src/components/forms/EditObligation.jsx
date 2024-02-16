import { useState } from "react"
import { updateObligationValueInDB } from "../../firebase/firestore"

export default function EditObligation({ 
    character, 
    editCharacter, 
    obligationKey, 
    name,
    value 
    }) {
    const [newObligationValue, setNewObligationValue] = useState("")

    function handleNewObligationValue(event) {
        setNewObligationValue(event.target.value)
    }

    function handleObligationUpdate(event) {
        event.preventDefault()

        if (newObligationValue) {

            updateObligationValueInDB(obligationKey, newObligationValue, character.id)

            // const newCharacterObj = {
            //     ...character,
            //     [obligationKey]: {
            //         name: name,
            //         value: newObligationValue
            //     }
            // }
            // editCharacter(newCharacterObj)
            setNewObligationValue("")
        }
    }

    return (
        <form className="container-flex indent">
            <span className="lighter-text">{`value: ${value}`}</span>
            <input 
                className="num-input text-input"
                type="number"
                placeholder="new value"
                value={newObligationValue}
                onChange={handleNewObligationValue}
            />

            <button
                className="btn secondary-btn"
                onClick={handleObligationUpdate}
            >Update Obligation</button>
        </form>
    )
}