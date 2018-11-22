'use strict';

angular.module('vault.fileService', []);

angular.module('vault.fileService').factory('fileService', FileServiceFactory);

FileServiceFactory.$inject = ['$http'];
function FileServiceFactory($http) {
    var service = {};

    service.getAllFiles = getAllFiles;
    service.getFile = getFile;
    service.deleteFile = deleteFile;
    service.addFile = addFile;
    service.setTags = setTags;

    function getAllFiles() {
        return $http.get('/rest/file');
    }

    function getFile(fileId) {
        return $http.get('/rest/file/' + fileId);
    }

    function deleteFile(fileId) {
        return $http.delete('/rest/file/' + fileId);
    }

    function addFile(file, name) {
        // var myFormData = new FormData();
        // myFormData.append('name', name);
        // myFormData.append('file', file);

        return $http.post('/rest/file', {"name" : name, "data" : file}, {
            // transformRequest: angular.identity,
            // headers: {'Content-Type': undefined}
        });
    }

    function setTags(fileId, tagIds) {
        console.log(tagIds);
        return $http.put('/rest/file/' + fileId + '/tag', tagIds);
    }



    return service;
}