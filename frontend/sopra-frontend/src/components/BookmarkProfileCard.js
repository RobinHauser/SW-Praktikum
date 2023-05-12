import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import placeHolderImage from '../static/images/profileImagePlaceholder.jpeg';
import Avatar from "@mui/material/Avatar";
import {Component} from "react";
import Tooltip from "@mui/material/Tooltip";
import BlockIcon from "@mui/icons-material/Block";
import {Link} from "react-router-dom";
import ChatIcon from "@mui/icons-material/Chat";
import Box from "@mui/material/Box";
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';

/**
 * @author [Jannik Haug]
 */
class BookmarkProfileCard extends Component {
    render() {

        return (
            <div>
                <Card direction="row"
                      justifycontent="space-evenly"
                      alignitems="center"

                      sx={{
                          borderTop: 3,
                          borderBottom: 3,
                          borderRadius: 2,
                          borderColor: "#eceff1",
                          ':hover': {boxShadow: 3},
                          minWidth: "300px"
                      }} //Quelle: https://stackoverflow.com/questions/37062176/mui-how-to-animate-card-depth-on-hover
                      >
                    <Avatar sx={{width: 56, height: 56, margin: "auto", mt: 1}} src={placeHolderImage}></Avatar>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Hans Jürgen
                        </Typography>
                        <Typography variant="h6" color="text.secondary" style={{textAlign: "left"}}>
                            Alter:
                        </Typography>
                        <Typography variant="h6" color="text.secondary" style={{textAlign: "left"}}>
                            Geschlecht:
                        </Typography>
                        <Typography variant="h6" color="text.secondary" style={{textAlign: "left"}}>
                            Raucher:
                        </Typography>
                        <Typography variant="h6" color="text.secondary" style={{textAlign: "left"}}>
                            Religion:
                        </Typography>
                        <Typography variant="h6" color="text.secondary" style={{textAlign: "left"}}>
                            Haarfarbe:
                        </Typography>
                        <Typography variant="h6" color="text.secondary" style={{textAlign: "left"}}>
                            Geburtsdatum:
                        </Typography>
                        <Typography variant="h6" color="text.secondary" style={{textAlign: "left"}}>
                            Körpergröße:
                        </Typography>
                        <Box sx={{marginTop: 5, display: 'flex', justifyContent: 'space-between'}}>
                        <Tooltip title="User blockieren">
                            <BlockIcon onClick={() => alert("User wurde blockiert")}
                                       sx={{cursor: 'pointer', width: 35, height: 35}}></BlockIcon>
                        </Tooltip>
                        <Tooltip title="User von Merkliste entfernen">
                            <HeartBrokenIcon onClick={() => alert("User wurde von der Merkliste entfernt")}
                                          sx={{cursor: 'pointer', width: 35, height: 35}}></HeartBrokenIcon>
                        </Tooltip>
                        <Tooltip title="Zum Chat">
                            <Link to="/Chat">
                                <ChatIcon sx={{cursor: 'pointer', width: 35, height: 35}}>
                                </ChatIcon>
                            </Link>
                        </Tooltip>


                    </Box>
                    </CardContent>
                </Card>
            </div>
        )
    }
}

export default BookmarkProfileCard;