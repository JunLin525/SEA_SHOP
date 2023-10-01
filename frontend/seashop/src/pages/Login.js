import React, { useContext } from 'react'

import Header from '../components/Header';
import Footer from '../components/Footer';
import AuthContext from '../context/AuthContext.js';
import { useNavigate } from 'react-router-dom';
import {
    ClerkProvider,
    SignedIn,
    SignedOut,
    UserButton,
    useUser,
    RedirectToSignIn,
} from "@clerk/clerk-react";




const Login = () => {
    // 設定Clerk
    const clerkPubKey = "pk_test_bXV0dWFsLXRvcnRvaXNlLTM0LmNsZXJrLmFjY291bnRzLmRldiQ";
    let buttonCtrl = false

    const handleControl = () => {
        buttonCtrl = !buttonCtrl
    }

    const handleRegister = () => {
        navigate(`/Register/`)

    }

    if (!clerkPubKey) {
        throw new Error("Missing Publishable Key")
    }

    const navigate = useNavigate()



    let { loginUser } = useContext(AuthContext)


    return (
        <div className='landing-background'>

            <Header />
            <div className='white-mock'>
                <div className='page'>
                    <br />
                    <br />
                    <form className='form' onSubmit={loginUser}>
                        <input type="text" name="username" placeholder="Enter Username" />
                        <br />
                        <input type="password" name="password" placeholder="Enter Password" />
                        <button type="submit" className="login-button" >Login</button>
                        <p className='message'>沒有帳號?<a className='footer-text' href='/Register/'>  註冊會員</a></p>
                        <br />

                    </form>

                    <div />

                </div>
                <Footer />
            </div>
        </div>
    )
}

export default Login