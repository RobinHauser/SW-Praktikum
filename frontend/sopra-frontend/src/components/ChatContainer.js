import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import {List, Paper, TextField} from "@mui/material";
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import {Link, useNavigate} from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import placeHolderImage from "../static/images/profileImagePlaceholder.jpeg";
import Typography from "@mui/material/Typography";
import MessageLeft from "./MessageLeft";
import MessageRight from "./MessageRight"
import * as React from "react";
import Button from "@mui/material/Button";
import SendIcon from '@mui/icons-material/Send';
import AppHeader from "./AppHeader";
import {Component} from "react";

/**
 * *
 * @author [Jannik Haug](https://github.com/JannikHaug)
 */
class ChatContainer extends Component {
    constructor(props) {
        super(props);
        this.messagesEndRef = React.createRef();
        this.messageArrayLeft = ["Hallo wie gehts?", "Danke mir auch", "Ja das ist schön", "Heute gehe ich ins Freibad", "Hallo wie gehts?", "Danke mir auch", "Ja das ist schön", "Heute gehe ich ins Freibad"]
        this.messageArrayRight = ["Hi mir gehts gut und dir?", "Super das freut mich", "Was machst du heute?", "Wow das ist cool. Ich gehe ins Kino", "Hi mir gehts gut und dir?", "Super das freut mich", "Was machst du heute?", "Wow das ist cool. Ich gehe ins Kino"]
    }
    componentDidMount() {
        this.scrollToBottom()
    }

    componentDidUpdate() {
        this.scrollToBottom()
    }
    scrollToBottom(){
        this.messagesEndRef.current?.scrollIntoView(); // Quelle für das automatische nach unten Scrollen: https://stackoverflow.com/questions/37620694/how-to-scroll-to-bottom-in-react
    }

render() {
const avatarLink = this.props.avatar
console.log(avatarLink)
    return (
        <div className="App">
            <AppHeader avatar={this.props.avatar}></AppHeader>
            <Container style={{
                position: "static",
                maxWidth: "100%",
                top: "0",
                width: "100vh",
                height: "90vh",
                minHeight: "90vh"
            }}>
                <Paper style={{maxHeight: "90vh"}}>
                    <Box style={{alignItems: "center"}} sx={{mb: 1}}>
                        <Paper style={{display: "flex", alignItems: "center"}}
                               sx={{minHeight: 50}} elevation={5}>
                            <Tooltip title="zurück zur Übersicht" fontSize="large" sx={{color: "black"}}>
                                <Link to="/ConversationOverview">
                                <IconButton>
                                    <KeyboardDoubleArrowLeftIcon></KeyboardDoubleArrowLeftIcon>
                                </IconButton>
                                    </Link>
                            </Tooltip>
                            <div style={{display: "flex", alignItems: "center"}}>
                                <Avatar></Avatar>
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
                            {this.messageArrayLeft.map((text) => (
                                <Box>
                                    <MessageLeft message={text} ></MessageLeft>
                                </Box>
                            ))}
                            {this.messageArrayRight.map((text) => (
                                <Box>
                                    <MessageRight message={text} avatarLink={avatarLink}></MessageRight>
                                </Box>
                            ))}
                        </Container>

                        <div ref={this.messagesEndRef}/>

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
}
export default ChatContainer