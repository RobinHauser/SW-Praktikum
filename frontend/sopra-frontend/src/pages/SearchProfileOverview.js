import AppHeader from "../components/AppHeader";
import Container from "@mui/material/Container";
import SearchProfileOverviewContainer from "../components/SearchProfileOverviewContainer";
import React, {Component} from "react";

/**
 * @author [Björn Till](https://github.com/BjoernTill)
 */

class SearchProfileOverview extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        const user = this.props.user.getUserID()
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