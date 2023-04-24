import './App.css';
import MenuAppBar from "./components/AppHeader";
import GridContainer from "./components/GridContainer";
import Container from '@mui/material/Container';


export default function App() {
    return (
        <div className="App">
            <MenuAppBar></MenuAppBar>
            <Container style={{marginTop: '50px'}}>
                <GridContainer></GridContainer>
            </Container>
        </div>
    );
}