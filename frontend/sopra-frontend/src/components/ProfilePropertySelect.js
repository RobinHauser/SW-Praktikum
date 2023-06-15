import React, { Component } from 'react';
import IconButton from "@mui/material/IconButton";
import EditSharpIcon from '@mui/icons-material/EditSharp';
import {ListItem, ListItemText} from "@mui/material";
import List from "@mui/material/List";
import Tooltip from "@mui/material/Tooltip";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import DeleteIcon from "@mui/icons-material/Delete";
import TextField from "@mui/material/TextField";
import RemoveCircleSharpIcon from "@mui/icons-material/RemoveCircleSharp";


/**
 * @author [Björn Till](https://github.com/BjoernTill)
 */

class ProfilePropertySelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openDialog: false,
            selectedValue: null,
            properties: [],
            newProperty: "",
            isAddingNewProperty: false,
        };

        this.handleOpenDialog = this.handleOpenDialog.bind(this);
        this.handleCloseDialog = this.handleCloseDialog.bind(this);
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

    handleOpenDialog() {
        this.setState({openDialog: true});
    }

    handleCloseDialog() {
        const { isAddingNewProperty } = this.state;
        if (isAddingNewProperty) {
            this.setState({ isAddingNewProperty: false });
        }  else {
            this.setState({ openDialog: false });
        }
    }

    handleListItemClick(value) {
        this.handleCloseDialog(value);
    }

    handleDeleteItemClick(value) {
        const {properties} = this.state;
        const updatedProperties = properties.filter((property) => property !== value);
        this.setState({properties: updatedProperties});
    }

    handleAddItemClick() {
        this.setState({openDialog:true, isAddingNewProperty: true });
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
        this.handleCloseDialog();
    }



    render() {
        const {value} = this.props;
        const {openDialog, properties, newProperty, isAddingNewProperty, selectedValue} = this.state;
        return (
            <div>
               <ListItem
                    sx={{ '&:hover': { bgcolor: '#c6e2ff' }, borderRadius: '10px' }}
               >
                    <ListItemText primary={`Eigenschaft ${value}: Value`} />
                    <ListItemSecondaryAction>
                        <Tooltip title="Auswahl-Eigenschaft bearbeiten">
                          <IconButton onClick={this.handleOpenDialog}>
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

                <Dialog open={openDialog} onClose={() => this.handleCloseDialog(null)}>
                    <DialogTitle>{`Eigenschaft ${value}`}</DialogTitle>
                    <DialogContent>
                        <DialogContentText> Diese Eigenschaft ist folgendermaßen beschrieben.
                            <List>
                                {properties.map((property) => (
                                <ListItem key={property} button onClick={() => this.handleListItemClick(property)}>
                                    <ListItemText sx={{textAlign: 'center', display: 'flex', justifyContent: 'center'}}
                                                  primary={property}/>
                                 <ListItemSecondaryAction>
                                     <IconButton
                                        edge="end"
                                        aria-label="Löschen"
                                        onClick={() => this.handleDeleteItemClick(property)}
                                     >
                                    <DeleteIcon />
                                    </IconButton>
                                </ListItemSecondaryAction>
                                </ListItem>
                            ))}
                            <ListItem button onClick={this.handleAddItemClick}>
                                <ListItemText  sx={{textAlign: 'center', display: 'flex', justifyContent: 'center'}}
                                               primary="Neues Info-Ojekt hinzufügen" />
                            </ListItem>
                            </List>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleCloseDialog}>Abbrechen</Button>
                    </DialogActions>
                </Dialog>
                <Dialog open={openDialog && isAddingNewProperty} onClose={this.handleCloseDialog}>
                    <DialogTitle>Neuen Eintrag hinzufügen</DialogTitle>
                    <DialogContent>
                        <TextField
                          autoFocus
                          margin="dense"
                          label="Name des Info-Objekts"
                          fullWidth
                          value={newProperty}
                          onChange={this.handleNewPropertyChange}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleCloseDialog}>Abbrechen</Button>
                        <Button onClick={() => this.handleAddProperty()} disabled={newProperty.trim() === ""}>
                            Hinzufügen
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default ProfilePropertySelect;

