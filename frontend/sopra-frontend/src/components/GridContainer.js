import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import ProfileCard from "./ProfileCard";

export default function GridContainer() {
    return (
        <Box sx={{flexGrow: 1}}>
            <Grid
                container
                spacing={{xs: 10, md: 10}}
                columns={{xs: 4, sm: 8, md: 12}}>
                {Array.from(Array(9)).map((_, index) => (
                    <Grid xs={2} sm={4} md={4} key={index}>
                        <ProfileCard></ProfileCard>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}