import { useState } from "react"

export default function AddCharacter({ saveCharacter }) {
    const [ inputValue, setInputValue ] = useState("")

    function handleInputValue(event) {
        setInputValue(event.target.value)
    }

    function handleNameSubmit(event) {
        event.preventDefault()

        if (inputValue) {
            saveCharacter(inputValue)
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
                className="btn"
                onClick={handleNameSubmit}
            >Add Character</button>
        </form>
    )
}