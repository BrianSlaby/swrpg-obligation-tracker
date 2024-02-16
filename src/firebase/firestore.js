import { app } from "./config"

import { 
    getFirestore,
    doc,
    addDoc,
    updateDoc,
    collection, 
    query, 
    where,
    getDoc, 
    getDocs,
    deleteDoc
} from "firebase/firestore"

const db = getFirestore(app)

 // Right now the functions are directly setting the characters state,
 // and a useEffect saves to localStorage whenever characters changes.

 // Firebase needs to be source of truth, with snapshot listener
 // updating state when firebase changes.


async function addNewCharacterToDB(newCharacterName, user) {
    const docRef = await addDoc(collection(db, "characters"), {
        name: newCharacterName,
        uid: user.uid,
        obligations: {}
      });
}

async function addNewObligationToDB(
        newObligationObj, 
        newObligationName, 
        characterId
    ) {
    const characterRef = doc(db, "characters", characterId);
    await updateDoc(characterRef, {
        [`obligations.${newObligationName}`]: newObligationObj
    });
}

async function updateObligationValueInDB(
    updatedObligation, 
    updatedValue, 
    characterId
) {
    const characterRef = doc(db, "characters", characterId);
    await updateDoc(characterRef, {
        [`obligations.${updatedObligation}.value`]: updatedValue
    });
}


// delete obligation

// delete character

// fetch characters
    // need to fetch characters in onAuthStateChanged, then setCharacters

export {
    db,
    addNewCharacterToDB,
    addNewObligationToDB,
    updateObligationValueInDB
}