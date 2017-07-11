"use strict";

module.exports = function(config) {
	var out = [], load = {
		worker: ['generic']
	};

	load = ($.defined(config.moduleLoadOverload))? config.moduleLoadOverload : load[config.moduleProfile || config.appProfile];
	for (var i in load) {
		if (load[i]) {
			out.push(load[i]);
		}
	}

	return ({
		repository: {
			server: {
				url: '' // tmp
			},
			modules: [
				{
					name: 'generic',
					repo: 'https://github.com/anzerr/sig_m_generic.git',
					commit: 'ac62ca8f3681d821ff5df63324fc69bbd56a8a6e'
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