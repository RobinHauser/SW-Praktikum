import React, {Component} from 'react';
import AppHeader from "../components/AppHeader";
import Container from "@mui/material/Container";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {CircularProgress, List, ListSubheader} from "@mui/material";
import ProfilePropertySelect from "../components/ProfilePropertySelect";
import ProfilePropertyFreeText from "../components/ProfilePropertyFreeText";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import InfoSelectDialog from "../components/InfoSelectDialog";
import InfoFreeTextDialog from "../components/InfoFreeTextDialog";
import Tooltip from "@mui/material/Tooltip";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import SopraDatingAPI from "../api/SopraDatingAPI";
import UserBO from "../api/UserBO";
import ProfileBO from "../api/ProfileBO";
import InformationBO from "../api/InformationBO";
import MessageRight from "../components/MessageRight";
import MessageLeft from "../components/MessageLeft";
import CachedIcon from "@mui/icons-material/Cached";

/**
 * @author [Björn Till](https://github.com/BjoernTill)
 */

class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            openSelectDialog: false,
            openFreeTextDialog: false,
            openDialogSelect: false,
            openDialogFreeText: false,
            selectedValue: null,
            properties: [],
            newProperty: "",
            isAddingNewProperty: false,
            anchorElSelect: null,
            anchorElFreeText: null,
            globalPropertiesSelect: ["Auswahl-Eigenschaft 1", "Auswahl-Eigenschaft 2", "Auswahl-Eigenschaft 3"],
            globalPropertiesFreeText: ["Freitext-Eigenschaft 1", "Freitext-Eigenschaft 2", "Freitext-Eigenschaft 3"],
            currentUser: null,
            personalProfile: null,
            loadingProgressUser: false,
            loadingProgressProfile: false,
            error: null,
            informations: null
        };

        this.handleOpenSelectDialog = this.handleOpenSelectDialog.bind(this);
        this.handleOpenFreeTextDialog = this.handleOpenFreeTextDialog.bind(this);
        this.handleCloseDialogProp = this.handleCloseDialogProp.bind(this);
        this.handleCloseDialogInfo = this.handleCloseDialogInfo.bind(this);
        this.handleOpenDialogSelect = this.handleOpenDialogSelect.bind(this);
        this.handleListItemClick = this.handleListItemClick.bind(this);
        this.handleDeleteItemClick = this.handleDeleteItemClick.bind(this);
        this.handleAddItemClick = this.handleAddItemClick.bind(this);
        this.handleNewPropertyChange = this.handleNewPropertyChange.bind(this);
        this.handleAddProperty = this.handleAddProperty.bind(this);
        this.handleOpenDialogFreeText = this.handleOpenDialogFreeText.bind(this);
        this.handleCloseDialogFreeText = this.handleCloseDialogFreeText.bind(this);
        this.handleClick = this.handleClick.bind(this);

    }

    getPersonalProfile = async () => {
        SopraDatingAPI.getAPI().getProfile(this.props.user.getUserID())
            .then(userBo =>
                this.setState({
                    personalProfile: userBo,
                    loadingProgressProfile: false,
                    error: null
                }))
            .then(() => {
                setTimeout(() => {
                    this.getInformations(this.state.personalProfile.getProfileID())
                }, 100)
            })
            .catch(e =>
                this.setState({
                    personalProfile: [],
                    loadingProgressProfile: false,
                    error: e
                })
            )
        ;
    }
    getInformations = async (id) => {
        SopraDatingAPI.getAPI().getInformationsByProfile(id)
            .then(responseJSON => {
                this.setState({
                    informations: responseJSON
                })
            }).catch(() => {
            this.setState({
                informations: []
            })
        })
    }

    handleOpenSelectDialog() {
        this.setState({openSelectDialog: true});
    }

    handleOpenFreeTextDialog() {
        this.setState({openFreeTextDialog: true});
    }

    handleCloseDialogProp() {
        const {isAddingNewProperty} = this.state;
        if (isAddingNewProperty) {
            this.setState({isAddingNewProperty: false});
        } else {
            this.setState({
                openSelectDialog: false,
                openFreeTextDialog: false,
            });
        }
    }

    async componentDidMount() {
        const exampleProperties = ["Value 1", "Value 2", "Value 3"];
        this.setState({properties: exampleProperties});
        this.setState({
            currentUser: this.props.user
        })
        await this.getPersonalProfile()

    }

    handleOpenDialogSelect() {
        this.setState({openDialogSelect: true});
    }

    handleCloseDialogInfo() {
        const {isAddingNewProperty} = this.state;
        if (isAddingNewProperty) {
            this.setState({isAddingNewProperty: false});
        } else {
            this.setState({openDialogSelect: false});
        }
    }

    handleListItemClick(value) {
        this.handleCloseDialogInfo(value);
        this.handleCloseDialogProp();
    }

    handleDeleteItemClick(value) {
        const {properties} = this.state;
        const updatedProperties = properties.filter((property) => property !== value);
        this.setState({properties: updatedProperties});
    }


    handleAddItemClick() {
        this.setState({openDialogSelect: true, isAddingNewProperty: true});
    }

    handleNewPropertyChange(event) {
        this.setState({newProperty: event.target.value});
    }

    handleAddProperty() {
        const {properties, newProperty} = this.state;
        if (newProperty.trim() !== "") {
            const updatedProperties = [...properties, newProperty];
            this.setState({properties: updatedProperties, newProperty: ""});
        }
        this.handleCloseDialogInfo();
    }

    handleOpenDialogFreeText() {
        this.setState({openDialogFreeText: true});
    }

    handleCloseDialogFreeText() {
        this.setState({openDialogFreeText: false, selectedValue: this.props.value});
    }

    handleClick(value) {
        this.handleCloseDialogFreeText(value);
        this.handleCloseDialogProp();
    }

    handleGlobalPropertiesMenuSelectClick = (event) => {
        this.setState({anchorElSelect: event.currentTarget});
    };

    handleGlobalPropertiesMenuFreeTextClick = (event) => {
        this.setState({anchorElFreeText: event.currentTarget})
    }

    handleCloseGlobalPropertiesSelect = () => {
        this.setState({anchorElSelect: null});
    };

    handleCloseGlobalPropertiesFreeText = () => {
        this.setState({anchorElFreeText: null});
    };

    handleGlobalPropertiesItemClickSelect = () => {
        this.setState({anchorElSelect: null});
        this.handleOpenDialogSelect();
    };

    handleGlobalPropertiesItemClickFreeText = () => {
        this.setState({anchorElFreeText: null});
        this.handleOpenDialogFreeText();
    };


    render() {
        const {value} = this.props;
        const {
            openSelectDialog,
            openFreeTextDialog,
            openDialogSelect,
            openDialogFreeText,
            properties,
            newProperty,
            isAddingNewProperty,
            globalPropertiesSelect,
            globalPropertiesFreeText,
            anchorElSelect,
            anchorElFreeText,
            user,
            currentUser,
            personalProfile,
            informations
        } = this.state;
        const openSelect = Boolean(anchorElSelect)
        const openFreeText = Boolean(anchorElFreeText)
        if (!informations) {
            return (
                <div>
                    <AppHeader avatar={this.props.avatar}></AppHeader>
                    <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh'}}>
                        <CircularProgress></CircularProgress>
                    </Box>
                </div>
            )
        } else {
            return (
                <div className="App">
                    <AppHeader avatar={this.props.avatar}></AppHeader>
                    <Container sx={{
                        display: 'grid',
                        placeItems: 'center',
                        marginTop: '50px',
                        marginBottom: '25px',
                        fontSize: '25px'
                    }}>
                        <Typography sx={{fontSize: 25, color: 'black'}}> Account </Typography>
                    </Container>

                    <Card sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '50px'}}>

                        <CardContent>
                            <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                                <Typography component="div" variant="h6" sx={{textAlign: 'left'}}>
                                    Name: {this.props.name}
                                </Typography>
                                <Typography component="div" variant="h6" sx={{textAlign: 'left'}}>
                                    E-Mail: {this.props.email}
                                </Typography>
                            </Box>
                        </CardContent>

                    </Card>
                    <Container style={{display: 'grid', placeItems: 'center', marginTop: '50px', marginBottom: '50px'}}>
                        <Typography sx={{fontSize: 25, color: 'black'}}> Profil </Typography>
                        <Button variant="contained"
                                onClick={() => this.getInformations(this.state.personalProfile.getProfileID())}>
                            <CachedIcon></CachedIcon>
                        </Button>
                        <List
                            sx={{width: '100%', maxWidth: 700}}
                            subheader={
                                <ListSubheader sx={{fontSize: 20, color: 'black'}}>
                                    Informationen bearbeiten
                                </ListSubheader>
                            }
                        >
                            {informations.length > 0 ? (
                                informations.map((InformationsBo, index) => (
                                    parseInt(InformationsBo.getIsSelect()) === 1 ? (
                                        <ProfilePropertySelect Key={index}
                                            InformationsBoValue={InformationsBo.getValue()}
                                            InformationsBoProp={InformationsBo.getProperty()}
                                            InformationsBoId={InformationsBo.getValueID()}
                                            InformationsBoPropId={InformationsBo.getPropID()}
                                            InformationsBoPropDescr={InformationsBo.getPropDescription()}
                                            InformationsBoInfoId={InformationsBo.getInformationId()}
                                            InformationsBoIsSelection={InformationsBo.getIsSelect()}
                                        />
                                    ) : (
                                        <ProfilePropertyFreeText Key={index}
                                            InformationsBoValue={InformationsBo.getValue()}
                                            InformationsBoProp={InformationsBo.getProperty()}
                                            InformationsBoId={InformationsBo.getValueID()}
                                            InformationsBoPropId={InformationsBo.getPropID()}
                                            InformationsBoPropDescr={InformationsBo.getPropDescription()}
                                            InformationsBoInfoId={InformationsBo.getInformationId()}
                                        />

                                    )
                                ))
                            ) : (
                                <p>Keine Informationen im Profil enthalten</p>
                            )}
                        </List>
                        <Box sx={{display: 'flex', justifyContent: 'space-evenly'}}>
                            <Container style={{
                                display: 'grid',
                                placeItems: 'center',
                                marginTop: '50px',
                                marginBottom: '50px'
                            }}>
                                <Button
                                    onClick={this.handleOpenSelectDialog}
                                    sx={{marginTop: '20px', fontWeight: 'bold'}}
                                    variant="outlined"
                                    startIcon={<AddIcon/>}
                                >
                                    Auswahl-Eigenschaft hinzufügen
                                </Button>

                                <Tooltip title={"Auswahl-Eigenschaften, die ins Profil geladen werden können."}>
                                    <Button
                                        aria-controls="dropdown-menu"
                                        aria-haspopup="true"
                                        onClick={this.handleGlobalPropertiesMenuSelectClick}
                                        variant="contained"
                                        endIcon={<ArrowDropDownIcon/>}
                                        sx={{marginTop: '25px'}}
                                    >
                                        Auswahl-Eigenschaft laden
                                    </Button>
                                </Tooltip>
                                <Menu
                                    id="dropdown-menu"
                                    anchorEl={anchorElSelect}
                                    open={openSelect}
                                    onClose={this.handleCloseGlobalPropertiesSelect}
                                >
                                    {globalPropertiesSelect.map((globalPropertyItemSelect) => (
                                        <MenuItem
                                            onClick={() => this.handleGlobalPropertiesItemClickSelect()}
                                            sx={{"&:hover": {backgroundColor: "#c6e2ff"}}}
                                            key={1}
                                        >
                                            {globalPropertyItemSelect}
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </Container>
                            <Container style={{
                                display: 'grid',
                                placeItems: 'center',
                                marginTop: '50px',
                                marginBottom: '50px'
                            }}>
                                <Button
                                    onClick={this.handleOpenFreeTextDialog}
                                    sx={{marginTop: '20px', fontWeight: 'bold'}}
                                    variant="outlined"
                                    startIcon={<AddIcon/>}
                                >
                                    Freitext-Eigenschaft hinzufügen
                                </Button>

                                <Tooltip title={"Freitext-Eigenschaften, die ins Profil geladen werden können."}>
                                    <Button
                                        aria-controls="dropdown-menu"
                                        aria-haspopup="true"
                                        onClick={this.handleGlobalPropertiesMenuFreeTextClick}
                                        variant="contained"
                                        endIcon={<ArrowDropDownIcon/>}
                                        sx={{marginTop: '25px'}}

                                    >
                                        Freitext-Eigenschaft laden
                                    </Button>
                                </Tooltip>
                                <Menu
                                    id="dropdown-menu"
                                    anchorEl={anchorElFreeText}
                                    open={openFreeText}
                                    onClose={this.handleCloseGlobalPropertiesFreeText}
                                >
                                    {globalPropertiesFreeText.map((globalPropertyItemFreeText) => (
                                        <MenuItem
                                            onClick={() => this.handleGlobalPropertiesItemClickFreeText()}
                                            sx={{"&:hover": {backgroundColor: "#c6e2ff"}}}
                                            key={1}
                                        >
                                            {globalPropertyItemFreeText}
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </Container>
                        </Box>
                        <Dialog open={openSelectDialog} onClose={() => this.handleCloseDialogProp(null)}>
                            <DialogTitle>Auswahl-Eigenschaft hinzufügen</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    Füge eine neue Auswahl-Eigenschaft hinzu, indem du den Name und die Beschreibung der
                                    Eigenschaft angibst.
                                </DialogContentText>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="name"
                                    label="Name"
                                    fullWidth
                                    variant="standard"
                                />
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="name"
                                    label="Beschreibung"
                                    fullWidth
                                    variant="standard"
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={this.handleCloseDialogProp}>Abbrechen</Button>
                                <Button onClick={this.handleOpenDialogSelect}>Anlegen</Button>
                            </DialogActions>
                        </Dialog>


                    </Container>

                    <hr/>

                    <Container style={{display: 'grid', placeItems: 'center', marginTop: '50px', marginBottom: '50px'}}>

                        <Dialog open={openFreeTextDialog} onClose={() => this.handleCloseDialogProp(null)}>
                            <DialogTitle>Freitext-Eigenschaft hinzufügen</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    Füge eine neue Freitext-Eigenschaft hinzu, indem du den Name und die Beschreibung
                                    der
                                    Eigenschaft angibst.
                                </DialogContentText>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="name"
                                    label="Name"
                                    fullWidth
                                    variant="standard"
                                />
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="name"
                                    label="Beschreibung"
                                    fullWidth
                                    variant="standard"
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={this.handleCloseDialogProp}>Abbrechen</Button>
                                <Button onClick={this.handleOpenDialogFreeText}>Anlegen</Button>
                            </DialogActions>
                        </Dialog>

                        <InfoFreeTextDialog
                            openDialogFreeText={openDialogFreeText}
                            handleCloseDialogFreeText={this.handleCloseDialogFreeText}
                            handleClick={this.handleClick}
                            value={value}
                        />

                    </Container>
                </div>
            );
        }
    }
}

export default Profile;