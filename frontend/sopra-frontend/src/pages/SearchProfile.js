import React, {Component} from 'react';
import AppHeader from "../components/AppHeader";
import Container from "@mui/material/Container";
import {Alert, CircularProgress, List, ListSubheader} from "@mui/material";
import ProfilePropertySelect from "../components/ProfilePropertySelect";
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import Tooltip from "@mui/material/Tooltip";
import {Link} from "react-router-dom";
import Button from '@mui/material/Button';
import AddIcon from "@mui/icons-material/Add";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import InfoSelectDialog from "../components/InfoSelectDialog";
import ProfilePropertyFreeText from "../components/ProfilePropertyFreeText";
import InfoFreeTextDialog from "../components/InfoFreeTextDialog";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Menu from "@mui/material/Menu";
import SopraDatingAPI from "../api/SopraDatingAPI";
import Box from "@mui/material/Box";
import CachedIcon from "@mui/icons-material/Cached";
import PropertySelectMenuItem from "../components/PropertySelectMenuItem";
import PropertyTextMenuItem from "../components/PropertyTextMenuItem";


/**
 * Class react component which includes the search profile page
 */

class SearchProfile extends Component {

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
            SearchProfileId: null,
            PropertySelectionNameText: '',
            PropertyFreeTextNameText: '',
            PropertyFreeTextDescriptionText: '',
            PropertySelectionDescriptionText: '',
            successAlert: '',
            warningAlert: '',
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
     * Gets the search profile
     */

    componentDidMount() {
        this.getSearchProfileId()
        this.getAllSelectionProperties()
        this.getAllFreeTextProperties()
        this.getInformations(this.state.SearchProfileId)
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
     * Calls the API to get a search profile
     * It retrieves the search profile of a search profile id
     */
    getSearchProfile = () => {
        SopraDatingAPI.getAPI().getSearchProfile(this.state.SearchProfileId)
            .then(SearchProfileBO => {
                this.setState({
                    searchprofile: SearchProfileBO,
                    error: null
                });
            })
            .catch(e => {
                this.setState({
                    searchprofile: null,
                    error: e
                });
            });
    };

    /**
     * Gets the search profile id of a search profile for a user
     */
    getSearchProfileId() {
        const urlSearchProfileId = window.location.pathname.split('/')
        this.state.SearchProfileId = urlSearchProfileId[2]
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
     * Handles the dialog open for dialogs
     */
    handleOpenDialogSelect() {
        this.setState({openDialogSelect: true});
    }

    /**
     * Handles the dialog close for dialogs
     */
    handleCloseDialogInfo() {
        const {isAddingNewProperty} = this.state;
        if (isAddingNewProperty) {
            this.setState({isAddingNewProperty: false});
        } else {
            this.setState({openDialogSelect: false});
        }
    }

    /**
     * Handles clicking on an item in the dialog window in which options for a selection property can be selected
     * @param value - value of the Item which is getting clicked
     */
    handleListItemClick(value) {
        this.handleCloseDialogInfo(value);
        this.handleCloseDialogProp();
    }

    /**
     * Handles clicking on an item in the dialog window in which options for a selection property can be selected
     * @param value - value of the Item which is getting clicked
     */
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

    /**
     * Handles the adding of a new Property and closes the dialog
     */
    handleAddProperty() {
        const {properties, newProperty} = this.state;
        if (newProperty.trim() !== "") {
            const updatedProperties = [...properties, newProperty];
            this.setState({properties: updatedProperties, newProperty: ""});
        }
        this.handleCloseDialogInfo();
    }

    /**
     * Handles the dialog open to the dialog with which a new free text property can be added
     */
    handleOpenDialogFreeText() {
        this.setState({openDialogFreeText: true});
    }

    /**
     * Handles the dialog close to the dialog with which a new free text property can be added
     */
    handleCloseDialogFreeText() {
        this.setState({openDialogFreeText: false, selectedValue: this.props.value});
    }

    handleClick(value) {
        this.handleCloseDialogFreeText(value);
        this.handleCloseDialogProp();
    }


    /**
     * Opens the list to load new selection properties into the profile
     * @param event -  Returns the list of the selection properties
     */
    handleGlobalPropertiesMenuSelectClick = (event) => {
        this.setState({anchorElSelect: event.currentTarget});
    };

     /**
     * Opens the list to load new free text properties into the profile
     * @param event -  Returns the list of the free text properties
     */
    handleGlobalPropertiesMenuFreeTextClick = (event) => {
        this.setState({anchorElFreeText: event.currentTarget})
    }

    /**
     * Handles the close of the list with which new selection properties can be loaded into the profile
     */
    handleCloseGlobalPropertiesSelect = () => {
        this.setState({anchorElSelect: null});
    };

    /**
     * Handles the close of the list with which new free text properties can be loaded into the profile
     */
    handleCloseGlobalPropertiesFreeText = () => {
        this.setState({anchorElFreeText: null});
    };

    /**
     * Gets all selection properties of the system
     */
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

     /**
     * Gets all free text properties of the system
     */
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

    /**
     * Checks whether the text fields of name and description are filled in when adding a new selection property
     */
    isFormValidSelect() {
        return (
            this.state.PropertySelectionNameText.trim() !== '' &&
            this.state.PropertySelectionDescriptionText.trim() !== ''
        );
    }

    /**
     * Captures the value of the input field in which the name of a new selection property is entered
     * and sets it in the State
     * @param event - value of the input
     */
    handleInputChangeSelectionName = (event) => {
        this.setState({PropertySelectionNameText: event.target.value});
    }

    /**
     * Handler to further process the input data of a new free text property
     * Calls the function that makes the API call
     */

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

    /**
     * Calls the API to add a new free text property and checks if it already exists in the system
     * @param propertyBO - Business Object of the new free text property
     */
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

    /**
     * Captures the value of the input field in which the name of a new free text property is entered
     * and sets it in the State
     * @param event - value of the input
     */
    handleInputChangeFreeTextName = (event) => {
        this.setState({PropertyFreeTextNameText: event.target.value});
    }

    /**
     * Captures the value of the input field in which the description of a new free text is entered
     * and sets it in the State
     * @param event - value of the input
     */
    handleInputChangeFreeTextDescription = (event) => {
        this.setState({PropertyFreeTextDescriptionText: event.target.value});
    }

    /**
     * Handler to further process the input data of a new selection property
     * Calls the function that makes the API call
     */
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

     /**
     * Captures the value of the input field in which the descprition of a new selection property is entered
     * and sets it in the State
     * @param event - value of the input
     */
    handleInputChangeSelectionDescription = (event) => {
        this.setState({PropertySelectionDescriptionText: event.target.value});
    }

    /**
     * Calls the API to add a new selection property and checks if it already exists in the system
     * @param propertyBO - Business Object of the new selection property
     */
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

     /**
     * Checks whether the text fields of name and description are filled in when adding a new free text property
     */
    isFormValidFreeText() {
        return (
            this.state.PropertyFreeTextNameText.trim() !== '' &&
            this.state.PropertyFreeTextDescriptionText.trim() !== ''
        );
    }

    /**
     * Handles the execution of an alert when user input is successful
     */
    handleSuccessAlert = (text) => {
        this.setState({successAlert: text})
        setTimeout(() => {
            this.setState({successAlert: ""})
        }, 3000)
    }

    /**
     * Renders the class component
     * @returns SearchProfile - the rendered component
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
                    <Container
                        style={{display: 'grid', placeItems: 'center', marginTop: '50px', marginBottom: '50px'}}>
                        <List
                            sx={{width: '100%', maxWidth: 700}}
                            subheader={
                                <ListSubheader
                                    sx={{fontSize: 20, color: 'black', display: 'flex', alignItems: 'center'}}>
                                    <Link to="/SearchProfileOverview">
                                        <Tooltip title="Zurück zur Übersicht" fontSize="large" sx={{
                                            color: "#2979ff",
                                            marginTop: '15px'
                                        }}>
                                            <KeyboardDoubleArrowLeftIcon></KeyboardDoubleArrowLeftIcon>
                                        </Tooltip>
                                    </Link>
                                    <span style={{flexGrow: 1}}>Eigenschaften bearbeiten</span>
                                    <Button variant="contained"
                                            onClick={() => this.getInformations(this.state.SearchProfileId)}>
                                        <CachedIcon></CachedIcon>
                                    </Button>
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
                                                               handleSuccessAlert={this.handleSuccessAlert}
                                        />
                                    ) : (
                                        <ProfilePropertyFreeText key={InformationsBo.getInformationId()}
                                                                 InformationsBoValue={InformationsBo.getValue()}
                                                                 InformationsBoProp={InformationsBo.getProperty()}
                                                                 InformationsBoId={InformationsBo.getValueID()}
                                                                 InformationsBoPropId={InformationsBo.getPropID()}
                                                                 InformationsBoPropDescr={InformationsBo.getPropDescription()}
                                                                 InformationsBoInfoId={InformationsBo.getInformationId()}
                                                                 handleSuccessAlert={this.handleSuccessAlert}
                                        />

                                    )
                                ))
                            ) : (
                                <p>Keine Informationen im Profil enthalten</p>
                            )}
                        </List>
                        {successAlert.length > 0 && (
                            <Alert severity="success">{successAlert}</Alert>
                        )}
                        {warningAlert.length > 0 && (
                            <Alert severity="warning">{warningAlert}</Alert>
                        )}
                        <Box>
                            <Container style={{
                                display: 'grid',
                                placeItems: 'center',
                                marginTop: '20px',
                                marginBottom: '20px'
                            }}>
                                <Tooltip title={"Auswahl-Eigenschaften, die ins Profil geladen werden können."}>
                                    <Button
                                        aria-controls="dropdown-menu"
                                        aria-haspopup="true"
                                        onClick={this.handleGlobalPropertiesMenuSelectClick}
                                        variant="contained"
                                        endIcon={<ArrowDropDownIcon/>}
                                        sx={{marginTop: '25px'}}
                                    >
                                        Auswahl-Eigenschaft ins Suchprofil laden
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
                                                profileId={this.state.SearchProfileId}
                                                getAllSelectionProperties={this.getAllSelectionProperties}>
                                            </PropertySelectMenuItem>
                                        ))) : (
                                        <p>Es gibt keine globalen Eigenschaften.</p>
                                    )
                                    }
                                </Menu>

                                <Tooltip title={"Freitext-Eigenschaften, die ins Suchprofil geladen werden können."}>
                                    <Button
                                        aria-controls="dropdown-menu"
                                        aria-haspopup="true"
                                        onClick={this.handleGlobalPropertiesMenuFreeTextClick}
                                        variant="contained"
                                        endIcon={<ArrowDropDownIcon/>}
                                        sx={{marginTop: '25px'}}

                                    >
                                        Freitext-Eigenschaft ins Suchprofil laden
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
                                                profileId={this.state.SearchProfileId}
                                                getAllFreetextProperties={this.getAllFreeTextProperties}
                                                handleSuccessAlert={this.handleSuccessAlert}>
                                            </PropertyTextMenuItem>
                                        ))) : (
                                        <p>Es gibt keine globalen Eigenschaften.</p>
                                    )
                                    }
                                </Menu>
                            </Container>
                            <Container style={{
                                display: 'grid',
                                placeItems: 'center',
                                marginTop: '25px',
                                marginBottom: '25px'
                            }}>
                                <Button
                                    onClick={this.handleOpenSelectDialog}
                                    sx={{marginTop: '20px', fontWeight: 'bold'}}
                                    variant="outlined"
                                    startIcon={<AddIcon/>}
                                >
                                    Auswahl-Eigenschaft global hinzufügen
                                </Button>

                                <Button
                                    onClick={this.handleOpenFreeTextDialog}
                                    sx={{marginTop: '20px', fontWeight: 'bold'}}
                                    variant="outlined"
                                    startIcon={<AddIcon/>}
                                >
                                    Freitext-Eigenschaft global hinzufügen
                                </Button>
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

                    </Container>
                </div>
            );
        }
    }
}

export default SearchProfile;