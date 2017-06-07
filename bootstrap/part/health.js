"use strict";

$.require([
    'base!controller/response.js'
], function(
    responseWrapper
) {

    module.exports = function(m, http) {
        http.match('^/health/*$', function (req, res) {
            m.query().route('/worker/health').method('GET').run({body: {raw: 1}}).then(function (response) {
                if ($.is.instance(response, responseWrapper)) {
                    var meta = response.meta();
                    res.status(meta.status).set(meta.header)[meta.type](meta.data);
                } else {
                    res.status(response.status || 200).json(response);
                }
            }, function() {
                res.status(404).json({error: 404, message: 'failed to find route'});
            });
        });
    };
});