import React, { Component } from 'react';
import IconButton from "@mui/material/IconButton";
import BorderColorSharpIcon from '@mui/icons-material/BorderColorSharp';
import {ListItem, ListItemText} from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveCircleSharpIcon from "@mui/icons-material/RemoveCircleSharp";

/**
 * @author [Björn Till](https://github.com/BjoernTill)
 */

class ProfilePropertyFreeText extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openDialog: false,
            selectedValue: null,
        };

        this.handleOpenDialog = this.handleOpenDialog.bind(this);
        this.handleCloseDialog = this.handleCloseDialog.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleOpenDialog() {
        this.setState({openDialog: true});
    }

    handleCloseDialog() {
        this.setState({openDialog: false, selectedValue: this.props.value});
    }

    handleClick(value) {
        this.handleCloseDialog(value);
    }


    render() {
        const {value} = this.props;
        const {openDialog} = this.state;
        return (
            <div>
               <ListItem
                    sx={{ '&:hover': { bgcolor: '#c6e2ff' }, borderRadius: '10px' }}
               >
                    <ListItemText primary={`Eigenschaft ${value}: Value`} />
                    <ListItemSecondaryAction>
                        <Tooltip title="Freitext-Eigenschaft bearbeiten">
                          <IconButton onClick={this.handleOpenDialog}>
                            <BorderColorSharpIcon />
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
                        <DialogContentText>
                          Diese Eigenschaft ist folgendermaßen beschrieben.
                        </DialogContentText>
                        <TextField
                          autoFocus
                          margin="dense"
                          id="name"
                          label="Eigenschaft ausfüllen"
                          fullWidth
                          variant="standard"
                        />
                    </DialogContent>
                      <DialogActions>
                        <Button onClick={this.handleCloseDialog}>Abbrechen</Button>
                        <Button onClick={this.handleClick}>Bestätigen</Button>
                      </DialogActions>
                </Dialog>
            </div>
        );
    }
}
export default ProfilePropertyFreeText;