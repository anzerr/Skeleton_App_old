"use strict";

$.require([
    //
], function(
    //
) {

    module.exports = function(http) {
        var config = $.config.get('cdn'), util = {
            path: function(url) {
                var p = config.path + (url || 'index.html');
                return (p);
            }
        };

        http.cdn(function(req, res) {
            console.log('cdn', req.origin(), req.url());
            this.loadFile(util.path(req.url())).then(function(file) {
                file.stream().then(function(stream) {var e = file.encode();
                    if (e) {
                        res.set('content-encoding', e);
                    }
                    res.status(200).set('Content-Type', file.context()).set('Content-Length', file.size()).pipe(stream);
                });
            }, function(err) {
                console.log('error with file', err);
                res.status(404).json({error: 404, msg: 'file not found.'});
            });
        });
    };
});