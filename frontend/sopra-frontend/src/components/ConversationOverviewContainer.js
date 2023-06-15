import {List} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import ConversationOverviewItem from "./ConversationOverviewItem";
import * as React from "react";
import {Component} from "react";
import SopraDatingAPI from "../api/SopraDatingAPI";

/**
 * @author [Jannik Haug](https://github.com/JannikHaug)
 * Class react component which includes a list for all current chats where the current user is a part of.
 */
class ConversationOverviewContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chatList: [],
            error: null
        };
    }

    /**
     * Gets all chats where the given user ID is involved
     * @param {int} userID - current user ID
     */
    getChatUserList = (userID) => {
        SopraDatingAPI.getAPI().getUserChats(userID)
            .then(user =>
                this.setState({
                    chatList: user,
                    error: null
                }))
            .catch(e =>
                this.setState({
                    chatList: [],
                    error: e
                })
            )
        ;
    }

    /**
     * Called after the component did mount.
     * It retrieves the current chats of the current user
     */
    componentDidMount() {
        this.getChatUserList(this.props.currentUser)
    }

    /**
     * Renders the class component
     * @returns ConversationOverviewContainer - the rendered component
     */
    render() {
        const {chatList} = this.state
        return (
            <div>
                <Grid
                    container
                    alignItems="center"
                    spacing={0}
                    direction="row"
                    justifyContent="center"
                    flexFlow="column wrap">
                    <Grid>
                        <List id="conversationOverviewList" sx={{width: '100%', maxWidth: 700}}>
                            {chatList.length > 0 ? (
                                chatList.map((ChatBO) => (
                                    <ConversationOverviewItem name={ChatBO.getDisplayName()}
                                                              avatarLink={ChatBO.getProfileImgUrl()} chatBo={ChatBO}/>
                                ))
                            ) : (
                                <p>Noch kein Chat vorhanden.</p>
                            )}
                        </List>
                    </Grid>
                </Grid>
            </div>

        );
    }
}

export default ConversationOverviewContainer;