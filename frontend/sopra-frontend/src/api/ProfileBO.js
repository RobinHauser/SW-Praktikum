import BusinessObject from './BusinessObject';

/**
 * Represents Profile object.
 */
export default class ProfileBO extends BusinessObject {

    /**
     * Constructs a new ProfileBO object.
     *
     * @param {*} user_id - id of User.
     * @param {*} is_personal - decides whether the profile is a personal or a search profile
     * @param {*} profileID - profileID of the SearchProfileBO
     */
    constructor(user_id, is_personal, profileID) {
        super()
        this.UserID = user_id;
        this.isPersonal = is_personal;
        this.id = profileID;
    }

    /**
     * Sets the userID of this ProfileBO.
     *
     * @param {*} userID - the new userID of this ProfileBO.
     */
    setUserID(userID) {
        this.UserID = userID;
    }

    /**
     * Gets the userID of this ProfileBO.
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
     * Gets the isPersonal boolean of this ProfileBO
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
        this.id = profileID;
    }

    /**
     * Gets the profile ID of this UserBO.
     */
    getProfileID() {
        return this.id;
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