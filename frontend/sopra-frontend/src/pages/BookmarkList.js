import Container from "@mui/material/Container";
import AppHeader from "../components/AppHeader";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import * as React from "react";
import BookmarkProfileCard from "../components/BookmarkProfileCard";
import SopraDatingAPI from "../api/SopraDatingAPI";
import {ListItem, ListItemText, LinearProgress, ListSubheader, Skeleton} from "@mui/material";
import Typography from "@mui/material/Typography";

/**
 * Shows the Bookmarklist with all Profiles, that are Bookmarked by the User
 */

export default class bookmarkList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            error: null,
            bookmarklist: [],
            loading: true
        }
    }

    /**
     * Fetches the bookmarklist for the current user
     */
    getBookmarklist = async () => {
        try {
            this.setState({loading: true})
            const UserBOs = await SopraDatingAPI.getAPI().getBookmarklist(this.props.user.getUserID());
            this.setState({
                error: null,
                bookmarklist: UserBOs,
                loading: false
            });
        } catch (e) {
            this.setState({
                error: e,
                bookmarklist: [],
                loading: false
            });
        }
    };


    componentDidMount() {
        this.getBookmarklist();
    }

    /**
     * Removes the blocked user from the bookmarklist
     *
     * @param {UserBO} addedUser - user which was added to the blocklist
     */
    addUserToBlocklistHandler = (addedUser) => {
        this.setState({
            bookmarklist: this.state.bookmarklist.filter(user => user.getUserID() !== addedUser.getUserID())
        });
    };

    render() {
        const {bookmarklist, loading} = this.state;


        return (
            <div className="App">
                <AppHeader avatar={this.props.avatar}></AppHeader>
                {loading && (
                    <LinearProgress sx={{marginTop: "10px"}}/>
                )}
                <Container style={{marginTop: '50px'}}>
                    <Box>
                        <ListItem>
                            <ListItemText sx={{textAlign: 'center'}}>
                                <Typography variant="h4">Merkliste</Typography>
                            </ListItemText>
                        </ListItem>
                        <Grid
                            container
                            spacing={{xs: 10, md: 10}}
                            columns={{xs: 4, sm: 8, md: 12}}>
                            {bookmarklist.length > 0 ? (
                                bookmarklist.map((bookmarklistItem) => (
                                    <Grid xs={4} sm={4} md={4} key={bookmarklistItem.getUserID()}>
                                        <BookmarkProfileCard key={bookmarklistItem.getUserID()}
                                                             user={this.props.user}
                                                             bookmarkedUser={bookmarklistItem}
                                                             onUserRemoved={this.addUserToBlocklistHandler}>
                                        </BookmarkProfileCard>
                                    </Grid>
                                ))
                            ) : loading ? (
                                <>
                                    {Array.from(Array(9)).map((_, index) => (
                                        <Grid xs={4} sm={4} md={4} key={index}>
                                            <div>
                                                <Box display="flex" justifyContent="center" alignItems="center"
                                                     flexDirection="column" height="100%">
                                                    <Skeleton variant="circular" animation="wave" width={50}
                                                              height={50} sx={{marginBottom: "10px"}}/>
                                                    <Skeleton variant="rounded" animation="wave" width={300}
                                                              height={40} sx={{marginBottom: "5px"}}/>
                                                    <Skeleton variant="rounded" animation="wave" width={300}
                                                              height={20} sx={{marginBottom: "5px"}}/>
                                                    <Skeleton variant="rounded" animation="wave" width={300}
                                                              height={20} sx={{marginBottom: "5px"}}/>
                                                    <Skeleton variant="rounded" animation="wave" width={300}
                                                              height={20} sx={{marginBottom: "5px"}}/>
                                                    <Skeleton variant="rounded" animation="wave" width={300}
                                                              height={20} sx={{marginBottom: "5px"}}/>
                                                    <Skeleton variant="rounded" animation="wave" width={300}
                                                              height={30} sx={{marginBottom: "5px"}}/>
                                                </Box>
                                            </div>
                                        </Grid>
                                    ))}
                                </>
                            ) : (
                                (
                                    <ListItem>
                                        <ListItemText sx={{textAlign: 'center', marginTop: '20px'}}>
                                            <Typography variant="body1">Keine Nutzer auf der Merkliste</Typography>
                                        </ListItemText>
                                    </ListItem>
                                ))}
                        </Grid>
                    </Box>
                </Container>
            </div>
        )
            ;
    }
}