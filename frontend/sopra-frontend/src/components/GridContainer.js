import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import ProfileCard from "./ProfileCard";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {ListItem, ListItemText, Switch} from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Tooltip from "@mui/material/Tooltip";
import SopraDatingAPI from "../api/SopraDatingAPI";
import Typography from "@mui/material/Typography";
import UserBO from "../api/UserBO";

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
            error: null
        };
    }

    async componentDidMount() {
        // Fetch the initial user list based on the search profile
        await this.props.onUserLogin().then(user => {
            this.setState({
                user: user
            })
        })
        this.getAllUsers()
        await this.getSearchProfiles()
    }

    getBlocklist = async () => {
        try {
            const UserBOs = await SopraDatingAPI.getAPI().getBlocklist(this.state.user.getUserID());
            return UserBOs;
        } catch (e) {
            console.log(e);
            return [];
        }
    };

    getAllUsers = async () => {
        try {
            let userBOs = await SopraDatingAPI.getAPI().getAllUsers();
            SopraDatingAPI.getAPI().getAllUsersFiltered(this.state.user.getUserID()).then((userBOs) => {
                this.setState({
                    userList: userBOs
                })
            })
        } catch (error) {
            console.log(error);
            this.setState({
                userList: []
            });
        }
    };

    getSearchProfiles = async () => {
        let wait = await SopraDatingAPI.getAPI().getAllUsers();
        SopraDatingAPI.getAPI().getSearchProfiles(this.state.user.getUserID())
            .then(SearchProfileBOs => {
                this.setState({
                    searchprofiles: SearchProfileBOs,
                    error: null
                });
            })
            .catch(e => {
                this.setState({
                    searchprofiles: [],
                    error: e
                });
            });
    };

    getUsersSortedBySimilarityMeasure = (searchprofileID) => {
        SopraDatingAPI.getAPI().getUsersSortedBySimilarityMeasure(searchprofileID)
            .then(UserBOs => {
                this.setState({
                    userList: UserBOs,
                    error: null
                });
            })
            .catch(e => {
                this.setState({
                    searchprofiles: [],
                    error: e
                });
            });
    }

    /**
     * Fetches the user list based on the selected search profile ID
     *
     * @param {number} searchProfileID - The ID of the selected search profile
     * @returns {Promise} A promise that resolves when the user list is fetched successfully
     */
    getUserListBySearchprofile = (searchProfileID) => {
        return new Promise((resolve, reject) => {
            // Call the API to get the user list based on the search profile
            SopraDatingAPI.getAPI()
                .getUserListBySearchprofile(searchProfileID)
                .then(UserBOs => {
                    // Update the user list state
                    this.setState({
                        userList: UserBOs
                    });
                    resolve();
                })
                .catch(e => {
                    // In case of an error, reset the user list state
                    this.setState({
                        userList: []
                    });
                    reject(e);
                });
        });
    };

    /**
     * Fetches the viewed user list for the current user
     *
     * @returns {Promise} A promise that resolves when the viewed user list is fetched successfully
     */
    getViewedlist = () => {
        return new Promise((resolve, reject) => {
            // Call the API to get the viewed user list for the current user
            SopraDatingAPI.getAPI()
                .getViewedlist(this.props.user.getUserID())
                .then(UserBOs => {
                    // Update the viewed user list state
                    this.setState({
                        viewedList: UserBOs
                    });
                    resolve();
                })
                .catch(e => {
                    // In case of an error, reset the viewed user list state
                    this.setState({
                        viewedList: []
                    });
                    reject(e);
                });
        });
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
      * @param {string} searchprofileID - The selected search profile
      */
    handleSearchprofileItemClick = (searchprofileID) => {
        // Set the selected search profile and close the menu
        this.getUsersSortedBySimilarityMeasure(searchprofileID)
        this.handleCloseSearchprofile()
    };

    handleNoSelectionClick = () => {
        // Set the selected search profile and close the menu
        this.getAllUsers();
        this.handleCloseSearchprofile();
    };

    /**
     * Toggles between showing only new users or all users based on the state
     * Updates the user list accordingly
     */
    handleShowOnlyNewUser = async () => {
        // Fetch the viewed user list and update the user list based on the showOnlyNewUser state
        await this.getViewedlist(1); // Todo dynamisch einlesen
        await this.getUserListBySearchprofile(1);
        await this.getUserListBySearchprofile(1);

        const {userList, viewedList, showOnlyNewUser} = this.state

        // If the viewedList is not empty, filter the nonViewedList based on the viewedUsers
        let nonViewedList = userList;
        if (viewedList.length > 0) {
            nonViewedList = userList.filter(user =>
                viewedList.some(viewedUser => user.getUserID() !== viewedUser.getUserID())
            )
        }

        // Toggle the showOnlyNewUser state and update the user list accordingly
        this.setState(() => ({
            showOnlyNewUser: !showOnlyNewUser,
            userList: showOnlyNewUser ? nonViewedList : userList
        }));
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
        const {anchorEl, selectedSearchprofile, searchprofiles, showOnlyNewUser, userList} = this.state;
        const open = Boolean(anchorEl);

        return (
            <Box>
                <Box display="flex" justifyContent="space-between">
                    <Tooltip title={"Suchprofil nach dem gefiltert werden soll"}>
                        <Button
                            aria-controls="dropdown-menu"
                            aria-haspopup="true"
                            onClick={this.handleSearchProfileMenuClick}
                            variant="contained"
                            endIcon={<ArrowDropDownIcon/>}
                        >
                            {selectedSearchprofile ? selectedSearchprofile : 'Suchprofile'}
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
                                onClick={() => this.handleSearchprofileItemClick(searchprofileItem.getProfileID())}
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
                                    user={this.state.user}
                                    showedUser={userListItem}
                                    showOnlyNewUser={showOnlyNewUser}
                                    onUserRemoved={this.handleRemoveUser}>
                                </ProfileCard>
                            </Grid>
                        ))
                    ) : (
                        <ListItem>
                            <ListItemText sx={{textAlign: 'center'}}>
                                <Typography variant="body1">Keine anderen Nutzer vorhanden</Typography>
                            </ListItemText>
                        </ListItem>
                    )}
                </Grid>
            </Box>
        );
    }
}