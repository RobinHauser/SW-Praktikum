import React, {Component} from "react";
import MenuItem from "@mui/material/MenuItem";
import InfoSelectDialog from "./InfoSelectDialog";
import {Alert} from "@mui/material";

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
            warningAlert: ""
        };
        this.handleOpenDialogSelect = this.handleOpenDialogSelect.bind(this);
        this.handleCloseDialogInfo = this.handleCloseDialogInfo.bind(this);
        this.handleDeleteItemClick = this.handleDeleteItemClick.bind(this);
        this.handleAddItemClick = this.handleAddItemClick.bind(this);
        this.handleNewPropertyChange = this.handleNewPropertyChange.bind(this);
        this.handleAddProperty = this.handleAddProperty.bind(this);
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
        const {openDialogSelect, properties, newProperty, isAddingNewProperty} = this.state;
        return (
            <div>
                <MenuItem onClick={() => this.handleOpenDialogSelect()}>
                    {this.props.InformationsBoProp}
                </MenuItem>

                <InfoSelectDialog
                    openDialogSelect={openDialogSelect}
                    handleCloseDialogInfo={this.handleCloseDialogInfo}
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
            </div>
        )
    }
}

export default PropertySelectMenuItem