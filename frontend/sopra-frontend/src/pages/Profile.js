import React, {Component} from 'react';
import AppHeader from "../components/AppHeader";
import Container from "@mui/material/Container";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {List, ListSubheader} from "@mui/material";
import ProfilePropertySelect from "../components/ProfilePropertySelect";
import ProfilePropertyFreeText from "../components/ProfilePropertyFreeText";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";

/**
 * @author [Björn Till](https://github.com/BjoernTill)
 */

class Profile extends Component {

    render() {

        return (
            <div className="App">
                <AppHeader avatar={this.props.avatar}></AppHeader>
                <Container sx={{
                    display: 'grid',
                    placeItems: 'center',
                    marginTop: '50px',
                    marginBottom: '50px',
                    fontSize: '25px'
                }}>
                    Account
                </Container>

                <Card sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '50px'}}>
                    <Box sx={{display: 'flex', flexDirection: 'column', width: '40%'}}>
                        <CardContent>
                            <Typography component="div" variant="h6" sx={{textAlign: 'left'}}>
                                Name: {this.props.name}
                            </Typography>
                            <Typography component="div" variant="h6" sx={{textAlign: 'left'}}>
                                E-Mail: {this.props.email}
                            </Typography>
                        </CardContent>
                    </Box>
                </Card>
                <Container style={{display: 'grid', placeItems: 'center', marginTop: '50px', marginBottom: '50px'}}>
                    <ListSubheader sx={{fontSize: 25, color: 'black'}}>
                                Profil
                            </ListSubheader>
                    <List
                        sx={{width: '100%', maxWidth: 700}}
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
                    <Button  sx={{marginTop: '20px', fontWeight:'bold'}} variant="outlined" startIcon={<AddIcon />}>Auswahl-Eigenschaft hinzufügen</Button>
                </Container>

                <hr/>

                <Container style={{display: 'grid', placeItems: 'center', marginTop: '50px', marginBottom: '50px'}}>
                    <List
                        sx={{width: '100%', maxWidth: 700}}
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
                    <Button sx={{marginTop: '20px', fontWeight:'bold'}} variant="outlined" startIcon={<AddIcon />}>Freitext-Eigenschaft hinzufügen</Button>
                </Container>
            </div>
        );
    }
}

export default Profile;