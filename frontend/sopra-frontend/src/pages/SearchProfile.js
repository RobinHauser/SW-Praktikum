import React, {Component} from 'react';
import AppHeader from "../components/AppHeader";
import Container from "@mui/material/Container";
import {List, ListSubheader} from "@mui/material";
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
            globalPropertiesSelect: ["Auswahl-Eigenschaft 1", "Auswahl-Eigenschaft 2", "Auswahl-Eigenschaft 3"],
            globalPropertiesFreeText: ["Freitext-Eigenschaft 1", "Freitext-Eigenschaft 2", "Freitext-Eigenschaft 3"],
            searchprofile: null,
            error: null
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
        this.getSearchProfile()
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
        console.log()
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


    render() {
        const {value} = this.props;
        const {
            openSelectDialog, openFreeTextDialog, openDialogSelect, openDialogFreeText, properties, newProperty,
            isAddingNewProperty, globalPropertiesSelect, globalPropertiesFreeText, anchorElSelect, anchorElFreeText
        } = this.state;
        const openSelect = Boolean(anchorElSelect)
        const openFreeText = Boolean(anchorElFreeText)

        return (
            <div className="App">
                <AppHeader avatar={this.props.avatar}></AppHeader>
                <Container style={{display: 'grid', placeItems: 'center', marginTop: '50px', marginBottom: '50px'}}>
                    <List
                        sx={{width: '100%', maxWidth: 700}}
                        subheader={
                            <ListSubheader sx={{fontSize: 20, color: 'black', display: 'flex', alignItems: 'center'}}>
                                <Link to="/SearchProfileOverview">
                                    <Tooltip title="Zurück zur Übersicht" fontSize="large" sx={{
                                        color: "#2979ff",
                                        marginTop: '15px'
                                    }}>
                                        <KeyboardDoubleArrowLeftIcon></KeyboardDoubleArrowLeftIcon>
                                    </Tooltip>
                                </Link>
                                <span style={{flexGrow: 1}}>Auswahl-Eigenschaften bearbeiten</span>
                            </ListSubheader>
                        }
                    >

                        {[1, 2, 3, 4, 5, 6, 7].map((value) => (
                            <ProfilePropertySelect key={value} value={value}/>
                        ))}
                    </List>
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

                    <InfoSelectDialog
                        openDialogSelect={openDialogSelect}
                        handleCloseDialogInfo={this.handleCloseDialogInfo}
                        handleListItemClick={this.handleListItemClick}
                        handleDeleteItemClick={this.handleDeleteItemClick}
                        handleAddItemClick={this.handleAddItemClick}
                        properties={properties}
                        newProperty={newProperty}
                        isAddingNewProperty={isAddingNewProperty}
                        handleNewPropertyChange={this.handleNewPropertyChange}
                        handleAddProperty={this.handleAddProperty}
                        value={value}
                    />

                </Container>

                <hr/>

                <Container style={{display: 'grid', placeItems: 'center', marginTop: '50px', marginBottom: '50px'}}>
                    <List
                        sx={{width: '100%', maxWidth: 700}}
                        subheader={
                            <ListSubheader sx={{fontSize: 20, color: 'black'}}>
                                Freitext-Eigenschaften bearbeiten
                            </ListSubheader>
                        }
                    >
                        {[1, 2, 3, 4, 5, 6, 7].map((value) => (
                            <ProfilePropertyFreeText key={value} value={value}/>
                        ))}
                    </List>
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

                    <Dialog open={openFreeTextDialog} onClose={() => this.handleCloseDialogProp(null)}>
                        <DialogTitle>Freitext-Eigenschaft hinzufügen</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Füge eine neue Freitext-Eigenschaft hinzu, indem du den Name und die Beschreibung der
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

                    <Link to="/SearchProfileOverview">
                        <Tooltip title="Suchprofil löschen" fontSize="large">
                            <Button variant="outlined" sx={{
                                color: "red",
                                borderColor: 'red',
                                '&:hover': {background: 'transparent', borderColor: 'red'},
                                fontWeight: 'bold',
                                marginTop: '50px'
                            }}
                                    startIcon={<DeleteIcon/>}>Suchprofil löschen</Button>
                        </Tooltip>
                    </Link>
                </Container>
            </div>
        );
    }
}

export default SearchProfile;