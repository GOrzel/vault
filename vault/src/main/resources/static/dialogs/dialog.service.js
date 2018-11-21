'use strict';

angular.module('vault.dialog', ['ngMaterial', 'ngMessages']);

angular.module('vault.dialog').factory('dialogService', dialogService);

dialogService.$inject = ['$mdDialog'];
function dialogService($mdDialog) {

    var vm = this;

    var service = {
        showAlert: showAlert,
        showConfirm: showConfirm,
    };

    return service;

   function showAlert(title, message) {
        // Appending dialog to document.body to cover sidenav in docs app
        // Modal dialogs should fully cover application
        // to prevent interaction outside of dialog
       return $mdDialog.show(
            $mdDialog.alert()
            // .parent(angular.element(document.querySelector('#popupContainer')))
                .clickOutsideToClose(true)
                .title(title)
                .textContent(message)
                .ariaLabel('AlertDialog')
                .ok('OK')
            // .targetEvent(ev)
        ).then(function () {
                return true;
            }
        )
    }

    function showConfirm(ev, title, content) {
        // Appending dialog to document.body to cover sidenav in docs app
        var confirm = $mdDialog.confirm()
            .title((title != null) ? title : 'Are you sure you want to continue?')
            .htmlContent((content != null) ? content : '')
            .ariaLabel('ConfirmDialog')
            .targetEvent(ev)
            .ok('Yes')
            .cancel('No');

       return $mdDialog.show(confirm).then(function () {
            return true
        });
    }

    function showPrompt(ev) {
        // Appending dialog to document.body to cover sidenav in docs app
        var confirm = $mdDialog.prompt()
            .title('What would you name your dog?')
            .textContent('Bowser is a common name.')
            .placeholder('Dog name')
            .ariaLabel('Dog name')
            .initialValue('Buddy')
            .targetEvent(ev)
            .required(true)
            .ok('Okay!')
            .cancel('I\'m a cat person');

        $mdDialog.show(confirm).then(function (result) {
            $scope.status = 'You decided to name your dog ' + result + '.';
        }, function () {
            $scope.status = 'You didn\'t name your dog.';
        });
    }

    function showAdvanced(ev) {
        $mdDialog.show({
            controller: DialogController,
            templateUrl: 'dialog1.tmpl.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            fullscreen: true // Only for -xs, -sm breakpoints.
        })
            .then(function (answer) {
                $scope.status = 'You said the information was "' + answer + '".';
            }, function () {
                $scope.status = 'You cancelled the dialog.';
            });
    }

    function showTabDialog(ev) {
        $mdDialog.show({
            controller: DialogController,
            templateUrl: 'tabDialog.tmpl.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true
        })
            .then(function (answer) {
                $scope.status = 'You said the information was "' + answer + '".';
            }, function () {
                $scope.status = 'You cancelled the dialog.';
            });
    }

    function DialogController($scope, $mdDialog) {
        $scope.hide = function () {
            $mdDialog.hide();
        };

        $scope.cancel = function () {
            $mdDialog.cancel();
        };

        $scope.answer = function (answer) {
            $mdDialog.hide(answer);
        };
    }
}