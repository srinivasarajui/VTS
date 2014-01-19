'use strict';

angular.module('VTS.stocks').controller('StocksController', ['$scope', '$routeParams', '$location', 'Global', 'Stocks', function ($scope, $routeParams, $location, Global, Stocks) {
    $scope.global = Global;
    $scope.stockFilter = function(stock) {
        return ( stock.quantity > 0);
	};
    $scope.findAll = function(){
        Stocks.query(function(stocks) {
            $scope.stocks = stocks;
        });
    };

}]);