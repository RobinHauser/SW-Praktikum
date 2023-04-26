import AppHeaderLight from "../components/AppHeaderLight";
import Container from "@mui/material/Container";
import ProfileCard from "../components/SignInCard";

export default function SignIn() {
    return (
        <div className="App">
            <AppHeaderLight></AppHeaderLight>
            <Container style={{marginTop: '50px'}}>
                <ProfileCard></ProfileCard>
            </Container>
        </div>
    );
}