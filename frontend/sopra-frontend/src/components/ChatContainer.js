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
/**
 * *
 * @author [Jannik Haug](https://github.com/JannikHaug)
 */
export default function ChatContainer({messageArrayLeft, messageArrayRight}) {
    const navigate = useNavigate()
    const messagesEndRef = React.useRef();

  React.useEffect(() => {
    scrollToBottom(); // DOM node
  }, [messageArrayLeft, messageArrayRight]);

   function scrollToBottom() {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }
  // Quelle für das automatische nach unten Scrollen: https://stackoverflow.com/questions/37620694/how-to-scroll-to-bottom-in-react
    return (
        <div className="App">
            <Container style={{
                position: "static",
                maxWidth: "100%",
                top: "0",
                width: "100vh",
                height: "90vh",
                minHeight: "90vh"
            }}>
                <Paper style={{ maxHeight: "90vh"}}>
                    <Box style={{alignItems: "center"}} sx={{mb: 1}}>
                        <Paper style={{display: "flex", alignItems: "center"}}
                               sx={{minHeight: 50}} elevation={5}>
                            <Tooltip title="zurück zur Übersicht" fontSize="large" sx={{color: "black"}}>
                                <IconButton onClick={() => navigate(('/conversationOverview'))}>
                                    <KeyboardDoubleArrowLeftIcon></KeyboardDoubleArrowLeftIcon>
                                </IconButton>
                            </Tooltip>
                            <div style={{display: "flex", alignItems: "center"}}>
                                <Avatar src={placeHolderImage}></Avatar>
                                <Typography style={{color: "black"}} noWrap={false}
                                            sx={{ml: 2, fontSize: 20, wordBreak: 'break-all'}}> placeholder
                                    name</Typography>
                            </div>
                        </Paper>
                    </Box>

                    <List style={{
                        position: "relative",
                        height: "calc(100vh - 210px)", //Idee inspiriert durch: https://www.jimlynchcodes.com/blog/the-css-calc-function-for-a-more-consistent-responsive-design (Abgerufen am 30.04.2023)
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
                    <div ref={messagesEndRef} />

                    </List>

                </Paper>
                    <Container sx={{
                        maxHeight: "50px",
                        position: "static",
                        bottom: "0",
                        alignItems: "flex-start",
                        flexDirection: "row",
                        display: "flex",
                        justifyContent: "center"
                    }}>
                        <TextField InputProps={{style: {color: "primary"}}}
                                   InputLabelProps={{style: {color: "primary"}}}
                                   label="Write Message..." variant="standard"
                                   sx={{minWidth: "50%", mb: 1}} color="primary"/>
                        <Button sx={{maxHeight: "45px"}} variant="contained" endIcon={<SendIcon/>}>
                            Send
                        </Button>
                    </Container>
            </Container>

        </div>
    );
}