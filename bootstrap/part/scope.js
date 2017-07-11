"use strict";

$.require([
    //
], function(
    //
) {

    module.exports = function(moduleScope) {
        moduleScope.createScope('worker').import(['mongo']);
    };
});