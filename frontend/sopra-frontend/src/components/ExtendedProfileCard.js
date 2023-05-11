import React, {Component} from "react";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import List from "@mui/material/List";
import {ListItem} from "@mui/material";
import placeHolderImage from "../static/images/profileImagePlaceholder.jpeg";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import ChatIcon from '@mui/icons-material/Chat';
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import FavoriteIcon from '@mui/icons-material/Favorite';
import BlockIcon from '@mui/icons-material/Block';
import {Link} from "react-router-dom";

/**
 * @author [Jannik Haug]
 */
class ExtendedProfileCard extends Component {

    render() {
        return (
            <Box sx={{width: 400}}>
                <DialogContent>
                    <Avatar sx={{width: 56, height: 56, margin: "auto", mt: 1}} src={placeHolderImage}></Avatar>
                    <DialogTitle sx={{textAlign: "center"}}>Profil Übersicht </DialogTitle>
                    <List>
                        <ListItem sx={{textAlign: "center", borderBottom: 1, borderColor: "#37474f"}}>
                            <Typography gutterBottom variant="h5" component="div">
                                Hans Jürgen
                            </Typography>
                        </ListItem>
                        <ListItem sx={{borderBottom: 1, borderColor: "#eceff1"}}>
                            <Typography variant="h6" color="text.secondary" style={{textAlign: "left"}}>
                                Alter:
                            </Typography>
                        </ListItem>
                        <ListItem sx={{borderBottom: 1, borderColor: "#eceff1"}}>
                            <Typography variant="h6" color="text.secondary" style={{textAlign: "left"}}>
                                Geschlecht:
                            </Typography>
                        </ListItem>
                        <ListItem sx={{borderBottom: 1, borderColor: "#eceff1"}}>
                            <Typography variant="h6" color="text.secondary" style={{textAlign: "left"}}>
                                Geschlecht:
                            </Typography>
                        </ListItem>
                        <ListItem sx={{borderBottom: 1, borderColor: "#eceff1"}}>
                            <Typography variant="h6" color="text.secondary" style={{textAlign: "left"}}>
                                Raucher:
                            </Typography>
                        </ListItem>
                        <ListItem sx={{borderBottom: 1, borderColor: "#eceff1"}}>
                            <Typography variant="h6" color="text.secondary" style={{textAlign: "left"}}>
                                Religion:
                            </Typography>
                        </ListItem>
                        <ListItem sx={{borderBottom: 1, borderColor: "#eceff1"}}>
                            <Typography variant="h6" color="text.secondary" style={{textAlign: "left"}}>
                                Haarfarbe:
                            </Typography>
                        </ListItem>
                        <ListItem sx={{borderBottom: 1, borderColor: "#eceff1"}}>
                            <Typography variant="h6" color="text.secondary" style={{textAlign: "left"}}>
                                Geburtsdatum:
                            </Typography>
                        </ListItem>
                        <ListItem sx={{borderBottom: 1, borderColor: "#eceff1"}}>
                            <Typography variant="h6" color="text.secondary" style={{textAlign: "left"}}>
                                Körpergröße:
                            </Typography>
                        </ListItem>
                    </List>
                    <Box sx={{marginTop: 5, display: 'flex', justifyContent: 'space-between'}}>
                        <Tooltip title="User blockieren">
                            <BlockIcon onClick={() => alert("User wurde blockiert")}
                                       sx={{cursor: 'pointer', width: 35, height: 35}}></BlockIcon>
                        </Tooltip>
                        <Tooltip title="User merken">
                            <FavoriteIcon onClick={() => alert("User wurde vermerkt")}
                                          sx={{cursor: 'pointer', width: 35, height: 35}}></FavoriteIcon>
                        </Tooltip>
                        <Tooltip title="Zum Chat">
                            <Link to="/Chat">
                                <ChatIcon sx={{cursor: 'pointer', width: 35, height: 35}}>
                                </ChatIcon>
                            </Link>
                        </Tooltip>


                    </Box>

                </DialogContent>
            </Box>

        )
    }
}

export default ExtendedProfileCard;