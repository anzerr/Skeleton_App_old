"use strict";

$.require([
	'core!/module.js',
    'core!/exit.js',
	'core!/server.js',
	'core!/serviceManager.js',

	'bootstrap!/part/part.js'
], function(
	module,
    exit,
	server,
	serviceManager,
	part
) {

	var e = new exit(), _s = {};
	part.exit(e, _s);
    part.info();
    var s = new server(), m = new module();

    var service = new serviceManager();
    _s.http = s.http({});

    var moduleScope = service.createScope('module').add({
        http: _s.http,
		exit: e,
        module: m
    });

    // create the sub scope for every module
    moduleScope.createScope('basic').import(['exit']);

	console.log('loading modules');
	m.loadPlugin(service.scope('module')).load($.config.get('module.load')).then(function() {
		console.log('loaded modules');
        var http = _s.http.api(function(req, res) {
			res.set({
				"Access-Control-Allow-Origin": req.headers().origin || "*",
				"Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
				"Access-Control-Allow-Headers": "Cache-Control, Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, Range, md5, Content-Range",
				"Access-Control-Expose-Headers": "Cache-Control, Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, Range, md5, Content-Range"
			});
			part.response(m, req, res);
        });
		part.cdn(http);
		part.health(m, http);
    });
});