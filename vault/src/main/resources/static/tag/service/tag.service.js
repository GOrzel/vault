'use strict';

angular.module('vault.tagService', []);

angular.module('vault.tagService').factory('tagService', TagServiceFactory);

TagServiceFactory.$inject = ['$http'];
function TagServiceFactory($http) {
    var service = {};

    service.getAllTags = getAllTags;
    service.deleteTag = deleteTag;
    service.addTag = addTag;

    function getAllTags() {
        return $http.get('/rest/tag');
    }

    function deleteTag(tagId) {
        return $http.delete('/rest/tag/' + tagId);
    }

    function addTag(name) {
        return $http.post('/rest/tag/?name=' + name, {
        });
    }


    return service;
}