'use strict';

angular.module('vault.fileView').controller('FileViewController', FileViewController);

FileViewController.$inject = ['fileService', 'statusService', 'fileDialog','$routeParams'];
function FileViewController(fileService, statusService, fileDialog, $routeParams) {
    var vm = this;

    vm.fileId = $routeParams.id;
    vm.data = '';
    vm.goBackToFileList = goBackToFileList;
    vm.removeFile = removeFile;
    vm.downloadFile = downloadFile;
    vm.parseTags = parseTags;
    vm.getFile = getFile;

    vm.getFile(vm.fileId);

    function getFile(fileID) {
        fileService.getFile(fileID).then(function (response) {
            vm.data = response.data;
            console.log(vm.data);
        }, function (error) {
            var status = 'Cannot load data';
            var desc = (error.data != null && error.data.message != null) ? error.data.message : '';
            statusService.showStatusAlert(status, desc, 'error');
            console.log("Error: " + error);
            vm.goBackToFileList();
        });
    }

    function downloadFile(base64string) {
        base64string = "xbvDk8WBxIY=";
        var name = 'cos.txt';
        var download = document.createElement('a');
        download.setAttribute('href', 'data:application/octet-stream;base64,' + base64string);
        download.setAttribute('download', name);
        // download.click(function () {
        //     download.attr('href', 'data:application/octet-stream;base64,' + base64string);
        // });
        // $('#execute').replaceWith(download);
        download.click();
        download.remove();
        // $('.output').remove();
    }

    function goBackToFileList() {
        window.location = ('#/file');
    }

    function parseTags() {
        var file = vm.data;
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

    function removeFile(id) {
        var title = 'Do you really want to delete that file?';
        fileDialog.showConfirm('', title, '').then(function () {
            fileService.deleteFile(id).then(function (response) {
                removeFileFromArray(id);
                statusService.showStatusAlert('Removed file.', '', 'warning');
            }, function (error) {
                var desc = (error.data != null && error.data.message != null) ? error.data.message : '';
                statusService.showStatusAlert('Failed to remove file', desc, 'error');
                console.log(error);

            })
        });
    }

}