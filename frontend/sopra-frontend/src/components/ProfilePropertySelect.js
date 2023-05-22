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

/**
 * @author [Björn Till](https://github.com/BjoernTill)
 */

class ProfilePropertySelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openDialog: false,
            selectedValue: null,
        };

        this.handleOpenDialog = this.handleOpenDialog.bind(this);
        this.handleCloseDialog = this.handleCloseDialog.bind(this);
        this.handleListItemClick = this.handleListItemClick.bind(this);
    }

    handleOpenDialog() {
        this.setState({openDialog: true});
    }

    handleCloseDialog() {
        this.setState({openDialog: false, selectedValue: this.props.value});
    }

    handleListItemClick(value) {
        this.handleCloseDialog(value);
    }


    render() {
        const {value} = this.props;
        const {openDialog} = this.state;
        return (
            <div>
                <ListItem
                    sx={{'&:hover': {bgcolor: '#c6e2ff'}, borderRadius: '10px'}}
                    secondaryAction={
                        <Tooltip title="Auswahl-Eigenschaft bearbeiten">
                            <IconButton onClick={this.handleOpenDialog}>
                                <EditSharpIcon/>
                            </IconButton>
                        </Tooltip>
                    }
                >
                    <ListItemText primary={`Eigenschaft ${value}: Value`}/>
                </ListItem>
                <Dialog open={openDialog} onClose={() => this.handleCloseDialog(null)}>
                    <DialogTitle>{`Eigenschaft ${value}`}</DialogTitle>
                    <DialogContent>
                        <DialogContentText> Diese Eigenschaft ist folgendermaßen beschrieben.
                            <List>
                                <ListItem button onClick={() => this.handleListItemClick("Value 1")}>
                                    <ListItemText sx={{textAlign: 'center', display: 'flex', justifyContent: 'center'}}
                                                  primary="Value 1"/></ListItem>
                                <ListItem button onClick={() => this.handleListItemClick("Value 2")}>
                                    <ListItemText sx={{textAlign: 'center', display: 'flex', justifyContent: 'center'}}
                                                  primary="Value 2"/></ListItem>
                                <ListItem button onClick={() => this.handleListItemClick("Value 1")}>
                                    <ListItemText sx={{textAlign: 'center', display: 'flex', justifyContent: 'center'}}
                                                  primary="Value 3"/></ListItem>
                            </List>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleCloseDialog}>Abbrechen</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default ProfilePropertySelect;

