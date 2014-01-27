'use strict';

angular.module('VTS.system').controller('HeaderController', ['$scope', 'Global', function ($scope, Global) {
    $scope.global = Global;

    $scope.menu = [ {
        'title': 'Stock',
        'link': 'stock'
    },{
        'title': 'Inward',
        'link': 'transactionIn'
    }, {
        'title': 'Outward',
        'link': 'transactionOut'
    }, {
        'title': 'Adjustment',
        'link': 'stock/BoxAdjustment'
    }];
    
    $scope.isCollapsed = false;
}]);