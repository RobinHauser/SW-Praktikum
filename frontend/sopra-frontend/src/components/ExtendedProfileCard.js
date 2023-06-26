import React, {Component} from "react";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import List from "@mui/material/List";
import {Alert, ListItem} from "@mui/material";
import placeHolderImage from "../static/images/profileImagePlaceholder.jpeg";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import ChatIcon from '@mui/icons-material/Chat';
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import FavoriteIcon from '@mui/icons-material/Favorite';
import BlockIcon from '@mui/icons-material/Block';
import {Link} from "react-router-dom";
import SopraDatingAPI from "../api/SopraDatingAPI";
import Grid from "@mui/material/Unstable_Grid2";

/**
 * @author [Jannik Haug, Michael Bergdolt]
 */
class ExtendedProfileCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            addingError: null,
            removeError: null,
            successAlert: "",
            warningAlert: ""
        }
    }

    /**
     * Blocks the user by adding them to the blocklist
     * Calls the API to remove the user from the bookmarklist and to add it to the blocklist
     */
    blockUser = () => {
        const { showedUser, user } = this.props;
        SopraDatingAPI.getAPI().addUserToBlocklist(user.getUserID(), showedUser).then(() => {
            this.setState({
                addingError: null
            })
            this.props.onUserRemoved(showedUser);
        }).catch(e =>
            this.setState({
                addingError: e
            })
        );

        this.setState({
            addingError: null
        })

        SopraDatingAPI.getAPI().removeUserFromBookmarklist(user.getUserID(), showedUser).then(() => {
            this.setState({
                addingError: null
            })
        }).catch(e =>
            this.setState({
                addingError: e
            })
        );

        this.setState({
            addingError: null
        })
    }

    /**
     * Adds the user to the bookmarklist
     * Calls the API to add to the bookmarklist
     */
    addUserToBookmarklist = () => {
        const { showedUser, user} = this.props;
        SopraDatingAPI.getAPI().addUserToBookmarklist(user.getUserID(), showedUser).then(() => {
            this.setState({
                removeError: null,
                successAlert: "User zur Merkliste hinzugefügt"
            })
            setTimeout(() => {
                this.setState({ successAlert: "" });
            }, 3000);
        }).catch(e =>
        this.setState({
            removeError: e
        }))
    }
    addUserToChat = (userToAdd) => {
        SopraDatingAPI.getAPI().addUserToChat(this.props.user.getUserID(), userToAdd)
            .then(() => {
                this.setState({
                    removeError: null,
                    successAlert: "User zum Chat hinzugefügt"
                })
                setTimeout(() => {
                    this.setState({ successAlert: "" });
                }, 3000);
            })
            .catch(error => {
                this.setState({
                    warningAlert: "Der User kann nicht erneut zum Chat hinzugefügt werden"
                })
                setTimeout(() => {
                    this.setState({warningAlert: ""})
                }, 3000)
            })
    }
    chatButtonFunction(userToAdd) {
        let addObject = {
            "UserID": userToAdd
        }
        this.addUserToChat(addObject)
    }
    render() {
        const {showedUser, informations} = this.props;
        const {successAlert, warningAlert} = this.state;
        const showedUserId = parseInt(this.props.showedUser.getUserID())
        return (
            <Box sx={{width: "100%"}}>
                <DialogContent>
                    <Avatar sx={{width: 56, height: 56, margin: "auto", mt: 1}} src={showedUser.getAvatarURL()}></Avatar>
                    <DialogTitle sx={{textAlign: "center", fontSize: '30px'}}>Profil Übersicht </DialogTitle>
                    <List>
                        {informations.length > 0 ? (
                            informations.map((informationListItem) => (
                                <ListItem sx={{borderBottom: 1, borderColor: "#eceff1", fontSize: '20px'}} key={informationListItem.getValueID()}>
                                    {`${informationListItem.getProperty()}: ${informationListItem.getValue()}`}
                                </ListItem>
                            ))
                        ) : (
                            <Typography variant="body1">Keine Informationen zu diesem Profil vorhanden</Typography>
                        )}
                    </List>
                    <Box sx={{marginTop: 5, display: 'flex', justifyContent: 'space-between'}}>
                        <Tooltip title="User blockieren">
                            <BlockIcon onClick={() => this.blockUser()}
                                       sx={{cursor: 'pointer', width: 35, height: 35}}></BlockIcon>
                        </Tooltip>
                        <Tooltip title="User merken">
                            <FavoriteIcon onClick={() => this.addUserToBookmarklist()}
                                          sx={{cursor: 'pointer', width: 35, height: 35}}></FavoriteIcon>
                        </Tooltip>
                            <Tooltip title="User zum Chat hinzufügen">
                                <ChatIcon onClick={() => this.chatButtonFunction(showedUserId)} sx={{cursor: 'pointer', width: 35, height: 35}}></ChatIcon>
                            </Tooltip>
                    </Box>
                    {successAlert.length > 0 && (
                        <Alert severity="success"> {successAlert}</Alert>
                    )}
                    {warningAlert.length > 0 && (
                        <Alert severity="warning"> {warningAlert}</Alert>
                    )}
                </DialogContent>
            </Box>
        )
    }
}

export default ExtendedProfileCard;