import React, {Component} from 'react';
import AppHeader from "../components/AppHeader";
import Container from "@mui/material/Container";
import {CircularProgress, List, ListSubheader} from "@mui/material";
import ProfilePropertySelect from "../components/ProfilePropertySelect";
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import Tooltip from "@mui/material/Tooltip";
import {Link} from "react-router-dom";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
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
import MenuItem from "@mui/material/MenuItem";
import SopraDatingAPI from "../api/SopraDatingAPI";
import Box from "@mui/material/Box";
import CachedIcon from "@mui/icons-material/Cached";
import PropertySelectMenuItem from "../components/PropertySelectMenuItem";
import PropertyTextMenuItem from "../components/PropertyTextMenuItem";


/**
 * @author [Björn Till](https://github.com/BjoernTill)
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
            PropertySelectionDescriptionText: ''
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

    componentDidMount() {
        const exampleProperties = ["Value 1", "Value 2", "Value 3"];
        this.setState({properties: exampleProperties});
        this.getSearchProfileId()
        this.getAllSelectionProperties()
        this.getAllFreeTextProperties()
        console.log(this.props.user)
        this.getInformations(this.state.SearchProfileId)
    }

    /**
     * Gets all information of a profile
     * @param {int} id - id of the current personal profile
     */
    getInformations = async (id) => {
        SopraDatingAPI.getAPI().getInformationsByProfile(id)
            .then(responseJSON => {
                console.log(responseJSON)
                this.setState({
                    informations: responseJSON
                })
            }).catch(() => {
            this.setState({
                informations: []
            })
        })
    }
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

    getSearchProfileId() {
        const urlSearchProfileId = window.location.pathname.split('/')
        this.state.SearchProfileId = urlSearchProfileId[2]
        console.log(this.state.SearchProfileId)
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

    isFormValidSelect() {
        return (
            this.state.PropertySelectionNameText.trim() !== '' &&
            this.state.PropertySelectionDescriptionText.trim() !== ''
        );
    }

    buttonAddSelectionProperty() {
        const name = this.state.PropertySelectionNameText
        const description = this.state.PropertySelectionDescriptionText
        let propertyBO = {
            "name": name,
            "description": description
        }
        this.addSelectionProperty(propertyBO)
        this.setState({PropertySelectionNameText: '', PropertySelectionDescriptionText: ''})
    }

    handleInputChangeSelectionName = (event) => {
        this.setState({PropertySelectionNameText: event.target.value});
    }
    addFreeTextPropertyClickHandler = () => {
        this.buttonAddFreeTextProperty();
    }

    buttonAddFreeTextProperty() {
        const name = this.state.PropertyFreeTextNameText
        const description = this.state.PropertyFreeTextDescriptionText
        let propertyBO = {
            "name": name,
            "description": description
        }
        this.addFreeTextProperty(propertyBO)
        this.setState({PropertyFreeTextNameText: '', PropertyFreeTextDescriptionText: ''})
    }

    addFreeTextProperty = (propertyBO) => {
        SopraDatingAPI.getAPI().addFreeTextProperty(propertyBO)
            .then(() => {
                this.setState({
                    error: null
                });
                this.getAllFreeTextProperties()
            }).catch(e => {
            this.setState({
                error: e
            });
        });
    };
    handleInputChangeFreeTextName = (event) => {
        this.setState({PropertyFreeTextNameText: event.target.value});
    }
    handleInputChangeFreeTextDescription = (event) => {
        this.setState({PropertyFreeTextDescriptionText: event.target.value});
    }
    addSelectionPropertyClickHandler = () => {
        this.buttonAddSelectionProperty();

    }
    handleInputChangeSelectionDescription = (event) => {
        this.setState({PropertySelectionDescriptionText: event.target.value});
    }
    addSelectionProperty = (propertyBO) => {
        SopraDatingAPI.getAPI().addSelectionProperty(propertyBO)
            .then(() => {
                this.setState({
                    error: null
                });
                this.getAllSelectionProperties()
            }).catch(e => {
            this.setState({
                error: e
            });
        });
    };

    isFormValidFreeText() {
        return (
            this.state.PropertyFreeTextNameText.trim() !== '' &&
            this.state.PropertyFreeTextDescriptionText.trim() !== ''
        );
    }

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
                                                profileId={this.state.SearchProfileId}></PropertySelectMenuItem>
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
                                                profileId={this.state.SearchProfileId}>
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
                                        disabled={!this.isFormValidSelect()}>Anlegen
                                </Button>
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
                                        disabled={!this.isFormValidFreeText()}
                                >Anlegen</Button>
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