/**
 * Abstracts the REST interface of the Python backend with convenient access methods.
 * The class is implemented as a singleton.
 *
 * @author [Michael Bergdolt] (https://github.com/MichaelBergdolt)
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
        document.cookie.split(';').forEach(function(el) {
         let [key,value] = el.split('=');
            cookie[key.trim()] = value;
        })
        return cookie[cookieName];
        }

    // User related
    #getAllUsersURL = () => {
        return `${this.#SopraDatingServerBaseURL}/user/1000`
    }

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

    // Main Page related
    #getUserListBySearchprofileURL = (searchProfileID) => {
        return `http://localhost:8081/api/v1/userList/${searchProfileID}`; //Todo set Base URL Back to variable
    };

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
        return `${this.#SopraDatingServerBaseURL}/chat/${userID}`; //TODO change ID
    }
    #removeChatURL = (chatID) => `${this.#SopraDatingServerBaseURL}/conversationoverview?id=${chatID}`;

    // Message related
    #addMessageURl = (userID) => `${this.#SopraDatingServerBaseURL}/message/${userID}`;
    #getChatMessagesURL = (chatID) => `${this.#SopraDatingServerBaseURL}/message/${chatID}`; //TODO change ID

    // Profile related
    #getProfileURL = (userID) => `${this.#SopraDatingServerBaseURL}/personal-profile/by_user/${userID}`;
    #updateProfileURL = (userID) => `${this.#SopraDatingServerBaseURL}/profile?id=${userID}`;
    #getAllProfilesURL = () => `${this.#SopraDatingServerBaseURL}/personal-profile/personal_profiles`

    // Information related
    #getSelectionInformationURL = (propertyID) => `${this.#SopraDatingServerBaseURL}/Information/${propertyID}`

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
    #updateSearchProfileURL = (searchprofileID) => {
        return `${this.#SopraDatingServerBaseURL}/searchprofile?id=${searchprofileID}`;
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

    getAllUsers() {
        return this.#fetchAdvanced(this.#getAllUsersURL(), {
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

    getUserListBySearchprofile(searchProfileID = 1) {
        return this.#fetchAdvanced(this.#getUserListBySearchprofileURL(searchProfileID))
            .then((responseJSON) => {
                let userBOs = UserBO.fromJSON(responseJSON);
                // console.log(blocklistBOs)
                return new Promise(function (resolve) {
                    resolve(userBOs)
                })
            })
    }

    addUserToBookmarklist(userID, userBO) {
        // console.log(JSON.stringify(userBO))
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
                // console.log(blocklistBOs)
                return new Promise(function (resolve) {
                    resolve(userBOs)
                })
            })
    }

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

    getUserChats(userID) {
        return this.#fetchAdvanced(this.#getUserChatsURL(userID), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Token': `${this.#getCookie('token')}`
            }
        }).then((responseJSON) => {
            let chatBOs = ChatBO.fromJSON(responseJSON);
            console.log("chatBOS:", chatBOs)
            return new Promise(function (resolve) {
                resolve(chatBOs)
            })
        })
    }

    removeChat(chatID) {
        return this.#fetchAdvanced(this.#removeChatURL(chatID), {
            method: 'DELETE'
        })
    }

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
            let userBO = UserBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(userBO)
            })
        })
    }

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

    getAllProfiles() {
        return this.#fetchAdvanced(this.#getAllProfilesURL())
            .then((responseJSON) => {
                let profileBOs = ProfileBO.fromJSON(responseJSON);
                return new Promise(function (resolve) {
                    resolve(profileBOs)
                })
            })
    }

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

    getSearchProfiles(UserID) {
        return this.#fetchAdvanced(this.#getSearchProfilesURL(UserID), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Token': `${this.#getCookie('token')}`
            }
        })
            .then((responseJSON) => {
                // console.log(responseJSON)
                let SearchProfileBOs = ProfileBO.fromJSON(responseJSON);
                return new Promise(function (resolve) {
                    resolve(SearchProfileBOs)
                })
            })
    }

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

    deleteTextPropertyFromSystemById(propertyId) {
        return this.#fetchAdvanced(this.#deleteTextPropertyInSystemByIdURL(propertyId), {
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

    addSelectionProperty(propertyBO) {
        console.log(propertyBO)
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

    addFreeTextProperty(propertyBO) {
        console.log(propertyBO)
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

    addNewInformationObjectToProile(valueId, valueBo) {
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
    }
}