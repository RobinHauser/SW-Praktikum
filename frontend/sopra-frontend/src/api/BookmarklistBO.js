import BusinessObject from './BusinessObject';

/**
 * Represents a Bookmarklist object of a user.
 */
export default class BookmarklistBO extends BusinessObject {

  /**
   * Constructs a new BookmarklistBO object.
   *
   * @param {*} bookmarklist - list of all blocked users.
   * @param {*} bookmarklistID - ID of bookmarklist
   */
  constructor(bookmarklist, bookmarklistID) {
    super();
    this.bookmarklist = bookmarklist;
    this.bookmarklistID = bookmarklistID;
  }

  /**
   * Sets the bookmarklist of this BookmarklistBO.
   *
   * @param {*} bookmarklist - the new bookmarklist of this BookmarklistBO.
   */
  setBookmarklist(bookmarklist) {
    this.bookmarklist = bookmarklist;
  }

  /**
   * Gets the bookmarklist of this BookmarklistBO.
   */
  getBookmarklist() {
    return this.bookmarklist;
  }

  /**
   * Returns an Array of UserBOs from a given JSON structure
   */
  static fromJSON(bookmarklist) {
    let result = [];

    if (Array.isArray(bookmarklist)) {
      bookmarklist.forEach((a) => {
        Object.setPrototypeOf(a, UserBO.prototype);
        result.push(a);
      })
    } else {
      // Es handelt sich offenbar um ein singuläres Objekt
      let a = bookmarklist;
      Object.setPrototypeOf(a, UserBO.prototype);
      result.push(a);
    }

    return result;
  }
}