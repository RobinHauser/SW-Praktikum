import AppHeader from "../components/AppHeader";
import Container from "@mui/material/Container";
import {List, ListSubheader} from "@mui/material";
import * as React from "react";
import ProfilePropertyItem from "../components/ProfilePropertyItem";

/**
 * @author [Björn Till]
 */
export default function SearchProfile() {

    return (
        <div className="App">
            <AppHeader></AppHeader>
            <Container style={{display: 'grid', placeItems: 'center', marginTop: '50px'}}>
                <List
                    sx={{ width: '100%', maxWidth: 700}}
                    subheader={
                        <ListSubheader sx={{fontSize: 20, color: 'black'}}>
                        Suchfilter bearbeiten
                        </ListSubheader>
                    }
                >
                    {[1, 2, 3, 4, 5, 6, 7].map((value) => (
                        <ProfilePropertyItem key={value} value={value}/>
                    ))}
                </List>
            </Container>
        </div>
    );
}