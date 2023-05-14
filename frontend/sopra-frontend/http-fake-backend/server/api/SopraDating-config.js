'use strict';

const SetupEndpoint = require('./setup/');

const prefix = "/sopra-dating"

module.exports = SetupEndpoint({
    name: 'v1',
    urls: [{
        params: '/user',
        requests: [
            { response: '/response-files/sopra-dating/user.json' }
        ]
    }, {
        params: '/blocklist/{id?}',
        requests: [
            { response: '/response-files/sopra-dating/blocklist.json' }
        ]
    }]
});

