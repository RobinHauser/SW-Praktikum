import React, {Component} from "react";
import MenuItem from "@mui/material/MenuItem";
import InfoSelectDialog from "./InfoSelectDialog";
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

    handleOpenSelectDialog() {
        this.setState({openSelectDialog: true});
    }

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

    isFormValidSelect() {
        return (
            this.state.PropertySelectionNameText.trim() !== '' &&
            this.state.PropertySelectionDescriptionText.trim() !== ''
        );
    }

    handleInputChangeSelectionName = (event) => {
        this.setState({PropertySelectionNameText: event.target.value});
    }

    handleInputChangeSelectionDescription = (event) => {
        this.setState({PropertySelectionDescriptionText: event.target.value});
    }
    updateSelectionPropertyClickHandler = () => {
        const {PropertySelectionNameText, PropertySelectionDescriptionText} = this.state;
        this.setState({openSelectDialog: false, successAlert: "neue Auswahleigenschaft der Liste hinzugefügt"})
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
    }
    updateSelectionProperty = (propertyBO) => {
        SopraDatingAPI.getAPI().updateProperty(this.props.InformationsBoPropId, propertyBO)
            .then(() => {
                this.setState({
                    error: null
                });
                this.getAllSelectionProperties()
            }).catch(e => {
            this.setState({
                error: e
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
        const {openDialogSelect, properties, newProperty, isAddingNewProperty, openSelectDialog} = this.state;
        return (
            <div>
                <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                    <MenuItem onClick={() => this.handleOpenDialogSelect()}>
                        {this.props.InformationsBoProp}
                    </MenuItem>
                    <Tooltip title="Freitext-Eigenschaft bearbeiten">
                        <IconButton onClick={this.handleOpenSelectDialog}>
                            <BorderColorSharpIcon/>
                        </IconButton>
                    </Tooltip>
                </Box>
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
                    <DialogTitle>Auswahl-Eigenschaft hinzufügen</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Füge eine neue Auswahl-Eigenschaft hinzu, indem du den Name und die Beschreibung der
                            Eigenschaft angibst.
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