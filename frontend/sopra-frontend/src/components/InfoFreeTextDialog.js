import React, {Component} from 'react';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

/**
 * @author [Björn Till](https://github.com/BjoernTill)
 */

class InfoFreeTextDialog extends Component {
  render() {
    const {
        openDialogFreeText,
        handleCloseDialogFreeText,
        handleClick,
        value
    } = this.props;

    return (
        <div>
            <Dialog open={openDialogFreeText} onClose={() => handleCloseDialogFreeText(null)}>
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
                            <Button onClick={handleCloseDialogFreeText}>Abbrechen</Button>
                            <Button onClick={handleClick}>Bestätigen</Button>
                          </DialogActions>
            </Dialog>
        </div>
      );
  }
}


export default InfoFreeTextDialog;