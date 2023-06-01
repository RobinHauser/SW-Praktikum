import * as React from "react";
import ChatContainer from "../components/ChatContainer";
import AppHeader from "../components/AppHeader";
import {Component} from "react";
import SopraDatingAPI from "../api/SopraDatingAPI";

/**
 * *
 * @author [Jannik Haug](https://github.com/JannikHaug)
 */

class Chat extends Component {

    constructor(props) {
        super(props);
        this.state = {
            messageList: [],
            error: null,
            messageArrayLeft: ["Hallo wie gehts?", "Danke mir auch", "Ja das ist schön", "Heute gehe ich ins Freibad", "Hallo wie gehts?", "Danke mir auch", "Ja das ist schön", "Heute gehe ich ins Freibad"],
            messageArrayRight: ["Hi mir gehts gut und dir?", "Super das freut mich", "Was machst du heute?", "Wow das ist cool. Ich gehe ins Kino", "Hi mir gehts gut und dir?", "Super das freut mich", "Was machst du heute?", "Wow das ist cool. Ich gehe ins Kino"]
        };
    }

    getMessageList = () => {
        SopraDatingAPI.getAPI().getChatMessages()
            .then(messages =>
                this.setState({
                    messageList: messages,
                    error: null
                }))
            .catch(e =>
                this.setState({
                    messageList: [],
                    error: e
                })
            )
        ;
    }

    componentDidMount() {
        this.getMessageList();
        console.log(this.messageList)
        console.log("test")
    }

    render() {
        return (
            <div className="App">
                <ChatContainer></ChatContainer>
            </div>
        )
            ;
    }
}

export default Chat