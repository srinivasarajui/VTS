'use strict';

//Articles service used for articles REST endpoint
angular.module('VTS.stocks').factory('Stocks', ['$resource', function($resource) {
    return $resource('stock');
}]);