import Typography from "@mui/material/Typography";
import {ListItem, Paper} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import placeHolderImage from '../static/images/profileImagePlaceholder.jpeg';
import {Component} from "react";
/**
 * *
 * @author [Jannik Haug](https://github.com/JannikHaug)
 */
class MessageLeft extends Component {
    render() {
        const {content, timeStamp} = this.props;
        return (
            <div>
                <ListItem>
                    <Avatar src={placeHolderImage}></Avatar>
                    <Paper sx={{my: 1, ml: 1, textAlign: "left", width: "75vh", backgroundColor: "#e1f5fe"}}
                           elevation={3}>
                        <Typography noWrap={false} sx={{m: 2}}>{content}</Typography>
                        <Typography fontSize={12} style={{textAlign: "right", marginRight: 10, marginBottom: 3}}>{timeStamp}</Typography>
                    </Paper>
                </ListItem>
            </div>
        );
    }
}
export default MessageLeft;
