import React, {Component} from 'react';
import IconButton from "@mui/material/IconButton";
import EditSharpIcon from '@mui/icons-material/EditSharp';
import {ListItem, ListItemText} from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveCircleSharpIcon from "@mui/icons-material/RemoveCircleSharp";
import InfoSelectDialog from "./InfoSelectDialog";
import InformationBO from "../api/InformationBO";
import SopraDatingAPI from "../api/SopraDatingAPI";
import Box from "@mui/material/Box";

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
    }

    deletePropertyFromSystemButton = () => {
        this.deleteProperty(this.props.InformationsBoPropId)
    }
    deleteProperty = (propertyId) => {
        SopraDatingAPI.getAPI().deleteSelectPropertyFromSystemById(propertyId).then(() => {
            this.setState({
                deletingError: null
            });
            alert("Löschen aus dem System war erfolgreich")
            //this.props.onUserRemoved(blockedUser);
        }).catch(e => {
            this.setState({
                deletingError: e
            });
        });
    }
    deleteInformationFromProfileButton = () => {
        this.deleteInformation(this.props.InformationsBoInfoId)
    }
    deleteInformation = (informationId) => {
        SopraDatingAPI.getAPI().deleteInformationById(informationId).then(() => {
            this.setState({
                deletingError: null
            });
            alert("Löschen aus dem System war erfolgreich")
            //this.props.onUserRemoved(blockedUser);
        }).catch(e => {
            this.setState({
                deletingError: e
            });
        });
    }

    handleOpenDialogSelect() {
        this.setState({openDialogSelect: true});
    }

    handleCloseDialogInfo() {
        const {isAddingNewProperty} = this.state;
        if (isAddingNewProperty) {
            this.setState({isAddingNewProperty: false});
        } else {
            this.setState({openDialogSelect: false});
        }
    }

    handleListItemClick() {
        this.handleCloseDialogInfo();
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

    render() {
        const {
            InformationsBoValue,
            InformationsBoProp,
            InformationsBoId,
            InformationsBoPropId,
            InformationsBoPropDescr,
            InformationsBoInfoId
        } = this.props;
        const {openDialogSelect, properties, newProperty, isAddingNewProperty} = this.state;
        return (
            <div>
                <Box sx={{display: 'flex', justifyContent: 'space-evenly', flexDirection: 'row'}}>
                    <ListItem
                        sx={{'&:hover': {bgcolor: '#c6e2ff'}, borderRadius: '10px'}}
                    >
                        <ListItemText primary={`Eigenschaft ${InformationsBoProp}: ${InformationsBoValue}`}/>
                    </ListItem>
                    <Box sx={{display: 'flex', justifyContent: 'space-evenly', flexDirection: 'row'}}>
                        <Tooltip title="Auswahl-Eigenschaft bearbeiten">
                            <IconButton onClick={this.handleOpenDialogSelect}>
                                <EditSharpIcon/>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Information aus Profil entfernen">
                            <IconButton onClick={this.deleteInformationFromProfileButton}>
                                <RemoveCircleSharpIcon/>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Eigenschaft aus dem System entfernen">
                            <IconButton onClick={this.deletePropertyFromSystemButton}>
                                <DeleteIcon/>
                            </IconButton>
                        </Tooltip>
                    </Box>


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
                    InformationsBoProp={InformationsBoProp}
                    InformationsBoValue={InformationsBoValue}
                    InformationsBoId={InformationsBoId}
                    InformationsBoPropId={InformationsBoPropId}
                    InformationsBoPropDescr={InformationsBoPropDescr}
                    InformationsBoInfoId={InformationsBoInfoId}
                />
            </div>
        );
    }
}

export default ProfilePropertySelect;

