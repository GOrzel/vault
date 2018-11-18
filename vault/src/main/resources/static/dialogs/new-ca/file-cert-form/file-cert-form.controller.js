'use strict';

angular.module('vault.newFile.fileForm').controller('NewFileFormController', NewFileFormController);

function NewFileFormController() {
    var vm = this;

    vm.name = '';
    vm.certFile = '';
    vm.onSubmit = onSubmitButtonClicked;
    vm.onReset = onResetButtonClicked;

    function onSubmitButtonClicked(form) {
        if(form.$valid) {
            getBase64(vm.certFile);
            console.log(form);
            console.log(vm.certFile);
           vm.onFormSubmitted({file: getBase64(vm.certFile), name: vm.certFile.name});
        }
    }

    function getBase64(file) {
        var reader = new FileReader();
        reader.readAsArrayBuffer(file)
        reader.onload = function () {
            console.log(reader.result);
            return reader.result;
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }

    function onResetButtonClicked(form) {
        if (form) {
            form.$setPristine();
            form.$setUntouched();
        }

        vm.name = '';
        vm.certFile = '';
    }

}