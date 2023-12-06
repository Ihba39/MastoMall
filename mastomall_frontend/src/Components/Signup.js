import { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../Components/Assets/Mastadon.png';
const axios = require('axios');



const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Example email regex

const Signup = () => {
    const userRef = useRef();
    const emailRef = useRef();
    const pwdRef = useRef();
    const matchPwdRef = useRef();
    const errRef = useRef();
    const navigate = useNavigate();

    const [user, setUser] = useState('user123');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [email, setEmail] = useState('user@example.com');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [pwd, setPwd] = useState('Passw0rd!');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('Passw0rd!');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setValidName(USER_REGEX.test(user));
    }, [user]);

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email]);

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd]);

    useEffect(() => {
        setErrMsg('');
    }, [user, email, pwd, matchPwd]);

    const handleLoginSignupClick = () => {
        navigate('/Home');
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
    
        // Validate form inputs before making the API call
        if (!validName || !validEmail || !validPwd || !validMatch) {
            setErrMsg("Please fill in all the required fields correctly.");
            return;
        }
    
        try {
            // Prepare data for the API call
            const userData = {
                name: user,
                email: email,
                password: pwd,
            };
    
            // Make the POST request to the server
            const response = await axios.post('https://mastomall-backend.vercel.app/users/', userData);
    
            // Navigate to the login page
            navigate('/Login');
        } catch (error) {
            // Handle error
            console.error(error);
            setErrMsg("An error occurred during sign-up. Please try again.");
        }
    };
    
    
    
    

    return (
        <>
            <nav>
                <div className="nav-logo-container">
                    <img src={Logo} alt="" className="nav-logo" />
                </div>
                <div className="nav-text-section">
                    <h1 className="nav-primary-heading">Mastodon Mall</h1>
                </div>
                <div className="navbar-links-container">
                    <button className="back-primary-button" onClick={handleLoginSignupClick}>
                        Back
                    </button>
                </div>
            </nav>
            {success ? (
                <section className="login-section">
                    <h1 className="login-title">Success!</h1>
                    <p>You have successfully signed up.</p>
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
                    <h1 className="login-title">Register</h1>
                    <form onSubmit={handleSubmit} className="login-form">
                        <div className="input-group">
                            <label htmlFor="username" className="input-label">
                                Username:
                            </label>
                            <input
                                type="text"
                                id="username"
                                className="input-field"
                                ref={userRef}
                                autoComplete="off"
                                onChange={(e) => setUser(e.target.value)}
                                value={user}
                                required
                                aria-invalid={validName ? "false" : "true"}
                                aria-describedby="uidnote"
                                onFocus={() => setUserFocus(true)}
                                onBlur={() => setUserFocus(false)}
                                placeholder="user123"
                            />
                        </div>

                        <div className="input-group">
                            <label htmlFor="email" className="input-label">
                                Email:
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="input-field"
                                ref={emailRef}
                                autoComplete="off"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                required
                                aria-invalid={validEmail ? "false" : "true"}
                                aria-describedby="emailnote"
                                onFocus={() => setEmailFocus(true)}
                                onBlur={() => setEmailFocus(false)}
                                placeholder="user@example.com"
                            />
                        </div>

                        <div className="input-group">
                            <label htmlFor="password" className="input-label">
                                Password:
                            </label>
                            <input
                                type="password"
                                id="password"
                                className="input-field"
                                ref={pwdRef}
                                onChange={(e) => setPwd(e.target.value)}
                                value={pwd}
                                required
                                aria-invalid={validPwd ? "false" : "true"}
                                aria-describedby="pwdnote"
                                onFocus={() => setPwdFocus(true)}
                                onBlur={() => setPwdFocus(false)}
                                placeholder="Passw0rd!"
                            />
                        </div>

                        <div className="input-group">
                            <label htmlFor="confirm_pwd" className="input-label">
                                Confirm Password:
                            </label>
                            <input
                                type="password"
                                id="confirm_pwd"
                                className="input-field"
                                ref={matchPwdRef}
                                onChange={(e) => setMatchPwd(e.target.value)}
                                value={matchPwd}
                                required
                                aria-invalid={validMatch ? "false" : "true"}
                                aria-describedby="confirmnote"
                                onFocus={() => setMatchFocus(true)}
                                onBlur={() => setMatchFocus(false)}
                            />
                        </div>

                        <button className="login-button" disabled={!validName || !validEmail ||!validPwd || !validMatch}>Sign Up</button>
                    </form>
                    <p className="account-query">
                        Already registered?<br />
                        <span className="line">
                            <Link to="/Login">Sign In</Link>
                        </span>
                    </p>
                </section>
            )}
        </>
    );
};

export default Signup;

