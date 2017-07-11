"use strict";

module.exports = function(config) {
    var tmp = {
        hyperion: 'public!/',
        hub: 'public!/'
    };

	return ({
        path: config.cdnDirecotry || tmp[config.appProfile] || 'public!'
	});
};