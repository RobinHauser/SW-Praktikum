/**
 * Abstracts the REST interface of the Python backend with convenient access methods.
 * The class is implemented as a singleton.
 *
 * @author [Michael Bergdolt] (https://github.com/MichaelBergdolt)
 * inspired by [Christoph Kunz] (https://github.com/christophkunz)
 */
import UserBO from "./UserBO";
import MessageBO from "./MessageBO";

export default class SopraDatingAPI {

    // Singleton instance
    static #api = null;

    // Local Python backend
    #SopraDatingServerBaseURL = 'http://127.0.0.1:5000';

    // Local http-fake-backend
    // #SopraDatingServerBaseURL = 'http://localhost:8081/api/v1'


    // Bookmarklist related
    #addUserToBookmarklistURL = () => {
        return `${this.#SopraDatingServerBaseURL}/bookmarklist`;
    };
    #getBookmarklistURL = (bookmarklistID) => {
        return `${this.#SopraDatingServerBaseURL}/bookmarklist/${bookmarklistID}`;
    };
    #removeUserFromBookmarklistURL = (bookmarkID) => {
        return `${this.#SopraDatingServerBaseURL}/bookmarklist/${bookmarkID}`;
    };

    // Blocklist related
    #addUserToBlocklistURL = () => `${this.#SopraDatingServerBaseURL}/blocklist/1005`; //TODO change ID
    #getBlocklistURL = (blocklistID) => `${this.#SopraDatingServerBaseURL}/blocklist/1005`; //TODO change ID
    #removeUserFromBlocklistURL = (blockID) => `${this.#SopraDatingServerBaseURL}/blocklist/1005`; //TODO change ID

    // Chat related
    #addUserToChatURL = () => `${this.#SopraDatingServerBaseURL}/conversationoverview`;
    #getUserChatsURL = (userID) => {
        return `${this.#SopraDatingServerBaseURL}/conversationoverview?id=${userID}`;
    }
    #removeChatURL = (chatID) => `${this.#SopraDatingServerBaseURL}/conversationoverview?id=${chatID}`;

    // Message related
    #addMessageURl = () => `${this.#SopraDatingServerBaseURL}/message`;
    #getChatMessagesURL = (chatID) => `${this.#SopraDatingServerBaseURL}/message?id=${chatID}`;

    // Profile related
    #getProfileURL = (userID) => `${this.#SopraDatingServerBaseURL}/profile/${userID}`;
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

    // similarityMeasure related


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
   *  Returns a json object.
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

    addUserToBookmarklist(userBO) {
        return this.#fetchAdvanced(this.#addUserToBookmarklistURL(), {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
            },
            body: JSON.stringify(userBO)
        })
    }

    getBookmarklist(bookmarklistID) {
        return this.#fetchAdvanced(this.#getBookmarklistURL(bookmarklistID))
            .then((responseJSON) => {
                let userBOs = UserBO.fromJSON(responseJSON);
                // console.log(blocklistBOs)
                return new Promise(function (resolve) {
                    resolve(userBOs)
                })
        })
    }

    removeUserFromBookmarklist(bookmarkID) {
        return this.#fetchAdvanced(this.#removeUserFromBookmarklistURL(bookmarkID), {
            method: 'DELETE'
        }).then((responseJSON) => {
            let userBOs = UserBO.fromJSON(responseJSON)[0];
            // console.info(userBOs);
            return new Promise(function (resolve) {
               resolve(userBOs);
            })
        })
    }

    addUserToBlocklist(userBO) {
        return this.#fetchAdvanced(this.#addUserToBlocklistURL(), {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json'
            },
            body: JSON.stringify(userBO)
        }).then((responseJSON) => {
            let userBO = UserBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(userBO)
            })
        })
    }

    getBlocklist(userID) {
        return this.#fetchAdvanced(this.#getBlocklistURL(userID))
            .then((responseJSON) => {
                let userBOs = UserBO.fromJSON(responseJSON);
                // console.log(blocklistBOs)
                return new Promise(function (resolve) {
                    resolve(userBOs)
                })
        })
    }

    removeUserFromBlocklist(user) {
        return this.#fetchAdvanced(this.#removeUserFromBlocklistURL(user), {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json'
            },
            body: JSON.stringify(user)
        }).then((responseJSON) => {
            let userBOs = UserBO.fromJSON(responseJSON)[0];
            // console.info(userBOs);
            return new Promise(function (resolve) {
               resolve(userBOs);
            })
        })
    }

    addUserToChat(userBO) {
        return this.#fetchAdvanced(this.#addUserToChatURL(), {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json'
            },
            body: JSON.stringify(userBO)
        })
    }

    getUserChats(userID) {
        return this.#fetchAdvanced(this.#getUserChatsURL(userID)).then((responseJSON) => {
            return responseJSON
        })
    }

    removeChat(chatID) {
        return this.#fetchAdvanced(this.#removeChatURL(chatID), {
            method: 'DELETE'
        })
    }

    addMessage(messageBO) {
        return this.#fetchAdvanced(this.#addMessageURl(), {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json'
            },
            body: JSON.stringify(messageBO)
        })
    }

    getChatMessages(chatID) {
        return this.#fetchAdvanced(this.#getChatMessagesURL(chatID))
            .then((responseJSON) => {
                let messageBOs = MessageBO.fromJSON(responseJSON);
                // console.log(messageBOs)
                return new Promise(function (resolve) {
                    resolve(messageBOs)
                })
        })
    }

    getProfile(userID) {
        return this.#fetchAdvanced(this.#getProfileURL(userID)).then((responseJSON) => {
            return responseJSON
        })
    }

    updateProfile(userBO) {
        return this.#fetchAdvanced(this.#updateProfileURL(userBO.id), {
            method: 'PUT',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
            },
            body: JSON.stringify(userBO)
        })
    }

    getSearchProfile(searchprofileID) {
        return this.#fetchAdvanced(this.#getSearchProfileURL(searchprofileID)).then((responseJSON) => {
            return responseJSON
        })
    }

    getSearchProfiles(userID) {
        return this.#fetchAdvanced(this.#getSearchProfilesURL(userID)).then((responseJSON) => {
            return responseJSON
        })
    }

    addSearchProfile(searchprofileBO) {
        return this.#fetchAdvanced(this.#addSearchProfileURL(), {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json'
            },
            body: JSON.stringify(searchprofileBO)
        })
    }

    updateSearchProfile(searchprofileBO) {
        return this.#fetchAdvanced(this.#updateSearchProfileURL(searchprofileBO.id), {
            method: 'PUT',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json'
            },
            body: JSON.stringify(searchprofileBO)
        })
    }

    deleteSearchProfile(searchprofileID) {
        return this.#fetchAdvanced(this.#deleteSearchProfileURL(searchprofileID), {
            method: 'DELETE'
        })
    }
}