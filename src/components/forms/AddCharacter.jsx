import { useState } from "react"
import { addNewCharacterToDB } from "../../firebase/firestore"

export default function AddCharacter({ user }) {
    const [ inputValue, setInputValue ] = useState("")

    function handleInputValue(event) {
        setInputValue(event.target.value)
    }

    function handleNameSubmit(event) {
        event.preventDefault()

        if (inputValue) {
            // saveCharacter(inputValue)
            addNewCharacterToDB(inputValue, user)
            setInputValue("")
        }
    }

    return (
        <form className="container-flex">
            <input 
                id="character-name-input"
                className="text-input"
                type="text"
                placeholder="New Player Character Name"
                value={inputValue}
                onChange={handleInputValue}
            />
            <button
                id="character-name-submit-btn"
                className="btn primary-btn"
                onClick={handleNameSubmit}
            >Add Character</button>
        </form>
    )
}