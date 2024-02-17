import { app } from "./config"

import { 
    getFirestore,
    doc,
    addDoc,
    updateDoc,
    collection, 
    deleteField,
    query, 
    where,
    getDoc, 
    getDocs,
    deleteDoc
} from "firebase/firestore"

const db = getFirestore(app)

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

async function deleteObligationFromDB(deletedObligation, characterId) {
    const characterRef = doc(db, "characters", characterId);
    await updateDoc(characterRef, {
        [`obligations.${deletedObligation}`]: deleteField()
    });
}

async function deleteCharacterFromDB(characterId) {
    await deleteDoc(doc(db, "characters", characterId));
}

async function fetchCharacters(user) {
    const q = query(collection(db, "characters"), where("uid", "==", user.uid));
    const querySnapshot = await getDocs(q);
    const charactersArray = []
    querySnapshot.forEach((doc) => {
        const data = doc.data()
        const id = doc.id
        
        charactersArray.push({ ...data, id })
    });
    return charactersArray
}

export {
    db,
    addNewCharacterToDB,
    addNewObligationToDB,
    updateObligationValueInDB,
    deleteObligationFromDB,
    deleteCharacterFromDB,
    fetchCharacters
}