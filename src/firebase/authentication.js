import { app } from "./config"

import { 
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
} from "firebase/auth";

const auth = getAuth(app);

function authCreateAccountWithEmail(email, password) {
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user;   
        // do we need the user variable?
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(`${errorCode}: ${errorMessage}`)
    });
}

function authSignInWithEmail(email, password) {
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user;
        // do we need the user variable?
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(`${errorCode}: ${errorMessage}`)
    });
}

function authSignOut() {
    signOut(auth).then(() => {
        // Sign-out successful.
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(`${errorCode}: ${errorMessage}`)
      });
}

export {
    auth,
    authCreateAccountWithEmail,
    authSignInWithEmail,
    authSignOut
}