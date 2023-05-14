import {ListItemButton, ListItemText} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import placeHolderImage from '../static/images/profileImagePlaceholder.jpeg';
import Tooltip from "@mui/material/Tooltip";
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import {useNavigate} from "react-router-dom";
/**
 * *
 * @author [Jannik Haug](https://github.com/JannikHaug)
 */
export default function ConversationOverviewItem({name}) {
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
                    <ListItemText noWrap={false} sx={{ml: 2, fontSize: 20, wordBreak: 'break-all'}} primary={`${name}`}></ListItemText>
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