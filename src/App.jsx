import { useState, useEffect } from "react"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Footer from "./components/Footer"

export default function App() {
  const [ userLoggedIn, setUserLoggedIn ] = useState(false)
  const [ user, setUser ] = useState(null)
  

  // add onAuthStateChanged useEffect
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