import AppHeader from "../components/AppHeader";
import Container from "@mui/material/Container";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import placeHolderImage from "../static/images/profileImagePlaceholder.jpeg";

export default function Profile() {
    return (
        <div className="App">
            <AppHeader></AppHeader>
            <Container sx={{display: 'grid', placeItems: 'center', marginTop: '50px', marginBottom: '50px', fontSize: '25px'}}>
                Profil bearbeiten
            </Container>

            <Card sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', width: '40%' }}>
                    <CardContent>
                        <Typography component="div" variant="h6" sx={{ textAlign: 'left' }}>
                                Name: Hans Jürgen
                        </Typography>
                        <Typography component="div" variant="h6" sx={{ textAlign: 'left' }}>
                            E-Mail: Hans.juergen@mail.de
                        </Typography>
                    </CardContent>
                </Box>
                <CardMedia
                    component="img"
                    sx={{ width: 150 }}
                    image={placeHolderImage}
                    title="profileImage"/>
            </Card>
        </div>
    );
}