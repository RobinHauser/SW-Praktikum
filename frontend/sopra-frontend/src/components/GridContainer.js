import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import ProfileCard from "./ProfileCard";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {Switch} from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Tooltip from "@mui/material/Tooltip";
import SopraDatingAPI from "../api/SopraDatingAPI";

export default class GridContainer extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
            selectedSearchprofile: null,
            searchprofiles: ["Suchprofil 1", "Suchprofil 2", "Suchprofil 3"],
            userList: [],
            showOnlyNewUser: false
        };
    }

    componentDidMount() {
        this.getUserListBySearchprofile();
    }

    getUserListBySearchprofile = (searchProfileID) => {
        SopraDatingAPI.getAPI().getUserListBySearchprofile(searchProfileID)
            .then(UserBOs => {
                this.setState({
                    userList: UserBOs
                });
            })
            .catch(e =>
                this.setState({
                    userList: []
                })
            )
    }

    handleSearchProfileMenuClick = (event) => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleCloseSearchprofile = () => {
        this.setState({ anchorEl: null });
    };

    handleSearchprofileItemClick = (searchprofile) => {
        this.setState({ selectedSearchprofile: searchprofile, anchorEl: null });
    };

    handleShowOnlyNewUser = () => {
        this.setState((prevState) => ({
            showOnlyNewUser: !prevState.showOnlyNewUser
        }))
    }

    render() {
        const { anchorEl, selectedSearchprofile, searchprofiles, showOnlyNewUser, userList } = this.state;
        const open = Boolean(anchorEl)

        return (
            <Box>
                <Box display="flex" justifyContent="space-between">
                    <Tooltip title={"Suchprofil nach dem gefiltert werden soll"}>
                        <Button
                            aria-controls="dropdown-menu"
                            aria-haspopup="true"
                            onClick={this.handleSearchProfileMenuClick}
                            variant="contained"
                            endIcon={<ArrowDropDownIcon />}
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
                            onClick = {() => this.handleSearchprofileItemClick("Keine Auswahl")}
                            sx={{ "&:hover": { backgroundColor: "#c6e2ff" } }}
                        >
                            Keine Auswahl
                        </MenuItem>
                        {searchprofiles.map((searchprofileItem) => (
                            <MenuItem
                                onClick = {() => this.handleSearchprofileItemClick(searchprofileItem)}
                                sx={{ "&:hover": { backgroundColor: "#c6e2ff" } }}
                                key={1} // Todo key dynamisch einlesen
                            >
                                {searchprofileItem}
                            </MenuItem>
                        ))}
                    </Menu>
                    <Tooltip title={ showOnlyNewUser ? "nur noch nicht angesehene Nutzer anzeigen" : "alle Nutzer anzeigen" }>
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
                                    height: 'auto', // Anpassen der Höhe des Icons
                                    marginTop: -0.2, // Anpassen der vertikalen Ausrichtung des Icons
                                    color: '#3f51b5'
                                },
                            }}
                            icon={<VisibilityIcon/>}
                            checkedIcon={<VisibilityOffIcon />}
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
                                <ProfileCard key={userListItem.getUserID()} user={userListItem}></ProfileCard>
                            </Grid>
                        ))
                        ) : (
                            <p>Noch keine anderen Benutzer vorhanden</p>
                    )}
                </Grid>
            </Box>
    );
    }
}