'use strict';

angular.module('caManager.caView').component("certList", {
    bindings: {
        certificates: '<',
        onCertificateSelected: '&'
    },
    templateUrl: 'ca-view/ca-view-cert-list/ca-view-cert-list.html',
    controller: 'CaViewCertList'
});
