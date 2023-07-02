import React, {Component} from "react";
import MenuItem from "@mui/material/MenuItem";
import InfoFreeTextDialog from "./InfoFreeTextDialog";
import IconButton from "@mui/material/IconButton";
import BorderColorSharpIcon from "@mui/icons-material/BorderColorSharp";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import SopraDatingAPI from "../api/SopraDatingAPI";
import {Alert} from "@mui/material";

class PropertyTextMenuItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAddingNewProperty: false,
            openDialogSelect: null,
            openDialogFreeText: null,
            selectedValue: null,
            openSelectDialog: false,
            openFreeTextDialog: false,
            properties: [],
            newProperty: "",
            anchorElSelect: null,
            anchorElFreeText: null,
            globalPropertiesSelect: [],
            globalPropertiesFreeText: [],
            currentUser: null,
            personalProfile: null,
            loadingProgressUser: false,
            loadingProgressProfile: false,
            error: null,
            PropertyFreeTextNameText: '',
            PropertyFreeTextDescriptionText: '',
            successAlert: '',
        };
        this.handleOpenDialogFreeText = this.handleOpenDialogFreeText.bind(this);
        this.handleCloseDialogFreeText = this.handleCloseDialogFreeText.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleOpenFreeTextDialog = this.handleOpenFreeTextDialog.bind(this);
        this.handleCloseDialogProp = this.handleCloseDialogProp.bind(this);
    }

    /**
     * handles the dialog opening for component InfoFreeTextDialog
     * Sets the openDialogFreeText to true
     */
    handleOpenDialogFreeText() {
        this.setState({openDialogFreeText: true});
    }

    /**
     * handles the dialog closing for component InfoFreeTextDialog
     * Sets the openDialogFreeText to false
     * Sets the selectedValue to props value
     */
    handleCloseDialogFreeText() {
        this.setState({openDialogFreeText: false, selectedValue: this.props.value});
    }

    /**
     * handles the dialog button click for component InfoFreeTextDialog
     * triggers the handleCloseDialogFreeText function
     */
    handleClick(value) {
        this.handleCloseDialogFreeText(value);
    }

    /**
     * handles the opening for editing a text property
     * sets the status for the text fields to the current selection property name and description
     */
    handleOpenFreeTextDialog() {
        this.setState({
            openFreeTextDialog: true,
            PropertyFreeTextNameText: this.props.InformationsBoProp,
            PropertyFreeTextDescriptionText: this.props.InformationsBoPropDescr
        });


    }

    /**
     * ensures that the button is not clickable if the text fields are blank
     */
    isFormValidFreeText() {
        return (
            this.state.PropertyFreeTextNameText.trim() !== '' &&
            this.state.PropertyFreeTextDescriptionText.trim() !== ''
        );
    }

    /**
     * handles the dialog closing for component InfoFreeTextDialog
     * checks if isAddingNewProperty ist true
     * sets the isAddingNewProperty to false
     * sets the openDialogSelect to false
     */
    handleCloseDialogProp() {
        const {isAddingNewProperty} = this.state;
        if (isAddingNewProperty) {
            this.setState({isAddingNewProperty: false});
        } else {
            this.setState({
                openFreeTextDialog: false,
            });
        }
    }

    /**
     * updates the current property with the given name and description
     */
    updateTextProperty = (propertyBO) => {
        SopraDatingAPI.getAPI().updateTextProperty(this.props.InformationsBoPropId, propertyBO)
            .then(() => {
                this.setState({
                    error: null
                });
            }).catch(e => {
            this.setState({
                error: e
            });
        });
    };
    /**
     * button function to update the text property
     * sets a state to close the dialog and sets an alert message
     * triggers to updateTextProperty function to update the current property
     * sets a timeout for the alert message
     * triggers the function to get all text properties to fill the list on the profile page
     */
    addFreeTextPropertyClickHandler = () => {
        const {PropertyFreeTextNameText, PropertyFreeTextDescriptionText} = this.state;
        this.setState({openFreeTextDialog: false, successAlert: "Eigenschaft wurde geändert"})
        this.updateTextProperty({
            "name": `${PropertyFreeTextNameText}`,
            "description": `${PropertyFreeTextDescriptionText}`
        })
        this.setState({PropertyFreeTextNameText: '', PropertyFreeTextDescriptionText: ''})
        setTimeout(() => {
            this.setState({successAlert: ""})
        }, 3000);
        setTimeout(() => {
            this.props.getAllFreetextProperties()
        }, 200);
    }
    /**
     * handles the input change for the text field handleInputChangeFreeTextName
     */
    handleInputChangeFreeTextName = (event) => {
        this.setState({PropertyFreeTextNameText: event.target.value});
    }
    /**
     * handles the input change for the text field PropertyFreeTextDescriptionText
     */
    handleInputChangeFreeTextDescription = (event) => {
        this.setState({PropertyFreeTextDescriptionText: event.target.value});
    }

    /**
     * Renders the class component
     * @returns PropertyTextMenuItem - the rendered component
     */
    render() {
        const {
            InformationsBoPropDescr,
            InformationsBoPropId,
            InformationsBoProp,
            UserId,
            InformationsBoIsSelection,
            profileId,
            handleSuccessAlert
        } = this.props
        const {openDialogFreeText, openFreeTextDialog, successAlert} = this.state;
        return (
            <div>
                <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                    <MenuItem onClick={() => this.handleOpenDialogFreeText()}>
                        {this.props.InformationsBoProp}
                    </MenuItem>
                    <Tooltip title="Freitext-Eigenschaft bearbeiten">
                        <IconButton onClick={this.handleOpenFreeTextDialog}>
                            <BorderColorSharpIcon/>
                        </IconButton>
                    </Tooltip>
                </Box>
                {successAlert.length > 0 && (
                    <Alert severity="success">{successAlert}</Alert>
                )}
                <InfoFreeTextDialog
                    openDialogFreeText={openDialogFreeText}
                    handleCloseDialogFreeText={this.handleCloseDialogFreeText}
                    handleClick={this.handleClick}
                    value={InformationsBoProp}
                    InformationsBoPropId={InformationsBoPropId}
                    InformationsBoPropDescr={InformationsBoPropDescr}
                    InformationsBoProp={InformationsBoProp}
                    UserId={UserId}
                    InformationsBoIsSelection={InformationsBoIsSelection}
                    profileId={profileId}
                    handleSuccessAlert={handleSuccessAlert}
                />
                <Dialog open={openFreeTextDialog} onClose={() => this.handleCloseDialogProp(null)}>
                    <DialogTitle>Freitext-Eigenschaft bearbeiten</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Bearbeite die selektierte Eigenschaft, indem du den Name und die Beschreibung der
                            Eigenschaft bearbeitest.
                        </DialogContentText>
                        <TextField
                            value={this.state.PropertyFreeTextNameText}
                            onChange={this.handleInputChangeFreeTextName}
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Name"
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            value={this.state.PropertyFreeTextDescriptionText}
                            onChange={this.handleInputChangeFreeTextDescription}
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Beschreibung"
                            fullWidth
                            variant="standard"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleCloseDialogProp}>Abbrechen</Button>
                        <Button onClick={this.addFreeTextPropertyClickHandler}
                                disabled={!this.isFormValidFreeText()}>Anlegen</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default PropertyTextMenuItem