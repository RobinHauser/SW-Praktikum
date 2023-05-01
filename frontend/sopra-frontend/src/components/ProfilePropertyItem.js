import IconButton from "@mui/material/IconButton";
import EditSharpIcon from '@mui/icons-material/EditSharp';
import {ListItem, ListItemText} from "@mui/material";
import List from "@mui/material/List";
import * as React from "react";
import Tooltip from "@mui/material/Tooltip";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

export default function ProfilePropertyItem ({ value }) {
    const [openDialog, setOpenDialog] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState(null);

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedValue(value);
    };

    const handleListItemClick = (value) => {
        handleCloseDialog(value);
    }


    return (
        <div>
        <ListItem
            sx={{ '&:hover': { bgcolor: '#c6e2ff' }, borderRadius: '10px' }}
            secondaryAction={
                <Tooltip title="Eigenschaft bearbeiten">
                    <IconButton onClick={handleOpenDialog}>
                        <EditSharpIcon/>
                    </IconButton>
                </Tooltip>
            }
        >
            <ListItemText primary={`Eigenschaft ${value}: value`} />
        </ListItem>
        <Dialog open={openDialog} onClose={() => handleCloseDialog(null)}>
                <DialogTitle>Information wählen</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <List>
                            <ListItem button onClick={() => handleListItemClick("Value 1")}>
                                <ListItemText sx={{ textAlign: 'center', display: 'flex', justifyContent: 'center' }} primary="Value 1" /></ListItem>
                            <ListItem button onClick={() => handleListItemClick("Value 2")}>
                                <ListItemText sx={{ textAlign: 'center', display: 'flex', justifyContent: 'center' }} primary="Value 2" /></ListItem>
                            <ListItem button onClick={() => handleListItemClick("Value 1")}>
                                <ListItemText sx={{ textAlign: 'center', display: 'flex', justifyContent: 'center' }} primary="Value 3" /></ListItem>
                        </List>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Abbrechen</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}