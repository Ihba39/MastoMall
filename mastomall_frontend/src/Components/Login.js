import { useRef, useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from "./context/AuthProvider";
import Logo from '../Components/Assets/Mastadon.png';
import './ProductForm';

import './Login.css';

const axios = require('axios');

const LOGIN_URL = '/auth';

const Login = () => {
    const { setAuth } = useContext(AuthContext);
    const userRef = useRef();
    const errRef = useRef();
    const navigate = useNavigate();

    const [email, setEmail] = useState('user@example.com');
    const [password, setPassword] = useState('Passw0rd!');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);
    const [button, setButton] = useState("Back")

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setErrMsg('');
    }, [email, password]);

    useEffect(() => {
        const token = localStorage.getItem('authToken');

        const fetchUserProfileIfTokenExists = async () => {
            if (token) {
                try {
                    const config = {
                        method: 'get',
                        url: 'https://mastomall-backend.vercel.app/auth/profile',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        },
                    };

                    const response = await axios.request(config);
                    const userEmail = response.data.email;
                    setEmail(userEmail);

                    // Navigate to the success page
                    setSuccess(true);
                    setButton("LogOut")

                    // You can store the profile data in state or context if needed
                } catch (error) {
                    console.error(error);
                }
            }
        };

        fetchUserProfileIfTokenExists();
    }, []);

    const handleLoginSignupClick = () => {
        localStorage.removeItem('authToken');
        navigate('/Home');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const userData = {
                email: email,
                password: password,
            };
    
            const response = await axios.post('https://mastomall-backend.vercel.app/auth/login', userData);
    
            // Assuming your response contains a token
            const token = response.data.token;
    
            // Save the token to local storage
            localStorage.setItem('authToken', token);
    
            // Navigate to the success page
            setSuccess(true);
            setButton("LogOut")
    
        } catch (error) {
            console.error(error.message);
            setErrMsg("An error occurred during sign-up. Please try again.");
        }
    };

    return (
        <>
            <div>
                <nav style={{ marginBottom: '-200px' }}>
                    <div className="nav-logo-container">
                        <img src={Logo} alt="" className="nav-logo" />
                    </div>
                    <div className="nav-text-section">
                        <h1 className="nav-primary-heading">Mastodon Mall</h1>
                    </div>
                    <div className="navbar-links-container">
                        <button className="back-primary-button" onClick={handleLoginSignupClick}>
                            {button}
                        </button>
                    </div>
                </nav>
            </div>
            <div className="container" style={{ marginTop: '-50px' }}>
                {success ? (
                <section className="login-section">
                    <h1 className="login-title">Success!</h1>
                    <p>You have successfully logged in.</p>
                    <p>Your email: {email}</p>
                    <div className="button-container">
                        <a href="/buy-page" className="back-primary-button">
                            Buy
                        </a>
                        <a href="/sell-page" className="back-primary-button">
                            Sell
                        </a>
                    </div>
                </section>
            ) : (
                    <section className="login-section">
                        <p ref={errRef} className={`error-message ${errMsg ? "show" : "hide"}`} aria-live="assertive">{errMsg}</p>
                        <h1 className="login-title">Sign In</h1>
                        <form onSubmit={handleSubmit} className="login-form">
                            <div className="input-group">
                                <label htmlFor="email" className="input-label">Email:</label>
                                <input
                                    type="text"
                                    id="email"
                                    className="input-field"
                                    ref={userRef}
                                    autoComplete="off"
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                    required
                                />
                            </div>

                            <div className="input-group">
                                <label htmlFor="password" className="input-label">Password:</label>
                                <input
                                    type="password"
                                    id="password"
                                    className="input-field"
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                    required
                                />
                            </div>
                            <button className="login-button">Sign In</button>
                        </form>
                        <p className="account-query">
                            Need an Account?<br />
                            <span className="line">
                                <Link to="/Signup" className="signup-link">Sign Up</Link>
                            </span>
                        </p>
                    </section>
                )}
            </div>
        </>
    );
};

export default Login;
