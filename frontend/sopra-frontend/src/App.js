import './App.css';
import {BrowserRouter, Navigate, Route, Routes, useNavigate} from "react-router-dom";
import Main from "./pages/Main";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import BookmarkList from "./pages/BookmarkList";
import BlockList from "./pages/BlockList";
import SearchProfile from "./pages/SearchProfile";
import React from 'react';
import {initializeApp} from 'firebase/app';
import {getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup} from "firebase/auth";
import firebaseConfig from './firebaseconfig'

class App extends React.Component {


    /** Constructor of the app, which initializes firebase  */
    constructor(props) {
        super(props);

        // Init an empty state
        this.state = {
            currentUser: null,
            appError: null,
            authError: null,
            authLoading: false
        };
    }

    /**
     * Handles the sign in request of the SignIn component uses the firebase.auth() component to sign in.
     * @see See Google [firebase.auth()](https://firebase.google.com/docs/reference/js/firebase.auth.Auth)
     * @see See Google [firebase.auth().signInWithRedirect](https://firebase.google.com/docs/reference/js/firebase.auth.Auth#signinwithredirect)
     */
    handleSignIn = () => {

        this.setState({
            authLoading: true
        });

        const app = initializeApp(firebaseConfig);
        //const auth = getAuth(app);
        const auth = getAuth(app);
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider);
    }

    /**
     * Lifecycle method, which is called when the component gets inserted into the browsers DOM.
     * Initializes the firebase SDK.
     *
     * @see See Googles [firebase init process](https://firebase.google.com/docs/web/setup)
     */
    componentDidMount() {
        const app = initializeApp(firebaseConfig);
        const auth = getAuth(app);

        auth.languageCode = 'en';
        onAuthStateChanged(auth, (user) => {
            if (user) {
                this.setState({
                    authLoading: true
                });
                // The user is signed in
                user.getIdToken().then(token => {
                    // Add the token to the browser's cookies. The server will then be
                    // able to verify the token against the API.
                    // SECURITY NOTE: As cookies can easily be modified, only put the
                    // token (which is verified server-side) in a cookie; do not add other
                    // user information.
                    document.cookie = `token=${token};path=/`;
                    // console.log("Token is: " + document.cookie);

                    // Set the user not before the token arrived
                    this.setState({
                        currentUser: user,
                        authError: null,
                        authLoading: false
                    });
                }).catch(e => {
                    this.setState({
                        authError: e,
                        authLoading: false
                    });
                });
            } else {
                // User has logged out, so clear the id token
                document.cookie = 'token=;path=/';

                // Set the logged out user to null
                this.setState({
                    currentUser: null,
                    authLoading: false
                });
            }
        });
    }

    render() {
        const {currentUser, appError, authError, authLoading} = this.state;

        return (
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Main/>}></Route>
                    <Route path="/profile" element={currentUser === null ? <Navigate replace={true} to={"/signIn"}/> : <Profile/>}></Route>
                    <Route path="/signIn" element={<SignIn onSignIn={this.handleSignIn}/>}></Route>
                    <Route path="/bookmarkList" element={currentUser === null ? <Navigate replace={true} to={"/signIn"}/> : <BookmarkList/>}></Route>
                    <Route path="/blockList" element={currentUser === null ? <Navigate replace={true} to={"/signIn"}/> : <BlockList/>}></Route>
                    <Route path="/searchProfile" element={currentUser === null ? <Navigate replace={true} to={"/signIn"}/> : <SearchProfile/>}></Route>
                </Routes>
            </BrowserRouter>
        )
    }
}

export default App;