'use strict';

angular.module('caManager.caView').filter('certStatus', certStatus);

function certStatus() {
    return function(status) {
        return status ? 'Tak' : 'Nie';
    };
}