'use strict';

angular.module('vault.fileList').filter("filterFile", function () {
    return function (items, filterModel) {
        items = items.filter(function (el) {
            return el.id.toString().includes(filterModel.id);
        });

        items = items.filter(function (el) {
            return (el.name.toUpperCase().includes(filterModel.name.toUpperCase()) );
        });

        // if (filterModel.addDate) {
        //     items = items.filter(function (el) {
        //         if (filterModel.addDate !== '') {
        //             return (new Date(el.addDate) <= new Date(filterModel.addDate));
        //         }
        //         return true;
        //     });
        // }

        items = items.filter(function (el) {
            return (parseTags(el).toUpperCase().includes(filterModel.tags.toUpperCase()) );
        });

        return items;
    };

    function parseTags(file) {
        var result = '';
        if (file.tags.length === 0)
            return '';

        var tags = file.tags;
        tags.forEach(function (tag) {
            result += tag.name + ", ";
        });
        //remove last comma
        result = result.slice(0, result.length - 2);
        return result;
    }
});