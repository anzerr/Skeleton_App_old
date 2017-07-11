"use strict";

$.require([
    //
], function(
    //
) {

    module.exports = function(cert) {
        var p = new $.promise(), timeout = setTimeout(function () {
            $.console.warn('failed to get key from cert server.');
            p.resolve();
        }, $.time.second(30).get);

        cert.public('localhost').then(function() {
            if (timeout) {
                clearTimeout(timeout);
            }
            p.resolve();
        });

        return (p);
    };
});