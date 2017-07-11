"use strict";

module.exports = function(config) {
    return ({
        letsencrypt: {
            type: config.leType || 'sub',
            key: config.leKey || 'main_gateway',
            env: config.leEnv || 'stage',
            debug: config.leDebug || true
        },
        remote: {
            token: 'token',
            host: 'localhost',
            port: 4430
        }
    });
};