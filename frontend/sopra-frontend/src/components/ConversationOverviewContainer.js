import {List} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import ConversationOverviewItem from "./ConversationOverviewItem";
import * as React from "react";
import {Component} from "react";
import SopraDatingAPI from "../api/SopraDatingAPI";
import BlockListItem from "./BlockListItem";
/**
 * *
 * @author [Jannik Haug](https://github.com/JannikHaug)
 */
class ConversationOverviewContainer extends Component {
        constructor(props) {
        super(props);
        this.state = {
            chatList: [],
            error: null
        };
        }
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
    componentDidMount() {
        this.getChatUserList(this.props.currentUser)
        console.log("USERID: "+this.props.currentUser)
        console.log(SopraDatingAPI.getAPI().getUserChats(this.props.currentUser))
    }
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
                                <ConversationOverviewItem name={ChatBO.getDisplayName()} avatarLink={ChatBO.getProfileImgUrl()} chatBo={ChatBO}/>
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