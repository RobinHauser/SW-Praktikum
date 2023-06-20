import React, { Component } from 'react';
import IconButton from "@mui/material/IconButton";
import BorderColorSharpIcon from '@mui/icons-material/BorderColorSharp';
import {ListItem, ListItemText} from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveCircleSharpIcon from "@mui/icons-material/RemoveCircleSharp";
import InfoFreeTextDialog from "./InfoFreeTextDialog";

/**
 * @author [Björn Till](https://github.com/BjoernTill)
 */

class ProfilePropertyFreeText extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openDialogFreeText: false,
            selectedValue: null,
        };

        this.handleOpenDialogFreeText = this.handleOpenDialogFreeText.bind(this);
        this.handleCloseDialogFreeText = this.handleCloseDialogFreeText.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleOpenDialogFreeText() {
        this.setState({openDialogFreeText: true});
    }

    handleCloseDialogFreeText() {
        this.setState({openDialogFreeText: false, selectedValue: this.props.value});
    }

    handleClick(value) {
        this.handleCloseDialogFreeText(value);
    }


    render() {
        const {value} = this.props;
        const {openDialogFreeText} = this.state;
        return (
            <div>
               <ListItem
                    sx={{ '&:hover': { bgcolor: '#c6e2ff' }, borderRadius: '10px' }}
               >
                    <ListItemText primary={`Eigenschaft ${value}: Value`} />
                    <ListItemSecondaryAction>
                        <Tooltip title="Freitext-Eigenschaft bearbeiten">
                          <IconButton onClick={this.handleOpenDialogFreeText}>
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

                    <InfoFreeTextDialog
                        openDialogFreeText={openDialogFreeText}
                        handleCloseDialogFreeText={this.handleCloseDialogFreeText}
                        handleClick={this.handleClick}
                        value={value}
                    />
            </div>
        );
    }
}
export default ProfilePropertyFreeText;