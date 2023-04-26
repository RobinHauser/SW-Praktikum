import AppHeader from "../components/AppHeader";
import Container from "@mui/material/Container";
import GridContainer from "../components/GridContainer";

export default function Main() {
    return (
        <div className="App">
            <AppHeader></AppHeader>
            <Container style={{marginTop: '50px'}}>
                <GridContainer></GridContainer>
            </Container>
        </div>
    );
}