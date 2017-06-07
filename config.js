"use strict";

// basic config file
module.exports = function(config) {
    config.path = {
		'root': appRoot.engine,
		'config': appRoot.project + '/config.js',
		'engine': appRoot.engine + '/engine',
		'base': appRoot.engine + '/engine/base',
		'npm': appRoot.engine + '/engine/node_modules',
		'node': '',
		'core': appRoot.engine + '/engine/core',
		'lib': appRoot.engine + '/engine/core/lib',
		'docker': appRoot.engine + '/engine/core/docker',
		'public': appRoot.project + '/public',
		'hyperion': appRoot.engine + '/engine/core/docker/hyperion',
		'bootstrap': appRoot.project + '/bootstrap',
		'app': appRoot.project + '',
		'resources': appRoot.project + '/resources',
		'keys': appRoot.project + '/resources/keys',
		'assets': appRoot.project + '/resources/assets',
		'cache': appRoot.project + '/resources/cache',
		'log': config.LOG_PATH || (appRoot.project + '/resources/logs')
	};

	var fs = require('fs');
	try {
		config.session = fs.readFileSync(config.path.cache + '/.machineSession').toString();
	} catch(e) {
		// don't care, it gets created later if it doesn't exist
	}

    var pJson = require(config.path.engine + '/package.json');

    $.schema.merge(config, {
        env: $.is.default(config.env, 'dev'),
        machineName: $.is.default(config.machineName, 'worker'),
        prefix: $.is.default(config.prefix, 'sig'),
		port: Number($.is.default(config.port, 80)),
		upstartWrap: $.is.default(config.upstartWrap, true),
		skipPrivate: $.is.default(config.skipPrivate, false),


        entry: $.is.default(config.entry, '127.0.0.1:80'),
		name: $.is.default(config.name, 'none'),
		appProfile: $.is.default(config.appProfile, 'worker'),
		logEnable: $.is.object(config.logEnable) ? config.logEnable : {},

		// docker
		dockerProfile: $.is.default(config.dockerProfile, 'worker'),
		isLocal: $.is.default(config.isLocal, false),

        app: {
            version: pJson.version, // interaction . release . hotfix
            author: pJson.author.toLowerCase(),
            name: pJson.name.toLowerCase(),
            startup: new Date().getTime()
        }
    });

	// base config
	var base = {
		configSeed: $.schema.copy(config),
		path: config.path,
		app: config.app,
		env: {
			stdout: config.stdoutLogger || null,
			lang: 'FR',
			cert: 'client_' + (config.clientCert || 'default'),
            node: {
				version: process.version
            },
			entry: config.entry,
			bootstrap: config.path.bootstrap + '/',
			upstart: config.upstartWrap,
			profile: config.appProfile,
            type: config.env,
            env: config.env,
            session: config.session,
            machine: config.machineName,
			name: config.name,
			worker: config.workerID || 'master',
			local: config.isLocal
		},
		crypto: {
			type: 'sha1', // what algo to use CHANGE TO SOMETHING BETTER :)
            salt: '56sd4v14sd654-sha1', // app salt CHANGE ME PLEASE
            sub: 8 // hash the hash how many times
		},
		log: {
			saveType: 'file',
            path: config.path.log
		},
		require: {
			path: config.path
		},
		uniqueKey: {
			time: 1459433440765, // To regenerate "new Date() - 0" if you update this bump up the version
			version: 1
		}
	};

    // load sub config
    var loadConfig  = {
		server: config.path.app + '/config/server.js',
        cdn: config.path.app + '/config/cdn.js',
		console: config.path.app + '/config/console.js',
		module: config.path.app + '/config/module.js',
		package: config.path.app + '/config/package.js'
    };
	for (var i in loadConfig) {
		base[i] = require(loadConfig[i])(config);
	}

	return (base);
};