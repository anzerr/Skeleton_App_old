"use strict";

module.exports = function(config) {
    return ({
        command: config.hyperion,
        cleanup: config.cleanup || true,
        build: {
            login: 'login' // login to use
        },
		env: {
            cache: config.cache || true,
			path: config.path.resources + '/dockerEnv',
            time: $.time.hour(12).get
		},
        registry: {
            isLocal: config.isLocal,

            address: 'localhost:5000', // address to remote private registry
            user: 'login',
            password: 'password'
        },
        cert: { // location -> address to auth
            'resources!/cert/registry/domain.crt': 'localhost:5000'
        },
		watcher: {
            version: '1.0.1',
            hub: 'localhost:80',
            token: 'random_key', // token used to add to hub
            rate: {
                map: $.time.minute(5).get,
                ping: $.time.second(2).get
            },
			envKey: 'hyperionConfig',
            keyType: 'file', // mongo

            loadBackend: config.hyperion.hub || false,

            autoSync: true,

			profile: config.dockerProfile,
            key: config.session,

            file: {
                rate: $.time.second(5).get,
                sync: true,
                directory: 'resources!/dump'
            }
		}
	});
};