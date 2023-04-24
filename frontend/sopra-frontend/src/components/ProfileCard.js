import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import placeHolderImage from '../static/images/profileImagePlaceholder.jpeg';

export default function ProfileCard() {
    return (
        <Card direction="row"
              justifyContent="space-evenly"
              alignItems="center">
            <CardMedia
                sx={{height: 300}}
                image={placeHolderImage}
                title="profileImage"/>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    Hans Jürgen
                </Typography>
                <Typography variant="h6" color="text.secondary" style={{ textAlign: "left" }}>
                    Alter:
                </Typography>
                <Typography variant="h6" color="text.secondary" style={{ textAlign: "left" }}>
                    Geschlecht:
                </Typography>
                <Typography variant="h6" color="text.secondary" style={{ textAlign: "left" }}>
                    Raucher:
                </Typography>
                <Typography variant="h6" color="text.secondary" style={{ textAlign: "left" }}>
                    Religion:
                </Typography>
                <Typography variant="h6" color="text.secondary" style={{ textAlign: "left" }}>
                    Haarfarbe:
                </Typography>
                <Typography variant="h6" color="text.secondary" style={{ textAlign: "left" }}>
                    Geburtsdatum:
                </Typography>
                <Typography variant="h6" color="text.secondary" style={{ textAlign: "left" }}>
                    Körpergröße:
                </Typography>
            </CardContent>
        </Card>
    );
}