import Typography from "@mui/material/Typography";
import {ListItem, Paper} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import {Component} from "react";

/**
 * Class react component which shows a message on a Paper as a ListItem.
 * This ist the component for the left message (a message written by chat partner user).
 */
class MessageLeft extends Component {
    /**
     * Renders the class component
     * @returns MessageLeft - the rendered component
     */
    render() {
        const {content, timeStamp, avatarLink} = this.props;
        return (
            <div>
                <ListItem>
                    <Avatar src={avatarLink}></Avatar>
                    <Paper sx={{my: 1, ml: 1, textAlign: "left", width: "75vh", backgroundColor: "#e1f5fe"}}
                           elevation={3}>
                        <Typography noWrap={false} sx={{m: 2}}>{content}</Typography>
                        <Typography fontSize={12} sx={{
                            textAlign: "right",
                            marginRight: 3,
                            marginBottom: 1
                        }}>{timeStamp}</Typography>
                    </Paper>
                </ListItem>
            </div>
        );
    }
}

export default MessageLeft;
