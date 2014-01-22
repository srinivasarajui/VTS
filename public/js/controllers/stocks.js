'use strict';

angular.module('VTS.stocks').controller('StocksController', ['$scope', '$routeParams', '$location', 'Global', 'Stocks','_','Color','Thickness','Width','Warehouse', function ($scope, $routeParams, $location, Global, Stocks,_,Color,Thickness,Width,Warehouse) {
    $scope.global = Global;
    var allColor={ internalCode :'ALL', code : 'ALL' , displayText : 'All'};
    function init() {
		$scope.color = Color.slice(0);
		$scope.color.splice($scope.color,0,allColor );
		$scope.thickness = Thickness;
		$scope.width = Width;
		$scope.warehouse = Warehouse;
        $scope.stockSelection = {};
        $scope.stockSelection.color = allColor;
        $scope.stockSelection.thickness  = _.pluck(Thickness, 'code');
        $scope.stockSelection.width  = _.pluck(Width, 'code');
        $scope.stockSelection.warehouse  = _.pluck(Warehouse, 'code');
	}
    $scope.stockFilter = function(stock) {
    	console.log($scope.stockSelection.color.code );
    	console.log(stock.color );
        if($scope.stockSelection.color !== allColor && $scope.stockSelection.color.code !== stock.color){return false;}
        if($scope.stockSelection.thickness.indexOf(stock.thickness)===-1){return false;}
        if($scope.stockSelection.width.indexOf(stock.width)===-1){return false;}
        if($scope.stockSelection.warehouse.indexOf(stock.warehouse)===-1){return false;}
        return true;
    };
	$scope.findAll = function(){
		init();
		Stocks.query(function(stocks) {
			var nonZeroStocks  = _.filter(stocks, function(stock) { return stock.quantity > 0 ;});
			$scope.stocks = _.map(nonZeroStocks, function(stock){
				stock.boxDetails = _.reduce(stock.boxes, function(memo, box){
					return memo + '{ Box Num:'+ box.BoxId+', Qty:'+box.quantity+'},';
				}, '(');
				stock.boxDetails = stock.boxDetails.substring(0,stock.boxDetails.length-1)+')';
				return stock;
			});
		});
	};
	
	$scope.toggleSelection = function toggleSelection(array,code) {
        var idx = array.indexOf(code);
        if (idx > -1) {array.splice(idx, 1);}
        else {array.push(code);}
    };
}]);