import * as React from 'react';
import AppHeader from "../components/AppHeader";
import Container from "@mui/material/Container";
import GridContainer from "../components/GridContainer";
import react from "react";

export default class Main extends react.Component{

    render() {
        return (
            <div className="App">
                <AppHeader avatar={this.props.avatar}></AppHeader>
                <Container style={{ marginTop: '10px' }}>
                    <GridContainer user={this.props.user} onUserLogin={this.props.onUserLogin}></GridContainer>
                </Container>
            </div>
        );
    }
}