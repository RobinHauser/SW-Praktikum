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

/**
 * @author [Björn Till](https://github.com/BjoernTill)
 * @author [Jannik Haug](https://github.com/JannikHaug)
 */

class InfoSelectDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            propertiesList: null,
            deletingInProgress: null,
            deletingError: null,
            textFieldContent: "",
            warningAlert: ""
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
                    error: null
                })
                alert("Die Information wurde erfolgreich aktualisiert")
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
        SopraDatingAPI.getAPI().addNewInformationObjectToProile(valueId, informationBo)
            .then(responseJSON => {
                this.setState({
                    error: null
                })
                alert("Die Information wurde erfolgreich zum Profil hinzugefügt")
            }).catch(e =>
            this.setState({
                error: e
            })
        )
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
                setTimeout(() => {this.setState({warningAlert: ""});}, 3000);
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
        const {propertiesList, warningAlert} = this.state
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
                                            <ListItemText
                                                sx={{
                                                    textAlign: 'center',
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                }}
                                                primary={property.getValue()}
                                                onClick={() => this.updateValueInInformationButton(property.getValueID())}
                                            />
                                            <IconButton
                                                edge="end"
                                                aria-label="Löschen"
                                                onClick={() => this.deleteButtonFunction(property.getValueID())}
                                            >
                                                <DeleteIcon/>
                                            </IconButton>
                                        </ListItem>
                                    ))}
                                    <ListItem button onClick={handleAddItemClick}>
                                        <ListItemText
                                            sx={{
                                                textAlign: 'center',
                                                display: 'flex',
                                                justifyContent: 'center',
                                            }}
                                            primary="Neue Option hinzufügen"
                                        />
                                    </ListItem>
                                </List>
                            </DialogContentText>
                        </DialogContent>
                        {warningAlert.length > 0 && (
                            <Alert severity="warning"> {warningAlert}</Alert>
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