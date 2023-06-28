import './App.css';
import {BrowserRouter, Navigate, Route, Routes, useLocation} from "react-router-dom";
import Main from "./pages/Main";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import ConversationOverview from "./pages/ConversationOverview"
import BookmarkList from "./pages/BookmarkList";
import BlockList from "./pages/BlockList";
import React from 'react';
import {initializeApp} from 'firebase/app';
import {getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup} from "firebase/auth";
import firebaseConfig from './firebaseconfig'
import ChatContainer from "./components/ChatContainer";
import SearchProfileOverview from "./pages/SearchProfileOverview";
import SearchProfile from "./pages/SearchProfile";
import SopraDatingAPI from "./api/SopraDatingAPI";
import UserBO from "./api/UserBO";

class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            currentUser: null,
            appError: null,
            authError: null,
            authLoading: false,
            user: null
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
                        profileImageURL: user.toJSON().photoURL,
                        profileDisplayName: user.toJSON().displayName,
                        profileEmail: user.toJSON().email,
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

    /**
     * Setter for a new User
     */
    setUser = async () => {
        try {
            const {profileImageURL, profileDisplayName, profileEmail} = this.state;
            const newUser = new UserBO("", profileDisplayName, profileEmail, profileImageURL);

            const userBOs = await SopraDatingAPI.getAPI().postUser(newUser);
            const newUserBO = userBOs[0];

            this.setState({
                appError: null,
                user: newUserBO,
            });

            return newUserBO;
        } catch (error) {
            this.setState({
                user: [],
                appError: error,
            });
            throw error;
        }
    };

    /**
     * Getter for the current User
     */
    getUser = async () => {
        try {
            const userBO = await SopraDatingAPI.getAPI().getUser(this.state.currentUser.email);

            if (userBO.length === 0) {
                const newUserBO = await this.setUser();
                this.setState({
                    appError: null,
                    user: newUserBO,
                });
                return newUserBO;
            } else {
                this.setState({
                    appError: null,
                    user: userBO[0],
                });
                return userBO[0];
            }
        } catch (error) {
            this.setState({
                appError: error,
                user: null,
            });
            throw error;
        }
    };

    render() {
        const {currentUser, profileImageURL, profileDisplayName, profileEmail, user} = this.state;

        return (
            <BrowserRouter>
                <Routes>
                    <Route path={"/"}>
                        <Route path={'/'} element={currentUser ? <Navigate replace to={'/main'}/> : <SignIn onSignIn={this.handleSignIn}/>}/>
                        <Route path={'/*'} element={currentUser ? <Navigate replace to={'/main'}/> : <SignIn onSignIn={this.handleSignIn}/>}/>
                        <Route path={'/main'} element={<Secured user={currentUser}><Main avatar={profileImageURL} user={user} onUserLogin={this.getUser}/> </Secured>}/>
                        <Route path={'/profile'} element={<Secured user={currentUser}><Profile avatar={profileImageURL} name={profileDisplayName} email={profileEmail} onUserLogin={this.getUser} user={user}/> </Secured>}/>
                        <Route path={'/bookmarkList'} element={<Secured user={currentUser}><BookmarkList avatar={profileImageURL} user={user}/> </Secured>}/>
                        <Route path={'/blockList'} element={<Secured user={currentUser}><BlockList avatar={profileImageURL} user={user}/> </Secured>}/>
                        <Route path={'/searchProfileOverview'} element={<Secured user={currentUser}><SearchProfileOverview avatar={profileImageURL} user={user}/> </Secured>}/>
                        <Route path={'/conversationOverview'} element={<Secured user={currentUser}><ConversationOverview avatar={profileImageURL} user={user}/> </Secured>}/>
                        <Route path={'/chat/:chatID/:userID'} element={<Secured user={currentUser}><ChatContainer avatar={profileImageURL} user={user}/> </Secured>}/>
                        <Route path={'/searchProfile/:id'} element={<Secured user={currentUser}><SearchProfile avatar={profileImageURL} user={user}/> </Secured>}/>
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