import AppHeader from "../components/AppHeader";
import Container from "@mui/material/Container";
import ConversationOverwievContainer from "../components/ConversationOverviewContainer";
import Box from "@mui/material/Box";
import {Paper, TextField} from "@mui/material";
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import {useNavigate} from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import placeHolderImage from "../static/images/profileImagePlaceholder.jpeg";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import Message from "./Message";
import * as React from "react";
import {TextFields} from "@mui/icons-material";
import Button from "@mui/material/Button";
import SendIcon from '@mui/icons-material/Send';

export default function ChatContainer() {
    const navigate = useNavigate()
    return (
        <div className="App">
            <Box style={{alignItems: "center"}} sx={{mb: 1}}>
                <Paper style={{display: "flex", alignItems: "center", background: "#37474f"}} sx={{minHeight: 50}}>
                    <Tooltip title="zurrück zur Übersicht" fontSize="large" sx={{color: "white"}}>
                        <IconButton onClick={() => navigate(('/conversationOverview'))}>
                            <KeyboardDoubleArrowLeftIcon></KeyboardDoubleArrowLeftIcon>
                        </IconButton>
                    </Tooltip>
                    <div style={{display: "flex", alignItems: "center"}}>
                        <Avatar src={placeHolderImage}></Avatar>
                        <Typography style={{color: "white"}} noWrap={false}
                                    sx={{ml: 2, fontSize: 20, wordBreak: 'break-all'}}> placeholder
                            name</Typography>
                    </div>
                </Paper>
            </Box>
            <Paper style={{background: "#b0bec5"}}>
                <Grid container spacing={2} sx={{justifyContent: 'space-evenly'}}>
                    <Grid MessageContainerLeft>
                        <Paper style={{textAlign: "left", maxWidth: 300}}>
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
            </Paper>
            <Box style={{alignItems: "center"}} sx={{mb: 1}}>
                <Paper style={{display: "flex", alignItems: "center", background: "#37474f", justifyContent: 'center'}}
                       sx={{minHeight: 50}}>
                    <TextField InputProps={{style: {color: "white"}}} InputLabelProps={{style: {color: "white"}}}
                               label="Write Message..." variant="standard"
                               sx={{minWidth: "50%", mb: 1}} color="primary"/>
                    <Button variant="contained" endIcon={<SendIcon/>}>
                        Send
                    </Button>
                </Paper>
            </Box>
        </div>
    );
}
