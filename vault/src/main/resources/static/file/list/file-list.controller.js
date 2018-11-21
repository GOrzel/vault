'use strict';

angular.module('vault.fileList').controller('FileListController', FileListController);

FileListController.$inject = ['fileService', 'statusService', 'dialogService'];
function FileListController(fileService, statusService, dialogService) {
    var vm = this;

    vm.items = [];
    vm.filterModel = {};
    vm.fileData = {};
    // vm.allowedExtensions=["txt","doc","pdf","docx"];

    vm.getAllFiles = getAllFiles;
    vm.addNewFile = addNewFile;
    vm.enterDetails = enterDetails;
    vm.resetFilter = resetFilter;
    vm.parseTags = parseTags;

    vm.getAllFiles();
    vm.resetFilter();


    function getAllFiles() {
        fileService.getAllFiles().then(function (response) {
            vm.items = response.data;
            // console.log(response);
            // response.data.forEach(function (a) {
            //     parseTags(a);
            // })
        }, function (error) {
            var status = 'Failed to receive file list.';
            var desc = (error.data != null && error.data.message != null) ? error.data.message : '';
            statusService.showStatusAlert(status, desc, 'error');
            console.log("Error: " + error);
        });
    }

    function addNewFile() {
        var fileSelect = document.createElement('input');
        fileSelect.type = 'file';

        if (fileSelect.disabled) {
            var status = 'Browser doesn\'t support HTML5';
            var desc = ('Your browser doesn\'t support HTML5 input type=\'file\'');
            statusService.showStatusAlert(status, desc, 'error');
            return;
        }

        fileSelect.click();

        fileSelect.onchange = function () {
            var file = fileSelect.files[0];
            // console.log(file);
            if (file.size > 16777216) {
                var status = 'File upload error';
                var desc = 'Your file is bigger than 16MB.';
                statusService.showStatusAlert(status, desc, 'error');
                return;
            }
            // var ext = file.name.split('.');
            // if (ext[ext.length-1]) {
            //     var status = 'Wrong extension';
            //     var desc = 'This exception is not allowed.';
            //     statusService.showStatusAlert(status, desc, 'error');
            //     return;
            // }
            var reader = new FileReader();
            var name = file.name;

            reader.onloadend = function (e) {
                vm.fileData.b64 = e.target.result;
                fileService.addFile(vm.fileData.b64.replace(/^data.*;base64,/, ""), name).then(function (response) {
                    // console.log(response);
                    vm.getAllFiles();
                    vm.enterDetails(response.data.id);
                }, function (error) {
                    var status = 'Failed to upload file';
                    var desc = (error.data != null && error.data.message != null) ? error.data.message : '';
                    statusService.showStatusAlert(status, desc, 'error');
                    console.log("Error: " + error);
                })
            };

            reader.readAsDataURL(file);

        };
    }

    function enterDetails(id) {
        window.location = ('#/file/' + id);
    }

    function parseTags(file) {
        var result = '';
        if (file.tags.length === 0)
            return '';

        var tags = file.tags;
        tags.forEach(function (tag) {
            result += tag.name + ", ";
        });
        //remove last comma
        result = result.slice(0, result.length - 2);
        // console.log(result);
        return result;
    }

    function resetFilter() {
        vm.filterModel = {
            id: '',
            name: '',
            addDate: '',
            tags: ''
        };
    }

}
