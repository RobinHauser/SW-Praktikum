import AppHeader from "../components/AppHeader";
import Container from "@mui/material/Container";
import ConversationOverwievContainer from "../components/ConversationOverviewContainer";

export default function ConversationOverview(props) {
    const nameArray= ["Peter Scheidschel","Max Verstappen", "Lewis Hamilton", "Toto Wolff", "Fernando Alonso"]
    return (
        <div className="App">
            <AppHeader avatar={props.avatar}></AppHeader>
            <Container style={{display: 'grid', placeItems: 'center', marginTop: '50px'}} >
               <h3> Meine Chats</h3>
            </Container>
            <ConversationOverwievContainer name={nameArray}>

            </ConversationOverwievContainer>
        </div>
    );
}