'use strict';

angular.module('vault', [
    'ngRoute',
    'ngSanitize',
    'ngMaterial',
    'ngMessages',
    'vault.fileList',
    'vault.fileView',
    'vault.tagList',
    'vault.about',
    'vault.status',
    'vault.dialog',
    'vault.navbar',
    '720kb.tooltips'

]);

angular.module('vault')
    .config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
        $locationProvider.hashPrefix('');

        $routeProvider.when('/file', {
            template: '<file-list></file-list>'
        }).when('/file/:id', {
            template: '<file-view></file-view>'
        }).when('/tag', {
            template: '<tag-list></tag-list>'
        }).when('/about', {
            template: '<about></about>'
        }).otherwise({
            redirectTo: '/file'
        });

    }]);

