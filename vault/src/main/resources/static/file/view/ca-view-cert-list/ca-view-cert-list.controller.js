'use strict';

angular.module('caManager.caView').controller('CaViewCertList', CaViewCertList);

function CaViewCertList() {
    var vm = this;
    vm.loadCert = loadCert;

    function loadCert(index) {
        vm.onCertificateSelected({certIndex: index});
    }
}