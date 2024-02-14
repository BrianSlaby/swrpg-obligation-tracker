import { useState } from "react"
import { authSignInWithEmail } from "../firebase/authentication"
import CreateAccountModal from "../components/forms/CreateAccountModal"

export default function Login() {
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ isModalOpen, setIsModalOpen ] = useState(false)

    function handleEmailChange(event) {
        setEmail(event.target.value)
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value)
    }

    function handleSignInWithEmail(event) {
        event.preventDefault()
        authSignInWithEmail(email, password)
        setEmail("")
        setPassword("")
    }

    function handleOpenAccountModal() {
        setIsModalOpen(true)
    }

    function handleCloseAccountModal() {
        setIsModalOpen(false)
    }

    return (
        <div className="login-container">
            <form className="auth-form">
                <input 
                    className="text-input" 
                    id="email-input" 
                    type="email" 
                    placeholder="Email" 
                    value={email} 
                    onChange={handleEmailChange} 
                />

                <input 
                    className="text-input" 
                    id="password-input" 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={handlePasswordChange} 
                />

                <button 
                    id="sign-in-btn" 
                    className="btn primary-btn"
                    onClick={handleSignInWithEmail}
                >Sign In</button>
            </form>

            <button
                id="open-account-modal-btn"
                className="btn secondary-btn"
                onClick={handleOpenAccountModal}
            >Create Account</button>

            <CreateAccountModal 
                isOpen={isModalOpen}
                closeModal={handleCloseAccountModal}
            />
        </div>
    )
}