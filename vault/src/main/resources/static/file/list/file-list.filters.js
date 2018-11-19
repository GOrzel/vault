// 'use strict';
//
// angular.module('vault.fileList').filter("filterFile", function () {
//     return function (items, filterModel) {
//         items = items.filter(function (el) {
//             return (el.issuer.toUpperCase().includes(filterModel.keyword.toUpperCase()) || el.subject.toUpperCase().includes(filterModel.keyword.toUpperCase()));
//         });
//
//         items = items.filter(function (el) {
//             return el.id.toString().includes(filterModel.id);
//         });
//
//         if (filterModel.validUntil) {
//             items = items.filter(function (el) {
//                 if (filterModel.validUntil !== '') {
//                     return (new Date(el.validUntil) <= new Date(filterModel.validUntil));
//                 }
//                 return true;
//             });
//         }
//
//         return items;
//     }
// });
//
// angular.module('caManager.caList').filter("filterCAName", function () {
//     return function (el) {
//         el = el.replace(/.*CN *?= *?(.*?),? *?\w* *?=.*/gi, '$1');
//         return el;
//     }
// });
//
// angular.module('caManager.caList').filter("splitFullName",['$sce', function ($sce) {
//     return function (el) {
//         el = el.replace(/(\w*?=)/gi, '$1');
//         // return $sce.trustAs('html',el);
//         return el;
//     }
// }]);