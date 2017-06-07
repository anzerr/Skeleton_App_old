"use strict";

$.require([
    'base!controller/file.js',
    'base!controller/response.js'
], function(
    fileWrapper,
    responseWrapper
) {

    module.exports = function(m, req, res) {
        console.log(req.origin(), req.url(), req.method(), req.data(), (req.remote() || {}).ip);
        if (req.method().toLowerCase() == 'options') {
            if (!$.config.get('server.http.optionCheck')) {
                return (res.status(200).json({}));
            }

            var data = {}, found = 0, list = ['get', 'post', 'delete', 'put'], wait = [];
            for (var i in list) {
                wait.push((function(i) {
                    return (m.query().origin(req.origin()).route(req.url()).method(list[i]).info(true).run().then(function(res) {
                        data[list[i]] = res;
                        found += 1;
                        return (true);
                    }, function() {
                       return (true);
                    }));
                })(i));
            }

            return ($.all(wait).then(function() {
                if (found == 0) {
                    res.status(404).json({});
                } else {
                    res.status(200).json(($.config.get('env.env') == 'dev')? data : {});
                }
            }));
        }
        m.query().origin(req.origin()).route(req.url()).method(req.method()).run({remote: req.remote(), raw: req.rawData(), body: req.data(), headers: req.headers(), url: req._custom.url}).then(function(response) {
            if ($.is.instance(response, fileWrapper)) {
                response.loadFile(res);
            } else {
                if ($.is.instance(response, responseWrapper)) {
                    var meta = response.meta();
                    res.status(meta.status).set(meta.header)[meta.type](meta.data);
                } else {
                    console.log('response is deprecated for', req.url(), req.method(), 'on api http');
                    res.status(response.status || 200).json(response);
                }
            }
        }, function(err) {
            console.log(err);
            var e = (!$.is.instance(err, Error) && err.toString() != 'Error: no routes matched.');
            if (e) {
                //$.console.warn(err);
            }
            res.status(err.status || 404).json((e) ? err : {status: 404, message: 'no route matched.'});
        });
    };
});