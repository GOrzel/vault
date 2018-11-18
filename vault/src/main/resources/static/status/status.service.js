'use strict';

angular.module('vault.status').factory('statusService', StatusServiceFactory);

function StatusServiceFactory() {
    var statusService = {};

    statusService.showStatusCallback = function() {};

    // type: 'success', 'warning', 'error'
    statusService.showStatusAlert = function(text, description, type) {
        this.showStatusCallback(text, description, type);
        window.scrollTo(0, 0);
    };

    return statusService;
}