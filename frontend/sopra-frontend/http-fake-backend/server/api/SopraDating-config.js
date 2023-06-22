'use strict';

const SetupEndpoint = require('./setup/');

const prefix = "/sopra-dating"

module.exports = SetupEndpoint({
    name: 'v1',
    urls: [{
        params: `/user/{email}`,
        requests: [
            { response: '/response-files/sopra-dating/user.json' }
        ]
    }, {
        params: '/blocklist/{id}',
        requests: [{
                method: 'GET',
                response: '/response-files/sopra-dating/userList.json'
        },
            {
                method: 'DELETE',
                response: '/response-files/sopra-dating/deleteMichi.json'
            }
        ]
    }, {
        params: '/blocklist',
        requests: [{
            method: 'POST',
            response: '/response-files/sopra-dating/userList.json'
        }]
    }, {
        params: '/bookmarklist/{id}',
        requests: [{
            method: 'GET',
            response: '/response-files/sopra-dating/userList.json'
        }, {
            method: 'DELETE',
            response: '/response-files/sopra-dating/userList.json'
        }]
    }, {
        params: '/message/{id}',
        requests: [{
            method: 'GET',
            response: '/response-files/sopra-dating/messageList.json'
        }]
    },{
        params: '/conversationoverview/{id}',
        requests: [{
            method: 'GET',
            response: '/response-files/sopra-dating/chatUserList.json'
        }]
    }, {
        params: '/userList/{id}',
        requests: [{
            method: 'GET',
            response: '/response-files/sopra-dating/userLIst.json'
        }]
    }, {
        params: '/information/{propertyID}',
        requests: [{
            method: 'GET',
            response: '/response-files/sopra-dating/Information.json'
        }]
    }]
});

