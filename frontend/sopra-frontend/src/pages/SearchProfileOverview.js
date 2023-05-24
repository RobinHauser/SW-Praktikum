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
            nameArray: ["Suchprofil 1", "Suchprofil 2", "Suchprofil 3", "Suchprofil 4", "Suchprofil 5"]
        }
    }
    render() {
        return (
            <div className="App">
                <AppHeader avatar={this.props.avatar}></AppHeader>
                <Container style={{display: 'grid', placeItems: 'center', marginTop: '50px'}}>
                    <h3> Meine Suchprofile</h3>
                </Container>
                <SearchProfileOverviewContainer name={this.state.nameArray}>

                </SearchProfileOverviewContainer>
            </div>
        );
    }
}

export default SearchProfileOverview;