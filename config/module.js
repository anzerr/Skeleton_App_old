"use strict";

module.exports = function(config) {
	var load = {
		worker: ['base']
	};

	load = ($.defined(config.moduleLoadOverload))? config.moduleLoadOverload : load[config.moduleProfile || config.appProfile];

	return ({
		repository: {
			server: {
				url: 'https://repo.domain.com' // tmp
			},
			modules: [
				{
					name: 'generic',
					repo: 'https://github.com/anzerr/sig_m_generic.git',
					commit: '6a727d907c4f780c7e3ae16036c54fbe471ebf87'
				}
			]
		},
		skipPrivate: config.skipPrivate || false,
		path: {
			module: config.path.app + '/module',
			remote: config.path.cache + '/module'
		},
		load: load
	});
};