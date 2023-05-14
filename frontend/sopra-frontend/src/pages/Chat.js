import * as React from "react";
import ChatContainer from "../components/ChatContainer";
/**
 * *
 * @author [Jannik Haug](https://github.com/JannikHaug)
 */

export default function Conversations() {
    const messageObjectLeft = ["Hallo wie gehts?", "Danke mir auch", "Ja das ist schön", "Heute gehe ich ins Freibad", "Hallo wie gehts?", "Danke mir auch", "Ja das ist schön", "Heute gehe ich ins Freibad"];
    const messageObjectRight = ["Hi mir gehts gut und dir?", "Super das freut mich", "Was machst du heute?", "Wow das ist cool. Ich gehe ins Kino", "Hi mir gehts gut und dir?", "Super das freut mich", "Was machst du heute?", "Wow das ist cool. Ich gehe ins Kino"];
    return (
        <div className="App">
            <ChatContainer messageArrayLeft={messageObjectLeft} messageArrayRight={messageObjectRight}></ChatContainer>
        </div>
    )
        ;
}