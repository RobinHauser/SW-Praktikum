'use strict';

const SetupEndpoint = require('./setup');

const prefix = "/sopra-dating"

module.exports = SetupEndpoint({
    name: 'sopra-dating',
    urls: [{
        params: '/user',
        requests: [
            { response: '/response-files/sopra-dating/user.json' }
        ]
    }]
});

