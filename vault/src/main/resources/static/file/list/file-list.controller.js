'use strict';

angular.module('vault.fileList').controller('FileListController', FileListController);

FileListController.$inject = ['fileService','statusService','newFileDialog','fileDialog','$scope'];
function FileListController(fileService, statusService, newFileDialog, fileDialog,$scope) {
    var vm = this;

    vm.items = [];
    vm.filterModel = {};
    vm.data = {}; //init variable



    vm.getAllFiles = getAllFiles;
    vm.addNewFile = addNewFile;
    vm.removeFile = removeFile;
    vm.enterDetails = enterCADetails;
    vm.resetFilter = resetFilter;
    vm.parseSubject = parseSubject;

    vm.getAllFiles();
    vm.resetFilter();

    function getAllFiles() {
        fileService.getAllFiles().then(function (response) {
            console.log(response);
            vm.items = response.data;
        }, function (error) {
            var status = 'Błąd podczas pobierania informacji o liście plików.';
            var desc = (error.data != null && error.data.message != null) ? error.data.message : '';
            statusService.showStatusAlert(status, desc, 'error');
            console.log("Error: " + error);
        });
    }

    function addNewFile(ev) {
        newFileDialog.showNewFileDialog(ev).then(function () {
            vm.getAllFiles();
        })
    }

    function enterCADetails(id) {
        window.location = ('#/file/' + id);
    }

    function parseSubject(subject) {
        var result = '';

        var tmp = subject.split(',');
        tmp.forEach(function (value) {
            result += value + "<br>";
        });

        return result;
    }

    function getOperationDescription(mode) {
        if (mode)
            return 'Aktywowane zostaną również następujące urzędy:';
        else
            return 'Dezaktywowane zostaną również następujące urzędy:';
    }

    function removeFile(id) {
        var title = 'Are you really want to delete that file?';
        fileDialog.showConfirm('', title, '').then(function () {
            fileService.deleteFile(id).then(function (response) {
                removeFileFromArray(id);
                statusService.showStatusAlert('Removed file.', '', 'warning');
            }, function (error) {
                var desc = (error.data != null && error.data.message != null) ? error.data.message : '';
                statusService.showStatusAlert('Błąd podczas usuwania urzędu.', desc, 'error');
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
            active: 'all',
            keyword: '',
            validUntil: ''
        };
    }


    $scope.click = function() { //default function, to be override if browser supports input type='file'
        $scope.data.alert = "Your browser doesn't support HTML5 input type='File'"
    }

    var fileSelect = document.createElement('input'); //input it's not displayed in html, I want to trigger it form other elements
    fileSelect.type = 'file';

    if (fileSelect.disabled) { //check if browser support input type='file' and stop execution of controller
        return;
    }

    $scope.click = function() { //activate function to begin input file on click
        fileSelect.click();
    }

    fileSelect.onchange = function() { //set callback to action after choosing file
        var f = fileSelect.files[0];
        var r = new FileReader();
        var name = f.name;

        r.onloadend = function(e) { //callback after files finish loading
            vm.data.b64 = e.target.result;
            $scope.$apply();
            console.log(e);
            console.log($scope.data.b64.replace(/^data.*;base64,/, "data:application/pdf;base64,")); //replace regex if you want to rip off the base 64 "header"
            fileService.addFile($scope.data.b64.replace(/^data.*;base64,/, ""), name).then(function () {
                vm.getAllFiles();
            })
        };

        r.readAsDataURL(f); //once defined all callbacks, begin reading the file

    };
}
