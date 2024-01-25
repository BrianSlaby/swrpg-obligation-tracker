import { useState } from "react"

export default function AddObligation({ character, editCharacter }) {
    const [ obligationName, setObligationName ] = useState("")
    const [ obligationValue, setObligationValue ] = useState("")


    function handleObligationName(event) {
        setObligationName(event.target.value)
    }
    
    function handleObligationValue(event) {
        setObligationValue(event.target.value)
    }

    function handleObligationSubmit(event) {
        event.preventDefault()

        if (obligationName && obligationValue) {
            const newObligationNum = Object.keys(character).length
            const newKeyName = `obligation${newObligationNum}`
            const newCharacterObj = {
                ...character,
                [newKeyName]: {
                    name: obligationName,
                    value: obligationValue
                }
            }
            editCharacter(newCharacterObj)
            setObligationName("")
            setObligationValue("")
        }
    }

    return (
        <form className="container-flex">
            <input 
                className="text-input"
                type="text"
                placeholder="New Obligation"
                value={obligationName}
                onChange={handleObligationName}
            />
            <input 
                className="num-input text-input"
                type="number"
                placeholder="value"
                value={obligationValue}
                onChange={handleObligationValue}
            />
            <button
                className="btn"
                onClick={handleObligationSubmit}
            >Add Obligation</button>
        </form>
    )
}