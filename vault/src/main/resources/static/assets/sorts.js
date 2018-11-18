'use strict';

angular.module("sorts", []);

angular.module("sorts")
    .directive('sortControl', function () {
        var controller = ['$scope', '$rootScope', function ($scope, $rootScope) {

            var vm = this;

                $scope.state = undefined;

                function getURLParameter(name) {
                    return decodeURIComponent((new RegExp('[?|&]' + name + '='
                            + '([^&;]+?)(&|#|;|$)').exec(location.search) || [ , "" ])[1]
                            .replace(/\+/g, '%20'))
                        || null;
                }

                function getSorting() {
                    var config = JSON.parse(sessionStorage.getItem(location.pathname));

                    if (getURLParameter("reset") === "true")
                        sessionStorage.removeItem(location.pathname);

                    if (config != null && 'sort' in config && config.sort.tag === $scope.tag) {
                        $scope.state = config.sort.asc;
                        $scope.field = $scope.tag;
                        $scope.reverse = !config.sort.asc;
                    }
                }

                $scope.setSorting = function () {

                    if ($scope.state === undefined)
                        $scope.state = true;
                    else
                        $scope.state = !$scope.state;

                    var config = JSON.parse(sessionStorage.getItem(location.pathname));

                    if (config != null)
                        config.sort = {tag: $scope.tag, asc: $scope.state};
                    else
                        config = {sort: {tag: $scope.tag, asc: $scope.state}};

                    sessionStorage.setItem(location.pathname, JSON.stringify(config));

                    $scope.field = $scope.tag;
                    $scope.reverse = !config.sort.asc;

                    $rootScope.$emit("clearSorts", $scope.tag);
                };

                $rootScope.$on("clearSorts", function (type, data) {
                    if (data !== $scope.tag)
                        $scope.state = undefined;
                });

                getSorting();

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
