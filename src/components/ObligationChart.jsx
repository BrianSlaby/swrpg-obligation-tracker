import { useState, useEffect } from "react"

export default function ObligationChart({ characters }) {
    const [ charOblRanges, setCharOblRanges ] = useState(calculateObligationRanges(characters))

    function calculateObligationRanges(characters) {
        if (characters.length > 0) {
            let currentEndValue = 0

            const charactersArray = [...characters]
            const newArray = charactersArray.map(character => {
                const characterObligations = Object.entries(character).filter(entry => entry[0] !== "name")
    
                const updatedObligations = characterObligations.map(obligation => {
                    const keyName = obligation[0]
                    const obligationName = obligation[1].name
                    const obligationValue = obligation[1].value
                    const newStartValue = currentEndValue + 1
                    const newEndValue = currentEndValue + parseInt(obligationValue)
    
                    currentEndValue = newEndValue
    
                    return {
                        [keyName]: {
                            "name": obligationName,
                            "range": `${newStartValue.toString()} - ${newEndValue.toString()}`
                        }
                    }
                }).reduce((resultObj, currentObj) => {
                    const key = Object.keys(currentObj)[0]
                    resultObj[key] = currentObj[key]
    
                    return resultObj
                }, {})
    
                const newCharObj = {
                    "name": character.name,
                    ...updatedObligations
                }
    
                return newCharObj
            })
            return newArray
        } else {
            return []
        }
    }

    useEffect(() => {
        setCharOblRanges(calculateObligationRanges(characters))
    }, [characters])

    return (
        <div className="obligation-table">
            { characters.length < 1 &&
            <p>Add characters and obligations.</p>
            }
            
            { characters.length > 0 &&
            charOblRanges.map(character => {
                const name = character.name
                const obligationArray = Object.entries(character).filter(entry => { return entry[0] !== "name"}) 

                return (
                    <div key={name}>
                        <p className="name-table" >{name}</p>
                        {
                        obligationArray.map(obligation => {
                            const name = obligation[1].name
                            const range = obligation[1].range
                            return (
                                <div key={range}>
                                    <span className="obligation-range">
                                        {`${range}: `}
                                    </span>
                                    <span className="obligation-name">
                                        {name}
                                    </span>
                                </div>
                            )
                        })
                        }
                    </div>
                )
            })
            }
        </div>
    )
}