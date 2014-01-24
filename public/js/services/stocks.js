'use strict';


angular.module('VTS.stocks').factory('Stocks', ['$resource', function($resource) {
    return $resource('stock', {}, {
        
        getBoxDetails: {
            url : '/stock/getBoxDetails',
            method: 'PUT',
            isArray:true
        },
        transferBoxes: {
            url : '/stock/transferBoxes',
            method: 'PUT'
        }
    });
}]);