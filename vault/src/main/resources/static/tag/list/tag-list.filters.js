'use strict';

angular.module('vault.tagList').filter("filterTag", function () {
    return function (items, filterModel) {
        items = items.filter(function (el) {
            return el.id.toString().includes(filterModel.id);
        });

        items = items.filter(function (el) {
            return (el.name.toUpperCase().includes(filterModel.name.toUpperCase()) );
        });

        return items;
    };
});