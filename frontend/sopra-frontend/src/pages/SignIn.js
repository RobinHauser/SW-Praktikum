import MenuAppBar from "../components/AppHeader";
import Container from "@mui/material/Container";
import GridContainer from "../components/GridContainer";

export default function SignIn() {
    return (
        <div className="App">
            <MenuAppBar></MenuAppBar>
            <Container style={{marginTop: '50px'}}>
                SignIn
            </Container>
        </div>
    );
}