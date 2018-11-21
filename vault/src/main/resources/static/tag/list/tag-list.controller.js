'use strict';

angular.module('vault.tagList').controller('TagListController', TagListController);

TagListController.$inject = ['tagService', 'statusService', 'dialogService'];
function TagListController(tagService, statusService, dialogService) {
    var vm = this;

    vm.items = [];
    vm.name = '';
    vm.filterModel = {};

    vm.getAllTags = getAllTags;
    vm.addNewTag = addNewTag;
    vm.resetFilter = resetFilter;
    vm.removeTag = removeTag;

    vm.getAllTags();
    vm.resetFilter();


    function getAllTags() {
        tagService.getAllTags().then(function (response) {
            console.log(response);
            vm.items = response.data;
        }, function (error) {
            var status = 'Cannot get tag list.';
            var desc = (error.data != null && error.data.message != null) ? error.data.message : '';
            statusService.showStatusAlert(status, desc, 'error');
            console.log("Error: " + error);
        });
    }

    function addNewTag() {
        if(vm.name === ''){
            return;
        }
        tagService.addTag(vm.name).then(function (response) {
            vm.name = '';
            vm.getAllTags();
        }, function (error) {
            vm.name = '';
            var status = 'Failed to receive tag list.';
            var desc = (error.data != null && error.data.message != null) ? error.data.message : '';
            statusService.showStatusAlert(status, desc, 'error');
            console.log("Error: " + error);
        });
    }

    function removeTag(id) {
        var title = 'Do you really want to delete that tag?';
        dialogService.showConfirm('', title, '').then(function () {
            tagService.deleteTag(id).then(function (response) {
                removeTagFromArray(id);
                statusService.showStatusAlert('Removed tag.', '', 'warning');
            }, function (error) {
                var desc = (error.data != null && error.data.message != null) ? error.data.message : '';
                statusService.showStatusAlert('Failed to remove tag', desc, 'error');
                console.log(error);

            })
        });
    }

    function removeTagFromArray(id) {
        function tagHasProperId(file) {
            return file.id == id;
        }

        var item = vm.items.filter(tagHasProperId)[0];
        var index = vm.items.indexOf(item);
        vm.items.splice(index, 1);
    }


    function resetFilter() {
        vm.filterModel = {
            id: '',
            name: ''
        };
    }

}
