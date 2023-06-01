import Typography from "@mui/material/Typography";
import {ListItem, Paper} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import {Component} from "react";
/**
 * *
 * @author [Jannik Haug](https://github.com/JannikHaug)
 */
class MessageRight extends Component {
    render() {
        const {content,timeStamp, avatarLink} = this.props;
        return (
            <div>
                <ListItem>
                    <Paper sx={{my: 1, mr: 1, textAlign: "right", width: "75vh"}} elevation={3}>
                        <Typography noWrap={false} sx={{m: 2, wordBreak: "break-word"}}>{content}</Typography>
                        <Typography fontSize={12} style={{textAlign: "left", marginLeft: 10, marginBottom: 3}}> {timeStamp}</Typography>
                    </Paper>
                    <Avatar src={avatarLink}></Avatar>
                </ListItem>
            </div>
        );
    }
}
export default MessageRight;
// wordBreak inspiriert von: //https://stackoverflow.com/questions/52260553/after-word-break-align-next-line-to-the-left-rather-than-center (Abgerufen am 30.04.2023)