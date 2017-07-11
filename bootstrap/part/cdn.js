"use strict";

$.require([
    'bootstrap!/part/file.js'
], function(
    file
) {

    module.exports = function(m, http) {
        var config = $.config.get('cdn'), util = {
            path: function(url) {
                var p = config.path + (url || 'index.html');
                return (p);
            }
        };

        http.cdn(function(req, res) {
            console.log('cdn', req.origin(), req.url(), m.cdn('/' + req.url()));
            if (m.cdn('/' + req.url())) {
                file(this, m.cdn('/' + req.url()), res);
            } else {
                file(this, util.path(req.url()), res);
            }
        });
    };
});