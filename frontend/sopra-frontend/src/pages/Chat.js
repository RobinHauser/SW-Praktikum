import AppHeader from "../components/AppHeader";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";
import {Paper} from "@mui/material";
import Message from "../components/MessageLeft";
import * as React from "react";
import ChatContainer from "../components/ChatContainer";
/**
 * *
 * @author [Jannik Haug](https://github.com/JannikHaug)
 */

export default function Conversations() {
    const messageObjectLeft = ["Hallo wie gehts?", "Danke mir auch", "Ja das ist schön", "Heute gehe ich ins Freibad", "Hallo wie gehts?", "Danke mir auch", "Ja das ist schön", "Heute gehe ich ins Freibad"];
    const messageObjectRight = ["Hi mir gehts gut und dir?", "Super das freut mich", "Was machst du heute?", "Wow das ist cool. Ich gehe ins Kino", "Hi mir gehts gut und dir?", "Super das freut mich", "Was machst du heute?", "Wow das ist cool. Ich gehe ins Kino"];
    const messageArray = [["1", "hallo"],["2", "wie geht es dir?"],["1", "gut und dir?"]];
    console.log(messageArray);
    return (
        <div className="App">
            <ChatContainer messageArrayLeft={messageObjectLeft} messageArrayRight={messageObjectRight}></ChatContainer>
        </div>
    )
        ;
}