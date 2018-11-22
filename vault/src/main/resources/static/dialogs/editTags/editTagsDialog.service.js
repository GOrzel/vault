'use strict';

angular.module('vault.editTagsDialog').factory('editTagsDialogService', EditTagsDialogServiceFactory);

EditTagsDialogServiceFactory.$inject = ['$mdDialog', 'statusService', 'fileService', 'tagService'];
function EditTagsDialogServiceFactory($mdDialog, statusService, fileService, tagService) {
    var service = {};
    service.showEditTagsDialog = showEditTagsDialog;

    function showEditTagsDialog(ev, fileId, currentTags) {
        return $mdDialog.show({
            controller: DialogController,
            controllerAs: 'dialog',
            templateUrl: 'dialogs/editTags/editTagsDialog.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            locals: {fileId: fileId, currentTags: currentTags}
        })
            .then(function (response) {
                console.log(response);
                // var status = 'Tags updated';
                // statusService.showStatusAlert(status, ' ', 'success');
                return response;
            }, function (error) {
                console.log("Error: " + error);
                var status = 'Failed to change tags';
                var desc = (error.data != null && error.data.message != null) ? error.data.message : '';
                statusService.showStatusAlert(status, desc, 'error');
            });
    }

    function DialogController($mdDialog, fileService, fileId, currentTags, tagService) {
        var vm = this;
        vm.fileId = fileId;
        vm.currentTags = currentTags;
        vm.selectedTags = [];
        vm.tags = [];
        vm.filterModel = {};

        vm.getAllTags = getAllTags;
        vm.resetFilter = resetFilter;
        vm.disableTag = disableTag;
        vm.enableTag = enableTag;
        vm.saveTags = saveTags;
        vm.resetTags = resetTags;
        vm.getSelectedTagsIds = getSelectedTagsIds;

        vm.getAllTags();
        vm.resetFilter();


        function getAllTags() {
            tagService.getAllTags().then(function (response) {
                // console.log(response);
                vm.tags = response.data;
                vm.resetTags();
            }, function (error) {
                var status = 'Cannot get tag list.';
                var desc = (error.data != null && error.data.message != null) ? error.data.message : '';
                statusService.showStatusAlert(status, desc, 'error');
                console.log("Error: " + error);
            });
        }

        function disableTag(tag) {
            tag.selected = false;
        }

        function enableTag(tag) {
            tag.selected = true;
        }

        function saveTags() {
            $mdDialog.hide(fileService.setTags(vm.fileId, getSelectedTagsIds(vm.tags)));
            // console.log(getSelectedTagsIds(vm.tags));
        }

        function resetTags() {
            if (vm.tags === undefined)
                return;

            vm.tags.forEach(function (tag) {
                tag.selected = vm.currentTags.containsTag(tag);
            });
        }

        Array.prototype.containsTag = function (targetTag) {
            var result = false;
            this.forEach(function (tag) {
                if (tag.id === targetTag.id) {
                    result = true;
                }
            });
            return result;
        };

        function getSelectedTagsIds(tags) {
            var result = [];

            if (tags === undefined)
                return;
            tags.forEach(function (tag) {
                if(tag.selected) result.push(tag.id);
            });
            return result;
        }

        vm.hide = function () {
            $mdDialog.hide();
        };

        vm.cancel = function () {
            $mdDialog.cancel();
        };


        function resetFilter() {
            vm.filterModel = {
                id: '',
                name: ''
            };
        }
    }

    return service;
}