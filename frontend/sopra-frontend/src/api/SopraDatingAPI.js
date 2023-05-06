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


    // Local http-fake-backend
    #SopraDatingServerBaseURL = 'http://localhost:8081/api/sopra-dating'


    // User related
    #getUserURL = (id) => `${this.#SopraDatingServerBaseURL}/user`;


    // Profile related
    #getProfileURL = (id) => `${this.#SopraDatingServerBaseURL}/user/${id}/properties`;
    #updateProfileURL = (id) => `${this.#SopraDatingServerBaseURL}/user/${id}/properties`;


    // Bookmarklist related
    #getBookmarklistURL = (id) => `${this.#SopraDatingServerBaseURL}/bookmarklist/${id}`;
    #addUserBookmarklistURL = (id) => `${this.#SopraDatingServerBaseURL}/bookmarklist/${id}`;
    #removeUserBookmarklistURL = (id) => `${this.#SopraDatingServerBaseURL}/bookmarklist/${id}`;


    // Blocklist related
    #getBlocklistURL = (id) => `${this.#SopraDatingServerBaseURL}/blocklist/${id}`;
    #addUserBlocklistURL = (id) => `${this.#SopraDatingServerBaseURL}/blocklist/${id}`;
    #removeUserBlocklistURL = (id) => `${this.#SopraDatingServerBaseURL}/blocklist/${id}`;


    // SearchProfile related
    #getSearchProfilesURL = (id) => `${this.#SopraDatingServerBaseURL}/search-profiles/${id}`;
    #getSearchProfileURL = (id, searchProfileId) => {
        return `${this.#SopraDatingServerBaseURL}/search-profiles/${id}/${searchProfileId}`;
    }
    #addSearchProfileURL = (id, searchProfileId)=> {
        return `${this.#SopraDatingServerBaseURL}/search-profiles/${id}/${searchProfileId}`;
    }
    #updateSearchProfileURL = (id, searchProfileId)=> {
        return `${this.#SopraDatingServerBaseURL}/search-profiles/${id}/${searchProfileId}`;
    }
    #deleteSearchProfileURL = (id, searchProfileId)=> {
        return `${this.#SopraDatingServerBaseURL}/search-profiles/${id}/${searchProfileId}`;
    }


    // Users sorted by similarity with searchProfile
    #getUsersBySimilarity = (searchProfileId) => {
        return `${this.#SopraDatingServerBaseURL}/similar-profiles/${searchProfileId}`;
    }


    // Chat related
    #getUserChatsURL = (id) => `${this.#SopraDatingServerBaseURL}/user/${id}/chats`
    #getChatMessagesURL = (chatId) => `${this.#SopraDatingServerBaseURL}/chats/${chatId}/messages`
    #createChatURL = () => `${this.#SopraDatingServerBaseURL}/chats`
    #addChatMessageURL = (chatId) => `${this.#SopraDatingServerBaseURL}/chats/${chatId}/messages`


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
        return this.#fetchAdvanced(this.#getUserURL(userID)).then((responseJSON) => {
            return responseJSON
        })
    }

    getBlocklist(userID) {
        return this.#fetchAdvanced(this.#getBlocklistURL(userID)).then((responseJSON) => {
            return responseJSON
        })
    }
}