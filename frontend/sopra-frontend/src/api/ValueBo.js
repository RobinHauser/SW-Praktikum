import BusinessObject from './BusinessObject';

/**
 * Represents a User object.
 */
export default class ValueBo {
//TODO: WORK IN PROGRESS / MAYBE NEEDED FOR LATER
  /**
   * Constructs a new UserBO object.
   *
   * @param {*} valueID - id of the value.
   * @param {*} value - value content
   *
   */
  constructor(valueID, value) {
    this.valueID = valueID;
    this.value = value;

  }

  /**
   * Sets the valueID of this ValueBo.
   *
   * @param {*} valueID - the new userID of this UserBO.
   */
  setValueId(valueID) {
    this.valueID = valueID;
  }

  /**
   * Gets the valueID of this ValueBo.
   */
  getValueId() {
    return parseInt(this.valueID);
  }

  /**
   * Sets the value of this ValueBo.
   *
   * @param {*} value - the new value of this ValueBo.
   */
  setValue(value) {
    this.value = value;
  }

  /**
   * Gets the value of this ValueBo
   */
  getValue() {
    return this.value;
  }

  /**
   * Returns an Array of UserBOs from a given JSON structure
   */
  static fromJSON(users) {
    let result = [];

    if (Array.isArray(users)) {
      users.forEach((a) => {
        Object.setPrototypeOf(a, ValueBo.prototype);
        result.push(a);
      })
    } else {
      // Es handelt sich offenbar um ein singuläres Objekt
      let a = users;
      Object.setPrototypeOf(a, ValueBo.prototype);
      result.push(a);
    }

    return result;
  }
}