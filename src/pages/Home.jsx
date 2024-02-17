import { useState } from "react"
import { authSignOut } from "../firebase/authentication"
import AddCharacter from "../components/forms/AddCharacter"
import Character from "../components/Character"
import ObligationChart from "../components/ObligationChart"

export default function Home({ characters, user }) {
    const [ isCharListOpen, setIsCharListOpen ] = useState(false)

    const toggleIcon = isCharListOpen ? "up" : "down"

    function toggleCharacterView() {
        setIsCharListOpen(prevState => !prevState)
    }

    return (
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
              user={user}
            />

            <div className="character-list-container">
              { characters.length < 1 &&
                <p>Add Player Characters</p>

              }
              { characters && 
                characters.map(character => <Character 
                                              character={character}
                                              key={character.name}
                                            />)
              }
            </div>

          </div>
          }
        </div>
        
        <ObligationChart 
          characters={characters}
        />

        <button
            id="sign-out-btn"
            className="btn secondary-btn"
            onClick={authSignOut}
        >Sign Out</button>

      </main>
    )
}