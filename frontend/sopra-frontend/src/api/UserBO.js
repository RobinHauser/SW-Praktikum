import BusinessObject from './BusinessObject';

/**
 * Represents a User object.
 */
export default class UserBO extends BusinessObject {

  /**
   * Constructs a new UserBO object.
   *
   * @param {*} userID - id of User.
   * @param {*} displayname - displayname of User
   * @param {*} email - Email of the User
   * @param {*} dateOfBirth - Birthdate of the User
   * @param {*} blocklistID - Blocklist ID of the User
   * @param {*} bookmarklistID - Bookmarklist ID of the User
   * @param {*} profileID - Profile ID of the User
   *
   */
  constructor(userID, displayname, email, dateOfBirth, blocklistID, bookmarklistID, profileID) {
    super();
    this.userID = userID;
    this.displayname = displayname;
    this.email = email;
    this.dateOfBirth = dateOfBirth;
    this.blocklistID = blocklistID;
    this.bookmarklistID = bookmarklistID;
    this.profileID = profileID;
  }

  /**
   * Sets the ID of this UserBO.
   *
   * @param {*} userID - the new userid of this UserBO.
   */
  setUserID(userID) {
    this.userID = userID;
  }

  /**
   * Gets the userID of this UserBO.
   */
  getUserID() {
    return this.userID;
  }

  /**
   * Sets the displayname of this UserBO.
   *
   * @param {*} displayname - the new displayname of this UserBO.
   */
  setDisplayname(displayname) {
    this.displayname = displayname;
  }

  /**
   * Gets the displayname of this UserBO
   */
  getDisplayname() {
    return this.displayname;
  }

  /**
   * Sets the email of this UserBO.
   *
   * @param {*} email - the new email of this UserBO.
   */
  setEmail(email) {
    this.email = email;
  }

  /**
   * Gets the email of this UserBO.
   */
  getEmail() {
    return this.email;
  }

  /**
   * Sets the date of birth of this UserBO.
   *
   * @param {*} dateOfBirth - the new date of birth of this UserBO.
   */
  setDateOfBirth(dateOfBirth) {
    this.dateOfBirth = dateOfBirth;
  }

  /**
   * Gets the date of birth of this UserBO.
   */
  getDateOfBirth() {
    return this.dateOfBirth;
  }

  /**
   * Sets the blocklist ID of this UserBO.
   *
   * @param {*} blocklistID - the new blocklist ID of this UserBO.
   */
  setBlocklistID(blocklistID) {
    this.blocklistID = blocklistID;
  }

  /**
   * Gets the blocklist ID of this UserBO.
   */
  getBlocklistID() {
    return this.blocklistID;
  }

  /**
   * Sets the bookmarklist ID of this UserBO.
   *
   * @param {*} bookmarklistID - the new bookmarklist ID of this UserBO.
   */
  setBookmarklistID(bookmarklistID) {
    this.bookmarklistID = bookmarklistID;
  }

  /**
   * Gets the bookmarklist ID of this UserBO.
   */
  getBookmarklistID() {
    return this.bookmarklistID;
  }

  /**
   * Sets the profile ID of this UserBO.
   *
   * @param {*} profileID - the new profile ID of this UserBO.
   */
  setProfileID(profileID) {
    this.profileID = profileID;
  }

  /**
   * Gets the profile ID of this UserBO.
   */
  getProfileID() {
    return this.profileID;
  }

  /**
   * Returns an Array of UserBOs from a given JSON structure
   */
  static fromJSON(users) {
    let result = [];

    if (Array.isArray(users)) {
      users.forEach((a) => {
        Object.setPrototypeOf(a, UserBO.prototype);
        result.push(a);
      })
    } else {
      // Es handelt sich offenbar um ein singuläres Objekt
      let a = users;
      Object.setPrototypeOf(a, UserBO.prototype);
      result.push(a);
    }

    return result;
  }
}