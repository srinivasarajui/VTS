'use strict';

//transactions service used for articles REST endpoint
angular.module('VTS.transactions').factory('TransactionsIn', ['$resource', function($resource) {
    return $resource('transaction/in/:transactionId', {
        transactionId: '@_id'
    }, {
        update: {
            method: 'PUT'
        },
        approve: {
            url : '/transaction/in/:transactionId/approve',
            method: 'PUT'
        }
    });
}]);

angular.module('VTS.transactions').factory('TransactionsOut', ['$resource', function($resource) {
    return $resource('transaction/out/:transactionId', {
        transactionId: '@_id'
    }, {
        update: {
            method: 'PUT'
        },
        approve: {
            url : '/transaction/out/:transactionId/approve',
            method: 'PUT'
        }
    });
}]);