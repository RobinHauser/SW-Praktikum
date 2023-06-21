import BusinessObject from './BusinessObject';

/**
 * Represents a Information object.
 */
export default class InformationBO extends BusinessObject {

    /**
     * Constructs a new Information object.
     *
     * @param {int} ValueID - id of Information
     * @param {string} Value - Value of the information
     *
     */
    constructor(ValueID, Value) {
        super();
        this.ValueID = ValueID;
        this.Value = Value;
    }

    /**
     * Sets the ID of this InformationBO.
     *
     * @param {int} ValueID - the new ValueID of this InformationBO.
     */
    setValueID(ValueID) {
        this.ValueID = ValueID;
    }

    /**
     * Gets the ValueID of this InformationBO.
     *
     * @return {int} ValueID - the ID of this InformationBO
     */
    getValueID() {
        return this.ValueID;
    }

    /**
     * Sets the Value of this InformationBO.
     *
     * @param {string} Value - the new Value of this InformationBO.
     */
    setValue(Value) {
        this.Value = Value;
    }

    /**
     * Gets the Value of this InformationBo
     *
     * @return {string} Value - the Value of this InformationBO
     */
    getValue(Value) {
        this.Value = Value;
    }

    /**
     * Returns an Array of UserBOs from a given JSON structure
     */
    static fromJSON(informations) {
        let result = [];

        if (Array.isArray(informations)) {
            informations.forEach((a) => {
            Object.setPrototypeOf(a, InformationBO.prototype);
            result.push(a);
            })
        } else {
            // Es handelt sich offenbar um ein singuläres Objekt
            let a = informations;
            Object.setPrototypeOf(a, InformationBO.prototype);
            result.push(a);
        }

        return result;
    }
}