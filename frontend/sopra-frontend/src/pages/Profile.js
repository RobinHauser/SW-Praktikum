import AppHeader from "../components/AppHeader";
import Container from "@mui/material/Container";

export default function Profile() {
    return (
        <div className="App">
            <AppHeader></AppHeader>
            <Container style={{marginTop: '50px'}}>
                Profile
            </Container>
        </div>
    );
}