import React, {Component} from "react";
import MenuItem from "@mui/material/MenuItem";
import InfoSelectDialog from "./InfoSelectDialog";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import {KeyboardDoubleArrowRight} from "@mui/icons-material";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import Box from "@mui/material/Box";

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
        };
        this.handleOpenDialogSelect = this.handleOpenDialogSelect.bind(this);
        this.handleCloseDialogInfo = this.handleCloseDialogInfo.bind(this);
        this.handleListItemClick = this.handleListItemClick.bind(this);
        this.handleDeleteItemClick = this.handleDeleteItemClick.bind(this);
        this.handleAddItemClick = this.handleAddItemClick.bind(this);
        this.handleNewPropertyChange = this.handleNewPropertyChange.bind(this);
        this.handleAddProperty = this.handleAddProperty.bind(this);
    }

    componentDidMount() {

    }

    handleInputChangeSelectionName = (event) => {
        this.setState({PropertySelectionNameText: event.target.value});
    }

    handleInputChangeSelectionDescription = (event) => {
        this.setState({PropertySelectionDescriptionText: event.target.value});
    }

    handleInputChangeFreeTextName = (event) => {
        this.setState({PropertyFreeTextNameText: event.target.value});
    }

    handleInputChangeFreeTextDescription = (event) => {
        this.setState({PropertyFreeTextDescriptionText: event.target.value});
    }

    handleOpenDialogSelect() {
        this.setState({openDialogSelect: true});
    }

    addSelectionPropertyClickHandler = () => {
        this.buttonAddSelectionProperty();
        this.handleOpenDialogSelect();
    }

    addFreeTextPropertyClickHandler = () => {
        this.buttonAddFreeTextProperty();
        this.handleOpenDialogFreeText();
    }

    handleCloseDialogInfo() {
        const {isAddingNewProperty} = this.state;
        if (isAddingNewProperty) {
            this.setState({isAddingNewProperty: false});
        } else {
            this.setState({openDialogSelect: false});
        }
    }

    handleListItemClick(value) {
        this.handleCloseDialogInfo(value);
        this.handleCloseDialogProp();
    }

    handleDeleteItemClick(value) {
        const {properties} = this.state;
        const updatedProperties = properties.filter((property) => property !== value);
        this.setState({properties: updatedProperties});
    }

    handleAddItemClick() {
        this.setState({openDialogSelect: true, isAddingNewProperty: true});
    }

    handleNewPropertyChange(event) {
        this.setState({newProperty: event.target.value});
    }

    handleAddProperty() {
        const {properties, newProperty} = this.state;
        if (newProperty.trim() !== "") {
            const updatedProperties = [...properties, newProperty];
            this.setState({properties: updatedProperties, newProperty: ""});
        }
        this.handleCloseDialogInfo();
    }

    handleOpenDialogFreeText() {
        this.setState({openDialogFreeText: true});
    }

    handleCloseDialogFreeText() {
        this.setState({openDialogFreeText: false, selectedValue: this.props.value});
    }

    handleClick(value) {
        this.handleCloseDialogFreeText(value);
        this.handleCloseDialogProp();
    }


    handleGlobalPropertiesMenuSelectClick = (event) => {
        this.setState({anchorElSelect: event.currentTarget});
    };

    handleGlobalPropertiesMenuFreeTextClick = (event) => {
        this.setState({anchorElFreeText: event.currentTarget})
    }

    handleCloseGlobalPropertiesSelect = () => {
        this.setState({anchorElSelect: null});
    };

    handleCloseGlobalPropertiesFreeText = () => {
        this.setState({anchorElFreeText: null});
    };

    handleGlobalPropertiesItemClickSelect = () => {
        this.setState({anchorElSelect: null, openDialogSelect: true});
    };

    handleGlobalPropertiesItemClickFreeText = () => {
        this.setState({anchorElFreeText: null});
        this.handleOpenDialogFreeText();
    };

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
            </div>
        )
    }
}

export default PropertySelectMenuItem