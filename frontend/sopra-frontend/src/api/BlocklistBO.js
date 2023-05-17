import BusinessObject from './BusinessObject';
import UserBO from "./UserBO";

/**
 * Represents a Blocklist object of a user.
 */
export default class BlockistBO extends BusinessObject {

  /**
   * Constructs a new BlocklistBO object.
   *
   * @param {*} blocklist - list of all blocked users.
   * @param {*} blocklistID - ID of blocklist
   */
  constructor(blocklist, blocklistID) {
    super();
    this.blocklist = blocklist;
    this.blocklistID = blocklistID;
  }

  /**
   * Sets the blocklist of this BlocklistBO.
   *
   * @param {*} blocklist - the new blocklist of this BlocklistBO.
   */
  setBlocklist(blocklist) {
    this.blocklist = blocklist;
  }

  /**
   * Gets the blocklist of this BlocklistBO.
   */
  getBlocklist() {
    return this.blocklist;
  }

  /**
   * Returns an Array of UserBOs from a given JSON structure
   */
  static fromJSON(blocklist) {
    let result = [];

    if (Array.isArray(blocklist)) {
      blocklist.forEach((a) => {
        Object.setPrototypeOf(a, UserBO.prototype);
        result.push(a);
      })
    } else {
      // Es handelt sich offenbar um ein singuläres Objekt
      let a = blocklist;
      Object.setPrototypeOf(a, UserBO.prototype);
      result.push(a);
    }

    return result;
  }
}