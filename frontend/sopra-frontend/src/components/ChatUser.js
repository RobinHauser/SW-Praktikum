
import Typography from "@mui/material/Typography";
import {ListItem, ListItemButton} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import placeHolderImage from '../static/images/profileImagePlaceholder.jpeg';

export default function ChatUser() {
    return (
        <div>
            <ListItemButton sx={{ my: 1}}>
                <Avatar src={placeHolderImage}></Avatar>
                <Typography noWrap={false} sx={{ ml: 2 }} > placeholder name</Typography>
            </ListItemButton>
        </div>
    );
}