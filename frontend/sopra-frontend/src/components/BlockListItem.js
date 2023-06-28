import IconButton from "@mui/material/IconButton";
import RemoveCircleSharpIcon from '@mui/icons-material/RemoveCircleSharp';
import {LinearProgress, ListItem, ListItemAvatar, ListItemText} from "@mui/material";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import SopraDatingAPI from "../api/SopraDatingAPI";
import Box from "@mui/material/Box";

export default class BlockListItem extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            deletingError: null,
            loading: false
        }
    }

    /**
     * Removes the user from the blocklist
     */
    removeUser = async () => {
        const {blockedUser, user} = this.props;
        try {
            this.setState({loading: true})
            await SopraDatingAPI.getAPI().removeUserFromBlocklist(user.getUserID(), blockedUser);
            this.setState({
                loading: false,
                deletingError: null
            });
            this.props.onUserRemoved(blockedUser);
        } catch (error) {
            this.setState({
                loading: false,
                deletingError: error
            });
        }
    }


    render() {
        const {blockedUser} = this.props;
        const {loading} = this.state;

        return (
            <Box>
                <ListItem
                    sx={{'&:hover': {bgcolor: '#c6e2ff'}, borderRadius: '10px'}}
                    secondaryAction={
                        <Tooltip title="Benutzer entblocken">
                            <IconButton onClick={this.removeUser}>
                                <RemoveCircleSharpIcon/>
                            </IconButton>
                        </Tooltip>
                    }
                >
                    <ListItemAvatar>
                        <Avatar src={blockedUser.getAvatarURL()}/>
                    </ListItemAvatar>
                    <ListItemText primary={blockedUser.getDisplayname()}/>
                </ListItem>
                {loading && (
                    <LinearProgress/>
                )}
            </Box>
        );
    }
}