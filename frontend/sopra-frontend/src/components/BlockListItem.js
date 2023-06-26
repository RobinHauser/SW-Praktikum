import IconButton from "@mui/material/IconButton";
import RemoveCircleSharpIcon from '@mui/icons-material/RemoveCircleSharp';
import {ListItem, ListItemAvatar, ListItemText} from "@mui/material";
import Person2SharpIcon from '@mui/icons-material/Person2Sharp';
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import SopraDatingAPI from "../api/SopraDatingAPI";

export default class BlockListItem extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            deletingInProgress: false,
            deletingError: null
        }
    }

    /**
     * Removes the user from the blocklist
     */
    removeUser = () => {
        const { blockedUser, user } = this.props;
        SopraDatingAPI.getAPI().removeUserFromBlocklist(user.getUserID(), blockedUser).then(() => {
            this.setState({
                deletingInProgress: false,
                deletingError: null
            });
            this.props.onUserRemoved(blockedUser);
        }).catch(e => {
            this.setState({
                deletingInProgress: false,
                deletingError: e
            });
        });

        this.setState({
            deletingInProgress: true,
            deletingError: null
        });
    }

    render() {
        const{blockedUser}=this.props;
        // console.log(blockedUser)

        return (
            <ListItem
                sx={{ '&:hover': { bgcolor: '#c6e2ff' }, borderRadius: '10px' }}
                secondaryAction={
                    <Tooltip title="Benutzer entblocken">
                        <IconButton onClick={this.removeUser}>
                            <RemoveCircleSharpIcon/>
                        </IconButton>
                    </Tooltip>
                }
            >
                <ListItemAvatar>
                    <Avatar src={blockedUser.getAvatarURL()} />
                </ListItemAvatar>
                <ListItemText primary={blockedUser.getDisplayname()} />
            </ListItem>
        );
    }
}