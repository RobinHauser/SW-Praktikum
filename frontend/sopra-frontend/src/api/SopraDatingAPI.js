/**
 * Abstracts the REST interface of the Python backend with convenient access methods.
 * The class is implemented as a singleton.
 *
 * inspired by [Christoph Kunz] (https://github.com/christophkunz)
 */
import UserBO from "./UserBO";
import MessageBO from "./MessageBO";
import ChatBO from "./ChatBO";
import ProfileBO from "./ProfileBO";
import InformationBO from "./InformationBO";
import PropertyBO from "./PropertyBO";
import ValueBo from "./ValueBo";

export default class SopraDatingAPI {

    // Singleton instance
    static #api = null;

    // deployed Python backend
    // #SopraDatingServerBaseURL = 'https://sopra-projekt-390609.ey.r.appspot.com/';

    // Local Python backend
    #SopraDatingServerBaseURL = 'http://127.0.0.1:8000'

    // Local http-fake-backend
    //#SopraDatingServerBaseURL = 'http://localhost:8081/api/v1'

    #token = document.cookie.split("; ").find((row) => row.startsWith("token="))?.split("=")[1];


    // Inspired by: https://www.w3schools.blog/get-cookie-by-name-javascript-js
    #getCookie(cookieName) {
        let cookie = {};
        document.cookie.split(';').forEach(function (el) {
            let [key, value] = el.split('=');
            cookie[key.trim()] = value;
        })
        return cookie[cookieName];
    }

    // User related
    #getAllUsersFilteredURL = (userID) => {
        return `${this.#SopraDatingServerBaseURL}/all-user/${userID}`
    }

    #getUserURL = (email) => {
        return `${this.#SopraDatingServerBaseURL}/init-user/${email}`;
    };
    #getUserByIdURL = (id) => {
        return `${this.#SopraDatingServerBaseURL}/user/${id}`;
    };
    #postUserURL = () => {
        return `${this.#SopraDatingServerBaseURL}/user/1000`
    };

    #deleteUserURL = (userID) => {
        return `${this.#SopraDatingServerBaseURL}/user/${userID}`
    }

    // Bookmarklist related
    #addUserToBookmarklistURL = (userID) => {
        return `${this.#SopraDatingServerBaseURL}/bookmarklist/${userID}`;
    };
    #getBookmarklistURL = (userID) => {
        return `${this.#SopraDatingServerBaseURL}/bookmarklist/${userID}`;
    };
    #removeUserFromBookmarklistURL = (userID) => {
        return `${this.#SopraDatingServerBaseURL}/bookmarklist/${userID}`;
    };

    // Blocklist related
    #addUserToBlocklistURL = (userID) => `${this.#SopraDatingServerBaseURL}/blocklist/${userID}`;
    #getBlocklistURL = (userID) => `${this.#SopraDatingServerBaseURL}/blocklist/${userID}`;
    #removeUserFromBlocklistURL = (userID) => `${this.#SopraDatingServerBaseURL}/blocklist/${userID}`;

    // Chat related
    #addUserToChatURL = (userID) => `${this.#SopraDatingServerBaseURL}/chat/${userID}`;
    #getUserChatsURL = (userID) => {
        return `${this.#SopraDatingServerBaseURL}/chat/${userID}`;
    }

    // Message related
    #addMessageURl = (userID) => `${this.#SopraDatingServerBaseURL}/message/${userID}`;
    #getChatMessagesURL = (chatID) => `${this.#SopraDatingServerBaseURL}/message/${chatID}`;

    // Profile related
    #getProfileURL = (userID) => `${this.#SopraDatingServerBaseURL}/personal-profile/by_user/${userID}`;

    // SearchProfile related
    #getSearchProfileURL = (searchprofileID) => {
        return `${this.#SopraDatingServerBaseURL}/search-profile/${searchprofileID}`;
    }
    #getSearchProfilesURL = (userID) => {
        return `${this.#SopraDatingServerBaseURL}/search-profile/by_user/${userID}`;
    }
    #addSearchProfileURL = (userID) => {
        return `${this.#SopraDatingServerBaseURL}/search-profile/by_user/${userID}`;
    }
    #deleteSearchProfileURL = (searchprofileID) => {
        return `${this.#SopraDatingServerBaseURL}/search-profile/${searchprofileID}`;
    }

    #getInformationsByProfileURL = (profileID) => {
        return `${this.#SopraDatingServerBaseURL}/information/infos/${profileID}`
    }

    // viewedList related
    #addUserToViewedlistURL = (userID) => `${this.#SopraDatingServerBaseURL}/view/${userID}`;
    #getViewedlistURL = (userID) => `${this.#SopraDatingServerBaseURL}/view/${userID}`

    // similarityMeasure related
    #getUsersSortedBySimilarityMeasureURL = (searchprofileID) => {
        return `${this.#SopraDatingServerBaseURL}/personal-profile/sorted/${searchprofileID}`
    }

    //property related
    #getAlleValuesFromPropertyByPropertyIdURL = (propertyID) => {
        return `${this.#SopraDatingServerBaseURL}/selection-property/options/${propertyID}`
    }
    #postNewValueForPropertyWithPropertyIdURL = (propertyID) => {
        return `${this.#SopraDatingServerBaseURL}/selection-property/options/${propertyID}`
    }

    #deleteSelectionValueItemURL = (valueId) => {
        return `${this.#SopraDatingServerBaseURL}/selection-property/options/${valueId}`
    }
    #updateValueOfInformationObjectByIdURL = (valueId) => {
        return `${this.#SopraDatingServerBaseURL}/information/${valueId}`
    }
    #deleteInformationByIdURL = (informationId) => {
        return `${this.#SopraDatingServerBaseURL}/information/${informationId}`
    }
    #deleteSelectPropertyInSystemByIdURL = (propertyId) => {
        return `${this.#SopraDatingServerBaseURL}/selection-property/${propertyId}`
    }
    #deleteTextPropertyInSystemByIdURL = (propertyId) => {
        return `${this.#SopraDatingServerBaseURL}/text-property/${propertyId}`
    }
    #addNewTextValueToTextPropertyURL = (propertyId) => {
        return `${this.#SopraDatingServerBaseURL}/text-property/entries/${propertyId}`
    }

    #addSelectionPropertyURL = () => {
        return `${this.#SopraDatingServerBaseURL}/selection-property/selection_properties`;
    }

    #getAllSelectionPropertiesURL = () => {
        return `${this.#SopraDatingServerBaseURL}/selection-property/selection_properties`;
    }

    #addFreeTextPropertyURL = () => {
        return `${this.#SopraDatingServerBaseURL}/text-property/text_properties`;
    }

    #getAllFreeTextPropertiesURL = () => {
        return `${this.#SopraDatingServerBaseURL}/text-property/text_properties`;
    }
    #addNewInformationToProfileURL = (valueId) => {
        return `${this.#SopraDatingServerBaseURL}/information/${valueId}`
    }
    #updateSelectionPropertyByIdURL = (propertyId) => {
        return `${this.#SopraDatingServerBaseURL}/selection-property/${propertyId}`
    }
    #updateTextPropertyByIdURL = (propertyId) => {
        return `${this.#SopraDatingServerBaseURL}/text-property/${propertyId}`
    }
    #updateSelectionValueByIdURL = (valueId) => {
        return `${this.#SopraDatingServerBaseURL}/selection-property/options/${valueId}`
    }
    #updateTextValueByIdURL = (valueId) => {
        return `${this.#SopraDatingServerBaseURL}/text-property/entries/${valueId}`
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

    /**
     * Returns a Promise, which resolves to an Array of UserBOs
     *
     * @param userID - The ID of the user
     * @return {Promise<unknown>} -  A Promise that resolves to an Array of UserBOs.
     */
    getAllUsersFiltered(userID) {
        return this.#fetchAdvanced(this.#getAllUsersFilteredURL(userID), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Token': `${this.#getCookie('token')}`
            }
        })
            .then((responseJSON) => {
                let userBOs = UserBO.fromJSON(responseJSON);
                return new Promise(function (resolve) {
                    resolve(userBOs)
                })
            })
    }

    /**
     * Returns a Promise, which resolves to a UserBO of the user
     *
     * @param email - email of the user
     * @return {Promise<unknown>} - A Promise that resolves to a UserBO
     */
    getUser(email) {
        return this.#fetchAdvanced(this.#getUserURL(email), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Token': `${this.#getCookie('token')}`
            }
        })
            .then((responseJSON) => {
                let userBOs = UserBO.fromJSON(responseJSON);
                return new Promise(function (resolve) {
                    resolve(userBOs)
                })
            })
    }

    /**
     * Returns a Promise, which resolves to a UserBO of the user
     *
     * @param id - id of the user
     * @return {Promise<unknown>} - A Promise that resolves to a UserBO
     */
    getUserbyId(id) {
        return this.#fetchAdvanced(this.#getUserByIdURL(id), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Token': `${this.#getCookie('token')}`
            }
        })
            .then((responseJSON) => {
                let userBOs = UserBO.fromJSON(responseJSON);
                return new Promise(function (resolve) {
                    resolve(userBOs)
                })
            })
    }

    /**
     * Sends a POST request to create a new user.
     *
     * @param userBO - The UserBO object representing the user.
     * @return {Promise<unknown>} - A Promise that resolves to the created UserBO.
     */
    postUser(userBO) {
        return this.#fetchAdvanced(this.#postUserURL(), {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
                'Token': `${this.#getCookie('token')}`
            },
            body: JSON.stringify(userBO)
        }).then((responseJSON) => {
            let user = UserBO.fromJSON(responseJSON);
            return new Promise(function (resolve) {
                resolve(user)
            })
        })
    }

    /**
     * Sends a DELETE request to delete a user.
     *
     * @param userID - The ID of the user.
     * @param userBO - The UserBO object representing the user.
     * @return {Promise<unknown>} - A Promise that resolves to the deleted UserBO.
     */
    deleteUser(userID, userBO) {
        return this.#fetchAdvanced(this.#deleteUserURL(userID), {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
                'Token': `${this.#getCookie('token')}`
            },
            body: JSON.stringify(userBO)
        }).then((responseJSON) => {
            let user = UserBO.fromJSON(responseJSON);
            return new Promise(function (resolve) {
                resolve(user)
            })
        })
    }

    /**
     * Adds a user to a bookmark list.
     *
     * @param userID - The ID of the user.
     * @param userBO - The UserBO object representing the user.
     * @return {Promise<unknown>} - A Promise that resolves to the updated UserBO.
     */
    addUserToBookmarklist(userID, userBO) {
        return this.#fetchAdvanced(this.#addUserToBookmarklistURL(userID), {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
                'Token': `${this.#getCookie('token')}`
            },
            body: JSON.stringify(userBO)
        }).then((responseJSON) => {
            let userBO = UserBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(userBO)
            })
        })
    }

    /**
     * Retrieves the bookmark list for a user.
     *
     * @param userID - The ID of the user.
     * @return {Promise<unknown>} - A Promise that resolves to an Array of UserBOs representing the bookmark list.
     */
    getBookmarklist(userID) {
        return this.#fetchAdvanced(this.#getBookmarklistURL(userID), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Token': `${this.#getCookie('token')}`
            }
        })
            .then((responseJSON) => {
                let userBOs = UserBO.fromJSON(responseJSON);
                return new Promise(function (resolve) {
                    resolve(userBOs)
                })
            })
    }

    /**
     * Removes a user from a bookmark list.
     *
     * @param userID - The ID of the user.
     * @param userBO - The UserBO object representing the user.
     * @return {Promise<unknown>} -  A Promise that resolves to the updated UserBO.
     */
    removeUserFromBookmarklist(userID, userBO) {
        return this.#fetchAdvanced(this.#removeUserFromBookmarklistURL(userID), {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
                'Token': `${this.#getCookie('token')}`
            },
            body: JSON.stringify(userBO)
        }).then((responseJSON) => {
            let userBOs = UserBO.fromJSON(responseJSON)[0];
            // console.info(userBOs);
            return new Promise(function (resolve) {
                resolve(userBOs);
            })
        })
    }

    /**
     * Adds a user to the blocklist.
     *
     * @param userID - The ID of the user that wants to block.
     * @param userBO - The UserBO object representing the user to block.
     * @return {Promise<unknown>} - A Promise that resolves to the updated UserBO.
     */
    addUserToBlocklist(userID, userBO) {
        return this.#fetchAdvanced(this.#addUserToBlocklistURL(userID), {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
                'Token': `${this.#getCookie('token')}`
            },
            body: JSON.stringify(userBO)
        }).then((responseJSON) => {
            let userBO = UserBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(userBO)
            })
        })
    }

    /**
     * Retrieves the blocklist for a user.
     *
     * @param userID - The ID of the user.
     * @return {Promise<unknown>} - A Promise that resolves to an Array of UserBOs representing the blocklist.
     */
    getBlocklist(userID) {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'token': `${this.#getCookie('token')}`
            }
        };

        return this.#fetchAdvanced(this.#getBlocklistURL(userID), requestOptions)
            .then((responseJSON) => {
                let userBOs = UserBO.fromJSON(responseJSON);
                return new Promise(function (resolve) {
                    resolve(userBOs);
                });
            });
    }

    /**
     * Removes a user from the blocklist.
     *
     * @param userID - The ID of the user that wants to remove a user from the bookmarklist.
     * @param userBO - The UserBO object representing the user to remove from the blocklist.
     * @return {Promise<unknown>} - A Promise that resolves to the updated UserBO.
     */
    removeUserFromBlocklist(userID, userBO) {
        return this.#fetchAdvanced(this.#removeUserFromBlocklistURL(userID), {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
                'Token': `${this.#getCookie('token')}`
            },
            body: JSON.stringify(userBO)
        }).then((responseJSON) => {
            let userBOs = UserBO.fromJSON(responseJSON)[0];
            // console.info(userBOs);
            return new Promise(function (resolve) {
                resolve(userBOs);
            })
        })
    }

    /**
     * Adds a user to a chat.
     *
     * @param ownUserId - The ID of the user initiating the chat.
     * @param partnerUserId - The ID of the user to be added to the chat.
     * @return {Promise<any>} - A Promise that resolves to the response from the server.
     */
    addUserToChat(ownUserId, partnerUserId) {
        return this.#fetchAdvanced(this.#addUserToChatURL(ownUserId), {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
                'Token': `${this.#getCookie('token')}`
            },
            body: JSON.stringify(partnerUserId)
        })
    }

    /**
     * Retrieves the chats for a user.
     *
     * @param userID - The ID of the user.
     * @return {Promise<unknown>} - A Promise that resolves to an Array of ChatBOs representing the user's chats.
     */
    getUserChats(userID) {
        return this.#fetchAdvanced(this.#getUserChatsURL(userID), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Token': `${this.#getCookie('token')}`
            }
        }).then((responseJSON) => {
            let chatBOs = ChatBO.fromJSON(responseJSON);
            return new Promise(function (resolve) {
                resolve(chatBOs)
            })
        })
    }

    /**
     * Adds a message to a chat.
     *
     * @param userID - The ID of the user sending the message.
     * @param messageBO - The MessageBO object representing the message.
     * @return {Promise<unknown>} - A Promise that resolves to a messageBO
     */
    addMessage(userID, messageBO) {
        return this.#fetchAdvanced(this.#addMessageURl(userID), {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
                'Token': `${this.#getCookie('token')}`
            },
            body: JSON.stringify(messageBO)
        }).then((responseJSON) => {
            let messageBO = MessageBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(messageBO)
            })
        })
    }

    /**
     * Retrieves the messages for a chat.
     *
     * @param chatID - The ID of the chat.
     * @return {Promise<unknown>} - A Promise that resolves to an Array of MessageBOs representing the chat's messages.
     */
    getChatMessages(chatID) {
        return this.#fetchAdvanced(this.#getChatMessagesURL(chatID), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Token': `${this.#getCookie('token')}`
            }
        })
            .then((responseJSON) => {
                let messageBOs = MessageBO.fromJSON(responseJSON);
                return new Promise(function (resolve) {
                    resolve(messageBOs)
                })
            })
    }

    /**
     * Retrieves the profile of a user.
     *
     * @param userID - The ID of the user.
     * @return {Promise<unknown>} A Promise that resolves to the ProfileBO object representing the user's profile.
     */
    getProfile(userID) {
        return this.#fetchAdvanced(this.#getProfileURL(userID), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Token': `${this.#getCookie('token')}`
            }
        })
            .then((responseJSON) => {
                let profileBOs = ProfileBO.fromJSON(responseJSON);
                return new Promise(function (resolve) {
                    resolve(profileBOs[0])
                })
            })
    }

    /**
     * Retrieves a search profile.
     *
     * @param searchprofileID - The ID of the search profile.
     * @return {Promise<unknown>} - A Promise that resolves to the ProfileBO object representing the search profile.
     */
    getSearchProfile(searchprofileID) {
        return this.#fetchAdvanced(this.#getSearchProfileURL(searchprofileID), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Token': `${this.#getCookie('token')}`
            }
        })
            .then((responseJSON) => {
                let ProfileBOs = ProfileBO.fromJSON(responseJSON);
                return new Promise(function (resolve) {
                    resolve(ProfileBOs[0])
                })
            })
    }

    /**
     * Retrieves the search profiles of a user.
     *
     * @param UserID - The ID of the user.
     * @return {Promise<unknown>} - A Promise that resolves to an Array of ProfileBO objects
     * representing the user's search profiles.
     */
    getSearchProfiles(UserID) {
        return this.#fetchAdvanced(this.#getSearchProfilesURL(UserID), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Token': `${this.#getCookie('token')}`
            }
        })
            .then((responseJSON) => {
                let SearchProfileBOs = ProfileBO.fromJSON(responseJSON);
                return new Promise(function (resolve) {
                    resolve(SearchProfileBOs)
                })
            })
    }

    /**
     * Adds a search profile for a user.
     *
     * @param UserID - The ID of the user.
     * @return {Promise<any>} - A Promise that resolves when the search profile is successfully added.
     */
    addSearchProfile(UserID) {
        return this.#fetchAdvanced(this.#addSearchProfileURL(UserID), {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
                'Token': `${this.#getCookie('token')}`
            },
        })
    }

    /**
     * Deletes a search profile.
     *
     * @param profileID - The ID of the search profile.
     * @return {Promise<unknown>} -  A Promise that resolves to the deleted ProfileBO object.
     */
    deleteSearchProfile(profileID) {
        return this.#fetchAdvanced(this.#deleteSearchProfileURL(profileID), {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
                'Token': `${this.#getCookie('token')}`
            }
        }).then((responseJSON) => {
            let ProfileBOs = ProfileBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(ProfileBOs);
            })
        })
    }

    /**
     * Retrieves information by profile ID.
     *
     * @param profileID - The ID of the profile.
     * @return {Promise<unknown>} - A Promise that resolves to an array of InformationBO objects.
     */
    getInformationsByProfile(profileID) {
        return this.#fetchAdvanced(this.#getInformationsByProfileURL(profileID), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Token': `${this.#getCookie('token')}`
            }
        })
            .then((responseJSON) => {
                let informationBOs = InformationBO.fromJSON(responseJSON);
                return new Promise(function (resolve) {
                    resolve(informationBOs)
                })
            }).catch(e => console.log(e))
    }

    /**
     * Adds a user to the viewed list.
     *
     * @param userID - The ID of the user.
     * @param userBO - The UserBO of the viewed user.
     * @return {Promise<unknown>} - A Promise that resolves to the updated UserBO object.
     */
    addUserToViewedlist(userID, userBO) {
        return this.#fetchAdvanced(this.#addUserToViewedlistURL(userID), {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
                'Token': `${this.#getCookie('token')}`
            },
            body: JSON.stringify(userBO)
        }).then((responseJSON) => {
            let userBO = UserBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(userBO)
            })
        })
    }

    /**
     * Retrieves the viewed list for a user.
     *
     * @param userID - The ID of the user.
     * @return {Promise<unknown>} - A Promise that resolves to an array of UserBO objects.
     */
    getViewedlist(userID) {
        return this.#fetchAdvanced(this.#getViewedlistURL(userID), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Token': `${this.#getCookie('token')}`
            }
        })
            .then((responseJSON) => {
                let userBOs = UserBO.fromJSON(responseJSON);
                return new Promise(function (resolve) {
                    resolve(userBOs)
                })
            })
    }

    /**
     * Retrieves a list of users sorted by similarity measure to a search profile.
     *
     * @param searchprofileID - The ID of the search profile.
     * @return {Promise<unknown>} -  A Promise that resolves to an array of UserBO objects.
     */
    getUsersSortedBySimilarityMeasure(searchprofileID) {
        return this.#fetchAdvanced(this.#getUsersSortedBySimilarityMeasureURL(searchprofileID), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Token': `${this.#getCookie('token')}`
            }
        })
            .then((responseJSON) => {
                let userBOs = UserBO.fromJSON(responseJSON);
                return new Promise(function (resolve) {
                    resolve(userBOs)
                })
            })
    }

    /**
     * Retrieves all selection values for a given property.
     *
     * @param propertyID - The ID of the property.
     * @return {Promise<unknown>} - A Promise that resolves to an array of InformationBO objects.
     */
    getAllSelectionValuesByPropertyID(propertyID) {
        return this.#fetchAdvanced(this.#getAlleValuesFromPropertyByPropertyIdURL(propertyID), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Token': `${this.#getCookie('token')}`
            }
        })
            .then((responseJSON) => {
                let informationBO = InformationBO.fromJSON(responseJSON);
                return new Promise(function (resolve) {
                    resolve(informationBO)
                })
            })
    }

    /**
     * Deletes a selection value item by its ID.
     *
     * @param valueId - The ID of the selection value item to delete.
     * @return {Promise<unknown>} - A Promise that resolves to the deleted UserBO object.
     */
    deleteSelectionValueItem(valueId) {
        return this.#fetchAdvanced(this.#deleteSelectionValueItemURL(valueId), {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
                'Token': `${this.#getCookie('token')}`
            },
        }).then((responseJSON) => {
            let userBOs = UserBO.fromJSON(responseJSON)[0];
            // console.info(userBOs);
            return new Promise(function (resolve) {
                resolve(userBOs);
            })
        })
    }

    /**
     * Adds a new selection value item for a property.
     *
     * @param userID - The ID of the user.
     * @param valueBo - The valueBO object representing the selection value item.
     * @return {Promise<unknown>} -  A Promise that resolves to the created InformationBO object.
     */
    addSelectionValueItem(userID, valueBo) {
        return this.#fetchAdvanced(this.#postNewValueForPropertyWithPropertyIdURL(userID), {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
                'Token': `${this.#getCookie('token')}`
            },
            body: JSON.stringify(valueBo)
        }).then((responseJSON) => {
            let informationBo = InformationBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(informationBo)
            })
        })
    }

    /**
     * Updates the value of an information object.
     *
     * @param infoId - The ID of the information object.
     * @param valueBo - The valueBO object representing the updated value.
     * @return {Promise<unknown>} -  A Promise that resolves to the updated InformationBO object.
     */
    updateValueOfInformationObject(infoId, valueBo) {
        return this.#fetchAdvanced(this.#updateValueOfInformationObjectByIdURL(infoId), {
            method: 'PUT',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
                'Token': `${this.#getCookie('token')}`
            },
            body: JSON.stringify(valueBo)
        }).then((responseJSON) => {
            let informationBo = InformationBO.fromJSON(responseJSON);
            return new Promise(function (resolve) {
                resolve(informationBo)
            })
        })
    }

    /**
     * Deletes an information object by its ID.
     *
     * @param informationId - The ID of the information object to delete.
     * @return {Promise<unknown>} - A Promise that resolves to the deleted InformationBO object.
     */
    deleteInformationById(informationId) {
        return this.#fetchAdvanced(this.#deleteInformationByIdURL(informationId), {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
                'Token': `${this.#getCookie('token')}`
            },
        }).then((responseJSON) => {
            let informationBo = InformationBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(informationBo);
            })
        })
    }

    /**
     * Deletes a select property from the system by its ID.
     *
     * @param propertyId - The ID of the select property to delete.
     * @return {Promise<unknown>} - A Promise that resolves to the deleted InformationBO object.
     */
    deleteSelectPropertyFromSystemById(propertyId) {
        return this.#fetchAdvanced(this.#deleteSelectPropertyInSystemByIdURL(propertyId), {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
                'Token': `${this.#getCookie('token')}`
            },
        }).then((responseJSON) => {
            let informationBo = InformationBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(informationBo);
            })
        })
    }

    /**
     * Adds a text property value by the property ID.
     *
     * @param propertyId - The ID of the text property.
     * @param valueBo - The ValueBo object containing the text property value.
     * @return {Promise<unknown>} - A Promise that resolves to the added ValueBo object.
     */
    addTextPropertyValueById(propertyId, valueBo) {
        return this.#fetchAdvanced(this.#addNewTextValueToTextPropertyURL(propertyId), {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
                'Token': `${this.#getCookie('token')}`
            },
            body: JSON.stringify(valueBo)
        }).then((responseJSON) => {
            let valueBo = ValueBo.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(valueBo)
            })
        })
    }

    /**
     * Deletes a text property from the system by its ID.
     *
     * @param propertyId - The ID of the text property to delete.
     * @return {Promise<unknown>} - A Promise that resolves to the deleted PropertyBO object.
     */
    deleteTextPropertyFromSystemById(propertyId) {
        return this.#fetchAdvanced(this.#deleteTextPropertyInSystemByIdURL(propertyId), {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
                'Token': `${this.#getCookie('token')}`
            },
        }).then((responseJSON) => {
            let propertyBo = PropertyBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(propertyBo);
            })
        })
    }

    /**
     * Adds a selection property to the system.
     *
     * @param propertyBO - The PropertyBO object representing the selection property to add.
     * @return {Promise<unknown>} - A Promise that resolves to the added PropertyBO object.
     */
    addSelectionProperty(propertyBO) {
        return this.#fetchAdvanced(this.#addSelectionPropertyURL(), {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
                'Token': `${this.#getCookie('token')}`
            },
            body: JSON.stringify(propertyBO)
        }).then((responseJSON) => {
            let propertyBO = PropertyBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(propertyBO)
            })
        })
    };

    /**
     * Retrieves all selection properties from the system.
     *
     * @return {Promise<unknown>} - A Promise that resolves to an array of PropertyBO objects
     * representing the selection properties.
     */
    getAllSelectionProperties() {
        return this.#fetchAdvanced(this.#getAllSelectionPropertiesURL(), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Token': `${this.#getCookie('token')}`
            }
        })
            .then((responseJSON) => {
                let PropertyBOs = PropertyBO.fromJSON(responseJSON);
                return new Promise(function (resolve) {
                    resolve(PropertyBOs)
                })
            })
    }

    /**
     * Adds a free text property to the system.
     *
     * @param propertyBO - The PropertyBO object representing the free text property to be added.
     * @return {Promise<unknown>} - A Promise that resolves to the added PropertyBO object.
     */
    addFreeTextProperty(propertyBO) {
        return this.#fetchAdvanced(this.#addFreeTextPropertyURL(), {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
                'Token': `${this.#getCookie('token')}`
            },
            body: JSON.stringify(propertyBO)
        }).then((responseJSON) => {
            let propertyBO = PropertyBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(propertyBO)
            })
        })
    };

    /**
     * Retrieves all free text properties from the system.
     *
     * @return {Promise<unknown>} - A Promise that resolves to an array of PropertyBO objects
     * representing the free text properties.
     */
    getAllFreeTextProperties() {
        return this.#fetchAdvanced(this.#getAllFreeTextPropertiesURL(), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Token': `${this.#getCookie('token')}`
            }
        })
            .then((responseJSON) => {
                let PropertyBOs = PropertyBO.fromJSON(responseJSON);
                return new Promise(function (resolve) {
                    resolve(PropertyBOs)
                })
            })
    };

    /**
     * Adds a new information object to a profile.
     *
     * @param valueId - The ID of the value associated with the information object.
     * @param valueBo - The information object to be added.
     * @return {Promise<unknown>} - A Promise that resolves to a ProfileBO object representing the updated profile.
     */
    addNewInformationObjectToProfile(valueId, valueBo) {
        return this.#fetchAdvanced(this.#addNewInformationToProfileURL(valueId), {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
                'Token': `${this.#getCookie('token')}`
            },
            body: JSON.stringify(valueBo)
        }).then((responseJSON) => {
            let ProfileBo = ProfileBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(ProfileBo)
            })
        })
    };

    /**
     * Updates a selection property.
     *
     * @param propertyId - The ID of the property to be updated.
     * @param propertyBo - The updated property object.
     * @return {Promise<unknown>} - A Promise that resolves to a PropertyBO object representing the updated property.
     */
    updateSelectionProperty(propertyId, propertyBo) {
        return this.#fetchAdvanced(this.#updateSelectionPropertyByIdURL(propertyId), {
            method: 'PUT',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
                'Token': `${this.#getCookie('token')}`
            },
            body: JSON.stringify(propertyBo)
        }).then((responseJSON) => {
            let propertyBo = PropertyBO.fromJSON(responseJSON);
            return new Promise(function (resolve) {
                resolve(propertyBo)
            })
        })
    };

    /**
     * Updates a text property.
     *
     * @param propertyId - The ID of the property to be updated.
     * @param propertyBo - The updated property object.
     * @return {Promise<unknown>} - A Promise that resolves to a PropertyBO object representing the updated property.
     */
    updateTextProperty(propertyId, propertyBo) {
        return this.#fetchAdvanced(this.#updateTextPropertyByIdURL(propertyId), {
            method: 'PUT',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
                'Token': `${this.#getCookie('token')}`
            },
            body: JSON.stringify(propertyBo)
        }).then((responseJSON) => {
            let propertyBo = PropertyBO.fromJSON(responseJSON);
            return new Promise(function (resolve) {
                resolve(propertyBo)
            })
        })
    };

    /**
     * Updates a selection value.
     *
     * @param valueId - The ID of the value to be updated.
     * @param valueBo - The updated value object.
     * @return {Promise<unknown>} - A Promise that resolves to a ValueBo object representing the updated value.
     */
    updateSelectionValue(valueId, valueBo) {
        return this.#fetchAdvanced(this.#updateSelectionValueByIdURL(valueId), {
            method: 'PUT',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
                'Token': `${this.#getCookie('token')}`
            },
            body: JSON.stringify(valueBo)
        }).then((responseJSON) => {
            let valueBo = ValueBo.fromJSON(responseJSON);
            return new Promise(function (resolve) {
                resolve(valueBo)
            })
        })
    };

    /**
     * Updates a text value.
     *
     * @param valueId - The ID of the value to be updated.
     * @param valueBo - The updated value object.
     * @return {Promise<unknown>} - A Promise that resolves to a ValueBo object representing the updated value.
     */
    updateTextValue(valueId, valueBo) {
        return this.#fetchAdvanced(this.#updateTextValueByIdURL(valueId), {
            method: 'PUT',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
                'Token': `${this.#getCookie('token')}`
            },
            body: JSON.stringify(valueBo)
        }).then((responseJSON) => {
            let valueBo = ValueBo.fromJSON(responseJSON);
            return new Promise(function (resolve) {
                resolve(valueBo)
            })
        })
    };
}