'use strict';

angular.module('vault.navbar') .controller('NavbarController', NavbarController);

NavbarController.$inject = ['$location'];
function NavbarController($location) {
    var vm = this;
    vm.isActive = isActive;
    vm.goTo = goTo;

     function isActive(viewLocation) {
         var location = $location.path();
         var locationStripped = location.replace(/(^\/.*?)\/[0-9]+/, "$1");
        return (viewLocation === locationStripped);
    }

    function goTo(path) {
        window.location = (path);
    }
}