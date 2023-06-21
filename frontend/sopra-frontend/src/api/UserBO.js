import BusinessObject from './BusinessObject';

/**
 * Represents a User object.
 */
export default class UserBO {

  /**
   * Constructs a new UserBO object.
   *
   * @param {*} userID - id of User.
   * @param {*} displayname - displayname of User
   * @param {*} email - Email of the User
   * @param {*} ProfileIMGURL - Avatar URL of the User
   *
   */
  constructor(userID, displayname, email, ProfileIMGURL) {
    this.UserID = userID;
    this.displayname = displayname;
    this.email = email;
    this.ProfileIMGURL = ProfileIMGURL;
  }

  /**
   * Sets the ID of this UserBO.
   *
   * @param {*} userID - the new userID of this UserBO.
   */
  setUserID(userID) {
    this.UserID = userID;
  }

  /**
   * Gets the userID of this UserBO.
   */
  getUserID() {
    return parseInt(this.UserID);
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
   * Sets Avatar URL of this UserBO.
   *
   * @param {*} ProfileIMGURL - the new date of birth of this UserBO.
   */
  setAvatarURL(ProfileIMGURL) {
    this.ProfileIMGURL = ProfileIMGURL;
  }

  /**
   * Gets the avatar URL of this UserBO.
   *
   * @return {string} avatarURL - the avatar URL of this user
   */
  getAvatarURL() {
    return this.ProfileIMGURL;
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