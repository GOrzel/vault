'use strict';

angular.module('vault.navbar') .controller('NavbarController', NavbarController);

NavbarController.$inject = ['$location'];
function NavbarController($location) {
    var vm = this;
    vm.isActive = isActive;

     function isActive(viewLocation) {
         var location = $location.path();
         var locationStripped = location.replace(/(^\/.*?)\/[0-9]+/, "$1");
        return (viewLocation === locationStripped);
    }
}