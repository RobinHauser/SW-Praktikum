import {ListItem, ListItemText} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import {Link} from "react-router-dom";
import {Component} from "react";

/**
 * Class react component which shows a chat user partner as a ListItem.
 */
class ConversationOverviewItem extends Component {
    /**
     * Renders the class component
     * @returns ConversationOverviewItem - the rendered component
     */
    render() {
        const {name, chatBo, avatarLink} = this.props;
        const chatID = chatBo.getChatID();
        const userID = chatBo.getUserID();

        return (
            <div style={{display: "flex", alignItems: "center"}}>

                <ListItem sx={{
                    my: 1,
                    justifyContent: "space-between",
                    border: 1,
                    borderRadius: 3,
                    width: 500,
                    borderColor: "#cfd8dc",
                    ':hover': {boxShadow: 2}
                }}>
                    <div style={{display: "flex", alignItems: "center"}}>
                        <Avatar src={avatarLink}></Avatar>
                        <ListItemText noWrap={false} sx={{ml: 2, fontSize: 20, wordBreak: 'break-all'}}
                                      primary={`${name}`}></ListItemText>
                    </div>
                    <Link to={`/chat/${chatID}/${userID}`}>
                        <Tooltip title="zum Chat" fontSize="large" sx={{color: "#2979ff"}}>
                            <KeyboardDoubleArrowRightIcon>
                            </KeyboardDoubleArrowRightIcon>
                        </Tooltip>
                    </Link>
                </ListItem>

            </div>
        );
    }
}

export default ConversationOverviewItem;