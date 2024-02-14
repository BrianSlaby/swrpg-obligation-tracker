import { initializeApp } from "firebase/app"

const firebaseConfig = {
  apiKey: "AIzaSyAwtqrxQnojDT75dRwAtAmNRwzRwXepnR8",
  authDomain: "swrpg-obligation-tracker.firebaseapp.com",
  projectId: "swrpg-obligation-tracker",
  storageBucket: "swrpg-obligation-tracker.appspot.com",
  messagingSenderId: "545233228570",
  appId: "1:545233228570:web:3ccd5d54550e27686192a3"
}

const app = initializeApp(firebaseConfig)

export { app }
