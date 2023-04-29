import {List} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import ConversationOverviewItem from "./ConversationOverviewItem";
import * as React from "react";



export default function ConversationOverviewContainer() {
    return (
        <div>
            <Grid
                container
                alignItems="center"
                spacing={0}
                direction="row"
                justifyContent="center"
                flexFlow="column wrap">

                <Grid ChatUserContainer>

                    <List  sx={{ width: '100%', maxWidth: 700}}>
                        {Array.from(Array(9)).map((_, index) => (
                            <ConversationOverviewItem></ConversationOverviewItem>
                        ))}
                    </List>

                </Grid>
            </Grid>
        </div>
    );
}