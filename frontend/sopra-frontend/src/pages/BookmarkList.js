import Container from "@mui/material/Container";
import AppHeader from "../components/AppHeader";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import * as React from "react";
import BookmarkProfileCard from "../components/BookmarkProfileCard";

/**
 * Shows the Bookmarklist with all Profiles, that are Bookmarked by the User
 *
 * @author [Michael Bergdolt]
 */

export default function BookmarkList(props) {

    return (
        <div className="App">
            <AppHeader avatar={props.avatar}></AppHeader>
            <Container style={{marginTop: '50px'}}>
                        <Box sx={{display: 'flex', justifyContent: 'center'}}>
            <Grid
                container
                spacing={{xs: 10, md: 10}}
                columns={{xs: 4, sm: 8, md: 12}}>
                {Array.from(Array(9)).map((_, index) => (
                    <Grid xs={4} sm={4} md={4} key={index}>
                        <BookmarkProfileCard></BookmarkProfileCard>
                    </Grid>
                ))}
            </Grid>
        </Box>
            </Container>
        </div>
    )
}