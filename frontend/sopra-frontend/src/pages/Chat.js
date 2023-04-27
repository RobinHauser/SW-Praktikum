import AppHeader from "../components/AppHeader";
import Container from "@mui/material/Container";
import ChatContainer from "../components/ChatContainer";

export default function Chat() {
    return (
        <div className="App">
            <AppHeader></AppHeader>
            <Container style={{marginTop: '50px'}}>
                Chat
            </Container>
            <ChatContainer>

            </ChatContainer>
        </div>
    );
}