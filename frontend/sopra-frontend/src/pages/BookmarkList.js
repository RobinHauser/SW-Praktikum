import Container from "@mui/material/Container";
import AppHeader from "../components/AppHeader";
import App from "../App";
import GridContainer from "../components/GridContainer";

/**
 * Shows the Bookmarklist with all Profiles, that are Bookmarked by the User
 *
 * @author [Michael Bergdolt]
 */

export default function BookmarkList() {

    return (
        <div className="App">
            <AppHeader></AppHeader>
            <Container style={{marginTop: '50px'}}>
                <GridContainer></GridContainer>
            </Container>
        </div>
    )
}