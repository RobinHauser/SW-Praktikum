import React, { Component } from 'react';
import AppHeader from "../components/AppHeader";
import Container from "@mui/material/Container";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import placeHolderImage from "../static/images/profileImagePlaceholder.jpeg";
import {List, ListSubheader} from "@mui/material";
import ProfilePropertySelect from "../components/ProfilePropertySelect";
import ProfilePropertyFreeText from "../components/ProfilePropertyFreeText";

/**
 * @author [Björn Till]
 */

class Profile extends Component {

    render() {

    return (
        <div className="App">
            <AppHeader avatar={this.props.avatar}></AppHeader>
            <Container sx={{display: 'grid', placeItems: 'center', marginTop: '50px', marginBottom: '50px', fontSize: '25px'}}>
                Profil
            </Container>

            <Card sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '50px' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', width: '40%' }}>
                    <CardContent>
                        <Typography component="div" variant="h6" sx={{ textAlign: 'left' }}>
                                Name: Hans Jürgen
                        </Typography>
                        <Typography component="div" variant="h6" sx={{ textAlign: 'left' }}>
                            E-Mail: Hans.juergen@mail.de
                        </Typography>
                    </CardContent>
                </Box>
                <CardMedia
                    component="img"
                    sx={{ width: 150 }}
                    image={placeHolderImage}
                    title="profileImage"/>
            </Card>
            <Container style={{display: 'grid', placeItems: 'center', marginTop: '50px', marginBottom: '50px'}}>
                <List
                    sx={{ width: '100%', maxWidth: 700}}
                    subheader={
                        <ListSubheader sx={{fontSize: 20, color: 'black'}}>
                        Auswahl-Eigenschaften bearbeiten
                        </ListSubheader>
                    }
                >
                    {[1, 2, 3, 4, 5, 6, 7].map((value) => (
                        <ProfilePropertySelect key={value} value={value}/>
                    ))}
                </List>
            </Container>

            <hr />

            <Container style={{display: 'grid', placeItems: 'center', marginTop: '50px'}}>
                <List
                    sx={{ width: '100%', maxWidth: 700}}
                    subheader={
                        <ListSubheader sx={{fontSize: 20, color: 'black'}}>
                        Freitext-Eigenschaften bearbeiten
                        </ListSubheader>
                    }
                >
                    {[1, 2, 3].map((value) => (
                        <ProfilePropertyFreeText key={value} value={value}/>
                    ))}
                </List>
            </Container>
        </div>
    );
    }
}

export default Profile;