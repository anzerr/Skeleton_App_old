"use strict";

$.require([
    //
], function(
    //
) {

    module.exports = function(e, serviceStore) {
        e.final(function(code) {
            var map = [], next = function(i) {
                if (!$.defined(map[i])) {
                    return ($.promise().resolve());
                }

                if (!$.is.function(serviceStore[map[i]].shutdown)) {
                    return (next(i + 1));
                }
                console.log($.color.green(map[i], 'closing'));
                return (serviceStore[map[i]].shutdown(code).then(function() {
                    return (next(i + 1));
                }, function() {
                    return (next(i + 1));
                }));
            };
            for (var i in serviceStore) {
                map.push(i);
            }
            return (next(0));
        });
    };
});