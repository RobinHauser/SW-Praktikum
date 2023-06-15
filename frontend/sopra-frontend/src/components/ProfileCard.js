import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import placeHolderImage from '../static/images/profileImagePlaceholder.jpeg';
import Avatar from "@mui/material/Avatar";
import {Component} from "react";
import Dialog from "@mui/material/Dialog";
import ExtendedProfileCard from "./ExtendedProfileCard";
import SopraDatingAPI from "../api/SopraDatingAPI";

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
            addingError: null
        };

        this.handleOpenDialog = this.handleOpenDialog.bind(this);
        this.handleCloseDialog = this.handleCloseDialog.bind(this);

    }

    addUserToViewedList = () => {
        const { user, showedUser} = this.props
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
    }

    handleOpenDialog() {
        this.addUserToViewedList()
        this.setState({openDialog: true});
    }

    handleCloseDialog() {
        this.setState({openDialog: false, selectedValue: this.props.value});
    }

    render() {
        const {openDialog} = this.state;
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
                    <Avatar sx={{width: 56, height: 56, margin: "auto", mt: 1}} src={placeHolderImage}></Avatar>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {showedUser.getDisplayname()}
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
                    </CardContent>
                </Card>
                <Dialog open={openDialog} onClose={() => this.handleCloseDialog(null)}>

                    <ExtendedProfileCard
                        showedUser={showedUser}
                        onUserRemoved={onUserRemoved}
                        user={this.props.user}>
                    </ExtendedProfileCard>
                </Dialog>
            </div>
        )
    }
}

export default ProfileCard;