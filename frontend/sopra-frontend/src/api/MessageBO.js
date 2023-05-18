import BusinessObject from './BusinessObject';

/**
 * Represents a Message object of a user.
 */
export default class MessageBO extends BusinessObject {

  /**
   * Constructs a new MessageBO object.
   *
   * @param {*} messageContent - message Content
   * @param {*} timeStamp - timeStamp
   * @param {*} senderID - ID of Message Sender
   * @param {*} receiverID - ID of Message Receiver
   */
  constructor(messageContent, timeStamp, senderID, receiverID) {
    super();
    this.messageContent = messageContent;
    this.timeStamp = timeStamp;
    this.senderID = senderID;
    this.receiverID = receiverID;
  }

  /**
   * Sets the message content of this MessageBO.
   *
   * @param {*} messageContent - the new message content of this BlocklistBO.
   */
  setMessageContent(messageContent) {
    this.messageContent = messageContent;
  }

  /**
   * Gets the message content of this MessageBO.
   */
  getMessageContent() {
    return this.messageContent;
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
   * Sets the receiver ID of this MessageBO.
   *
   * @param {*} receiverID - the new receiver ID of this MessageBO.
   */
  setReceiverID(receiverID) {
    this.receiverID = receiverID;
  }

  /**
   * Gets the receiver ID of this MessageBO.
   */
  getReceiverID() {
    return this.receiverID;
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