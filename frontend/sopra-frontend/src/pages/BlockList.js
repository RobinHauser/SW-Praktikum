import * as React from 'react';
import AppHeader from "../components/AppHeader";
import Container from "@mui/material/Container";
import {List, ListItem, ListItemText, ListSubheader} from "@mui/material";
import BlockListItem from "../components/BlockListItem";
import SopraDatingAPI from "../api/SopraDatingAPI";
import Typography from "@mui/material/Typography";

/**
 * Shows the Blocklist with all Profiles, that are Blocked by the User
 *
 * @author [Michael Bergdolt]
 */
export default class BlockList extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            blocklist: [],
            error: null
        };
    }

    /**
     * Fetches the blocklist for the current user
     */
    getBlocklist = () => {
        SopraDatingAPI.getAPI().getBlocklist(this.props.user.getUserID())
            .then(UserBOs => {
                this.setState({
                    blocklist: UserBOs,
                    error: null
                });
            })
            .catch(e => {
                this.setState({
                    blocklist: [],
                    error: e
                });
            });
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
        const { blocklist } = this.state;

        return (
            <div className="App">
                <AppHeader avatar={this.props.avatar}></AppHeader>
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
                        ) : (
                            <ListItem>
                                <ListItemText sx={{ textAlign: 'center' }}>
                                    <Typography variant="body1">Keine Nutzer blockiert</Typography>
                                </ListItemText>
                            </ListItem>
                        )}
                    </List>
                </Container>
            </div>
        );
    }
}