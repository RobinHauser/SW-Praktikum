import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Avatar from "@mui/material/Avatar";
import {Component} from "react";
import Dialog from "@mui/material/Dialog";
import ExtendedProfileCard from "./ExtendedProfileCard";
import SopraDatingAPI from "../api/SopraDatingAPI";
import {ListItem, ListItemText} from "@mui/material";

/**
 * @author [Jannik Haug, Theo Klautke, Michael Bergdolt]
 * Diaologhandling von Björn Till übernommen
 */
class ProfileCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openDialog: false,
            selectedValue: null,
            addingError: null,
            showedProfile: null,
            informations: []
        };

        this.handleOpenDialog = this.handleOpenDialog.bind(this);
        this.handleCloseDialog = this.handleCloseDialog.bind(this);
    }
    async componentDidMount() {
        const profile = this.getProfileOfShowedUser();
        await this.setState({
            showedProfile: profile
        })
        this.getInformationsByProfile();
    }

    getProfileOfShowedUser = () => {
        return SopraDatingAPI.getAPI().getProfile(this.props.showedUser.getUserID())
            .then(responseJSON => {
                return new Promise( (resolve) => {
                    resolve(responseJSON)
                })
            })
    }

    getInformationsByProfile = () => {
        this.state.showedProfile.then((profile) => {
            SopraDatingAPI.getAPI().getInformationsByProfile(profile.getProfileID())
            .then(responseJSON => {
                this.setState({
                    informations: responseJSON
                })
            }).catch(() => {
                this.setState({
                    informations: []
                })
            })
        })
    }
    /**
     * Adds the user to the viewed user list.
     * Calls the API to update the viewed user list in the backend.
     */
    addUserToViewedList = () => {
        const { user, showedUser} = this.props;
        SopraDatingAPI.getAPI().addUserToViewedlist(user.getUserID(), showedUser)
            .then(() => {
                this.setState({
                    addingError: null
                });
            }).catch(e => {
                this.setState({
                    addingError: e
                });
            });
    };

    /**
     * Handles the opening of the dialog.
     * Adds the user to the viewed user list before opening the dialog
     */
    handleOpenDialog() {
        this.addUserToViewedList();
        this.setState({openDialog: true});
    }

    /**
     * Handles the closing of the dialog.
     * removes the User from the shown list of profiles if the user only want to see new profiles
     */
    handleCloseDialog() {
        const { onUserRemoved, showOnlyNewUser, showedUser } = this.props;
        this.setState({openDialog: false, selectedValue: this.props.value});

        if(!showOnlyNewUser) {
            onUserRemoved(showedUser)
        }
    }

    render() {
        const {openDialog, informations} = this.state;
        const {showedUser, onUserRemoved} = this.props;

        return (
            <div>
                <Card direction="row"
                      justifycontent="space-evenly"
                      alignitems="center"
                      title="Mehr Infos & Interaktionen"

                      sx={{
                          border: 3,
                          borderBottom: 3,
                          borderRadius: 2,
                          borderColor: "#eceff1",
                          cursor: 'pointer',
                          ':hover': {boxShadow: 10},
                          minWidth: "300px"
                      }} //Quelle: https://stackoverflow.com/questions/37062176/mui-how-to-animate-card-depth-on-hover
                      onClick={this.handleOpenDialog}>
                    <Avatar sx={{width: 56, height: 56, margin: "auto", mt: 1}} src={this.props.showedUser.getAvatarURL()}></Avatar>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {showedUser.getDisplayname()}
                        </Typography>
                        {informations.length > 0 ? (
                            informations.map((informationListItem) => (
                                <Typography key={informationListItem.getValueID()} variant="h6" color="text.secondary" style={{textAlign: "left"}}>
                                    {`${informationListItem.getProperty()}: ${informationListItem.getValue()}`}
                                </Typography>
                            ))
                        ) : (
                            <Typography variant="body1">Keine Informationen zu diesem Profil vorhanden</Typography>
                        )}
                    </CardContent>
                </Card>
                <Dialog open={openDialog} onClose={() => this.handleCloseDialog(null)}>

                    <ExtendedProfileCard
                        showedUser={showedUser}
                        onUserRemoved={onUserRemoved}
                        user={this.props.user}
                        informations={this.state.informations}>
                    </ExtendedProfileCard>
                </Dialog>
            </div>
        );
    }
}

export default ProfileCard;