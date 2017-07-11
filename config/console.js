"use strict";


module.exports = function(config) {
	var logger = {};

	var log = function(key, def) {
		return $.defined(config.logEnable[key]) ? config.logEnable[key] : def
	}, create = function(key, obj) {
		logger[key] = {
			level: obj.level || 2,
			log: log('fatal', $.defined(obj.log) ? obj.log : false),
			tag: obj.tag || [key],
			display: $.defined(obj.display) ? obj.display : true,
			color: obj.color || 'white'
		};
		return (logger[key]);
	};

	create('fatal', {color: 'red', log: true, level: 1});
	create('error', {color: 'red', log: true, level: 1});
	create('warn', {color: 'yellow', log: true});
	create('log', {});
	create('info', {color: 'blue'});
	create('docker', {color: 'blue'});
	create('debug', {color: 'cyan', display: config.debug, log: false, level: 3});

	return ({
		save: {
            rate: $.time.second(5).get,//$.time.minute(5).get,
            maxStackLog: 200,
            maxInMemory: 50,
			type: ['stream'/*, 'mongo'*/],
			config: {
				stream: {
					path: config.path.log
				},
				mongo: {
                    connect: 'default',
                    collection: 'log'
				}
			}
		},
		logger: logger
	});
};