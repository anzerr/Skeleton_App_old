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
                        pathReg: '^\/api'
                    }, {
                        origin: ['api.localhost'],
                        pathReg: null
                    }
                ],
                cdn: [
                    {
                        origin: ['localhost', '127.0.0.1', '0.0.0.0'],  // '0.0.0.0' free all origin
                        pathReg: '^\/cdn',
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
            ciphers: [
                'ECDHE-RSA-AES128-GCM-SHA256',
                'ECDHE-ECDSA-AES128-GCM-SHA256',
                'ECDHE-RSA-AES256-GCM-SHA384',
                'ECDHE-ECDSA-AES256-GCM-SHA384',
                'DHE-RSA-AES128-GCM-SHA256',
                'DHE-DSS-AES128-GCM-SHA256',
                'kEDH+AESGCM',
                'ECDHE-RSA-AES128-SHA256',
                'ECDHE-ECDSA-AES128-SHA256',
                'ECDHE-RSA-AES128-SHA',
                'ECDHE-ECDSA-AES128-SHA',
                'ECDHE-RSA-AES256-SHA384',
                'ECDHE-ECDSA-AES256-SHA384',
                'ECDHE-RSA-AES256-SHA',
                'ECDHE-ECDSA-AES256-SHA',
                'DHE-RSA-AES128-SHA256',
                'DHE-RSA-AES128-SHA',
                'DHE-DSS-AES128-SHA256',
                'DHE-RSA-AES256-SHA256',
                'DHE-DSS-AES256-SHA',
                'DHE-RSA-AES256-SHA',
                '!aNULL',
                '!eNULL',
                '!EXPORT',
                '!DES',
                '!RC4',
                '!3DES',
                '!MD5',
                '!PSK'
            ]
		},
		socket: {
            masterKey: ''
		},
		webSocket: {
			// config
		}
	});
};