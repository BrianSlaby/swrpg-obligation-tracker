import { useState, useRef, useEffect } from "react"
import { authCreateAccountWithEmail } from "../../firebase/authentication"

export default function CreateAccountModal({ isOpen, closeModal }) {
    const [ isModalOpen, setIsModalOpen ] = useState(isOpen)
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ confirmPassword, setConfirmPassword ] = useState("")
    const [ passwordWarning, setPasswordWarning ] = useState(false)
    const [ errorMessage, setErrorMessage ] = useState("")

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

    async function handleCreateAccountWithEmail(event) {
        event.preventDefault()
        if (password === confirmPassword) {
            try {
                await authCreateAccountWithEmail(email, password)
                setErrorMessage("")
                setEmail("")
                setPassword("")
                setConfirmPassword("")
            } catch (error) {
                setErrorMessage(error.message)
            }
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
        <div className="modal-inner">

            <h2>Create Account</h2>

            <form className="auth-form">
                <input 
                    className="text-input auth-input" 
                    id="email-input" 
                    type="email" 
                    placeholder="Email" 
                    value={email} 
                    onChange={handleEmailChange} 
                    />

                <input 
                    className="text-input auth-input" 
                    id="password-input" 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={handlePasswordChange} 
                    />

                <input 
                    className="text-input auth-input" 
                    id="confirm-password-input" 
                    type="password" 
                    placeholder="Confirm Password" 
                    value={confirmPassword} 
                    onChange={handleConfirmPasswordChange} 
                    />

                { passwordWarning && 
                <p className="error-text">
                Both password fields must match!</p>}

                { errorMessage && 
                <p className="error-text"> {errorMessage} </p>}

                <button 
                    id="create-acct-btn" 
                    className="btn primary-btn auth-btn" 
                    onClick={handleCreateAccountWithEmail}
                    >Create Account</button>
            </form>
            
            <button
                className="btn secondary-btn auth-btn"
                onClick={handleCloseModal}
                >Close</button>
    
        </div>
        </dialog>
    )
}