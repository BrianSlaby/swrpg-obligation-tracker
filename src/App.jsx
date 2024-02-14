import { useState, useEffect } from "react"
import { onAuthStateChanged } from "firebase/auth"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Footer from "./components/Footer"
import { auth } from "./firebase/authentication"

export default function App() {
  const [ userLoggedIn, setUserLoggedIn ] = useState(false)
  const [ user, setUser ] = useState(null)
  

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid;
        // user.email
        // user.displayName
        setUser(user)
        setUserLoggedIn(true)
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


  // add querySnapshot useEffect


  return (
    <div className="app-container">
      <header>
        <h1>Star Wars: Edge of the Empire Obligation Tracker</h1>
      </header>

      {
        userLoggedIn ? 
        <Home /> :
        <Login />
      }
      
      <Footer />
    </div>
  )
}