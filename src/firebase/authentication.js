import { app } from "./config"

import { 
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
} from "firebase/auth";

const auth = getAuth(app);

async function authCreateAccountWithEmail(email, password) {
    try {
        await createUserWithEmailAndPassword(auth, email, password)
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(`${errorCode}: ${errorMessage}`)
        throw error
    }
}

async function authSignInWithEmail(email, password) {
    try {
        await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(`${errorCode}: ${errorMessage}`)
        throw error
    }
}

async function authSignOut() {
    try {
        await signOut(auth)
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(`${errorCode}: ${errorMessage}`)
        throw error
    }
}

export {
    auth,
    authCreateAccountWithEmail,
    authSignInWithEmail,
    authSignOut
}