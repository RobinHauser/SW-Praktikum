import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Main from "./pages/Main";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";


export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Main/>}></Route>
                <Route path="/profile" element={<Profile/>}></Route>
                <Route path="/signIn" element={<SignIn/>}></Route>
            </Routes>
        </BrowserRouter>
    );
}