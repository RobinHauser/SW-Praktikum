import React, {Component} from "react";
import MenuItem from "@mui/material/MenuItem";
import InfoFreeTextDialog from "./InfoFreeTextDialog";

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
        };
        this.handleOpenDialogFreeText = this.handleOpenDialogFreeText.bind(this);
        this.handleCloseDialogFreeText = this.handleCloseDialogFreeText.bind(this);
        this.handleClick = this.handleClick.bind(this);
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
     * Sets the selectedValue to props.value
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
            profileId
        } = this.props
        const {openDialogFreeText} = this.state;
        return (
            <div>
                <MenuItem onClick={() => this.handleOpenDialogFreeText()}>
                    {this.props.InformationsBoProp}
                </MenuItem>

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
                />
            </div>
        )
    }
}

export default PropertyTextMenuItem