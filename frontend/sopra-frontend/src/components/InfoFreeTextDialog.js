import React, {Component} from 'react';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import SopraDatingAPI from "../api/SopraDatingAPI";

/**
 * @author [Björn Till](https://github.com/BjoernTill)
 * @author [Jannik Haug](https://github.com/JannikHaug)
 */

class InfoFreeTextDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            deletingInProgress: null,
            deletingError: null,
            textFieldContent: "",
            currentInformation: null,
            currentInformationId: null,
            InformationsBoPropId: this.props.InformationsBoPropId,
            InformationsBoInfoId: this.props.InformationsBoInfoId
        };
    }

    /**
     * triggers the function to post a new value for property and add it to the information object
     */
    addButtonFunction = () => {
        const content = this.state.textFieldContent
        const valueBo = {
            "entry": `${content}`,
        }
        this.postNewValue(this.props.InformationsBoPropId, valueBo, parseInt(this.props.InformationsBoInfoId))
    }
    /**
     * posts a new value for a prop and triggers the function to add it to the current information object
     * @param {int} propId - id of the current property
     * @param {ValueBo} valueBo - includes the value content
     * @param {int} informationId - id of the current information object
     */
    postNewValue = (propId, valueBo, informationId) => {
        SopraDatingAPI.getAPI().addTextPropertyValueById(propId, valueBo)
            .then((responseJSON) => {
                this.setState({
                    currentInformation: responseJSON,
                    currentInformationId: responseJSON.getValueId()
                })
                this.setState({
                    textFieldContent: "",
                })
                if (this.props.InformationsBoInfoId === null || typeof this.props.InformationsBoInfoId === 'undefined') {
                    const informationBo = {
                        "id": `${this.props.profileId}`
                    }
                    this.addNewInformationObject(responseJSON.getValueId(), informationBo)

                } else {
                    const valueBo1 = {
                        "valueID": `${responseJSON.getValueId()}`
                    }
                    alert("Neue Auswahl erfolgreich hinzugefügt")
                    this.updateInformation(informationId, valueBo1)
                }


            }).catch(error => {
            alert(error)
        })
    }
    /**
     * update the value with the new value to the current information object
     * @param {ValueBo} valueBo - includes the value content
     * @param {int} informationId - id of the current information object
     */
    updateInformation = (informationId, valueBo) => {
        SopraDatingAPI.getAPI().updateValueOfInformationObject(informationId, valueBo)
            .then(responseJSON => {
                this.setState({
                    error: null
                })
                alert("Auswahl erfolgreich zur Information hinzugefügt")
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
     * Gets the current text, written in the text field
     * @param {Object} event
     */
    handleInputChange = (event) => {
        this.setState({textFieldContent: event.target.value})
    }

    /**
     * Renders the class component
     * @returns InfoFreeTextDialog - the rendered component
     */
    render() {
        const {
            openDialogFreeText,
            handleCloseDialogFreeText,
            value,
            InformationsBoPropDescr,
        } = this.props;
        return (
            <div>
                <Dialog open={openDialogFreeText} onClose={() => handleCloseDialogFreeText(null)}>
                    <DialogTitle>{`Eigenschaft ${value}`}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {InformationsBoPropDescr}
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Eigenschaft ausfüllen"
                            fullWidth
                            variant="standard"
                            value={this.state.textFieldContent}
                            onChange={this.handleInputChange}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDialogFreeText}>Abbrechen</Button>
                        <Button onClick={this.addButtonFunction}>Bestätigen</Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}


export default InfoFreeTextDialog;