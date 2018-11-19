'use strict';

angular.module('caManager.caView').component("certData", {
    bindings: {
        certificates: '<',
        selected: '<'
    },
    templateUrl: 'ca-view/ca-view-cert-data/ca-view-cert-data.html',
    controller: 'CaViewCertData'
});
