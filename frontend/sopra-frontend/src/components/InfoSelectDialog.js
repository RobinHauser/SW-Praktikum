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
        };
    }

    getSelectionValues = () => {
        SopraDatingAPI.getAPI().getAllSelectionValuesByPropertyID(6003)
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
            InformationsBoPropDescr
        } = this.props;
        const {propertiesList} = this.state
        console.log(propertiesList)

        if (!propertiesList) {
            return (<CircularProgress></CircularProgress>)
        } else {
            return (
                <div>
                    <Dialog open={openDialogSelect} onClose={() => handleCloseDialogInfo(null)}>
                        <DialogTitle>{`Eigenschaft ${InformationsBoProp}`}</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                {InformationsBoPropDescr}
                                <List>
                                    {propertiesList.map((property) => (
                                        <ListItem
                                            //key={property}
                                            //button
                                        >
                                            <ListItemText
                                                sx={{
                                                    textAlign: 'center',
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                }}
                                                primary={property.getValue()}
                                                onClick={() => handleListItemClick(property.getValueID())}
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
                        <DialogTitle>Neuen Eintrag hinzufügen</DialogTitle>
                        <DialogContent>
                            <TextField
                                autoFocus
                                margin="dense"
                                label="Name des Info-Objekts"
                                fullWidth
                                value={newProperty}
                                onChange={handleNewPropertyChange}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseDialogInfo}>Abbrechen</Button>
                            <Button
                                onClick={() => handleAddProperty()}
                                disabled={newProperty.trim() === ""}
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