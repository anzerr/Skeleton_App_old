"use strict";

$.require([
    'bootstrap!/part/cdn.js',
    'bootstrap!/part/exit.js',
	'bootstrap!/part/health.js',
	'bootstrap!/part/info.js',
	'bootstrap!/part/response.js'
], function(
	cdn,
    exit,
	health,
	info,
	response
) {

	module.exports = {
		cdn: cdn,
        exit: exit,
		health: health,
		info: info,
		response: response
	}
});