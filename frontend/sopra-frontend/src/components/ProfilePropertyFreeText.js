import React, {Component} from 'react';
import IconButton from "@mui/material/IconButton";
import BorderColorSharpIcon from '@mui/icons-material/BorderColorSharp';
import {Alert, ListItem, ListItemText} from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveCircleSharpIcon from "@mui/icons-material/RemoveCircleSharp";
import InfoFreeTextDialog from "./InfoFreeTextDialog";
import SopraDatingAPI from "../api/SopraDatingAPI";
import Box from "@mui/material/Box";
import Typography from '@mui/material/Typography';

/**
 * @author [Björn Till](https://github.com/BjoernTill)
 * @author [Jannik Haug](https://github.com/JannikHaug)
 */

class ProfilePropertyFreeText extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openDialogFreeText: false,
            selectedValue: null,
        };

        this.handleOpenDialogFreeText = this.handleOpenDialogFreeText.bind(this);
        this.handleCloseDialogFreeText = this.handleCloseDialogFreeText.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    /**
     * Button function for deleting an information from the profile
     */
    deleteInformationFromProfileButton = () => {
        this.deleteInformation(this.props.InformationsBoInfoId)
    }
    /**
     * API call function for deleting an information from the profile
     */
    deleteInformation = (informationId) => {
        SopraDatingAPI.getAPI().deleteInformationById(informationId).then(() => {
            this.setState({
                deletingError: null
            });
            this.props.handleSuccessAlert("Löschen aus dem Profil war erfolgreich")
            //this.props.onUserRemoved(blockedUser);
        }).catch(e => {
            this.setState({
                deletingError: e
            });
        });
    }
    /**
     * Button function for deleting a property out of the system
     */
    deletePropertyFromSystemButton = () => {
        console.log(this.props.InformationsBoPropId)
        this.deleteProperty(this.props.InformationsBoPropId)
    }
    /**
     * API call function for deleting a property out of the system
     */
    deleteProperty = (propertyId) => {
        SopraDatingAPI.getAPI().deleteTextPropertyFromSystemById(propertyId)
            .then(() => {
                this.setState({
                    deletingError: null
                });
                this.props.handleSuccessAlert("Löschen aus dem System war erfolgreich")
                this.props.getAllFreeTextProperties()
                //this.props.onUserRemoved(blockedUser);
            }).catch(e => {
            this.setState({
                deletingError: e
            });
        });
    }

    handleOpenDialogFreeText() {
        this.setState({openDialogFreeText: true});
    }

    handleCloseDialogFreeText() {
        this.setState({openDialogFreeText: false, selectedValue: this.props.value});
    }

    handleClick(value) {
        this.handleCloseDialogFreeText(value);
    }


    render() {
        const {
            InformationsBoValue,
            InformationsBoProp,
            InformationsBoId,
            InformationsBoPropId,
            InformationsBoPropDescr,
            InformationsBoInfoId,
        } = this.props;
        const {openDialogFreeText} = this.state;
        return (
            <div>
                <Box sx={{display: 'flex', justifyContent: 'space-evenly', flexDirection: 'row'}}>
                    <ListItem sx={{'&:hover': {bgcolor: '#c6e2ff'}, borderRadius: '10px'}}>
                        <ListItemText
                            primary={
                                <Typography variant="body1" component="span">
                                    <strong>{InformationsBoProp}:</strong> {InformationsBoValue}
                                </Typography>
                            }
                        />
                    </ListItem>
                    <Box sx={{display: 'flex', justifyContent: 'space-evenly', flexDirection: 'row'}}>
                        <Tooltip title="Freitext-Information bearbeiten">
                            <IconButton onClick={this.handleOpenDialogFreeText}>
                                <BorderColorSharpIcon/>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Information aus Profil entfernen">
                            <IconButton onClick={this.deleteInformationFromProfileButton}>
                                <RemoveCircleSharpIcon/>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Eigenschaft aus dem System löschen">
                            <IconButton onClick={this.deletePropertyFromSystemButton}>
                                <DeleteIcon/>
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Box>
                <InfoFreeTextDialog
                    openDialogFreeText={openDialogFreeText}
                    handleCloseDialogFreeText={this.handleCloseDialogFreeText}
                    handleClick={this.handleClick}
                    value={InformationsBoProp}
                    InformationsBoProp={InformationsBoProp}
                    InformationsBoValue={InformationsBoValue}
                    InformationsBoId={InformationsBoId}
                    InformationsBoPropId={InformationsBoPropId}
                    InformationsBoPropDescr={InformationsBoPropDescr}
                    InformationsBoInfoId={InformationsBoInfoId}
                />
            </div>
        )
            ;
    }
}

export default ProfilePropertyFreeText;