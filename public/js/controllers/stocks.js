'use strict';

angular.module('VTS.stocks').controller('StocksController', ['$scope', '$routeParams', '$location', 'Global', 'Stocks','_','Color','Thickness','Width','Warehouse', function ($scope, $routeParams, $location, Global, Stocks,_,Color,Thickness,Width,Warehouse) {
    $scope.global = Global;
    
   
    $scope.stockFilter = function(stock) {
        return ( stock.quantity > 0);
	};
	$scope.findAll = function(){
		init()
		Stocks.query(function(stocks) {
			$scope.stocks = _.map(stocks, function(stock){
				stock.boxDetails = _.reduce(stock.boxes, function(memo, box){
					return memo + '{ Box Num:'+ box.BoxId+', Qty:'+box.quantity+'},';
				}, '(');
				stock.boxDetails = stock.boxDetails.substring(0,stock.boxDetails.length-1)+')';
				return stock;
			});
		});
	};
	function init() {
		$scope.color = Color;
		$scope.thickness = Thickness;
		$scope.width = Width;
		$scope.warehouse = Warehouse;
        
	};

}]);