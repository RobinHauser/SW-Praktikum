import BusinessObject from './BusinessObject';

/**
 * Represents a Information object.
 */
export default class InformationBO extends BusinessObject {

    /**
     * Constructs a new Information object.
     *
     * @param {int} valueID - id of Information
     * @param {str} value - Value of the information
     * @param {str} property - Property of the InformationBO
     *
     */
    constructor(valueID, value, property) {
        super();
        this.property = property;
        this.valueID = valueID;
        this.value = value;
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
     * @return {str} Value - the Value of this InformationBO
     */
    getValue() {
        return this.value;
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