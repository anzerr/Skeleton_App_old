"use strict";

var connection = function(config) {
	var c = {
		dev: {
			server: {
				default: 'localhost:27017',
				shared: 'localhost:27017',
				local: 'localhost:27017'
			},
			db: {
				default: 'default',
				shared: 'shared',
				local: 'local'
			}
		}
	};

	return ({
		server: function(name) {
			var uri = c[config.env] || c.dev;
			return ($.is.default(uri.server[name], uri.server.default));
		},

		db: function(name) {
			var uri = c[config.env] || c.dev;
			return ($.is.default(uri.db[name], uri.db.default));
		}
	});
};

module.exports = function(config) {
    var uri = connection(config);

	return ({
		collection: {},
		connection: {
			default: 'mongodb://' + uri.server('default') + '/' + uri.db('default') + '?authSource=admin',
            shared: 'mongodb://' + uri.server('shared') + '/' + uri.db('shared') + '?authSource=admin',
			local: 'mongodb://' + uri.server('local') + '/' + uri.db('local') + '?authSource=admin'
		},
		config: {}
	});
};