import BusinessObject from './BusinessObject';

/**
 * Represents a Message object of a user.
 */
export default class MessageBO extends BusinessObject {

  /**
   * Constructs a new MessageBO object.
   *
   * @param {*} MessageID - message Content
   * @param {*} Sender - timeStamp
   * @param {*} Content - ID of Message Sender
   * @param {*} TimeStamp - ID of Message Receiver
   */
  constructor(MessageID, Sender, Content, TimeStamp) {
    super();
    this.messageID = MessageID;
    this.senderID = Sender;
    this.content = Content;
    this.timeStamp = TimeStamp;
  }
  /**
   * Sets the message content of this MessageBO.
   *
   * @param {*} content - the new message content of this BlocklistBO.
   */
  setContent(content) {
    this.content = content;
  }

  /**
   * Gets the message content of this MessageBO.
   */
  getContent() {
    return this.content;
  }

  /**
   * Sets the timestamp of this MessageBO.
   *
   * @param {*} timeStamp - the new timestamp of this MessageBO.
   */
  setTimeStamp(timeStamp) {
    this.timeStamp = timeStamp;
  }

  /**
   * Gets the timestamp of this MessageBO.
   */
  getTimeStamp() {
    return this.timeStamp;
  }

  /**
   * Sets the sender ID of this MessageBO.
   *
   * @param {*} senderID - the new sender ID of this MessageBO.
   */
  setSenderID(senderID) {
    this.senderID = senderID;
  }

  /**
   * Gets the sender ID of this MessageBO.
   */
  getSenderID() {
    return this.senderID;
  }

    /**
   * Sets the message ID of this MessageBO.
   *
   * @param {*} messageID - the new sender ID of this MessageBO.
   */
  setMessageID(messageID) {
    this.messageID = messageID;
  }

  /**
   * Gets the message ID of this MessageBO.
   */
  getMessageID() {
    return this.messageID;
  }

  /**
   * Returns an Array of MessageBOs from a given JSON structure
   */
  static fromJSON(messages) {
    let result = [];

    if (Array.isArray(messages)) {
      messages.forEach((a) => {
        Object.setPrototypeOf(a, MessageBO.prototype);
        result.push(a);
      })
    } else {
      // Es handelt sich offenbar um ein singuläres Objekt
      let a = messages;
      Object.setPrototypeOf(a, MessageBO.prototype);
      result.push(a);
    }

    return result;
  }
}