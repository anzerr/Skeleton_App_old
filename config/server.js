"use strict";

module.exports = function(config) {
	return ({
		http: {
            ssl: false,
            optionCheck: false,
            ip: '0.0.0.0',
            port: config.port,
            sslPort: config.port + 363, // 443 with port 80

            // where to dump file uploads
            tmpPath: 'cache!/tmp/',

            maxSize: {
                json: $.size.megabyte(64).get,
                form: $.size.megabyte(1).get
            },

            partition: {
                api: [
                    {
                        origin: ['localhost', '127.0.0.1', '0.0.0.0'], // '0.0.0.0' free all origin
                        pathReg: '^\/'
                    }, {
                        origin: ['api.localhost'],
                        pathReg: null
                    }
                ],
                cdn: [
                    {
                        origin: ['localhost', '127.0.0.1', '0.0.0.0'],  // '0.0.0.0' free all origin
                        pathReg: '^\/',
                        localPath: ''
                    }, {
                        origin: ['cdn.localhost'],
                        pathReg: null,
                        localPath: ''
                    }
                ]
            },

            /**
             * openssl req -newkey rsa:4096 -new -nodes -keyout key.pem -out csr.pem
             * openssl x509 -req -days 365 -in csr.pem -signkey key.pem -out server.crt
             */
            key: '',
            cert: '',
            ca: null,
            ciphers: []
		},
		socket: {
            masterKey: ''
		},
		ws: {
            port: config.port + 100
		}
	});
};