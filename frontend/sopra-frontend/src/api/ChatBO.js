import BusinessObject from './BusinessObject';

/**
 * Represents a Chat object of a user.
 */
export default class ChatBO extends BusinessObject {

    /**
     * Constructs a new ChatBO object.
     *
     * @param {*} user1ID - first User of the Chat.
     * @param {*} user2ID - second User of the Chat.
     */
    constructor(user1ID, user2ID) {
        super();
        this.blocklist = user1ID;
        this.blocklistID = user2ID;
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