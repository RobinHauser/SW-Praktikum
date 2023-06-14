import * as React from "react";
import ChatContainer from "../components/ChatContainer";
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
            user: this.props.user
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