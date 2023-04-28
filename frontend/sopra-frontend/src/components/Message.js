import Typography from "@mui/material/Typography";
import {ListItem, ListItemButton, Paper} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import placeHolderImage from '../static/images/profileImagePlaceholder.jpeg';

export default function MessageLeft() {
    return (
        <div>
            <Paper sx={{ my: 1}} elevation={3} style={{ textAlign: "right"}}>
                <Typography noWrap={false} sx={{ m: 2 }} > Message Right Placeholder</Typography>
                <Typography fontSize={12} style={{ textAlign: "left"}}> 01.01.2000</Typography>
            </Paper>
        </div>
    );
}
