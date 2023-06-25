import React, { Component } from 'react';
import IconButton from "@mui/material/IconButton";
import EditSharpIcon from '@mui/icons-material/EditSharp';
import {ListItem, ListItemText} from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveCircleSharpIcon from "@mui/icons-material/RemoveCircleSharp";
import InfoSelectDialog from "./InfoSelectDialog";
import InformationBO from "../api/InformationBO";

/**
 * @author [Björn Till](https://github.com/BjoernTill)
 */

class ProfilePropertySelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openDialogSelect: false,
            selectedValue: null,
            properties: [],
            newProperty: "",
            isAddingNewProperty: false,
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
        const exampleProperties = ["Value 1", "Value 2", "Value 3"];
        this.setState({properties: exampleProperties});
    }

    handleOpenDialogSelect() {
        this.setState({openDialogSelect: true});
    }

    handleCloseDialogInfo() {
        const { isAddingNewProperty } = this.state;
        console.log(this.state.openDialogSelect)
        if (isAddingNewProperty) {
            this.setState({ isAddingNewProperty: false });
        }
        else {
            this.setState({ openDialogSelect: false });
        }
    }

    handleListItemClick() {
        this.handleCloseDialogInfo();
    }

    handleDeleteItemClick(value) {
      const { properties } = this.state;
      const updatedProperties = properties.filter((property) => property !== value);
      this.setState({ properties: updatedProperties });
    }

    handleAddItemClick() {
        this.setState({openDialogSelect:true, isAddingNewProperty: true });
    }

    handleNewPropertyChange(event) {
        this.setState({newProperty: event.target.value });
    }

    handleAddProperty() {
        const {properties, newProperty} = this.state;
        if (newProperty.trim() !== "") {
            const updatedProperties = [...properties, newProperty];
            this.setState({properties: updatedProperties, newProperty: ""});
        }
        this.handleCloseDialogInfo();
    }

    render() {
        const {InformationsBoValue, InformationsBoProp, InformationsBoId} = this.props;
        const {openDialogSelect, properties, newProperty, isAddingNewProperty} = this.state;
        console.log(InformationsBoValue)
        console.log(InformationsBoProp)
        console.log(InformationsBoId)
        return (
            <div>
               <ListItem
                    sx={{ '&:hover': { bgcolor: '#c6e2ff' }, borderRadius: '10px' }}
               >
                    <ListItemText primary={`Eigenschaft ${InformationsBoProp}: ${InformationsBoValue}` } />
                    <ListItemSecondaryAction>
                        <Tooltip title="Auswahl-Eigenschaft bearbeiten">
                          <IconButton onClick={this.handleOpenDialogSelect}>
                            <EditSharpIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Eigenschaft aus Profil entfernen">
                          <IconButton onClick={this.handleRemoveItemClick}>
                            <RemoveCircleSharpIcon/>
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Eigenschaft aus App löschen">
                          <IconButton onClick={this.handleDeleteItemClick}>
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </ListItemSecondaryAction>
                    </ListItem>

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
                        value={InformationsBoValue}
                    />
            </div>
        );
    }
}

export default ProfilePropertySelect;

