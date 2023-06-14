import AppHeader from "../components/AppHeader";
import Container from "@mui/material/Container";
import ConversationOverviewContainer from "../components/ConversationOverviewContainer";
import {Component} from "react";

class ConversationOverview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nameArray: ["PeterScheidschel", "Max Verstappen", "Lewis Hamilton", "Toto Wolff", "Fernando Alonso"]
        }
    }
    render() {
        const avatarLink = this.props.avatar
        const currentUser = this.props.user.getUserID()
        return (
            <div className="App">
                <AppHeader avatar={this.props.avatar}></AppHeader>
                <Container style={{display: 'grid', placeItems: 'center', marginTop: '50px'}}>
                    <h3> Meine Chats</h3>
                </Container>
                <ConversationOverviewContainer currentUser={currentUser} avatarLink={avatarLink} name={this.state.nameArray}>

                </ConversationOverviewContainer>
            </div>
        );
    }
}

export default ConversationOverview