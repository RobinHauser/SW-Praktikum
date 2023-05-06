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
        SopraDatingAPI.getAPI().getBlocklist(1)
            .then(BlocklistBOs =>
                this.setState({
                    blocklist: BlocklistBOs,
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
        this.getBlocklist()
    }


    render() {
        const { blocklist } = this.state;
        console.log(`Blocklist Zustand im State:`, this.state.blocklist);
        if(blocklist.user !== undefined) {
            console.log(blocklist.user[0].id)
        }

        return (
            <div className="App">
                <AppHeader></AppHeader>
                <Container style={{display: 'grid', placeItems: 'center', marginTop: '50px'}}>
                    <List
                        sx={{width: '100%', maxWidth: 700}}
                        subheader={
                            <ListSubheader sx={{fontSize: 20}}>
                                Blockierte Benutzer
                            </ListSubheader>
                        }
                    >
                        {blocklist.user && blocklist.user.length > 0 ? (
                            blocklist.user.map((blocklistItem) => (
                                <BlockListItem key={blocklistItem.id} value={blocklistItem.firstname}/>
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