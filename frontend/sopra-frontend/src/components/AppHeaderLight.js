import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import appLogo from "../static/images/logo_transparent_wei.png";
import Button from "@mui/material/Button";

export default function AppHeaderLight() {
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
                            style={{ width: '150px', height: 'auto' }}
                        />
                    </Button>
                </Toolbar>
            </Container>
        </AppBar>
    );
}