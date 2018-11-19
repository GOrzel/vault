'use strict';

angular.module('vault', [
    'ngRoute',
    'ngSanitize',
    'ngMaterial',
    'ngMessages',
    'vault.fileList',
    'vault.fileView',
    'vault.status',
    'vault.dialog',
    'vault.navbar'

]);

angular.module('vault')
    .config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
        $locationProvider.hashPrefix('');

        $routeProvider.when('/file', {
            template: '<file-list></file-list>'
        }).when('/file/:id', {
            template: '<file-view></file-view>'
        }).when('/tag', {
            template: '<tag-list></tag-list>',
        }).otherwise({
            redirectTo: '/file'
        });

    }]);

