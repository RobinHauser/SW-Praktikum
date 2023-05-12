/**
 * Abstracts the REST interface of the Python backend with convenient access methods.
 * The class is implemented as a singleton.
 *
 * @author [Michael Bergdolt] (https://github.com/MichaelBergdolt)
 * inspired by [Christoph Kunz] (https://github.com/christophkunz)
 */

export default class SopraDatingAPI {

    // Singleton instance
    static #api = null;

    // Local Python backend
    // #SopraDatingServerBaseURL = '/api/v1';

    // Local http-fake-backend
    #SopraDatingServerBaseURL = 'http://localhost:8081/api/v1'


    // Bookmarklist related
    #addUserBookmarklistURL = () => {
        return `${this.#SopraDatingServerBaseURL}/bookmarklist`;
    };
    #getBookmarklistURL = (BookmarklistID) => {
        return `${this.#SopraDatingServerBaseURL}/bookmarklist?id=${BookmarklistID}`;
    };
    #removeUserBookmarklistURL = (BookmarkID) => {
        return `${this.#SopraDatingServerBaseURL}/bookmarklist?id=${BookmarkID}`;
    };

    // Blocklist related
    #addUserBlocklistURL = () => `${this.#SopraDatingServerBaseURL}/blocklist`;
    #getBlocklistURL = (BlocklistID) => `${this.#SopraDatingServerBaseURL}/blocklist?id=${BlocklistID}`;
    #removeUserBlocklistURL = (BlockID) => `${this.#SopraDatingServerBaseURL}/blocklist?id=${BlockID}`;

    // Chat related
    #addUserChatURL = () => `${this.#SopraDatingServerBaseURL}/conversationoverview`;
    #getUserChatsURL = (conversationsoverviewListID) => {
        return `${this.#SopraDatingServerBaseURL}/conversationoverview?id=${conversationsoverviewListID}`;
    }
    #removeChatURL = (chatID) => `${this.#SopraDatingServerBaseURL}/conversationoverview?id=${chatID}`;

    // Message related
    #addMessageURl = () => `${this.#SopraDatingServerBaseURL}/message`;
    #getChatMessagesURL = (chatID) => `${this.#SopraDatingServerBaseURL}/message?id=${chatID}`;

    // Profile related
    #getProfileURL = (userID) => `${this.#SopraDatingServerBaseURL}/profile?id=${userID}`;
    #updateProfileURL = (userID) => `${this.#SopraDatingServerBaseURL}/profile?id=${userID}`;

    // SearchProfile related
    #getSearchProfileURL = (searchprofileID) => {
        return `${this.#SopraDatingServerBaseURL}/searchprofile?id=${searchprofileID}`;
    }
    #getSearchProfilesURL = (userID) => {
        return `${this.#SopraDatingServerBaseURL}/searchprofile?id=${userID}`;
    }
    #addSearchProfileURL = ()=> {
        return `${this.#SopraDatingServerBaseURL}/searchprofile`;
    }
    #updateSearchProfileURL = (searchprofileID)=> {
        return `${this.#SopraDatingServerBaseURL}/searchprofile?id=${searchprofileID}`;
    }
    #deleteSearchProfileURL = (searchprofileID)=> {
        return `${this.#SopraDatingServerBaseURL}/searchprofile?id=${searchprofileID}`;
    }


    /**
   * Get the Singleton instance
   *
   * @public
   */
    static getAPI() {
        if (this.#api == null) {
            this.#api = new SopraDatingAPI();
        }
        return this.#api;
    }

    /**
   *  Returns a Promise which resolves to a json object.
   *  The Promise returned from fetch() won’t reject on HTTP error status even if the response is an HTTP 404 or 500.
   *  fetchAdvanced throws an Error also an server status errors
   */
    #fetchAdvanced = (url, init) => fetch(url, init)
        .then(res => {
            // The Promise returned from fetch() won’t reject on HTTP error status even if the response is an HTTP 404 or 500.
            if (!res.ok) {
                throw Error(`${res.status} ${res.statusText}`);
            }
            return res.json();
        }
        )

    getUser(userID) {
        return this.#fetchAdvanced(this.#getProfileURL(userID)).then((responseJSON) => {
            return responseJSON
        })
    }

    getBlocklist(userID) {
        return this.#fetchAdvanced(this.#getBlocklistURL(userID)).then((responseJSON) => {
            return responseJSON
        })
    }
}