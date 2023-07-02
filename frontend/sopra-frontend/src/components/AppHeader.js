import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import {useNavigate} from "react-router-dom";
import {getAuth, signOut} from "firebase/auth";
import appLogo from "../static/images/logo_transparent_wei.png";

export default function AppHeader(props) {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const navigate = useNavigate()

    /**
     * handles the opening for the navigation menu
     */
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    /**
     * handles the opening for the user menu
     */
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    /**
     * handles the closing for the navigation menu
     */
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };
    /**
     * handles the closing for the user menu
     */
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    /**
     * handles the closing for the user menu
     */
    function navigateToProfilePage() {
        navigate('/profile')
    }

    /**
     * handles the navigation to the conversationoverview page
     */
    function navigateToConversationOverviewPage() {
        navigate('/conversationOverview')
    }

    /**
     * handles the navigation to the main page
     */
    function navigateToMainPage() {
        navigate('/main')
    }

    /**
     * handles the navigation to the bookmarklist page
     */
    function navigateToBookmarkListPage() {
        navigate(('/bookmarklist'))
    }

    /**
     * handles the navigation to the blocklist page
     */
    function navigateToBlockListPage() {
        navigate(('/blockList'))
    }

    /**
     * handles the navigation to the searchprofile overview page
     */
    function navigateToSearchProfileOverviewPage() {
        navigate(('/searchProfileOverview'))
    }

    /**
     * handles the button click to sign out of the system
     */
    function handleSignOutButtonClicked() {
        const auth = getAuth();
        signOut(auth)
    }

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Button href="/main"
                            sx={{
                                display: {xs: 'none', md: 'flex'},
                                fontWeight: 700,
                                color: 'inherit',
                                textDecoration: 'none',
                            }}>
                        <img
                            src={appLogo}
                            alt={"Date2Mate"}
                            style={{width: '150px', height: 'auto'}}
                        />
                    </Button>
                    <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: {xs: 'block', md: 'none'},
                            }}>
                            <MenuItem onClick={() => {
                                handleCloseNavMenu()
                                navigateToMainPage()
                            }}>
                                <Typography textAlign="center">Startseite</Typography>
                            </MenuItem>
                            <MenuItem onClick={() => {
                                handleCloseNavMenu()
                                navigateToBookmarkListPage()
                            }}>
                                <Typography textAlign="center">Merkliste</Typography>
                            </MenuItem>
                            <MenuItem onClick={() => {
                                handleCloseNavMenu()
                                navigateToBlockListPage()
                            }}>
                                <Typography textAlign="center">Blockliste</Typography>
                            </MenuItem>
                            <MenuItem onClick={() => {
                                handleCloseNavMenu()
                                navigateToSearchProfileOverviewPage()
                            }}>
                                <Typography textAlign="center">Suchprofil</Typography>
                            </MenuItem>
                            <MenuItem onClick={() => {
                                handleCloseNavMenu()
                                navigateToConversationOverviewPage()
                            }}>
                                <Typography textAlign="center">Chat</Typography>
                            </MenuItem>

                        </Menu>
                    </Box>
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 2,
                            display: {xs: 'flex', md: 'none'},
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                    </Typography>
                    <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex', marginLeft: '50px'}}}>
                        <Button onClick={() => {
                            handleCloseNavMenu()
                            navigateToBookmarkListPage()
                        }} sx={{my: 2, color: 'white', display: 'block'}}>
                            Merkliste
                        </Button>
                        <Button onClick={() => {
                            handleCloseNavMenu()
                            navigateToBlockListPage()
                        }} sx={{my: 2, color: 'white', display: 'block'}}>
                            Blockliste
                        </Button>
                        <Button onClick={() => {
                            handleCloseNavMenu()
                            navigateToSearchProfileOverviewPage()
                        }} sx={{my: 2, color: 'white', display: 'block'}}>
                            Suchprofil
                        </Button>
                        <Button onClick={navigateToConversationOverviewPage}
                                sx={{my: 2, color: 'white', display: 'block'}}>
                            chat
                        </Button>
                    </Box>

                    <Box sx={{flexGrow: 0}}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                                <Avatar src={props.avatar}/>
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{mt: '45px'}}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}>

                            <MenuItem sx={{"&:hover": {backgroundColor: "#c6e2ff"}}} onClick={() => {
                                handleCloseUserMenu()
                                navigateToProfilePage()
                            }}>
                                <Typography textAlign="center">Profil</Typography>
                            </MenuItem>
                            <MenuItem sx={{"&:hover": {backgroundColor: "#c6e2ff"}}} onClick={() => {
                                handleCloseUserMenu()
                                handleSignOutButtonClicked()
                            }}>
                                <Typography textAlign="center">Ausloggen</Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}