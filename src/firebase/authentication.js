import { app } from "./config"

import { 
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
} from "firebase/auth";

const auth = getAuth(app);

// function authCreateAccountWithEmail(email, password) {
//     return createUserWithEmailAndPassword(auth, email, password)
//     .then((userCredential) => {
//         const user = userCredential.user;   
//         // do we need the user variable?
//     })
//     .catch((error) => {
//         const errorCode = error.code;
//         const errorMessage = error.message;
//         console.error(`${errorCode}: ${errorMessage}`)
//         throw error
//     });
// }

async function authCreateAccountWithEmail(email, password) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        
        const user = userCredential.user
        return user
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(`${errorCode}: ${errorMessage}`)
        throw error
    }
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