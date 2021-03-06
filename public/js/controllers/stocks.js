'use strict';

angular.module('VTS.stocks').controller('StocksController', ['$scope', '$routeParams', '$location', 'Global', 'Stocks', '_', 'Color', 'Thickness', 'Width', 'Warehouse', 'ParamUtil',
    function($scope, $routeParams, $location, Global, Stocks, _, Color, Thickness, Width, Warehouse, ParamUtil) {
        $scope.global = Global;
        var allColor = {
            internalCode: 'ALL',
            code: 'ALL',
            displayText: 'All'
        };
        $scope.mySelections = [];
        $scope.stockListGridOptions = {
            data: 'stocks',
            filterOptions: {
                filterText: '',
                useExternalFilter: false
            },

            enableRowSelection: true,

            plugins: [new ngGridCsvExportPlugin()],
            selectWithCheckboxOnly: true,
            showSelectionBox: true,
            showGroupPanel: false,
            showFooter: true,
            showFilter: true,
            enablePaging: false,
            selectedItems: $scope.mySelections,
            multiSelect: false,
            columnDefs: [{
                field: 'color',
                displayName: 'Color',
                groupable: true
            }, {
                field: 'thickness',
                displayName: 'Thickness',
                groupable: true
            }, {
                field: 'width',
                displayName: 'Width',
                groupable: true
            }, {
                field: 'warehouse',
                displayName: 'Warehouse',
                groupable: true
            }, {
                field: 'rollSize',
                displayName: 'Roll Size',
                groupable: true

            }, {
                field: 'quantity',
                displayName: 'Quantity'
            }, {
                field: 'boxDetails',
                displayName: 'BoxDetails',
                visible: false
            }]
        };

        $scope.stockItemGridOptions = {
            data: 'mySelections[0].boxes',

            columnDefs: [{
                field: 'BoxId',
                displayName: 'Box ID'
            }, {
                field: 'quantity',
                displayName: 'Quantity'
            }]
        };

        function init() {
            $scope.color = Color.slice(0);
            $scope.color.splice($scope.color, 0, allColor);
            $scope.thickness = Thickness;
            $scope.width = Width;
            $scope.warehouse = Warehouse;
            $scope.stockSelection = {};
            $scope.stockSelection.color = allColor;
            $scope.stockSelection.thickness = _.pluck(Thickness, 'code');
            $scope.stockSelection.width = _.pluck(Width, 'code');
            $scope.stockSelection.warehouse = _.pluck(Warehouse, 'code');
        }

        $scope.stockFilter = function(stock) {
            if ($scope.stockSelection.color !== allColor && $scope.stockSelection.color.code !== stock.color) {
                return false;
            }
            if ($scope.stockSelection.thickness.indexOf(stock.thickness) === -1) {
                return false;
            }
            if ($scope.stockSelection.width.indexOf(stock.width) === -1) {
                return false;
            }
            if ($scope.stockSelection.warehouse.indexOf(stock.warehouse) === -1) {
                return false;
            }
            return true;
        };
        $scope.findAll = function() {
            init();
            Stocks.query(function(stocks) {

                $scope.stocks = _.map(stocks, function(stock) {
                    stock.color = ParamUtil.getDisplayTextOfColor(stock.color);
                    stock.thickness = ParamUtil.getDisplayTextOfThickness(stock.thickness);
                    stock.width = ParamUtil.getDisplayTextOfWidth(stock.width);
                    stock.warehouse = ParamUtil.getDisplayTextOfWarehouse(stock.warehouse);
                    stock.rollSize = ParamUtil.getDisplayTextOfRollSize(stock.rollSize);
                    stock.boxDetails = _.reduce(stock.boxes, function(memo, box) {
                        return memo + '{ Box Num:' + box.BoxId + ', Qty:' + box.quantity + '},';
                    }, '(');
                    stock.boxDetails = stock.boxDetails.substring(0, stock.boxDetails.length - 1) + ')';
                    return stock;

                });
            });
        };

        $scope.toggleSelection = function(array, code) {
            var idx = array.indexOf(code);
            if (idx > -1) {
                array.splice(idx, 1);
            } else {
                array.push(code);
            }
        };

        $scope.getBoxDetails = function() {
            if ($scope.stock.boxId) {
                Stocks.getBoxDetails({
                    BoxId: $scope.stock.boxId
                }, function(stocks) {
                    $scope.stocks = stocks;
                });
            }
        };

        $scope.addToAdjustment = function(stock, boxNum, qty) {
            if (!$scope.adjustments) {
                $scope.adjustments = [];
            }
            $scope.adjustments.push({
                color: stock.color,
                thickness: stock.thickness,
                width: stock.width,
                warehouse: stock.warehouse,
                rollSize: stock.rollSize,
                BoxId: stock.BoxId,
                quantity: stock.quantity,
                newBoxId: boxNum,
                newQuantity: qty

            });
        };
        $scope.tranfer = function() {
            if ($scope.adjustments) {
                Stocks.transferBoxes($scope.adjustments);
                $location.path('stock');
            }

        };

    }
]);
