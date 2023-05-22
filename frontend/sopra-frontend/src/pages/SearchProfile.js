import React, { Component } from 'react';
import AppHeader from "../components/AppHeader";
import Container from "@mui/material/Container";
import {List, ListSubheader} from "@mui/material";
import ProfilePropertySelect from "../components/ProfilePropertySelect";
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import Tooltip from "@mui/material/Tooltip";
import {Link} from "react-router-dom";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';



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
                            <ListSubheader sx={{fontSize: 20, color: 'black', display: 'flex', alignItems: 'center'}}>
                                <Link  to="/SearchProfileOverview">
                                    <Tooltip title="Zurück zur Übersicht" fontSize="large" sx={{color: "#2979ff",
                                                                                                marginTop: '15px'}}>
                                        <KeyboardDoubleArrowLeftIcon></KeyboardDoubleArrowLeftIcon>
                                    </Tooltip>
                                </Link>
                                 <span style={{ flexGrow: 1 }}>Suchfilter bearbeiten</span>
                            </ListSubheader>
                        }
                    >

                        {[1, 2, 3, 4, 5, 6, 7].map((value) => (
                            <ProfilePropertySelect key={value} value={value}/>
                        ))}
                    </List>
                        <Link  to="/SearchProfileOverview">
                                    <Tooltip title="Suchprofil entfernen" fontSize="large">
                                        <Button variant="outlined" sx={{color: "red",
                                                                        borderColor: 'red' ,
                                                                        '&:hover': { background: 'transparent', borderColor: 'red' },
                                                                        fontWeight: 'bold'}}
                                                startIcon={<DeleteIcon />}>Entfernen</Button>
                                    </Tooltip>
                        </Link>
                </Container>
            </div>
        );
    }
}

export default SearchProfile;