import React, { Component } from 'react';
import AppHeader from "../components/AppHeader";
import Container from "@mui/material/Container";
import {List, ListSubheader} from "@mui/material";
import ProfilePropertySelect from "../components/ProfilePropertySelect";

/**
 * @author [Björn Till](https://github.com/BjoernTill)
 */

class SearchProfile extends Component {
    render() {

        return (
            <div className="App">
                <AppHeader avatar={this.props.avatar}></AppHeader>
                <Container style={{display: 'grid', placeItems: 'center', marginTop: '50px'}}>
                    <List
                        sx={{width: '100%', maxWidth: 700}}
                        subheader={
                            <ListSubheader sx={{fontSize: 20, color: 'black'}}>
                                Suchfilter bearbeiten
                            </ListSubheader>
                        }
                    >
                        {[1, 2, 3, 4, 5, 6, 7].map((value) => (
                            <ProfilePropertySelect key={value} value={value}/>
                        ))}
                    </List>
                </Container>
            </div>
        );
    }
}

export default SearchProfile;