"use strict";

module.exports = function(config) {
	var out = [], load = {
		worker: ['generic', 'worker']
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
					repo: 'https://github.com/anzerr/Module_Generic.git',
					commit: 'f94b686d2dc8779f365a8d35fed05e397ec071f8'
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