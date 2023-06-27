import React, {Component} from 'react';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import {CircularProgress, ListItem, ListItemText} from "@mui/material";
import List from "@mui/material/List";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import TextField from "@mui/material/TextField";
import SopraDatingAPI from "../api/SopraDatingAPI";

/**
 * @author [Björn Till](https://github.com/BjoernTill)
 */

class InfoSelectDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            propertiesList: null,
            deletingInProgress: null,
            deletingError: null,
            textFieldContent: ""
        };
    }

    updateValueInInformationButton = (valueId) => {
        let valueBo = {
            "valueID": `${valueId}`,
        }
        this.updateInformation(this.props.InformationsBoInfoId, valueBo)
    }
    updateInformation = (informationId, valueBo) => {
        console.log(valueBo)
        console.log(informationId)
        SopraDatingAPI.getAPI().updateValueOfInformationObject(informationId, valueBo)
            .then(responseJSON => {
                this.setState({
                    error: null
                })
            }).catch(e =>
            this.setState({
                error: e
            })
        )
    }
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
    postNewValue = (propId, valueBo) => {
        SopraDatingAPI.getAPI().addSelectionValueItem(propId, valueBo)
            .then(() => {
                this.setState({
                    textFieldContent: ""

                })
                alert("Neue Auswahl erfolgreich hinzugefügt")
                this.getSelectionValues()
            })
            .catch(error => {
                console.log(error)
                alert(error)
            })
    }
    addButtonFunction = (id) => {
        const content = this.state.textFieldContent
        let valueBo = {
            "value": `${content}`,
        }
        this.postNewValue(id, valueBo)
        this.getSelectionValues()
    }
    deleteButtonFunction = (id) => {
        this.deleteSelectionItem(id)
    }
    deleteSelectionItem = (valueId) => {
        //const { blockedUser, user } = this.props;
        SopraDatingAPI.getAPI().deleteSelectionValueItem(valueId).then(() => {
            this.setState({
                deletingInProgress: false,
                deletingError: null
            });
            alert("Löschen aus dem System war erfolgreich")
            //this.props.onUserRemoved(blockedUser);
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
        this.getSelectionValues()
    }
    handleInputChange = (event) => {
        this.setState({textFieldContent: event.target.value})
        console.log(this.state.textFieldContent)
    }

    componentDidMount() {
        this.getSelectionValues()
        console.log("test: " + this.propertiesList)


    }

    render() {
        const {
            openDialogSelect,
            handleCloseDialogInfo,
            handleListItemClick,
            handleDeleteItemClick,
            handleAddItemClick,
            properties,
            newProperty,
            isAddingNewProperty,
            handleNewPropertyChange,
            handleAddProperty,
            InformationsBoProp,
            InformationsBoValue,
            InformationsBoId,
            InformationsBoPropId,
            InformationsBoPropDescr,
            InformationsBoIsSelection
        } = this.props;
        const {propertiesList} = this.state
        if (!propertiesList) {
            return (<CircularProgress></CircularProgress>)
        } else {
            console.log(InformationsBoPropDescr)
            return (
                <div>
                    <Dialog open={openDialogSelect} onClose={() => handleCloseDialogInfo(null)}>
                        <DialogTitle>{`Eigenschaft ${InformationsBoProp}`}</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                {InformationsBoPropDescr}
                                <List>
                                    {propertiesList.map((property) => (
                                        <ListItem>
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
                        <DialogActions>
                            <Button onClick={handleCloseDialogInfo}>Abbrechen</Button>
                        </DialogActions>
                    </Dialog>

                    <Dialog open={openDialogSelect && isAddingNewProperty} onClose={handleCloseDialogInfo}>
                        <DialogTitle>Add a new selection</DialogTitle>
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
                                onClick={() => this.addButtonFunction(InformationsBoPropId)}
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