import Container from "@mui/material/Container";
import {List, ListItem, Paper} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import ChatUser from "./ChatUser";
import Typography from "@mui/material/Typography";
import ProfileCard from "./ProfileCard";
import * as React from "react";


const styles = {
    paper: {
        backgroundColor: "black"
    }
};
export default function ChatContainer() {
    return (
        <div>
            <Grid
                container
                alignItems="center"
                spacing={0}
                direction="row"
                justifyContent="center">

                 <Grid ChatUserContainer>
                    <Paper elevation={3} style={{ textAlign: "left"}}   >
                        <List>
                            {Array.from(Array(9)).map((_, index) => (
                                <ChatUser></ChatUser>
                            ))}
                        </List>
                    </Paper>
                 </Grid>
                 <Grid ChatUserContainer>
                    <Paper style={{ textAlign: "left", width: 300 }}>
                        test
                    </Paper>
                 </Grid>
            </Grid>

        </div>
    );
}