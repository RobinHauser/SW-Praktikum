import * as React from 'react'
import AppHeader from "../components/AppHeader";
import Container from "@mui/material/Container";
import {List, ListSubheader} from "@mui/material";
import BlockListItem from "../components/BlockListItem";
import SopraDatingAPI from "../api/SopraDatingAPI";

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
        }
    }

    getBlocklist = () => {
        SopraDatingAPI.getAPI().getBlocklist(this.props.user.getUserID())
            .then(UserBOs =>
                this.setState({
                    blocklist: UserBOs,
                    error: null
                }))
            .catch(e =>
                this.setState({
                    blocklist: [],
                    error: e
                    })
                )
        ;
    }

    componentDidMount() {
        this.getBlocklist();
    }

    removeUserHandler = (removedUser) => {
        this.setState({
            blocklist: this.state.blocklist.filter(user => user.getUserID() !== removedUser.getUserID())
        })
    }


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
                                <BlockListItem key={blocklistItem.getUserID()} user={blocklistItem} onUserRemoved={this.removeUserHandler}/>
                            ))
                        ) : (
                            <p>Keine blockierten Benutzer gefunden.</p>
                        )}
                    </List>
                </Container>
            </div>
        )
    }
}