import './App.css';
import {BrowserRouter, Navigate, Route, Routes, useLocation} from "react-router-dom";
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
                user.getIdToken().then(token => {
                    document.cookie = `token=${token};path=/`;
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
                document.cookie = 'token=;path=/';

                this.setState({
                    currentUser: null,
                    authLoading: false
                });
            }
        });
    }

    render() {
        const {currentUser} = this.state;
        return (
            <BrowserRouter>
                <Routes>
                    <Route path={"/"}>
                        <Route path={'/'} element={currentUser ? <Navigate replace to={'/main'}/> : <SignIn onSignIn={this.handleSignIn}/>}/>
                        <Route path={'/*'} element={currentUser ? <Navigate replace to={'/main'}/> : <SignIn onSignIn={this.handleSignIn}/>}/>
                        <Route path={'/main'} element={<Secured user={currentUser}><Main/> </Secured>}/>
                        <Route path={'/profile'} element={<Secured user={currentUser}><Profile/> </Secured>}/>
                        <Route path={'/bookmarkList'} element={<Secured user={currentUser}><BookmarkList/> </Secured>}/>
                        <Route path={'/blockList'} element={<Secured user={currentUser}><BlockList/> </Secured>}/>
                        <Route path={'/searchProfile'} element={<Secured user={currentUser}><SearchProfile/> </Secured>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        )
    }
}

export default App;

/**
 * Helper Component to wrap other Components, which shall only be accessed by a logged in user.
 *
 * @returns
 * @param props
 */
function Secured(props) {
    let location = useLocation();

    if (!props.user) {
        return <Navigate to={'/index.html'} state={{from: location}} replace/>;
    }

    return props.children;
}