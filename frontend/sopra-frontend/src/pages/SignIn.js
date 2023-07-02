import AppHeaderLight from "../components/AppHeaderLight";
import Container from "@mui/material/Container";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import GoogleIcon from "@mui/icons-material/Google";
import Card from "@mui/material/Card";
import * as React from "react";
import {Component} from "react";
import PropTypes from "prop-types";

class SignIn extends Component {
    /**
     * handles the sign in button click to sign the user in with google firebase
     */
    handleSignInButtonClicked = () => {
        this.props.onSignIn();
    }

    /**
     * Renders the class component
     * @returns SignIn - the rendered component
     */
    render() {
        return (
            <div className="App">
                <AppHeaderLight></AppHeaderLight>
                <Container style={{marginTop: '50px'}}>
                    <Card direction="row"
                          justifycontent="space-evenly"
                          alignitems="center">
                        <CardContent>
                            <div style={{textAlign: "left"}}>
                                <Typography gutterBottom variant="h6" component="div">
                                    Loggen Sie sich ein! :)
                                </Typography>
                                <br/>
                                <br/>
                                <Typography color="text.secondary">
                                    Willkommen auf der Sopra Dating Webseite. Wenn Sie noch keinen Account haben können
                                    Sie sich hier einfach über Google registrieren. Dann wird ein neuer Account für
                                    Sie angelegt. Haben Sie bereits einen, können sie sich mit dem gleichen Google
                                    Account anmelden, mit dem Sie sich registriert haben.
                                    <br/>
                                    <br/>
                                    <i>Viel Spaß beim verwenden der Sopra Dating Webseite.</i>
                                </Typography>
                            </div>
                            <Divider style={{marginTop: '50px', marginBottom: '50px'}}/>
                            <Button variant="contained" startIcon={<GoogleIcon/>}
                                    onClick={this.handleSignInButtonClicked}>
                                Sign-In
                            </Button>
                        </CardContent>
                    </Card>
                </Container>
            </div>
        );
    }
}

/** PropTypes */
SignIn.propTypes = {
    /**
     * Handler function, which is called if the user wants to sign in.
     */
    onSignIn: PropTypes.func.isRequired,
}

export default SignIn;