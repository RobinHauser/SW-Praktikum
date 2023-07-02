import Typography from "@mui/material/Typography";
import {ListItem, Paper} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import {Component} from "react";

/**
 * Class react component which shows a message on a Paper as a ListItem.
 * This ist the component for the right message (a message written by the current user).
 * Reference for wordBreak in the Typography: https://stackoverflow.com/questions/52260553/after-word-break-align-next-line-to-the-left-rather-than-center
 */
class MessageRight extends Component {
    /**
     * Renders the class component
     * @returns MessageRight - the rendered component
     */
    render() {
        const {content, timeStamp, avatarLink} = this.props;
        return (
            <div>
                <ListItem>
                    <Paper sx={{my: 1, mr: 1, textAlign: "right", width: "75vh"}} elevation={3}>
                        <Typography noWrap={false} sx={{m: 2, wordBreak: "break-word"}}>{content}</Typography>
                        <Typography fontSize={12} sx={{
                            textAlign: "left",
                            marginLeft: 3,
                            marginBottom: 1
                        }}> {timeStamp}</Typography>
                    </Paper>
                    <Avatar src={avatarLink}></Avatar>
                </ListItem>
            </div>
        );
    }
}

export default MessageRight;