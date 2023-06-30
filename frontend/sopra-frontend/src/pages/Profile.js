import React, {Component} from 'react';
import AppHeader from "../components/AppHeader";
import Container from "@mui/material/Container";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {Alert, CircularProgress, List, ListSubheader} from "@mui/material";
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
import SopraDatingAPI from "../api/SopraDatingAPI";
import CachedIcon from "@mui/icons-material/Cached";
import PropertySelectMenuItem from "../components/PropertySelectMenuItem";
import PropertyTextMenuItem from "../components/PropertyTextMenuItem";
import DeleteIcon from "@mui/icons-material/Delete";
import {getAuth, signOut} from "firebase/auth";

/**
 * @author [Björn Till](https://github.com/BjoernTill)
 * @author [Jannik Haug](https://github.com/JannikHaug)
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
            globalPropertiesSelect: [],
            globalPropertiesFreeText: [],
            currentUser: null,
            personalProfile: null,
            loadingProgressUser: false,
            loadingProgressProfile: false,
            error: null,
            informations: null,
            PropertySelectionNameText: '',
            PropertySelectionDescriptionText: '',
            PropertyFreeTextNameText: '',
            PropertyFreeTextDescriptionText: '',
            successAlert: "",
            warningAlert: ""
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

    /**
     * Called after the component did mount.
     * It retrieves the personal profile of the current user
     */
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
    /**
     * Gets all information of a profile
     * @param {int} id - id of the current personal profile
     */
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

    /**
     * Handles the dialog open for selection dialog to add a new selection property
     */
    handleOpenSelectDialog() {
        this.setState({openSelectDialog: true});
    }

    /**
     * Handles the dialog open for free text dialog to add a new free text property
     */
    handleOpenFreeTextDialog() {
        this.setState({openFreeTextDialog: true});
    }

    /**
     * Handles the dialog close for dialogs
     */
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

    /**
     * Called after the component did mount.
     * Sets the current system user and gets the personal profile
     */
    async componentDidMount() {
        this.getAllSelectionProperties()
        this.getAllFreeTextProperties()
        this.setState({
            currentUser: this.props.user
        })
        await this.getPersonalProfile()
    }

    // Handler um eine neue Auswahl-Eigenschaft ins Backend zu schicken
    addSelectionPropertyClickHandler = () => {
        const {PropertySelectionNameText, PropertySelectionDescriptionText} = this.state;
        this.addSelectionProperty({
            "name": PropertySelectionNameText,
            "description": PropertySelectionDescriptionText
        })
        this.setState({PropertySelectionNameText: '', PropertySelectionDescriptionText: ''})
        setTimeout(() => {
            this.setState({successAlert: "", warningAlert: ""})
        }, 3000);
    }


    // Handler um eine neue Freitext-Eigenschaft ins Backend zu schicken

    addFreeTextPropertyClickHandler = () => {
        const {PropertyFreeTextNameText, PropertyFreeTextDescriptionText} = this.state;
        this.setState({openFreeTextDialog: false})
        this.addFreeTextProperty({
            "name": PropertyFreeTextNameText,
            "description": PropertyFreeTextDescriptionText
        })
        setTimeout(() => {
            this.setState({successAlert: "", warningAlert: ""})
        }, 3000);
        this.setState({PropertyFreeTextNameText: '', PropertyFreeTextDescriptionText: ''})
    }

    addSelectionProperty = (propertyBO) => {
        this.setState({openSelectDialog: false})
        SopraDatingAPI.getAPI().addSelectionProperty(propertyBO)
            .then(() => {
                this.setState({
                    error: null,
                    successAlert: "neue Auswahleigenschaft der Liste hinzugefügt"
                });
                this.getAllSelectionProperties()
            }).catch(e => {
            this.setState({
                error: e,
                warningAlert: "Auswahleigenschaft existiert bereits"
            });
        });
    };

    addFreeTextProperty = (propertyBO) => {
        SopraDatingAPI.getAPI().addFreeTextProperty(propertyBO)
            .then(() => {
                this.setState({
                    error: null,
                    successAlert: "neue Freitext-Eigenschaft der Liste hinzugefügt"
                });
                this.getAllFreeTextProperties()
            }).catch(e => {
            this.setState({
                error: e,
                warningAlert: "Freitext-Eigenschaft existiert bereits"
            });
        });
    };

    isFormValidSelect() {
        return (
            this.state.PropertySelectionNameText.trim() !== '' &&
            this.state.PropertySelectionDescriptionText.trim() !== ''
        );
    }

    isFormValidFreeText() {
        return (
            this.state.PropertyFreeTextNameText.trim() !== '' &&
            this.state.PropertyFreeTextDescriptionText.trim() !== ''
        );
    }

    getAllSelectionProperties = () => {
        SopraDatingAPI.getAPI().getAllSelectionProperties()
            .then(PropertyBOs => {
                this.setState({
                    globalPropertiesSelect: PropertyBOs,
                    error: null
                });
            })
            .catch(e => {
                this.setState({
                    GlobalPropertiesSelect: [],
                    error: e
                });
            });

    };

    getAllFreeTextProperties = () => {
        SopraDatingAPI.getAPI().getAllFreeTextProperties()
            .then(PropertyBOs => {
                this.setState({
                    globalPropertiesFreeText: PropertyBOs,
                    error: null
                });
            })
            .catch(e => {
                this.setState({
                    GlobalPropertiesFreeText: [],
                    error: e
                });
            });

    };

    handleInputChangeSelectionName = (event) => {
        this.setState({PropertySelectionNameText: event.target.value});
    }

    handleInputChangeSelectionDescription = (event) => {
        this.setState({PropertySelectionDescriptionText: event.target.value});
    }

    handleInputChangeFreeTextName = (event) => {
        this.setState({PropertyFreeTextNameText: event.target.value});
    }

    handleInputChangeFreeTextDescription = (event) => {
        this.setState({PropertyFreeTextDescriptionText: event.target.value});
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
        this.setState({openDialogSelect: false, isAddingNewProperty: true});
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
        this.setState({anchorElSelect: null, openDialogSelect: true});
    };

    handleGlobalPropertiesItemClickFreeText = () => {
        this.setState({anchorElFreeText: null});
        this.handleOpenDialogFreeText();
    };

    /**
     *
     * source: https://stackoverflow.com/questions/179355/clearing-all-cookies-with-javascript
     */
    deleteAllCookies = () => {
        document.cookie = 'token=;path=/';
    }

    handleDeleteUser = async () => {
        const {user} = this.props;
        await SopraDatingAPI.getAPI().deleteUser(user.getUserID(), user)
        const auth = getAuth();
        await signOut(auth)
        this.deleteAllCookies()
    }

    /**
     * Renders the class component
     * @returns Profile - the rendered component
     */
    render() {
        const {value} = this.props;
        const {
            openSelectDialog,
            openFreeTextDialog,
            openDialogSelect,
            openDialogFreeText,
            globalPropertiesSelect,
            globalPropertiesFreeText,
            anchorElSelect,
            anchorElFreeText,
            informations,
            successAlert,
            warningAlert
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
                        <Button variant="contained"
                                onClick={() => this.getInformations(this.state.personalProfile.getProfileID())}>
                            <CachedIcon></CachedIcon>
                        </Button>
                        <Typography sx={{fontSize: 25, color: 'black', marginTop: '20px'}}> Profil </Typography>
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
                                        <ProfilePropertySelect key={InformationsBo.getInformationId()}
                                                               UserId={this.props.user.getUserID()}
                                                               InformationsBoValue={InformationsBo.getValue()}
                                                               InformationsBoProp={InformationsBo.getProperty()}
                                                               InformationsBoId={InformationsBo.getValueID()}
                                                               InformationsBoPropId={InformationsBo.getPropID()}
                                                               InformationsBoPropDescr={InformationsBo.getPropDescription()}
                                                               InformationsBoInfoId={InformationsBo.getInformationId()}
                                                               InformationsBoIsSelection={InformationsBo.getIsSelect()}
                                        />
                                    ) : (
                                        <ProfilePropertyFreeText key={InformationsBo.getInformationId()}
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
                                    {globalPropertiesSelect.length > 0 ? (
                                        this.state.globalPropertiesSelect.map((globalPropertyItemSelect) => (
                                            <PropertySelectMenuItem
                                                key={globalPropertyItemSelect.getPropertyID()}
                                                InformationsBoProp={globalPropertyItemSelect.getPropertyName()}
                                                InformationsBoPropId={globalPropertyItemSelect.getPropertyID()}
                                                InformationsBoPropDescr={globalPropertyItemSelect.getPropertyDescription()}
                                                UserId={this.props.user.getUserID()}
                                                InformationsBoIsSelection={globalPropertyItemSelect.getIsSelection()}
                                                profileId={this.state.personalProfile.getProfileID()}
                                                getAllSelectionProperties={this.getAllSelectionProperties}>
                                            </PropertySelectMenuItem>
                                        ))) : (
                                        <p>Es gibt keine globalen Eigenschaften.</p>
                                    )
                                    }
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
                                    {globalPropertiesFreeText.length > 0 ? (
                                        this.state.globalPropertiesFreeText.map((globalPropertyItemFreeText) => (
                                            <PropertyTextMenuItem
                                                key={globalPropertyItemFreeText.getPropertyID()}
                                                InformationsBoProp={globalPropertyItemFreeText.getPropertyName()}
                                                InformationsBoPropId={globalPropertyItemFreeText.getPropertyID()}
                                                InformationsBoPropDescr={globalPropertyItemFreeText.getPropertyDescription()}
                                                UserId={this.props.user.getUserID()}
                                                InformationsBoIsSelection={globalPropertyItemFreeText.getIsSelection()}
                                                profileId={this.state.personalProfile.getProfileID()}
                                                getAllFreetextProperties={this.getAllFreeTextProperties}>
                                            </PropertyTextMenuItem>
                                        ))) : (
                                        <p>Es gibt keine globalen Eigenschaften.</p>
                                    )
                                    }
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
                                    value={this.state.PropertySelectionNameText}
                                    onChange={this.handleInputChangeSelectionName}
                                    autoFocus
                                    margin="dense"
                                    id="name"
                                    label="Name"
                                    fullWidth
                                    variant="standard"/>
                                <TextField
                                    value={this.state.PropertySelectionDescriptionText}
                                    onChange={this.handleInputChangeSelectionDescription}
                                    autoFocus
                                    margin="dense"
                                    id="name"
                                    label="Beschreibung"
                                    fullWidth
                                    variant="standard"/>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={this.handleCloseDialogProp}>Abbrechen</Button>
                                <Button onClick={this.addSelectionPropertyClickHandler}
                                        disabled={!this.isFormValidSelect()}>Anlegen</Button>
                            </DialogActions>
                        </Dialog>

                        <InfoSelectDialog
                            openDialogSelect={openDialogSelect}
                            handleCloseDialogInfo={this.handleCloseDialogInfo}
                            handleClick={this.handleClick}
                            value={value}
                        />
                        {successAlert.length > 0 && (
                            <Alert severity="success">{successAlert}</Alert>
                        )}
                        {warningAlert.length > 0 && (
                            <Alert severity="warning">{warningAlert}</Alert>
                        )}
                    </Container>

                    <hr/>

                    <Container style={{display: 'grid', placeItems: 'center', marginTop: '50px', marginBottom: '0px'}}>

                        <Dialog open={openFreeTextDialog} onClose={() => this.handleCloseDialogProp(null)}>
                            <DialogTitle>Freitext-Eigenschaft hinzufügen</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    Füge eine neue Freitext-Eigenschaft hinzu, indem du den Name und die Beschreibung
                                    der
                                    Eigenschaft angibst.
                                </DialogContentText>
                                <TextField
                                    value={this.state.PropertyFreeTextNameText}
                                    onChange={this.handleInputChangeFreeTextName}
                                    autoFocus
                                    margin="dense"
                                    id="name"
                                    label="Name"
                                    fullWidth
                                    variant="standard"
                                />
                                <TextField
                                    value={this.state.PropertyFreeTextDescriptionText}
                                    onChange={this.handleInputChangeFreeTextDescription}
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
                                <Button onClick={this.addFreeTextPropertyClickHandler}
                                        disabled={!this.isFormValidFreeText()}>Anlegen</Button>
                            </DialogActions>
                        </Dialog>

                        <InfoFreeTextDialog
                            openDialogFreeText={openDialogFreeText}
                            handleCloseDialogFreeText={this.handleCloseDialogFreeText}
                            handleClick={this.handleClick}
                            value={value}
                        />
                        <Tooltip title="Account löschen" fontSize="large">
                            <Button variant="contained"
                                    onClick={this.handleDeleteUser}
                                    sx={{
                                        color: "white",
                                        backgroundColor: "red",
                                        borderColor: 'red',
                                        '&:hover': {
                                            backgroundColor: "white",
                                            color: "red",
                                            border: "solid 1px red"
                                        },
                                        fontWeight: 'bold',
                                        marginBottom: '40px'
                                    }}
                                    startIcon={<DeleteIcon/>}>Account löschen</Button>
                        </Tooltip>
                    </Container>
                </div>
            );
        }
    }
}

export default Profile;