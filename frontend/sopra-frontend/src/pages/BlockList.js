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
    componentDidMount() {
        console.log(SopraDatingAPI.getAPI().getUser(2))
    }

    render() {
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
                        {[1, 2, 3].map((value) => (
                            <BlockListItem key={value} value={value}/>
                        ))}
                    </List>
                </Container>
            </div>
        )
    }
}