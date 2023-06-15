import React, { Component } from 'react';
import IconButton from "@mui/material/IconButton";
import {ListItem, ListItemText} from "@mui/material";
import List from "@mui/material/List";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import DeleteIcon from "@mui/icons-material/Delete";
import TextField from "@mui/material/TextField";


/**


 * @author [Björn Till](https://github.com/BjoernTill)
 */

class PropSelectDialog extends Component {

    render() {
        const {
          openDialog,
          value,
          properties,
          isAddingNewProperty,
          newProperty,
          handleCloseDialog,
          handleListItemClick,
          handleDeleteItemClick,
          handleAddItemClick,
          handleNewPropertyChange,
          handleAddProperty
        } = this.props;

        return (
                <div>
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
                                                    <DeleteIcon/>
                                                </IconButton>
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                    ))}
                                    <ListItem button onClick={this.handleAddItemClick}>
                                        <ListItemText sx={{textAlign: 'center', display: 'flex', justifyContent: 'center'}}
                                                      primary="Neues Info-Ojekt hinzufügen"/>
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
        );
    }
}
    
export default PropSelectDialog;