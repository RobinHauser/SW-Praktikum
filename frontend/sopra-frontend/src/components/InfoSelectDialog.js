import React, {Component} from 'react';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import {Alert, CircularProgress, LinearProgress, ListItem, ListItemText} from "@mui/material";
import List from "@mui/material/List";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import TextField from "@mui/material/TextField";
import SopraDatingAPI from "../api/SopraDatingAPI";
import Box from '@mui/material/Box';
import BorderColorSharpIcon from "@mui/icons-material/BorderColorSharp";
import DoneIcon from '@mui/icons-material/Done';

/**
 * Class react component which includes the dialog window to choose a new selection for a selection property
 */

class InfoSelectDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            propertiesList: null,
            deletingInProgress: null,
            deletingError: null,
            textFieldContent: "",
            warningAlert: "",
            successAlert: "",
            TextFieldOpen: false,
            TextFieldId: null,
            textFieldContentEdit: '',
        };
    }

    /**
     * triggers the function to update the value for property and to update the information object
     * @param {int} valueId - id of the current value
     */
    updateValueInInformationButton = (valueId) => {
        if (this.props.InformationsBoInfoId === null || typeof this.props.InformationsBoInfoId === 'undefined') {
            const valueBo = {
                "id": `${this.props.profileId}`,
            }
            this.addNewInformationObject(valueId, valueBo)

        } else {
            const valueBo = {
                "valueID": `${valueId}`,
            }
            this.updateInformation(this.props.InformationsBoInfoId, valueBo)
        }
    }
    /**
     * updates the current information object with a new value
     * @param {ValueBo} valueBo - contains the valueId
     * @param {int} informationId - id of the current information object
     */
    updateInformation = (informationId, valueBo) => {
        SopraDatingAPI.getAPI().updateValueOfInformationObject(informationId, valueBo)
            .then(responseJSON => {
                this.setState({
                    error: null,
                    successAlert: "Die Information wurder erfolgreich aktualisiert"
                })
                setTimeout(() => {
                    this.setState({successAlert: ""});
                }, 3000);
            }).catch(e =>
            this.setState({
                error: e
            })
        )
    }
    /**
     * adds a new information object
     * @param {InformationBO} informationBo - contains the profileId
     * @param {int} valueId - id of the current information object
     */
    addNewInformationObject = (valueId, informationBo) => {
        SopraDatingAPI.getAPI().addNewInformationObjectToProfile(valueId, informationBo)
            .then(responseJSON => {
                this.setState({
                    error: null,
                    successAlert: "Die Information wurde erfolgreich zum Profil hinzugefügt"
                })
                setTimeout(() => {
                    this.setState({successAlert: ""});
                }, 3000);
            }).catch(e => {
            this.setState({
                error: e,
                warningAlert: "Eigenschaft im Profil schon vorhanden"
            })
            setTimeout(() => {
                this.setState({warningAlert: ""});
            }, 3000);
        })
    }
    /**
     * gets the current selectaion values of a property
     */
    getSelectionValues = () => {
        SopraDatingAPI.getAPI().getAllSelectionValuesByPropertyID(this.props.InformationsBoPropId)
            .then(responseJSON => {
                this.setState({
                    propertiesList: responseJSON,
                    error: null
                })
            }).catch(e =>
            this.setState({
                propertiesList: [],
                error: e
            })
        )
    }
    /**
     * posts the new value to the current property object
     */
    postNewValue = () => {
        const {handleCloseDialogInfo, InformationsBoPropId} = this.props
        SopraDatingAPI.getAPI().addSelectionValueItem(InformationsBoPropId, {"value": `${this.state.textFieldContent}`})
            .then(() => {
                this.setState({
                    textFieldContent: ""
                })
                this.getSelectionValues();
            })
            .catch(error => {
                this.setState({
                    textFieldContent: "",
                    warningAlert: "Option existiert bereits"
                })
                setTimeout(() => {
                    this.setState({warningAlert: ""});
                }, 3000);
            })
        handleCloseDialogInfo()
    }

    /**
     * button function which triggers the function to delete the selected value out of the system / db
     * @param {int} valueId - id of the current value object
     */
    deleteButtonFunction = (valueId) => {
        this.deleteSelectionItem(valueId)
    }
    /**
     * deletes the selected value out of the system / db
     * @param {int} valueId - id of the current value object
     */
    deleteSelectionItem = (valueId) => {
        //const { blockedUser, user } = this.props;
        SopraDatingAPI.getAPI().deleteSelectionValueItem(valueId).then(() => {
            this.setState({
                deletingInProgress: false,
                deletingError: null
            });
            this.getSelectionValues()
        }).catch(e => {
            this.setState({
                deletingInProgress: false,
                deletingError: e
            });
        });

        this.setState({
            deletingInProgress: true,
            deletingError: null
        });
    }
    /**
     * handles the textfield input
     * @param {Event} event
     */
    handleInputChange = (event) => {
        this.setState({textFieldContent: event.target.value})
    }
    /**
     * handles the textfield opening for editing the value of an option
     * sets the textfield to the current value
     * @param {int} valueId - id of the value of an option
     * @param {string} value - value of an option
     */
    handleTextFieldOpening = (valueId, value) => {
        this.setState({TextFieldOpen: true, TextFieldId: valueId, textFieldContentEdit: value})
    }
    /**
     * handles the textfield value
     * @param {event} event
     */
    handleInputChangeTextFieldContentEdit = (event) => {
        this.setState({textFieldContentEdit: event.target.value});
    }
    /**
     * api function for updating the selected selection value
     * sets alerts for success and error
     * @param {int} valueId
     */
    updateSelectionValue = (valueId) => {
        SopraDatingAPI.getAPI().updateSelectionValue(valueId, {"value": `${this.state.textFieldContentEdit}`})
            .then(() => {
                this.setState({
                    TextFieldOpen: false,
                    successAlert: "Option wurde aktualisiert"
                })
                this.getSelectionValues();
            })
            .catch(error => {
                this.setState({
                    textFieldContent: "",
                    warningAlert: "Fehler"
                })
                setTimeout(() => {
                    this.setState({warningAlert: ""});
                }, 3000);
            })
    }

    /**
     * Called after the component did update.
     * It retrieves the selection values of the current property object but only when the dialog opens
     * Checks if dialog is open and if it was open before.
     * Only calls getSelection if the dialog is now open and was closed before the update
     * @param {Object} prevProps - props before the update call
     */
    componentDidUpdate(prevProps) {
        if (this.props.openDialogSelect && !prevProps.openDialogSelect) {
            this.getSelectionValues();
        }
    }

    /**
     * Renders the class component
     * @returns InfoSelectDialog - the rendered component
     */
    render() {
        const {
            openDialogSelect,
            handleCloseDialogInfo,
            handleAddItemClick,
            isAddingNewProperty,
            InformationsBoProp,
            InformationsBoPropDescr,
        } = this.props;
        const {propertiesList, warningAlert, successAlert, TextFieldOpen, TextFieldId} = this.state
        if (!propertiesList) {
            //return (<LinearProgress></LinearProgress>)
        } else {
            return (
                <div>
                    <Dialog open={openDialogSelect} onClose={() => handleCloseDialogInfo(null)}>
                        <DialogTitle>{`${InformationsBoProp}`}</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                {InformationsBoPropDescr}
                                <List>
                                    {propertiesList.map((property, index) => (
                                        <ListItem key={index}>
                                            <Box sx={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                                                <Button
                                                    onClick={() => this.updateValueInInformationButton(property.getValueID())}>
                                                    <ListItemText
                                                        primary={property.getValue()}
                                                        sx={{
                                                            textAlign: 'center',
                                                            textTransform: 'none',
                                                        }}
                                                    />
                                                </Button>
                                            </Box>
                                            <Box sx={{marginLeft: 'auto'}}>
                                                <IconButton
                                                    edge="end"
                                                    aria-label="Löschen"
                                                    onClick={() => this.deleteButtonFunction(property.getValueID())}
                                                >
                                                    <DeleteIcon/>
                                                </IconButton>
                                            </Box>
                                            <Box sx={{marginLeft: 1}}>
                                                <IconButton
                                                    edge="end"
                                                    aria-label="Bearbeiten"
                                                    onClick={() => this.handleTextFieldOpening(property.getValueID(), property.getValue())}
                                                >
                                                    <BorderColorSharpIcon/>
                                                </IconButton>
                                            </Box>
                                            {TextFieldOpen && TextFieldId === property.getValueID() && (
                                                <Box sx={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                                                    <TextField sx={{marginLeft: 2, width: '100%'}} id="outlined-basic"
                                                               label="Bearbeiten"
                                                               variant="outlined"
                                                               value={this.state.textFieldContentEdit}
                                                               onChange={this.handleInputChangeTextFieldContentEdit}/>
                                                    <IconButton
                                                        edge="end"
                                                        aria-label="Bearbeiten"
                                                        onClick={() => this.updateSelectionValue(property.getValueID())}
                                                    >
                                                        <DoneIcon sx={{height: 35, width: 35}}/>
                                                    </IconButton>
                                                </Box>
                                            )}

                                        </ListItem>
                                    ))}

                                    <ListItem button onClick={handleAddItemClick}>
                                        <ListItemText
                                            primary="Neue Option hinzufügen"
                                            sx={{
                                                textAlign: 'center',
                                                textTransform: 'none',
                                            }}
                                        />
                                    </ListItem>
                                </List>
                            </DialogContentText>
                        </DialogContent>
                        {warningAlert.length > 0 && (
                            <Alert severity="warning"> {warningAlert}</Alert>
                        )}
                        {successAlert.length > 0 && (
                            <Alert severity="success"> {successAlert}</Alert>
                        )}
                        <DialogActions>
                            <Button onClick={handleCloseDialogInfo}>Abbrechen</Button>
                        </DialogActions>
                    </Dialog>

                    <Dialog open={openDialogSelect && isAddingNewProperty} onClose={handleCloseDialogInfo}>
                        <DialogTitle>Neue Option hinzufügen</DialogTitle>
                        <DialogContent>
                            <TextField
                                autoFocus
                                margin="dense"
                                label="Name des Info-Objekts"
                                fullWidth
                                value={this.state.textFieldContent}
                                onChange={this.handleInputChange}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseDialogInfo}>Abbrechen</Button>
                            <Button
                                onClick={() => this.postNewValue()}
                                disabled={this.state.textFieldContent.trim() === ""}
                            >
                                Hinzufügen
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            );
        }
    }
}

export default InfoSelectDialog;