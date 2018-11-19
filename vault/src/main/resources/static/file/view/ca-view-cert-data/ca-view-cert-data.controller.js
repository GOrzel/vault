'use strict';

angular.module('caManager.caView').controller('CaViewCertData', CaViewCertData);

CaViewCertData.$inject = ['caDialog', 'caService', 'statusService', '$routeParams'];
function CaViewCertData(caDialog, caService, statusService, $routeParams) {
    var vm = this;
    vm.caId = $routeParams.id;
    vm.onDeleteButtonClicked = deleteCertificate;

    function getCertDescription(cert) {
        var result = '<br>';

        var tmp = cert.subject.split(',');
        tmp.forEach(function (value) {
            result += value + "<br>";
        });

        return result;
    }

    function deleteCertificate() {
        var title = 'Czy na pewno chcesz usunać certyfikat urzędu?';
        var desc = getCertDescription(vm.certificates[vm.selected]);
        var content = 'Jeżeli urząd ma tylko jeden certyfikat, zostanie całkowicie skasowany.';

        caDialog.showConfirm('', title, desc + "<br>" + content).then(function () {
            caService.deleteCACertificate(vm.caId, vm.certificates[vm.selected].id).then(function (response) {
                if (vm.certificates.length == 1) {
                    statusService.showStatusAlert('Usunięto urząd.', '', 'success');
                } else {
                    statusService.showStatusAlert('Usunięto certyfikat urzędu.', '', 'success');
                }
                window.location = ('#/ca');
            }, function (error) {
                var desc = (error.data != null && error.data.message != null) ? error.data.message : '';
                statusService.showStatusAlert('Błąd podczas usuwania certyfikatu.', desc, 'error');
                console.log(error);
            })
        });
    }
}