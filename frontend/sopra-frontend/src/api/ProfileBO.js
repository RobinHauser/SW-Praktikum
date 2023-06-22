import BusinessObject from './BusinessObject';

/**
 * Represents a User object.
 */
export default class ProfileBO extends BusinessObject{

  /**
   * Constructs a new UserBO object.
   *
   * @param {*} user_id - id of User.
   * @param {*} is_personal - decides whether the profile is a personal or a searchprofile
   * @param {*} profileID - Email of the User
   */
  constructor(user_id, is_personal, profileID) {
    super()
    this.UserID = user_id;
    this.isPersonal = is_personal;
    this.profileID = profileID;
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
   * Sets whether this ProfileBO is a personal or a searchprofile
   *
   * @param {*} isPersonal - the new displayname of this UserBO.
   */
  setIsPersonal(isPersonal) {
    this.isPersonal = isPersonal;
  }

  /**
   * Gets the isPersonal boolean of this UserBO
   */
  getIsPersonal() {
    return this.isPersonal;
  }

  /**
   * Sets the profile ID of this ProfileBO.
   *
   * @param {*} profileID - the new email of this UserBO.
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
   * Returns an Array of ProfileBOs from a given JSON structure
   */
  static fromJSON(profiles) {
    let result = [];

    if (Array.isArray(profiles)) {
      profiles.forEach((a) => {
        Object.setPrototypeOf(a, ProfileBO.prototype);
        result.push(a);
      })
    } else {
      // Es handelt sich offenbar um ein singuläres Objekt
      let a = profiles;
      Object.setPrototypeOf(a, ProfileBO.prototype);
      result.push(a);
    }

    return result;
  }
}