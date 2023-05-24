import Container from "@mui/material/Container";
import AppHeader from "../components/AppHeader";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import * as React from "react";
import BookmarkProfileCard from "../components/BookmarkProfileCard";
import SopraDatingAPI from "../api/SopraDatingAPI";

/**
 * Shows the Bookmarklist with all Profiles, that are Bookmarked by the User
 *
 * @author [Michael Bergdolt]
 */

export default class bookmarkList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            error: null,
            bookmarklist: []
        }
    }

    getBookmarklist = () => {
        SopraDatingAPI.getAPI().getBookmarklist(this.props.user.uid)
            .then(UserBOs =>
                this.setState({
                    error: null,
                    bookmarklist: UserBOs
                }))
            .catch(e =>
                this.setState({
                    error: e,
                    bookmarklist: []
                })
            )
        ;
    }

    componentDidMount() {
        this.getBookmarklist();
    }

    addUserToBlocklistHandler = (addedUser) => {
        this.setState({
            bookmarklist: this.state.bookmarklist.filter(user => user.getUserID() !== addedUser.getUserID())
        })
    }

    render() {
        const {bookmarklist} = this.state;

        return (
            <div className="App">
                <AppHeader avatar={this.props.avatar}></AppHeader>
                <Container style={{marginTop: '50px'}}>
                    <Box>
                        <Grid
                            container
                            spacing={{xs: 10, md: 10}}
                            columns={{xs: 4, sm: 8, md: 12}}>
                            {bookmarklist.length > 0 ? (
                                bookmarklist.map((bookmarklistItem) => (
                                    <Grid xs={4} sm={4} md={4} key={bookmarklistItem.getUserID()}>
                                        <BookmarkProfileCard key={bookmarklistItem.getUserID()} user={bookmarklistItem}
                                                             onUserRemoved={this.addUserToBlocklistHandler}></BookmarkProfileCard>
                                    </Grid>
                                ))
                            ) : (
                                <p>Du hast deiner Merkliste noch keine Profile hinzugefügt</p>
                            )}
                        </Grid>
                    </Box>
                </Container>
            </div>
        )
    }
}