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
 * Class react component which includes the dialog window to fill out the text for a free text property
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
        this.props.handleCloseDialogFreeText()

    }
    /**
     * posts a new value for a prop and triggers the function to add it to the current information object
     * @param {int} propId - id of the current property
     * @param {ValueBo} valueBo - includes the value content
     */
    postNewValue = (propId, valueBo) => {
        if (this.props.InformationsBoInfoId === null || typeof this.props.InformationsBoInfoId === 'undefined') {
            const informationBo = {
                "id": `${this.props.profileId}`
            }
            SopraDatingAPI.getAPI().addTextPropertyValueById(propId, valueBo)
                .then((responseJSON) => {
                    this.setState({
                        currentInformation: responseJSON,
                        currentInformationId: responseJSON.getValueId()
                    })
                    this.addNewInformationObject(responseJSON.getValueId(), informationBo)
                    this.setState({
                        textFieldContent: "",
                    })
                }).catch(error => {
                alert(error)
            })
        } else {
            const valueBo1 = {
                "entry": `${this.state.textFieldContent}`
            }
            this.updateTextValue(this.props.InformationsBoId, valueBo1)
        }
    }
    /**
     * update the value with new string input
     * @param {ValueBo} valueBo - includes the value content
     * @param {int} valueId - id of the current text value
     */
    updateTextValue = (valueId, valueBo) => {
        SopraDatingAPI.getAPI().updateTextValue(valueId, valueBo)
            .then((responseJSON) => {
                this.setState({})
                this.setState({
                    textFieldContent: "",
                })
                this.props.handleSuccessAlert("Die Information wurde erfolgreich aktualisiert.")
            }).catch(error => {
            alert(error)
        })
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
                    error: null
                })
                this.props.handleSuccessAlert("Die Information wurde erfolgreich zum Profil hinzugefügt.")
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
     * Checks whether the text field is filled out
     */
    isFormValid() {
        return (
            this.state.textFieldContent.trim() !== ''
        );
    }

    /**
     * Called after the component did mount.
     * Sets the textfield to the current value
     */
    componentDidMount() {
        if (!this.props.InformationsBoValue) {
            this.setState({textFieldContent: ""})
        }
        else {
        this.setState({
            textFieldContent: this.props.InformationsBoValue
        })}
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
                    <DialogTitle>{`${value}`}</DialogTitle>
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
                        <Button onClick={this.addButtonFunction} disabled={!this.isFormValid()}>Bestätigen</Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}


export default InfoFreeTextDialog;