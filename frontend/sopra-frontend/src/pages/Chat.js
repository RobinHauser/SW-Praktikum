import * as React from "react";
import ChatContainer from "../components/ChatContainer";
import {Component} from "react";

/**
 * Class react component which renders the ChatContainer component
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

    /**
     * Renders the class component
     * @returns Chat - the rendered component
     */
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