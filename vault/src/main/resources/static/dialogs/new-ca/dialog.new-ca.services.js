'use strict';

angular.module('vault.newFile', [
    'ngMaterial',
    'ngMessages',
    'vault.newFile.fileForm',
    'vault.fileService'
]);

angular.module('vault.newFile').factory('newFileDialog', NewFileDialogFactory);

NewFileDialogFactory.$inject = ['$mdDialog','fileDialog', 'fileService'];
function NewFileDialogFactory($mdDialog, fileDialog, fileService) {
    var service = {};
    service.showNewFileDialog = showNewFileDialog;

    function showNewFileDialog(ev) {
       return $mdDialog.show({
            controller: NewFileController,
            controllerAs: 'dialog',
            templateUrl: 'dialogs/new-ca/dialog.new-ca.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true
        })
            .then(function (response) {
                fileDialog.showNewFileAlert(response.data);
            }, function (error) {
                var desc = '';
                if (error.status === 409)
                    desc = "Urząd o id " + error.data.message + " już posiada certyfikat z tym samym identyfikatorem klucza podmiotu.";
                else
                    desc = (error.data != null && error.data.message != null) ? error.data.message : '';

                fileDialog.showNewFileErrorAlert("Nie udało się dodać urzędu", desc);
            });
    }

    function NewFileController($mdDialog, fileService) {
        var vm = this;

        vm.onCertFileFormSubmitted = function(cert, crlUrl) {
            $mdDialog.hide(fileService.addFile(cert, crlUrl));
        };

        vm.hide = function () {
            $mdDialog.hide();
        };

        vm.cancel = function () {
            $mdDialog.cancel();
        };
    }

    return service;
}