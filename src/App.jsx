import { useState, useEffect } from "react"
import AddCharacter from "./components/forms/AddCharacter"
import Character from "./components/Character"
import ObligationChart from "./components/ObligationChart"
import Footer from "./components/Footer"

export default function App() {
  const [ isCharListOpen, setIsCharListOpen ] = useState(false)
  const [ characters, setCharacters ] = useState(JSON.parse(localStorage.getItem("characters")) || [])

  const toggleIcon = isCharListOpen ? "up" : "down"

  function toggleCharacterView() {
    setIsCharListOpen(prevState => !prevState)
  }

  function saveCharacterName(name) {
    if (characters.length > 0) {
      setCharacters(prevState => {
        return [ ...prevState, { name } ]
      })
    } else {
      setCharacters([{ name }])
    }
  }

  function editCharacter(currentCharacter) {
    setCharacters(allCharacters => {
      return allCharacters.map(character => {
        if (character.name === currentCharacter.name) {
          return currentCharacter
        } else {
          return character
        }
      })
    })
  }

  function deleteCharacter(deletedCharacter) {
    const updatedCharacters = characters.filter(character => {
      return character.name !== deletedCharacter.name
    })
    setCharacters(updatedCharacters)
  }

  useEffect(() => {
    if (characters.length > 0) {
      localStorage.setItem("characters", JSON.stringify(characters))
    } else if (characters.length === 0) {
      localStorage.setItem("characters", JSON.stringify([]))
    }
  }, [characters])


  return (
    <div className="app-container">
      <header>
        <h1>Star Wars: Edge of the Empire Obligation Tracker</h1>
      </header>

      <main>
        <div className="character-management-container">
          <div className="container-flex">
            <button
              className="toggle-view-btn"
              onClick={toggleCharacterView}
            >
              <img 
                src={`/icons/angle-${toggleIcon}-solid.svg`}
                alt=""
              />

              <span 
                className="manage-characters-span"
              >Manage Player Characters</span>
            </button>
          </div>

          {isCharListOpen &&
          <div className="character-edit-container">
            <AddCharacter 
              saveCharacter={saveCharacterName}
            />

            <div className="character-list-container">
              { characters.length < 1 &&
                <p>Add Player Characters</p>

              }
              { characters && 
                characters.map(character => <Character 
                                              character={character}
                                              key={character.name}
                                              editCharacter={editCharacter}
                                              deleteCharacter={deleteCharacter}
                                            />)
              }
            </div>

          </div>
          }
        </div>
        
        <ObligationChart 
          characters={characters}
        />

      </main>
      <Footer />
    </div>
  )
}