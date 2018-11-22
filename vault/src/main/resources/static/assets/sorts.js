'use strict';

angular.module("sorts", []);

angular.module("sorts")
    .directive('sortControl', function () {
        var controller = ['$scope', '$rootScope', function ($scope, $rootScope) {

                var vm = this;

                $scope.state = undefined;

                $scope.setSorting = function () {

                    if ($scope.state === undefined)
                        $scope.state = true;
                    else
                        $scope.state = !$scope.state;

                    var config = {sort: {tag: $scope.tag, asc: $scope.state}};

                    $scope.field = $scope.tag;
                    $scope.reverse = !config.sort.asc;

                    $rootScope.$emit("clearSorts", $scope.tag);
                };

                $rootScope.$on("clearSorts", function (type, data) {
                    if (data !== $scope.tag)
                        $scope.state = undefined;
                });
            }],

            template = '<div ng-click="setSorting()" style="cursor: pointer;">' +
                '<ng-transclude></ng-transclude>  ' +
                '<i class="fa fa-sort-asc"  ng-if="state === true"  aria-hidden="true"></i>' +
                '<i class="fa fa-sort-desc" ng-if="state === false" aria-hidden="true"></i>' +
                '</div>';

        return {
            scope: {
                field: '=',
                reverse: '=',
                tag: '='
            },
            transclude: true,
            controller: controller,
            controllerAs: 'sort',
            template: template
        };
    });
