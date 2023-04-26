import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

export default function AppHeaderLight() {
    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        sx={{
                            display: {xs: 'none', md: 'flex'},
                            fontWeight: 700,
                            color: 'inherit',
                            textDecoration: 'none',
                        }}>
                        Sopra Dating
                    </Typography>
                </Toolbar>
            </Container>
        </AppBar>
    );
}