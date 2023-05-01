import {List} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import ConversationOverviewItem from "./ConversationOverviewItem";
import * as React from "react";
import {useEffect} from "react";

export default function ConversationOverviewContainer({name}) {


    return (
        <div>
            <Grid
                container
                alignItems="center"
                spacing={0}
                direction="row"
                justifyContent="center"
                flexFlow="column wrap">

                <Grid>

                    <List id="conversationOverviewList" sx={{width: '100%', maxWidth: 700}}>
                        {name.map((item) => (
                            <ConversationOverviewItem name={item}></ConversationOverviewItem>
                        ))}
                    </List>

                </Grid>
            </Grid>
        </div>

    );
}

