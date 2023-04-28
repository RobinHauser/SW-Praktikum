import Container from "@mui/material/Container";
import {List, ListItem, Paper} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import ChatUser from "./ChatUser";
import Typography from "@mui/material/Typography";
import ProfileCard from "./ProfileCard";
import * as React from "react";
import Message from "./Message"

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
                justifyContent="center"
                flexFlow="column wrap">

                 <Grid ChatUserContainer>
                    <Paper elevation={3} style={{ textAlign: "center"}}>
                        <Typography> My Chats </Typography>
                        <List>
                            {Array.from(Array(9)).map((_, index) => (
                                <ChatUser></ChatUser>
                            ))}
                        </List>
                    </Paper>
                 </Grid>
                 <Grid ChatUserContainer>
                     <Grid MessageContainerLeft>
                        <Paper style={{ textAlign: "left", width: 300 }}>
                            {Array.from(Array(9)).map((_, index) => (
                                <Message></Message>
                            ))}
                        </Paper>
                     </Grid>
                     <Grid MessageContainerRight>
                        <Paper>
                            {Array.from(Array(9)).map((_, index) => (
                                <Message></Message>
                            ))}
                        </Paper>
                     </Grid>
                 </Grid>
            </Grid>

        </div>
    );
}