import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import * as React from "react";
import Button from '@mui/material/Button';
import GoogleIcon from '@mui/icons-material/Google';
import Typography from "@mui/material/Typography";
import Divider from '@mui/material/Divider';

export default function SignInCard() {
    return (
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
                        Willkommen auf der Sopra Dating Webseite. Wenn Sie noch keinen Account haben können Sie sich
                        hier
                        einfach über Google registrieren. Dann wird ein neuer Account für die angelegt. Haben Sie
                        bereits
                        einen können sie sich mit dem gleich Google Account anmelden mit dem Sie sich registriert haben.
                        <br/>
                        <br/>
                        <i>Viel Spaß beim verwenden der Sopra Dating Webseite.</i>
                    </Typography>
                </div>
                <Divider style={{marginTop: '50px', marginBottom: '50px'}}/>
                <Button variant="contained" startIcon={<GoogleIcon/>}>
                    Sign-In
                </Button>
            </CardContent>
        </Card>
    );
}