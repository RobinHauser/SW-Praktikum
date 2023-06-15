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
                    }, () => {
                        this.getUser();
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
     * Getter for the current User
     */
    getUser = () => {
        // Todo kommentiertes löschen sobald Schnittstelle läuft
        // let testUser = UserBO.fromJSON(
        //         {
        //         "UserID": "1005",
	    //         "displayname": "Michi B",
        //         "email": "michaelbergdolt20@gmail.com",
	    //         "dateOfBirth": "20.03.2003"
        //         }
        // );
        // this.setState({
        //     user: testUser[0]
        // })

        SopraDatingAPI.getAPI().getUser(this.state.profileEmail)
            .then(UserBO => {
                this.setState({
                    appError: null,
                    user: UserBO[0]
                })
            }).catch(e =>
                this.setState({
                    appError: e,
                    user: null
                })
            )
        ;
    }

    render() {
        const {currentUser, profileImageURL, profileDisplayName, profileEmail, user} = this.state;

        return (
            <BrowserRouter>
                <Routes>
                    <Route path={"/"}>
                        <Route path={'/'} element={currentUser ? <Navigate replace to={'/main'}/> : <SignIn onSignIn={this.handleSignIn}/>}/>
                        <Route path={'/*'} element={currentUser ? <Navigate replace to={'/main'}/> : <SignIn onSignIn={this.handleSignIn}/>}/>
                        <Route path={'/main'} element={<Secured user={currentUser}><Main avatar={profileImageURL} user={user}/> </Secured>}/>
                        <Route path={'/profile'} element={<Secured user={currentUser}><Profile avatar={profileImageURL} name={profileDisplayName} email={profileEmail}/> </Secured>}/>
                        <Route path={'/bookmarkList'} element={<Secured user={currentUser}><BookmarkList avatar={profileImageURL} user={user}/> </Secured>}/>
                        <Route path={'/blockList'} element={<Secured user={currentUser}><BlockList avatar={profileImageURL} user={user}/> </Secured>}/>
                        <Route path={'/searchProfileOverview'} element={<Secured user={currentUser}><SearchProfileOverview avatar={profileImageURL}/> </Secured>}/>
                        <Route path={'/conversationOverview'} element={<Secured user={currentUser}><ConversationOverview avatar={profileImageURL} user={user}/> </Secured>}/>
                        <Route path={'/chat/:chatID/:userID'} element={<Secured user={currentUser}><ChatContainer avatar={profileImageURL} user={user}/> </Secured>}/>
                        <Route path={'/searchProfile'} element={<Secured user={currentUser}><SearchProfile avatar={profileImageURL}/> </Secured>}/>
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