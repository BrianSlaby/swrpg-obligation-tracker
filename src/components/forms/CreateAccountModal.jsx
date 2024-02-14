import { useState, useRef, useEffect } from "react"
import { authCreateAccountWithEmail } from "../../firebase/authentication"

export default function CreateAccountModal({ isOpen, closeModal }) {
    const [ isModalOpen, setIsModalOpen ] = useState(isOpen)
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ confirmPassword, setConfirmPassword ] = useState("")
    const [ passwordWarning, setPasswordWarning ] = useState(false)

    const modalRef = useRef(null)

    function handleCloseModal() {
        if (closeModal) {
            closeModal()
        }
        setIsModalOpen(false)
    }

    function handleKeydown(event) {
        if (event.key === "Escape") {
            handleCloseModal()
        }
    }

    function handleEmailChange(event) {
        setEmail(event.target.value)
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value)
    }

    function handleConfirmPasswordChange(event) {
        setConfirmPassword(event.target.value)
    }

    function handleCreateAccountWithEmail(event) {
        event.preventDefault()

        if (password === confirmPassword) {
            authCreateAccountWithEmail(email, password)
            setEmail("")
            setPassword("")
            setConfirmPassword("")
        } else {
            setPasswordWarning(true)
        }
    }

    useEffect(() => {
        setIsModalOpen(isOpen)
    }, [isOpen])
    
    useEffect(() => {
        const modalEl = modalRef.current
        
        if (modalEl) {
            if (isModalOpen) {
                modalEl.showModal()
            } else {
                modalEl.close()
            }
        }
    }, [isModalOpen])

    useEffect(() => {
        if (password === confirmPassword) {
            setPasswordWarning(false)
        }
    }, [confirmPassword])

    return (
        <dialog 
            className="modal" 
            onKeyDown={handleKeydown}
            ref={modalRef}
        >

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

                <input 
                    className="text-input" 
                    id="confirm-password-input" 
                    type="password" 
                    placeholder="Confirm Password" 
                    value={confirmPassword} 
                    onChange={handleConfirmPasswordChange} 
                />

                { passwordWarning && 
                <p className="password-warning">
                Both password fields must match!</p>}

                <button 
                    id="create-acct-btn" 
                    className="btn primary-btn" 
                    onClick={handleCreateAccountWithEmail}
                >Create Account</button>
            </form>
            
            <button
                className="btn secondary-btn"
                onClick={handleCloseModal}
            >Close</button>
    
        </dialog>
    )
}