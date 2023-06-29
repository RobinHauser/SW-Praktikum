import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import ProfileCard from "./ProfileCard";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {LinearProgress, ListItem, ListItemText, Skeleton, Switch} from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Tooltip from "@mui/material/Tooltip";
import SopraDatingAPI from "../api/SopraDatingAPI";
import Typography from "@mui/material/Typography";

export default class GridContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
            selectedSearchprofile: null,
            searchprofiles: [],
            userList: [],
            showOnlyNewUser: true,
            viewedList: [],
            user: null,
            blocklist: [],
            error: null,
            loading: false
        };
    }

    /**
     * Lifecycle method, which is called when the component gets inserted into the browsers DOM.
     *
     * Loads all Users which are not blocked or blocked the current user
     * Sets the user in the state
     */
    async componentDidMount() {
        try {
            const user = await this.props.onUserLogin();
            this.setState({user});
            await this.getAllUsers(user);
            await this.getSearchProfiles(user);
        } catch (error) {
            console.log(error)
        }
    }

    /**
     * Fetches all Users to display for the current user
     *
     * @param {UserBO} user
     */
    getAllUsers = async (user) => {
        try {
            this.setState({loading: true})
            const userBOs = await SopraDatingAPI.getAPI().getAllUsersFiltered(user.getUserID());
            this.setState({userList: userBOs, loading: false});
        } catch (error) {
            this.setState({userList: [], loading: false});
        }
    };

    /**
     * Fetches all Searchprofiles of the user
     *
     * @param {UserBO} user
     */
    getSearchProfiles = async (user) => {
        try {
            this.setState({loading: true})
            const searchProfileBOs = await SopraDatingAPI.getAPI().getSearchProfiles(user.getUserID());
            this.setState({searchprofiles: searchProfileBOs, error: null, loading: false});
        } catch (error) {
            this.setState({searchprofiles: [], error, loading: false});
        }
    };

    /**
     * Fetches all users of the searchprofile selected by the user
     *
     * @param {int} searchprofileID
     */
    getUsersSortedBySimilarityMeasure = async (searchprofileID) => {
        try {
            this.setState({loading: true})
            const UserBOs = await SopraDatingAPI.getAPI().getUsersSortedBySimilarityMeasure(searchprofileID);
            this.setState({userList: UserBOs, error: null, loading: false});
        } catch (error) {
            this.setState({userList: [], error, loading: false});
        }
    };

    /**
     * Fetches the list to display if the current user only want to see new Profiles
     *
     * @param {int} id - can be the UserID if no Searchprofile is selected or can be a SearchprofileID
     */
    getViewedlist = async (id) => {
        try {
            this.setState({loading: true})
            const userList = await SopraDatingAPI.getAPI().getViewedlist(id);
            this.setState({
                userList: userList,
                error: null,
                loading: false
            });
        } catch (error) {
            this.setState({
                userList: [],
                error: error
            });
        }
    };

    /**
     * Handles the click event on the search profile menu button
     *
     * @param {Event} event - The click event
     */
    handleSearchProfileMenuClick = (event) => {
        // Set the anchor element for the search profile menu
        this.setState({anchorEl: event.currentTarget});
    };

    /**
     * Handles the close event of the search profile menu
     */
    handleCloseSearchprofile = () => {
        // Close the search profile menu
        this.setState({anchorEl: null});
    };

    /**
     * Handles the click event on a search profile item in the menu
     *
     * checks if the user only want to see new other user. Fetches based on that
     * @param {string} searchprofile - The selected search profile
     */
    handleSearchprofileItemClick = (searchprofile) => {
        // Set the selected search profile and close the menu
        this.setState({selectedSearchprofile: searchprofile})
        if (!this.state.showOnlyNewUser) {
            this.getViewedlist(searchprofile.getProfileID())
        } else {
            this.getUsersSortedBySimilarityMeasure(searchprofile.getProfileID())
        }
        this.handleCloseSearchprofile()
    };

    /**
     * Handles the click event on "no Selection" in the list
     *
     * checks if the user only want to see new other user. Fetches based on that
     */
    handleNoSelectionClick = () => {
        const {showOnlyNewUser, user} = this.state;
        // Set the selected search profile and close the menu
        this.setState({selectedSearchprofile: null})
        if (!showOnlyNewUser) {
            this.getViewedlist(user.getUserID())
        } else {
            this.getAllUsers(user)
        }
        this.handleCloseSearchprofile();
    };

    /**
     * Toggles between showing only new users or all users based on the state
     * Updates the user list accordingly
     */
    handleShowOnlyNewUser = () => {
        const {showOnlyNewUser, selectedSearchprofile, user} = this.state;
        this.setState({showOnlyNewUser: !showOnlyNewUser});

        if (showOnlyNewUser) {
            if (selectedSearchprofile === null) {
                this.getViewedlist(user.getUserID())
            } else {
                this.getViewedlist(selectedSearchprofile.getProfileID())
            }
        } else {
            if (selectedSearchprofile === null) {
                this.getAllUsers(user)
            } else {
                this.getUsersSortedBySimilarityMeasure(selectedSearchprofile.getProfileID())
            }
        }
    };

    /**
     * Handles the removal of a user from the user list
     *
     * @param {object} removedUser - The user to be removed
     */
    handleRemoveUser = (removedUser) => {
        // Remove the blocked user from the user list
        this.setState({
            userList: this.state.userList.filter(user => user.getUserID() !== removedUser.getUserID())
        });
    };

    render() {
        const {anchorEl, selectedSearchprofile, searchprofiles, showOnlyNewUser, userList, user, loading} = this.state;
        const open = Boolean(anchorEl);

        return (
            <Box>
                {loading && (
                    <LinearProgress sx={{marginBottom: "10px"}}/>
                )}
                <Box display="flex" justifyContent="space-between">
                    <Tooltip title={"Suchprofil nach dem gefiltert werden soll"}>
                        <Button
                            aria-controls="dropdown-menu"
                            aria-haspopup="true"
                            onClick={this.handleSearchProfileMenuClick}
                            variant="contained"
                            endIcon={<ArrowDropDownIcon/>}
                        >
                            {selectedSearchprofile ? `Suchprofil ${selectedSearchprofile.getProfileID()}` : 'Keine Auswahl'}
                        </Button>
                    </Tooltip>
                    <Menu
                        id="dropdown-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={this.handleCloseSearchprofile}
                    >
                        <MenuItem
                            onClick={() => this.handleNoSelectionClick()}
                            sx={{"&:hover": {backgroundColor: "#c6e2ff"}}}
                        >
                            Keine Auswahl
                        </MenuItem>
                        {searchprofiles.map((searchprofileItem) => (
                            <MenuItem
                                onClick={() => this.handleSearchprofileItemClick(searchprofileItem)}
                                sx={{"&:hover": {backgroundColor: "#c6e2ff"}}}
                                key={searchprofileItem.getProfileID()}
                            >
                                {`Suchprofil: ${searchprofileItem.getProfileID()}`}
                            </MenuItem>
                        ))}
                    </Menu>
                    <Tooltip
                        title={showOnlyNewUser ? "nur noch nicht angesehene Nutzer anzeigen" : "alle Nutzer anzeigen"}>
                        <Switch
                            onChange={this.handleShowOnlyNewUser}
                            color="primary"
                            sx={{
                                '& .MuiSwitch-thumb': {
                                    backgroundColor: '#3f51b5',
                                },
                                '& .MuiSwitch-track': {
                                    backgroundColor: '#b3b3b3',
                                },
                                '& .MuiSvgIcon-root': {
                                    height: 'auto',
                                    marginTop: -0.2,
                                    color: '#3f51b5'
                                },
                            }}
                            icon={<VisibilityIcon/>}
                            checkedIcon={<VisibilityOffIcon/>}
                        />
                    </Tooltip>
                </Box>
                <Grid
                    container
                    sx={{marginTop: "0px"}}
                    spacing={{xs: 10, md: 10}}
                    columns={{xs: 4, sm: 8, md: 12}}>
                    {userList.length > 0 ? (
                        userList.map((userListItem) => (
                            <Grid xs={4} sm={4} md={4} key={userListItem.getUserID()}>
                                <ProfileCard
                                    key={userListItem.getUserID()}
                                    user={user}
                                    showedUser={userListItem}
                                    showOnlyNewUser={showOnlyNewUser}
                                    onUserRemoved={this.handleRemoveUser}>
                                </ProfileCard>
                            </Grid>
                        ))
                    ) : (loading ? (
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
                            <ListItem>
                                <ListItemText sx={{textAlign: 'center'}}>
                                    <Typography variant="body1">Keine anderen Nutzer vorhanden</Typography>
                                </ListItemText>
                            </ListItem>
                        )
                    )}
                </Grid>
            </Box>
        );
    }
}