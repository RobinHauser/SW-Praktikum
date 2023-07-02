import BusinessObject from './BusinessObject';

/**
 * Represents a Chat object of a user.
 */
export default class ChatBO extends BusinessObject {

    /**
     * Constructs a new ChatBO object.
     *
     * @param {*} chatID - ID of the Chat.
     * @param {*} userID - participant of the Chat.
     * @param {*} displayName - display name of the participant
     * @param {*} profileImgUrl - profile-picture url of the participant
     */
    constructor(chatID, userID, displayName, profileImgUrl) {
        super();
        this.chatID = chatID
        this.userID = userID;
        this.displayName = displayName
        this.profileImgUrl = profileImgUrl
    }

    /**
     * Sets the chatID  of a Chat .
     *
     * @param {*} chatID - the new chatID of this ChatBO.
     */
    setChatID(chatID) {
        this.chatID = chatID;
    }

    /**
     * Gets the chatID of a Chat.
     */
    getChatID() {
        return this.chatID;
    }

    /**
     * Sets the userID  of a Chat .
     *
     * @param {*} userID - the new userID of this ChatBO.
     */
    setUserID(userID) {
        this.userID = userID;
    }

    /**
     * Gets the userID of a Chat.
     */
    getUserID() {
        return this.userID;
    }

    /**
     * Sets the display name of a Chat participant .
     *
     * @param {*} displayName - the new displayName of a Chat Participant this ChatBO.
     */
    setDisplayName(displayName) {
        this.displayName = displayName;
    }

    /**
     * Gets the displayName of a Chat Participant.
     */
    getDisplayName() {
        return this.displayName;
    }

    /**
     * Sets the profileImgUrl name of a Chat participant .
     *
     * @param {*} profileImgUrl - the new profileImgUrl of a Chat Participant this ChatBO.
     */
    setProfileImgUrl(profileImgUrl) {
        this.profileImgUrl = profileImgUrl;
    }

    /**
     * Gets the profileImgUrl of a Chat Participant.
     */
    getProfileImgUrl() {
        return this.profileImgUrl;
    }

    /**
     * Returns an Array of ChatBOs from a given JSON structure
     */
    static fromJSON(chat) {
        let result = [];

        if (Array.isArray(chat)) {
            chat.forEach((a) => {
                Object.setPrototypeOf(a, ChatBO.prototype);
                result.push(a);
            })
        } else {
            // Es handelt sich offenbar um ein singuläres Objekt
            let a = chat;
            Object.setPrototypeOf(a, ChatBO.prototype);
            result.push(a);
        }

        return result;
    }
}