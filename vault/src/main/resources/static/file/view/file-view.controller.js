'use strict';

angular.module('vault.fileView').controller('FileViewController', FileViewController);

FileViewController.$inject = ['fileService', 'statusService', 'dialogService','$routeParams'];
function FileViewController(fileService, statusService, dialogService, $routeParams) {
    var vm = this;

    vm.fileId = $routeParams.id;
    vm.localFile = '';
    vm.goBackToFileList = goBackToFileList;
    vm.removeFile = removeFile;
    vm.downloadFile = downloadFile;
    vm.parseTags = parseTags;
    vm.getFile = getFile;
    vm.editTags = editTags;

    vm.getFile(vm.fileId);

    function getFile(fileID) {
        fileService.getFile(fileID).then(function (response) {
            vm.localFile = response.data;
            console.log(vm.localFile);
        }, function (error) {
            var status = 'Cannot load data';
            var desc = (error.data != null && error.data.message != null) ? error.data.message : '';
            statusService.showStatusAlert(status, desc, 'error');
            console.log("Error: " + error);
            vm.goBackToFileList();
        });
    }

    function downloadFile() {
        var download = document.createElement('a');
        download.setAttribute('href', 'data:application/octet-stream;base64,' + vm.localFile.data);
        download.setAttribute('download', vm.localFile.name);
        download.click();
        download.remove();
    }

    function goBackToFileList() {
        window.location = ('#/file');
    }

    function parseTags() {
        var file = vm.localFile;
        var result = '';

        var tags = file.tags;
        tags.forEach(function (tag) {
            result += tag.name + ", ";
        });
        //remove last comma
        result = result.slice(0, result.length - 2);

        if(result === '') result = "No tags defined for this file";
        console.log(result);
        return result;
    }

    function editTags() {
        console.log('editTags');
    }

    function removeFile() {
        var title = 'Do you really want to delete that file?';
        dialogService.showConfirm('', title, '').then(function () {
            fileService.deleteFile(vm.localFile.id).then(function (response) {
                statusService.showStatusAlert('Removed file.', '', 'warning');
                vm.goBackToFileList();
            }, function (error) {
                var desc = (error.data != null && error.data.message != null) ? error.data.message : '';
                statusService.showStatusAlert('Failed to remove file', desc, 'error');
                console.log(error);

            })
        });
    }

}