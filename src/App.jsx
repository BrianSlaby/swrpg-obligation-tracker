import { useState, useEffect } from "react"
import { onAuthStateChanged } from "firebase/auth"
import {  
  doc,
  collection,
  query,
  where,
  onSnapshot
} from "firebase/firestore"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Footer from "./components/Footer"
import { auth } from "./firebase/authentication"
import { db } from "./firebase/firestore"

export default function App() {
  const [ userLoggedIn, setUserLoggedIn ] = useState(false)
  const [ user, setUser ] = useState(null)
  const [ characters, setCharacters ] = useState([])

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid;
        // user.email
        // user.displayName
        setUser(user)
        setUserLoggedIn(true)

        // already have the async above
        // CODE FROM SHOPPING HELPER
        // const listsData = await fetchLists(user)
        // setLists(listsData)

      } else {
        setUserLoggedIn(false)
        setUser(null)
        // setLists([])
      }
    });
    return () => unsubscribe();
  }, [])

  useEffect(() => {
    if (user) {
      const q = query(collection(db, "characters"), where("uid", "==", user.uid));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const characterData = []
        querySnapshot.forEach((doc) => {
          const data = doc.data()
          const id = doc.id
          //const sortedItems = sortItems(data.items)

          characterData.push({ ...data, id })
        });
        setCharacters(characterData)
      },
      (error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(`${errorCode}: ${errorMessage}`)
      });
      return () => unsubscribe()
    }
  }, [user])

  return (
    <div className="app-container">
      <header>
        <h1>Star Wars: Edge of the Empire Obligation Tracker</h1>
      </header>

      {
        userLoggedIn ? 
        <Home 
          characters={characters}
          setCharacters={setCharacters}
          user={user}
        /> :
        <Login />
      }
      
      <Footer />
    </div>
  )
}


 /*   
    OLD DATA STRUCTURE

    characters = [
      {
        name: "Dafro Jenkins",
        obligation1: { name: "criminal", value: "10" },
        obligation2: { name: "public figure", value: "5" }
      }, 
      {
        name: "Slam Bash",
        obligation1: { name: "No head", value: "56" }
      }
    ]

    anywhere in old code with character.obligation1 would now be character.obligations.obligation1

 */