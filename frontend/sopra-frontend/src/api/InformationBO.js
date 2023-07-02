import BusinessObject from './BusinessObject';

/**
 * Represents an Information object.
 */
export default class InformationBO extends BusinessObject {


    /**
     * Constructs a new Information object.
     *
     * @param {int} valueID - id of Information
     * @param {str} value - Value of the information
     * @param {str} property - Property of the InformationBO
     * @param {str} isSelect - Binary information if the property is a select or text type
     * @param {str} propDescription - Description of the property
     * @param {int} propID - id of property
     * @param {int} informationID - id of an information
     *
     */
    constructor(valueID, value, property, isSelect, propDescription, propID, informationID) {
        super();
        this.property = property;
        this.valueID = valueID;
        this.value = value;
        this.propDescription = propDescription;
        this.propID = propID
        this.isSelect = isSelect;
        this.informationID = informationID
    }

    /**
     * Sets the property of this InformationBO.
     *
     * @param {str} property - the new Property of this InformationBO.
     */
    setProperty(property) {
        this.property = property;
    }

    /**
     * Gets the property of this InformationBO.
     *
     * @return {str} property - the property of this InformationBO
     */
    getProperty() {
        return this.property;
    }

    /**
     * Sets the ID of this InformationBO.
     *
     * @param {int} valueID - the new ValueID of this InformationBO.
     */
    setValueID(valueID) {
        this.valueID = valueID;
    }

    /**
     * Gets the ValueID of this InformationBO.
     *
     * @return {int} ValueID - the ID of this InformationBO
     */
    getValueID() {
        return this.valueID;
    }

    /**
     * Sets the Value of this InformationBO.
     *
     * @param {str} value - the new Value of this InformationBO.
     */
    setValue(value) {
        this.value = value;
    }

    /**
     * Gets the Value of this InformationBo
     *
     * @return {str} value - the Value of this InformationBO
     */
    getValue() {
        return this.value;
    }

    /**
     * Sets the isSelect of this InformationBO.
     *
     * @param {int} isSelect - the new isSelect of this InformationBO.
     */
    setIsSelect(isSelect) {
        this.isSelect = isSelect;
    }

    /**
     * Gets the isSelect of this InformationBo
     *
     * @return {int} isSelect - the isSelect of this InformationBO
     */
    getIsSelect() {
        return this.isSelect;
    }

    /**
     * Sets the propDescription of this InformationBO.
     *
     * @param {str} propDescription - the new propDescription of this InformationBO.
     */
    setPropDescription(propDescription) {
        this.propDescription = propDescription;
    }

    /**
     * Gets the propDescription of this InformationBo
     *
     * @return {str} propDescription - the propDescription of this InformationBO
     */
    getPropDescription() {
        return this.propDescription;
    }

    /**
     * Sets the propID of this InformationBO.
     *
     * @param {int} propID - the new propID of this InformationBO.
     */
    setPropID(propID) {
        this.propID = propID;
    }

    /**
     * Gets the propID of this InformationBo
     *
     * @return {int} propID - the propID of this InformationBO
     */
    getPropID() {
        return this.propID;
    }

    /**
     * Sets the propID of this InformationBO.
     *
     * @param {int} informationID - the new informationID of this InformationBO.
     */
    setInformationId(informationID) {
        this.informationID = informationID;
    }

    /**
     * Gets the propID of this InformationBo
     *
     * @return {int} propID - the propID of this InformationBO
     */
    getInformationId() {
        return this.informationID;
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