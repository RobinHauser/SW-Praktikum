import AppHeader from "../components/AppHeader";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";
import {Paper} from "@mui/material";
import Message from "../components/MessageLeft";
import * as React from "react";
import ChatContainer from "../components/ChatContainer";


export default function Conversations() {
    return (
        <div className="App">
            <ChatContainer></ChatContainer>
        </div>
    )
        ;
}