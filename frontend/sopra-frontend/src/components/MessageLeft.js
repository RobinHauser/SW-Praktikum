import Typography from "@mui/material/Typography";
import {ListItem, ListItemButton, Paper} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import placeHolderImage from '../static/images/profileImagePlaceholder.jpeg';

export default function MessageLeft() {
    return (
        <div>
            <ListItem>
                <Avatar src={placeHolderImage}></Avatar>
                <Paper sx={{my: 1, ml: 1, textAlign: "left", width: "75vh", backgroundColor: "#e1f5fe"}} elevation={3}>
                    <Typography noWrap={false} sx={{m: 2}}> message left placeholder</Typography>
                    <Typography fontSize={12} style={{textAlign: "right"}}> 01.01.2000</Typography>
                </Paper>
            </ListItem>
        </div>
    );
}
