"use strict";

$.require([
    //
], function(
    //
) {

    module.exports = function(moduleScope) {
        moduleScope.createScope('hyperion').import(['hyperion', 'watcher', 'fileSync', 'mongo', 'module', 'mongoDocker']);
        moduleScope.createScope('basic').import(['exit']);
        moduleScope.createScope('auth').import(['mongo']);
        moduleScope.createScope('hotel').import(['mongo']);
        moduleScope.createScope('worker').import(['mongo']);
        moduleScope.createScope('hub').import(['mongo']);
    };
});