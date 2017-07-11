"use strict";

$.require([
    'bootstrap!/part/cdn.js',
    'bootstrap!/part/exit.js',
	'bootstrap!/part/health.js',
	'bootstrap!/part/info.js',
	'bootstrap!/part/response.js',
	'bootstrap!/part/mongo.js',
	'bootstrap!/part/cert.js',
	'bootstrap!/part/scope.js'
], function(
	cdn,
    exit,
	health,
	info,
	response,
	mongo,
	cert,
	scope
) {

	module.exports = {
		cdn: cdn,
        exit: exit,
		health: health,
		info: info,
		response: response,
		mongo: mongo,
		cert: cert,
		scope: scope
	}
});