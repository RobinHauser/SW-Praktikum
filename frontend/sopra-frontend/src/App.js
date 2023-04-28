import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Main from "./pages/Main";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import BookmarkList from "./pages/BookmarkList";
import BlockList from "./pages/BlockList";
import Chat from "./pages/Chat"


export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Main/>}></Route>
                <Route path="/profile" element={<Profile/>}></Route>
                <Route path="/signIn" element={<SignIn/>}></Route>
                <Route path="/bookmarkList" element={<BookmarkList/>}></Route>
                <Route path="/blockList" element={<BlockList/>}></Route>
                <Route path="/chat" element={<Chat/>}></Route>
            </Routes>
        </BrowserRouter>
    );
}