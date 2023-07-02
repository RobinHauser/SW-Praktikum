import React, {Component} from "react";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import List from "@mui/material/List";
import {Alert, LinearProgress, ListItem} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import ChatIcon from '@mui/icons-material/Chat';
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import FavoriteIcon from '@mui/icons-material/Favorite';
import BlockIcon from '@mui/icons-material/Block';
import SopraDatingAPI from "../api/SopraDatingAPI";

class ExtendedProfileCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            addingError: null,
            removeError: null,
            successAlert: "",
            warningAlert: "",
            loading: false
        }
    }

    /**
     * Blocks the user by adding them to the blocklist
     * Calls the API to remove the user from the bookmarklist and to add it to the blocklist
     *
     * @return {Promise<void>}
     */
    blockUser = async () => {
        const {showedUser, user} = this.props;
        try {
            this.setState({loading: true})
            await SopraDatingAPI.getAPI().addUserToBlocklist(user.getUserID(), showedUser);
            this.setState({
                addingError: null
            });
            this.props.onUserRemoved(showedUser);
        } catch (error) {
            this.setState({
                addingError: error,
                loading: false
            });
        }

        try {
            await SopraDatingAPI.getAPI().removeUserFromBookmarklist(user.getUserID(), showedUser);
            this.setState({
                addingError: null,
                loading: false
            });
        } catch (error) {
            this.setState({
                addingError: error,
                loading: false
            });
        }
    }

    /**
     * Adds the user to the bookmarklist
     * Calls the API to add to the bookmarklist
     *
     * @return {Promise<void>}
     */
    addUserToBookmarklist = async () => {
        const {showedUser, user} = this.props;
        try {
            this.setState({loading: true})
            await SopraDatingAPI.getAPI().addUserToBookmarklist(user.getUserID(), showedUser);
            this.setState({
                removeError: null,
                successAlert: "User zur Merkliste hinzugefügt",
                loading: false
            });
            setTimeout(() => {
                this.setState({successAlert: ""});
            }, 3000);
        } catch (error) {
            this.setState({
                removeError: error,
                loading: false
            });
        }
    }

    /**
     * Adds the user to the chat in the Backend
     *
     * @param userToAdd
     * @return {Promise<void>}
     */
    addUserToChat = async (userToAdd) => {
        try {
            this.setState({loading: true})
            await SopraDatingAPI.getAPI().addUserToChat(this.props.user.getUserID(), userToAdd);
            this.setState({
                removeError: null,
                successAlert: "User zum Chat hinzugefügt",
                loading: false
            });
            setTimeout(() => {
                this.setState({successAlert: ""});
            }, 3000);
        } catch (error) {
            this.setState({
                warningAlert: "Der User kann nicht erneut zum Chat hinzugefügt werden",
                loading: false
            });
            setTimeout(() => {
                this.setState({warningAlert: ""});
            }, 3000);
        }
    }

    /**
     * calls the addUserToChat function, to add the given user to the chat
     *
     * @param userToAdd - user to add to the chat
     */
    chatButtonFunction(userToAdd) {
        let addObject = {
            "UserID": userToAdd
        }
        this.addUserToChat(addObject)
    }

    render() {
        const {showedUser, informations} = this.props;
        const {successAlert, warningAlert, loading} = this.state;
        const showedUserId = parseInt(this.props.showedUser.getUserID())
        return (
            <Box sx={{width: "100%"}}>
                <DialogContent>
                    <Avatar sx={{width: 56, height: 56, margin: "auto", mt: 1}}
                            src={showedUser.getAvatarURL()}></Avatar>
                    <DialogTitle sx={{textAlign: "center", fontSize: '30px'}}>Profil Übersicht </DialogTitle>
                    <List>
                        {informations.length > 0 ? (
                            informations.map((informationListItem) => (
                                <ListItem sx={{borderBottom: 1, borderColor: "#eceff1", fontSize: '20px'}}
                                          key={informationListItem.getValueID()}>
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
                            <ChatIcon onClick={() => this.chatButtonFunction(showedUserId)}
                                      sx={{cursor: 'pointer', width: 35, height: 35}}></ChatIcon>
                        </Tooltip>
                    </Box>
                    {successAlert.length > 0 && (
                        <Alert severity="success"> {successAlert}</Alert>
                    )}
                    {warningAlert.length > 0 && (
                        <Alert severity="warning"> {warningAlert}</Alert>
                    )}
                </DialogContent>
                {loading && (
                    <LinearProgress/>
                )}
            </Box>
        )
    }
}

export default ExtendedProfileCard;