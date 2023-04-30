import Typography from "@mui/material/Typography";
import {ListItem, ListItemButton, Paper} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import placeHolderImage from '../static/images/profileImagePlaceholder.jpeg';
import Box from "@mui/material/Box";

export default function MessageLeft() {
    return (
        <div>
            <ListItem>
                <Paper sx={{my: 1, mr: 1, textAlign: "right", width: "75vh"}} elevation={3}>

                    <Typography noWrap={false} sx={{m: 2, wordBreak: "break-word"}}> message right placeholder</Typography>
                    <Typography fontSize={12} style={{textAlign: "left"}}> 01.01.2000</Typography>

                </Paper>
                <Avatar src={placeHolderImage}></Avatar>
            </ListItem>
        </div>
    );
}

// wordBreak inspiriert von: //https://stackoverflow.com/questions/52260553/after-word-break-align-next-line-to-the-left-rather-than-center (Abgerufen am 30.04.2023)