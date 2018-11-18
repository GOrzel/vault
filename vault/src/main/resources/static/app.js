'use strict';

angular.module('vault', [
    'ngRoute',
    'ngSanitize',
    'ngMaterial',
    'ngMessages',
    'vault.fileList',
    'vault.status',
    'vault.dialog'

]);

angular.module('vault')
    .config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
        $locationProvider.hashPrefix('');

        $routeProvider.when('/file', {
            template: '<file-list></file-list>'
        // }).when('/ca/:id', {
        //     template: '<ca-view></ca-view>'
        // }).when('/crl', {
        //     template: '<crl-list></crl-list>',
        // }).when('/crl/:id', {
        //     template: '<crl-view></crl-view>'
        // }).when('/tools', {
        //     template: '<tools></tools>'
        // }).when('/configuration', {
        //     template: '<configuration></configuration>'
        }).otherwise({
            redirectTo: '/file'
        });

    }]);

