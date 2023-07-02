import * as React from 'react';
import {Component} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import BlockIcon from "@mui/icons-material/Block";
import ChatIcon from "@mui/icons-material/Chat";
import Box from "@mui/material/Box";
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';
import SopraDatingAPI from "../api/SopraDatingAPI";
import {Alert, CircularProgress, LinearProgress} from "@mui/material";

class BookmarkProfileCard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            addingError: null,
            deletingError: null,
            showedProfile: null,
            informations: [],
            successAlert: "",
            warningAlert: "",
            loadingCircularProgress: true,
            loadingLinearProgress: false
        };
    }

    async componentDidMount() {
        let profile = await this.getProfileOfShowedUser();
        await this.getInformationsByProfile(profile);
    }

    /**
     * get profile of the displayed user
     */
    getProfileOfShowedUser = async () => {
        try {
            this.setState({loadingCircularProgress: true})
            return await SopraDatingAPI.getAPI().getProfile(this.props.bookmarkedUser.getUserID())
        } catch (error) {
            console.log(error);
            this.setState({loadingCircularProgress: false})
            return null
        }
    };

    /**
     * get All Informations of a Profile
     */
    getInformationsByProfile = async (profile) => {
        try {
            const responseJSON = await SopraDatingAPI.getAPI().getInformationsByProfile(profile.getProfileID());
            this.setState({
                informations: responseJSON
            });
            this.setState({loadingCircularProgress: false})
        } catch (error) {
            this.setState({
                informations: []
            });
        }
    };

    /**
     * Blocks the user by adding them to the blocklist
     * Calls the API to remove the user from the bookmarklist and to add it to the blocklist
     */
    blockUser = async () => {
        const {bookmarkedUser, user} = this.props;
        try {
            this.setState({loadingLinearProgress: true})
            await Promise.all([
                SopraDatingAPI.getAPI().addUserToBlocklist(user.getUserID(), bookmarkedUser),
                SopraDatingAPI.getAPI().removeUserFromBookmarklist(user.getUserID(), bookmarkedUser)
            ]);

            this.setState({
                addingError: null
            });

            this.props.onUserRemoved(bookmarkedUser);
            this.setState({loadingLinearProgress: false})
        } catch (error) {
            this.setState({
                addingError: error
            });
            this.setState({loadingLinearProgress: false})
        }
    };

    /**
     * Removes the user from the bookmarklist
     * Calls the API to remove the user from the bookmarklist
     */
    removeUserFromBookmarklist = async () => {
        const {bookmarkedUser, user} = this.props;
        try {
            this.setState({loadingLinearProgress: true})
            await SopraDatingAPI.getAPI().removeUserFromBookmarklist(user.getUserID(), bookmarkedUser);
            this.setState({
                deletingError: null
            });
            this.props.onUserRemoved(bookmarkedUser);
            this.setState({loadingLinearProgress: false})
        } catch (error) {
            this.setState({
                deletingError: error
            });
            this.setState({loadingLinearProgress: false})
        }
    };


    /**
     * Adds a specific other user to the chats of current user
     * Calls the API to add the other user to the chats of the current user
     *
     * @param {UserBO} userToAdd - the user to add to a chat
     */
    addUserToChat = async (userToAdd) => {
        try {
            this.setState({loadingLinearProgress: true})
            await SopraDatingAPI.getAPI().addUserToChat(this.props.user.getUserID(), userToAdd);
            this.setState({loadingLinearProgress: false})
            this.setState({
                successAlert: "User zum Chat hinzugefügt"
            });
            setTimeout(() => {
                this.setState({successAlert: ""});
            }, 3000);
        } catch (error) {
            this.setState({
                warningAlert: "Der User kann nicht erneut zum Chat hinzugefügt werden"
            });
            this.setState({loadingLinearProgress: false})
            setTimeout(() => {
                this.setState({warningAlert: ""});
            }, 3000);
        }
    };


    /**
     * Add a user to the chat
     *
     * @param {UserBO} userToAdd - user to add to the chat
     */
    chatButtonFunction(userToAdd) {
        var addObject = {
            "UserID": userToAdd
        }
        this.addUserToChat(addObject)
    }

    render() {
        const {bookmarkedUser} = this.props;
        const {informations, successAlert, warningAlert, loadingCircularProgress, loadingLinearProgress} = this.state;
        const bookMarkedUserId = parseInt(this.props.bookmarkedUser.getUserID())
        return (
            <Box>
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
                    <Avatar sx={{width: 56, height: 56, margin: "auto", mt: 1}}
                            src={bookmarkedUser.getAvatarURL()}></Avatar>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {bookmarkedUser.getDisplayname()}
                        </Typography>
                        {informations.length > 0 ? (
                            informations.map((informationListItem) => (
                                <Typography key={informationListItem.getValueID()} variant="h6" color="text.secondary"
                                            style={{textAlign: "left"}}>
                                    {`${informationListItem.getProperty()}: ${informationListItem.getValue()}`}
                                </Typography>
                            ))
                        ) : (loadingCircularProgress ? (
                            <CircularProgress/>
                        ) : (
                            <Typography variant="body1">Keine Informationen zu diesem Profil vorhanden</Typography>
                        ))}
                        <Box sx={{marginTop: 5, display: 'flex', justifyContent: 'space-between'}}>
                            <Tooltip title="User blockieren">
                                <BlockIcon onClick={() => this.blockUser()}
                                           sx={{cursor: 'pointer', width: 35, height: 35}}></BlockIcon>
                            </Tooltip>
                            <Tooltip title="User von Merkliste entfernen">
                                <HeartBrokenIcon onClick={() => this.removeUserFromBookmarklist()}
                                                 sx={{cursor: 'pointer', width: 35, height: 35}}></HeartBrokenIcon>
                            </Tooltip>
                            <Tooltip title="User zum Chat hinzufügen">
                                <ChatIcon onClick={() => this.chatButtonFunction(bookMarkedUserId)}
                                          sx={{cursor: 'pointer', width: 35, height: 35}}></ChatIcon>
                            </Tooltip>
                        </Box>
                        {successAlert.length > 0 && (
                            <Alert severity="success"> {successAlert}</Alert>
                        )}
                        {warningAlert.length > 0 && (
                            <Alert severity="warning"> {warningAlert}</Alert>
                        )}
                    </CardContent>
                    {loadingLinearProgress && (
                        <LinearProgress/>
                    )}
                </Card>
            </Box>
        );
    }
}

export default BookmarkProfileCard;