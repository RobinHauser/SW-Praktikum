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
    #SopraDatingServerBaseURL = '/api/sopra-dating'


    // User related
    #getUserURL = (id) => `${this.#SopraDatingServerBaseURL}/user/${id}`;


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
   * Get the Singelton instance
   *
   * @public
   */
    static getAPI() {
        if (this.#api == null) {
            this.#api = new SopraDatingAPI();
        }
        return this.#api;
    }
}
