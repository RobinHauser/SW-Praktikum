import Typography from "@mui/material/Typography";
import {ListItemButton} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import placeHolderImage from '../static/images/profileImagePlaceholder.jpeg';
import Tooltip from "@mui/material/Tooltip";
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import {useNavigate} from "react-router-dom";

export default function ConversationOverviewItem() {
    const navigate = useNavigate()
    return (
        <div>
            <ListItemButton onClick={() => navigate(('/chat'))} sx={{
                my: 1,
                justifyContent: "space-between",
                borderBottom: 1,
                borderTop: 1,
                borderRadius: 3,
                borderColor: "#cfd8dc"
            }} style={{width: 500}}>
                <div style={{display: "flex", alignItems: "center"}}>
                    <Avatar src={placeHolderImage}></Avatar>
                    <Typography noWrap={false} sx={{ml: 2, fontSize: 20, wordBreak: 'break-all'}}> placeholder
                        name</Typography>
                </div>

                <Tooltip title="zum Chat" fontSize="large" sx={{color: "#2979ff"}}>
                    <KeyboardDoubleArrowRightIcon>
                        test
                    </KeyboardDoubleArrowRightIcon>
                </Tooltip>

            </ListItemButton>
        </div>
    );
}