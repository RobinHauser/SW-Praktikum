import React, {Component} from 'react';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import SopraDatingAPI from "../api/SopraDatingAPI";
import ValueBo from "../api/ValueBo";

/**
 * @author [Björn Till](https://github.com/BjoernTill)
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


    addButtonFunction = () => {
        const content = this.state.textFieldContent
        const valueBo = {
            "entry": `${content}`,
        }
        this.postNewValue(this.props.InformationsBoPropId, valueBo, parseInt(this.props.InformationsBoInfoId))


    }
    postNewValue = (propId, valueBo, informationId) => {
        SopraDatingAPI.getAPI().addTextPropertyValueById(propId, valueBo)
            .then((responseJSON) => {
                console.log(responseJSON.getValueId())
                this.setState({
                    currentInformation: responseJSON,
                    currentInformationId: responseJSON.getValueId()
                })
                this.setState({
                    textFieldContent: "",
                })
                const valueBo1 = {
                    "valueID": `${responseJSON.getValueId()}`
                }
                console.log(parseInt(responseJSON.getValueId()))
                alert("Neue Auswahl erfolgreich hinzugefügt")
                this.updateInformation(informationId, valueBo1)

            }).catch(error => {
            console.log(error)
            alert(error)
        })
    }
    updateInformation = (informationId, valueBo) => {
        console.log(informationId)
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

    handleInputChange = (event) => {
        this.setState({textFieldContent: event.target.value})
        console.log(this.state.textFieldContent)
    }

    render() {
        const {
            openDialogFreeText,
            handleCloseDialogFreeText,
            handleClick,
            value,
            InformationsBoValue,
            InformationsBoProp,
            InformationsBoId,
            InformationsBoPropId,
            InformationsBoPropDescr,
            InformationsBoInfoId
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