import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import {CircularProgress, List, Paper, TextField} from "@mui/material";
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import {Link} from "react-router-dom";
import Typography from "@mui/material/Typography";
import MessageLeft from "./MessageLeft";
import MessageRight from "./MessageRight"
import * as React from "react";
import Button from "@mui/material/Button";
import SendIcon from '@mui/icons-material/Send';
import AppHeader from "./AppHeader";
import {Component} from "react";
import SopraDatingAPI from "../api/SopraDatingAPI";
import CachedIcon from '@mui/icons-material/Cached';


/**
 * Class react component which includes the complete chat ui with messages, textfield and a send button.
 */

class ChatContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messageList: [],
            error: null,
            chatPartner: null,
            currentTime: null,
            messageText: '',
            chatId: null,
            currentUser: this.props.user.getUserID(),
            currentUserBo: null

        };
        this.messagesEndRef = React.createRef();
    }

    /**
     * Gets all messages of the given chatid
     * @param {int} id - current chat id
     *
     */
    getMessageList = (id) => {
        SopraDatingAPI.getAPI().getChatMessages(id)
            .then(messages =>
                this.setState({
                    messageList: messages,
                    error: null
                }))
            .catch(e =>
                this.setState({
                    messageList: [],
                    error: e
                })
            )
        ;
    }
    /**
     * Gets the user from the current chat partner
     *
     */
    getUserBo = () => {
        SopraDatingAPI.getAPI().getUserbyId(this.state.chatPartner)
            .then(userBo =>
                this.setState({
                    currentUserBo: userBo,
                    error: null
                }))
            .catch(e =>
                this.setState({
                    currentUserBo: [],
                    error: e
                })
            )
        ;
    }

    /**
     * This function fills a messageBo with the written text of the text field, current date and time and chatid.
     * Then triggers the sendMessage function and gives the messageBo as a parameter.
     * After sending, it waits for a timeout of 100 ms and then retrieves all messages again.
     */
    buttonSendFunction() {
        const content = this.state.messageText
        const dateTime = this.getFormatedDateTime()
        const chatId = this.state.chatId
        const chatPartner = this.state.chatPartner
        let messageBo = {
            "Content": `${content}`,
            "TimeStamp": `${dateTime}`,
            "ChatID": chatId,
            "UserID": chatPartner
        }
        this.sendMessage(messageBo)
        this.setState({messageText: ''})
        setTimeout(() => {
            this.getMessageList(this.state.chatId)
        }, 100)


    }

    /**
     * Sends a messageBo with the current User to add a message to the Database
     * @param {Object} messageBo -Object for sending a message
     * @property {string} messageBo.content - The content written by the user
     * @property {string} messageBo.timeStamp - Time of sending the message
     * @property {int} messageBo.chatId - The id of the current chat
     */
    sendMessage = (messageBo) => {
        SopraDatingAPI.getAPI().addMessage(this.state.currentUser, messageBo)
            .then(() => {
            })
            .catch(error => {
                alert("Du kannst einem User keine Nachricht schicken wenn er dich geblockt hat!")
            })
    }

    /**
     * Gets the current time and date and formats it into sql datetime format
     * It changes the timezone to CET.
     */
    getFormatedDateTime() {
        let dateTime = new Date().toISOString()
        dateTime = dateTime.replace('T', ' ')
        dateTime = dateTime.substring(0, dateTime.length - 5)
        let time = dateTime.substring(11, 13)
        let changedTime = parseInt(time) + 2
        changedTime = changedTime.toString()
        const dateTime1 = dateTime.substring(0, 11)
        const dateTime2 = dateTime.substring(13)
        dateTime = dateTime1 + changedTime + dateTime2
        return dateTime
    }

    /**
     * Gets the current chat ID
     */
    getChatId() {
        const urlChatId = window.location.pathname.split('/')
        this.state.chatId = urlChatId[2]
    }
    /**
     * Gets the current chat partner ID
     */
    getChatPartner() {
        const urlChatPartner = window.location.pathname.split('/')
        this.state.chatPartner = urlChatPartner[3]
    }

    /**
     * Gets the current text, written in the text field
     * @param {Object} event
     */
    handleInputChange = (event) => {
        this.setState({messageText: event.target.value})
    }

    /**
     * Scrolls the message list to the bottem (newest message)
     * Reference: https://stackoverflow.com/questions/37620694/how-to-scroll-to-bottom-in-react
     */
    scrollToBottom() {
        this.messagesEndRef.current?.scrollIntoView()
    }

    /**
     * Called after the component did mount.
     * It retrieves the current chat ID, all messages of the current chat and scrolls to the newest message
     */
    async componentDidMount() {
        this.getChatPartner()
        this.getChatId()
        this.getMessageList(this.state.chatId)
        this.scrollToBottom()
        this.getUserBo()
        await this.state.currentUserBo().then(user => {
             this.setState({
                 currentUserBo: user
             })
        })
    }

    /**
     * Called after the component did update.
     * It scrolls to the newest message
     */
    componentDidUpdate() {
        this.scrollToBottom()
    }


    /**
     * Renders the class component
     * @returns ChatContainer - the rendered component
     * Reference for list height calculation: https://www.jimlynchcodes.com/blog/the-css-calc-function-for-a-more-consistent-responsive-design
     */
    render() {
        const avatarLink = this.props.avatar
        const currentUser = parseInt(this.props.user.getUserID())
        const {messageList, currentUserBo} = this.state
        if (!currentUserBo) {
            return (<div>
                    <AppHeader avatar={this.props.avatar}></AppHeader>
                    <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh'}}>
                        <CircularProgress></CircularProgress>
                    </Box>
                </div>)
        } else {
            const currentUserBoSingle = currentUserBo[0]
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
                        <Paper sx={{maxHeight: "90vh"}}>
                            <Box sx={{mb: 1, alignItems: "center"}}>
                                <Paper
                                    sx={{
                                        minHeight: 50,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between"
                                    }} elevation={5}>
                                    <Tooltip title="zurück zur Übersicht" fontSize="large" sx={{color: "black"}}>
                                        <Link to="/ConversationOverview">
                                            <IconButton>
                                                <KeyboardDoubleArrowLeftIcon></KeyboardDoubleArrowLeftIcon>
                                            </IconButton>
                                        </Link>
                                    </Tooltip>
                                    <div style={{display: "flex", alignItems: "center"}}>
                                        <Typography noWrap={false}
                                                    sx={{
                                                        ml: 2,
                                                        fontSize: 20,
                                                        wordBreak: 'break-all',
                                                        color: "black"
                                                    }}>{currentUserBoSingle.getDisplayname()}</Typography>
                                    </div>
                                    <Tooltip title="Nachrichten laden" fontSize="large"
                                             sx={{color: "white", marginRight: 3}}>
                                        <Button variant="contained"
                                                onClick={() => this.getMessageList(this.state.chatId)}>
                                            <CachedIcon></CachedIcon>
                                        </Button>
                                    </Tooltip>
                                </Paper>
                            </Box>

                            <List sx={{
                                position: "relative",
                                height: "calc(100vh - 210px)",
                                overflow: "auto",
                            }}>
                                <Container>
                                    {messageList.length > 0 ? (
                                        messageList.map((MessageBO) => (
                                            MessageBO.getSenderID() === currentUser ? (
                                                <MessageRight content={MessageBO.getContent()}
                                                              timeStamp={MessageBO.getTimeStamp()}
                                                              avatarLink={avatarLink}></MessageRight>
                                            ) : (
                                                <MessageLeft content={MessageBO.getContent()}
                                                             timeStamp={MessageBO.getTimeStamp()}
                                                             avatarLink={currentUserBoSingle.getAvatarURL()}></MessageLeft>
                                            )
                                        ))
                                    ) : (
                                        <p>Keine Nachrichten gefunden.</p>
                                    )}
                                </Container>

                                <div ref={this.messagesEndRef}/>

                            </List>

                        </Paper>
                        <Paper elevation={5} sx={{borderRadius: "0 0 10px 10px"}}>
                            <Container sx={{
                                maxHeight: "50px",
                                position: "static",
                                bottom: "0",
                                alignItems: "flex-start",
                                flexDirection: "row",
                                display: "flex",
                                justifyContent: "center",
                            }}>

                                <TextField value={this.state.messageText} InputProps={{style: {color: "primary"}}}
                                           InputLabelProps={{style: {color: "primary"}}}
                                           label="Write Message..." variant="standard"
                                           sx={{minWidth: "50%", mb: 1}} color="primary"
                                           onChange={this.handleInputChange}/>
                                <Button sx={{maxHeight: "45px", marginTop: 1}} variant="contained" endIcon={<SendIcon/>}
                                        onClick={() => this.buttonSendFunction()}>
                                    Send
                                </Button>
                            </Container>
                        </Paper>
                    </Container>

                </div>
            );
        }
    }
}

export default ChatContainer