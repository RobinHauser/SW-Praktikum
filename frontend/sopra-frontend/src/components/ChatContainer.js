import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import {List, Paper, TextField} from "@mui/material";
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import {useNavigate} from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import placeHolderImage from "../static/images/profileImagePlaceholder.jpeg";
import Typography from "@mui/material/Typography";
import MessageLeft from "./MessageLeft";
import MessageRight from "./MessageRight"
import * as React from "react";
import Button from "@mui/material/Button";
import SendIcon from '@mui/icons-material/Send';

export default function ChatContainer({messageArrayLeft, messageArrayRight}) {
    const navigate = useNavigate()
    return (
        <div className="App">
            <Container style={{
                position: "static",
                maxWidth: "100%",
                top: "0",
                width: "100vh",
                height: "100vh",
                minHeight: "90vh"
            }}>
                <Paper style={{background: "#f5f5f5"}}>
                    <Box style={{alignItems: "center"}} sx={{mb: 1}}>
                        <Paper style={{display: "flex", alignItems: "center", background: "#37474f"}}
                               sx={{minHeight: 50}}>
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

                    <List style={{
                        position: "relative",
                        height: "calc(100vh - 130px)", //Idee inspiriert durch: https://www.jimlynchcodes.com/blog/the-css-calc-function-for-a-more-consistent-responsive-design (Abgerufen am 30.04.2023)
                        overflow: "auto",
                    }}>

                        <Container>
                            {messageArrayLeft.map((text) => (
                                <Box>
                                    <MessageLeft message={text}></MessageLeft>
                                </Box>
                            ))}
                            {messageArrayRight.map((text) => (
                                <Box>
                                    <MessageRight message={text}></MessageRight>
                                </Box>
                            ))}
                        </Container>
                    </List>
                    <Container sx={{
                        maxHeight: "50px",
                        position: "fixed",
                        bottom: "0",
                        alignItems: "left",
                        flexDirection: "row",
                        display: "flex",
                        justifyContent: "start"
                    }}>
                        <TextField InputProps={{style: {color: "primary"}}}
                                   InputLabelProps={{style: {color: "primary"}}}
                                   label="Write Message..." variant="standard"
                                   sx={{minWidth: "50%", mb: 1}} color="primary"/>
                        <Button sx={{maxHeight: "45px"}} variant="contained" endIcon={<SendIcon/>}>
                            Send
                        </Button>
                    </Container>
                </Paper>
            </Container>
        </div>
    );
}
