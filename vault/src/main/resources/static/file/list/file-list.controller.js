'use strict';

angular.module('vault.fileList').controller('FileListController', FileListController);

FileListController.$inject = ['fileService', 'statusService', 'fileDialog'];
function FileListController(fileService, statusService, fileDialog) {
    var vm = this;

    vm.items = [];
    vm.filterModel = {};
    vm.fileData = {};

    vm.getAllFiles = getAllFiles;
    vm.addNewFile = addNewFile;
    vm.enterDetails = enterDetails;
    vm.resetFilter = resetFilter;
    vm.parseTags = parseTags;

    vm.getAllFiles();
    vm.resetFilter();


    function getAllFiles() {
        fileService.getAllFiles().then(function (response) {
            console.log(response);
            vm.items = response.data;
            response.data.forEach(function (a) {
                parseTags(a);
            })
        }, function (error) {
            var status = 'Błąd podczas pobierania informacji o liście plików.';
            var desc = (error.data != null && error.data.message != null) ? error.data.message : '';
            statusService.showStatusAlert(status, desc, 'error');
            console.log("Error: " + error);
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

    function addNewFile() {
        var fileSelect = document.createElement('input'); //input it's not displayed in html, I want to trigger it form other elements
        fileSelect.type = 'file';

        if (fileSelect.disabled) { //check if browser support input type='file' and stop execution of controller
            var status = 'Browser doesn\'t support HTML5';
            var desc = ('Your browser doesn\'t support HTML5 input type=\'File\'');
            statusService.showStatusAlert(status, desc, 'error');
            return;
        }

        fileSelect.click();

        fileSelect.onchange = function () {
            var file = fileSelect.files[0];
            console.log(file);
            if (file.size > 16777216) {
                console.log('hfj');
                var status = 'File upload error';
                var desc = 'Your file is bigger than 16MB.';
                statusService.showStatusAlert(status, desc, 'error');
                return;
            }
            var reader = new FileReader();
            var name = file.name;

            reader.onloadend = function (e) {
                vm.fileData.b64 = e.target.result;
                fileService.addFile(vm.fileData.b64.replace(/^data.*;base64,/, ""), name).then(function () {
                    vm.getAllFiles();
                    //todo error co wtedy
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

        var tags = file.tags;
        tags.forEach(function (tag) {
            result += tag.name + ", ";
        });
        //remove last comma
        result = result.slice(0, result.length - 2);
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

    function removeFileFromArray(id) {
        function fileHasProperId(file) {
            return file.id == id;
        }

        var item = vm.items.filter(fileHasProperId)[0];
        var index = vm.items.indexOf(item);
        vm.items.splice(index, 1);
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
