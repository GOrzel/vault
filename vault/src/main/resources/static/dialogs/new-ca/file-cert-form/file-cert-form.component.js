'use strict';

angular.module('vault.newFile.fileForm').component('fileForm', {
    templateUrl: 'dialogs/new-ca/file-cert-form/file-cert-form.html',
    controller: 'NewFileFormController',
    bindings: {
        onFormSubmitted: '&'
    }
});