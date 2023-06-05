import Typography from "@mui/material/Typography";
import {ListItem, Paper} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import placeHolderImage from '../static/images/profileImagePlaceholder.jpeg';
import {Component} from "react";
/**
 * *
 * @author [Jannik Haug](https://github.com/JannikHaug)
 */
class MessageRight extends Component {
    render() {
        const {message, avatarLink} = this.props;
        return (
            <div>
                <ListItem>
                    <Paper sx={{my: 1, mr: 1, textAlign: "right", width: "75vh"}} elevation={3}>
                        <Typography noWrap={false} sx={{m: 2, wordBreak: "break-word"}}>{message}</Typography>
                        <Typography fontSize={12} style={{textAlign: "left"}}> 01.01.2000</Typography>
                    </Paper>
                    <Avatar src={avatarLink}></Avatar>
                </ListItem>
            </div>
        );
    }
}
export default MessageRight;
// wordBreak inspiriert von: //https://stackoverflow.com/questions/52260553/after-word-break-align-next-line-to-the-left-rather-than-center (Abgerufen am 30.04.2023)