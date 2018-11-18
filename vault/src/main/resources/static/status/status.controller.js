'use strict';

angular.module('vault.status').controller('StatusController', StatusController);

StatusController.$inject = ['statusService', '$timeout'];
function StatusController(statusService, $timeout) {
    var vm = this;
    vm.text = '';
    vm.description = '';
    vm.type = '';
    vm.visible = false;
    vm.timeout = null;

    vm.onCloseButtonClicked = closeAlert;
    vm.showAlert = showAlert;

    statusService.showStatusCallback = vm.showAlert;

    function closeAlert() {
        vm.visible = false;
    }
    
    function showAlert(text, description, type) {
        vm.text = text;
        vm.description = description;
        vm.type = type;
        vm.visible = true;

        if (vm.timeout != null) {
            $timeout.cancel(vm.timeout);
            vm.timeout = null;
        }

        vm.timeout = $timeout(function () {
            vm.visible = false;
            vm.timeout = null;
        }.bind(vm), 5000);
    }
}