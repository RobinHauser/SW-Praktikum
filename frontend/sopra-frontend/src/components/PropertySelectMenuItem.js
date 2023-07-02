import React, {Component} from "react";
import MenuItem from "@mui/material/MenuItem";
import InfoSelectDialog from "./InfoSelectDialog";
import {Alert} from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import BorderColorSharpIcon from "@mui/icons-material/BorderColorSharp";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import SopraDatingAPI from "../api/SopraDatingAPI";

class PropertySelectMenuItem extends Component {
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
            PropertySelectionNameText: '',
            PropertySelectionDescriptionText: '',
            warningAlert: "",
            successAlert: "",
        };
        this.handleOpenDialogSelect = this.handleOpenDialogSelect.bind(this);
        this.handleCloseDialogInfo = this.handleCloseDialogInfo.bind(this);
        this.handleListItemClick = this.handleListItemClick.bind(this);
        this.handleDeleteItemClick = this.handleDeleteItemClick.bind(this);
        this.handleAddItemClick = this.handleAddItemClick.bind(this);
        this.handleNewPropertyChange = this.handleNewPropertyChange.bind(this);
        this.handleAddProperty = this.handleAddProperty.bind(this);
        this.handleOpenSelectDialog = this.handleOpenSelectDialog.bind(this);
        this.handleCloseDialogProp = this.handleCloseDialogProp.bind(this);
    }


    /**
     * handles the dialog closing for component InfoSelectDialog
     * checks if isAddingNewProperty ist true
     * sets the isAddingNewProperty to false
     * sets the openDialogSelect to false
     */
    handleCloseDialogInfo() {
        const {isAddingNewProperty} = this.state;
        if (isAddingNewProperty) {
            this.setState({isAddingNewProperty: false});
        } else {
            this.setState({openDialogSelect: false});
        }
    }

    /**
     * handles the open dialog and sets the openDialogSelect state on tru
     */
    handleOpenDialogSelect() {
        this.setState({openDialogSelect: true});
    }

    /**
     * handles the dialog button click for component InfoSelectDialog
     * triggers the handleCloseDialogInfo function
     * triggers the handleCloseDialogProp function
     */
    handleListItemClick(value) {
        this.handleCloseDialogInfo(value);
        this.handleCloseDialogProp();
    }

    /**
     * handles the dialog delete button click for component InfoSelectDialog
     */
    handleDeleteItemClick(value) {
        const {properties} = this.state;
        const updatedProperties = properties.filter((property) => property !== value);
        this.setState({properties: updatedProperties});
    }

    /**
     * handles the dialog button click for component InfoSelectDialog
     * sets the isAddingNewProperty to true
     * sets the openDialogSelect to true
     */
    handleAddItemClick() {
        this.setState({openDialogSelect: true, isAddingNewProperty: true});
    }

    /**
     * handles the textfield InfoSelectDialog
     * retrieves the current text in the textfield and sets newProperty to it
     */
    handleNewPropertyChange(event) {
        this.setState({newProperty: event.target.value});
    }

    /**
     * Checks if the textfield is empty and closes the dialog
     */
    handleAddProperty() {
        const {properties, newProperty} = this.state;
        if (newProperty.trim() !== "") {
            const updatedProperties = [...properties, newProperty];
            this.setState({properties: updatedProperties, newProperty: ""});
        }
        this.handleCloseDialogInfo();
    }

    /**
     * handles the opening for editing a selection property
     * sets the status for the text fields to the current selection property name and description
     */
    handleOpenSelectDialog() {
        this.setState({
            openSelectDialog: true,
            PropertySelectionNameText: this.props.InformationsBoProp,
            PropertySelectionDescriptionText: this.props.InformationsBoPropDescr
        });

    }

    /**
     * handles the closing for editing a selection property
     */
    handleCloseDialogProp() {
        const {isAddingNewProperty} = this.state;
        if (isAddingNewProperty) {
            this.setState({isAddingNewProperty: false});
        } else {
            this.setState({
                openSelectDialog: false,
                openFreeTextDialog: false,
            });
        }
    }

    /**
     * ensures that the button is not clickable if the text fields are blank
     */
    isFormValidSelect() {
        return (
            this.state.PropertySelectionNameText.trim() !== '' &&
            this.state.PropertySelectionDescriptionText.trim() !== ''
        );
    }

    /**
     * handles the input change for the text field PropertySelectionNameText
     */
    handleInputChangeSelectionName = (event) => {
        this.setState({PropertySelectionNameText: event.target.value});
    }
    /**
     * handles the input change for the text field PropertySelectionDescriptionText
     */
    handleInputChangeSelectionDescription = (event) => {
        this.setState({PropertySelectionDescriptionText: event.target.value});
    }
    /**
     * button function to update the selection property
     * sets a state to close the dialog and sets an alert message
     * triggers to updateSelectionProperty function to update the current property
     * sets a timeout for the alert message
     * triggers the function to get all selection properties to fill the list on the profile page
     */
    updateSelectionPropertyClickHandler = () => {
        const {PropertySelectionNameText, PropertySelectionDescriptionText} = this.state;
        this.setState({openSelectDialog: false, successAlert: "Eigenschaft wurde geändert"})
        this.updateSelectionProperty({
            "id": this.props.InformationsBoPropId,
            "name": `${PropertySelectionNameText}`,
            "isSelection": true,
            "description": `${PropertySelectionDescriptionText}`
        })
        this.setState({PropertySelectionNameText: '', PropertySelectionDescriptionText: ''})
        setTimeout(() => {
            this.setState({successAlert: ""})
        }, 3000);
        setTimeout(() => {
            this.props.getAllSelectionProperties()
        }, 200);
    }
    /**
     * updates the current property with the given name and description
     */
    updateSelectionProperty = (propertyBO) => {
        SopraDatingAPI.getAPI().updateSelectionProperty(this.props.InformationsBoPropId, propertyBO)
            .then(() => {
                this.setState({
                    error: null
                });
            }).catch(e => {
            this.setState({
                error: e,
            });
        });
    };

    /**
     * Renders the class component
     * @returns PropertySelectMenuItem - the rendered component
     */
    render() {
        const {
            InformationsBoPropDescr,
            InformationsBoPropId,
            InformationsBoProp,
            UserId,
            InformationsBoIsSelection,
            profileId
        } = this.props
        const {
            openDialogSelect,
            properties,
            newProperty,
            isAddingNewProperty,
            openSelectDialog,
            successAlert
        } = this.state;
        return (
            <div>
                <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                    <MenuItem onClick={() => this.handleOpenDialogSelect()}>
                        {this.props.InformationsBoProp}
                    </MenuItem>
                    <Tooltip title="Auswahl-Eigenschaft bearbeiten">
                        <IconButton onClick={this.handleOpenSelectDialog}>
                            <BorderColorSharpIcon/>
                        </IconButton>
                    </Tooltip>
                </Box>
                {successAlert.length > 0 && (
                    <Alert severity="success">{successAlert}</Alert>
                )}
                <InfoSelectDialog
                    openDialogSelect={openDialogSelect}
                    handleCloseDialogInfo={this.handleCloseDialogInfo}
                    handleListItemClick={this.handleListItemClick}
                    handleDeleteItemClick={this.handleDeleteItemClick}
                    handleAddItemClick={this.handleAddItemClick}
                    properties={properties}
                    newProperty={newProperty}
                    isAddingNewProperty={isAddingNewProperty}
                    handleNewPropertyChange={this.handleNewPropertyChange}
                    handleAddProperty={this.handleAddProperty}
                    InformationsBoPropId={InformationsBoPropId}
                    InformationsBoPropDescr={InformationsBoPropDescr}
                    InformationsBoProp={InformationsBoProp}
                    UserId={UserId}
                    InformationsBoIsSelection={InformationsBoIsSelection}
                    profileId={profileId}
                />
                <Dialog open={openSelectDialog} onClose={() => this.handleCloseDialogProp(null)}>
                    <DialogTitle>Auswahl-Eigenschaft bearbeiten</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Bearbeite die selektierte Eigenschaft, indem du den Name und die Beschreibung der
                            Eigenschaft bearbeitest.
                        </DialogContentText>
                        <TextField
                            value={this.state.PropertySelectionNameText}
                            onChange={this.handleInputChangeSelectionName}
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Name"
                            fullWidth
                            variant="standard"/>
                        <TextField
                            value={this.state.PropertySelectionDescriptionText}
                            onChange={this.handleInputChangeSelectionDescription}
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Beschreibung"
                            fullWidth
                            variant="standard"/>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleCloseDialogProp}>Abbrechen</Button>
                        <Button onClick={this.updateSelectionPropertyClickHandler}
                                disabled={!this.isFormValidSelect()}>Anlegen </Button>
                    </DialogActions>
                </Dialog>

            </div>
        )
    }
}

export default PropertySelectMenuItem