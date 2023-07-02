import AppHeader from "../components/AppHeader";
import Container from "@mui/material/Container";
import SearchProfileOverviewContainer from "../components/SearchProfileOverviewContainer";
import React, {Component} from "react";

/**
 * Class react component which includes the search profile overview
 */

class SearchProfileOverview extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

     /**
     * Renders the class component
     * @returns SearchProfileOverview - the rendered component
     */
    render() {
        const user = this.props.user
        return (
            <div className="App">
                <AppHeader avatar={this.props.avatar}></AppHeader>
                <Container style={{display: 'grid', placeItems: 'center', marginTop: '50px'}}>
                    <h3> Meine Suchprofile</h3>
                </Container>
                <SearchProfileOverviewContainer user={user}>
                </SearchProfileOverviewContainer>
            </div>
        );
    }
}

export default SearchProfileOverview;