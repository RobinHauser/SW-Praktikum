import IconButton from "@mui/material/IconButton";
import RemoveCircleSharpIcon from '@mui/icons-material/RemoveCircleSharp';
import {ListItem, ListItemAvatar, ListItemText} from "@mui/material";
import Person2SharpIcon from '@mui/icons-material/Person2Sharp';
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";

export default function BlockListItem ({ value }) {
    return (
        <ListItem
            sx={{ '&:hover': { bgcolor: '#c6e2ff' }, borderRadius: '10px' }}
            secondaryAction={
                <Tooltip title="Benutzer entblocken">
                    <IconButton>
                        <RemoveCircleSharpIcon/>
                    </IconButton>
                </Tooltip>
            }
        >
            <ListItemAvatar>
                <Avatar>
                    <Person2SharpIcon />
                </Avatar>
            </ListItemAvatar>
            <ListItemText primary={`Profil ${value}`} />
        </ListItem>
    )
}