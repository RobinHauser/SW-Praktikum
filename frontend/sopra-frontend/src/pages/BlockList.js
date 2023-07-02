import * as React from 'react';
import AppHeader from "../components/AppHeader";
import Container from "@mui/material/Container";
import {LinearProgress, List, ListItem, ListItemText, ListSubheader, Skeleton} from "@mui/material";
import BlockListItem from "../components/BlockListItem";
import SopraDatingAPI from "../api/SopraDatingAPI";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";

/**
 * Shows the Blocklist with all Profiles, that are Blocked by the User
 */
export default class BlockList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            blocklist: [],
            error: null,
            loading: true
        };
    }

    /**
     * Fetches the blocklist for the current user
     */
    getBlocklist = async () => {
        try {
            this.setState({loading: true})
            const UserBOs = await SopraDatingAPI.getAPI().getBlocklist(this.props.user.getUserID());
            this.setState({
                blocklist: UserBOs,
                error: null,
                loading: false
            });
        } catch (e) {
            this.setState({
                blocklist: [],
                error: e,
                loading: false
            });
        }
    };

    componentDidMount() {
        this.getBlocklist();
    }

    /**
     * Handles the removal of a user from the user list
     *
     * @param {UserBO} removedUser - the removed user
     */
    removeUserHandler = (removedUser) => {
        this.setState({
            blocklist: this.state.blocklist.filter(user => user.getUserID() !== removedUser.getUserID())
        });
    };


    render() {
        const {blocklist, loading} = this.state;

        return (
            <div className="App">
                <AppHeader avatar={this.props.avatar}></AppHeader>
                {loading && (
                    <LinearProgress sx={{marginTop: "10px"}}/>
                )}
                <Container style={{display: 'grid', placeItems: 'center', marginTop: '50px'}}>
                    <List
                        sx={{width: '100%', maxWidth: 700}}
                        subheader={
                            <ListSubheader sx={{fontSize: 20}}>
                                Blockierte Benutzer
                            </ListSubheader>
                        }
                    >
                        {blocklist.length > 0 ? (
                            blocklist.map((blocklistItem) => (
                                <BlockListItem
                                    key={blocklistItem.getUserID()}
                                    user={this.props.user}
                                    blockedUser={blocklistItem}
                                    onUserRemoved={this.removeUserHandler}/>
                            ))
                        ) : ( loading ? (
                             <>
                                    {Array.from(Array(4)).map((_, index) => (
                                            <Skeleton key={index} variant="rounded" animation="wave"
                                                      height={45} sx={{marginBottom: "5px"}}/>
                                    ))}
                                </>
                        ) : (
                            <ListItem>
                                <ListItemText sx={{textAlign: 'center'}}>
                                    <Typography variant="body1">Keine Nutzer blockiert</Typography>
                                </ListItemText>
                            </ListItem>
                        ))}
                    </List>
                </Container>
            </div>
        );
    }
}