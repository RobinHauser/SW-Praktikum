import React, {Component} from 'react';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { ListItem, ListItemText } from "@mui/material";
import List from "@mui/material/List";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import TextField from "@mui/material/TextField";

class InfoSelectDialog extends Component {
  render() {
    const {
        openDialogSelect,
        handleCloseDialogInfo,
        handleListItemClick,
        handleDeleteItemClick,
        handleAddItemClick,
        properties,
        newProperty,
        isAddingNewProperty,
        handleNewPropertyChange,
        handleAddProperty,
        value
    } = this.props;
    
    return (
        <div>
            <Dialog open={openDialogSelect} onClose={() => handleCloseDialogInfo(null)}>
                <DialogTitle>{`Eigenschaft ${value}`}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Diese Eigenschaft ist folgendermaßen beschrieben.
                        <List>
                            {properties.map((property) => (
                                <ListItem
                                    key={property}
                                    button
                                >
                                    <ListItemText
                                        sx={{
                                            textAlign: 'center',
                                            display: 'flex',
                                            justifyContent: 'center',
                                        }}
                                        primary={property}
                                        onClick={() => handleListItemClick(property)}
                                    />
                                    <IconButton
                                        edge="end"
                                        aria-label="Löschen"
                                        onClick={() => handleDeleteItemClick(property)}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </ListItem>
                            ))}
                            <ListItem button onClick={handleAddItemClick}>
                              <ListItemText
                                sx={{
                                  textAlign: 'center',
                                  display: 'flex',
                                  justifyContent: 'center',
                                }}
                                primary="Neue Option hinzufügen"
                              />
                            </ListItem>
                        </List>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialogInfo}>Abbrechen</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openDialogSelect && isAddingNewProperty} onClose={handleCloseDialogInfo}>
              <DialogTitle>Neuen Eintrag hinzufügen</DialogTitle>
              <DialogContent>
                <TextField
                  autoFocus
                  margin="dense"
                  label="Name des Info-Objekts"
                  fullWidth
                  value={newProperty}
                  onChange={handleNewPropertyChange}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDialogInfo}>Abbrechen</Button>
                <Button
                  onClick={() => handleAddProperty()}
                  disabled={newProperty.trim() === ""}
                >
                  Hinzufügen
                </Button>
              </DialogActions>
            </Dialog>
        </div>
    );
  }
}

export default InfoSelectDialog;