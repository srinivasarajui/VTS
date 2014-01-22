'use strict';

angular.module('VTS.transactions').controller('TransactionController', ['$scope', '$routeParams', '$location', 'Global','TransactionsIn','TransactionsOut','Color','Thickness','Width','Warehouse','RollSize','_',function ($scope, $routeParams, $location, Global,TransactionsIn,TransactionsOut,Color,Thickness,Width,Warehouse,RollSize,_) {

    $scope.global = Global;
    $scope.path  = $location.path() ;
    function getDisplayName(array,code) {
        
        return getObj(array,code).displayText;
    }
    function getObj(array,code) {
        return _.where(array,{code:code})[0];
        
    }

    var Transactions = null;
    if($scope.path.indexOf('transactionIn') !== -1){
        Transactions = TransactionsIn;
        $scope.direction = 'Inward';
        $scope.directionCode = 'IN';
        $scope.editLink  ='transactionIn';
    }else{
        Transactions = TransactionsOut;
        $scope.direction = 'Outward';
        $scope.directionCode = 'OUT';
        $scope.editLink  ='transactionOut';
        
    }
    
    $scope.findAll = function(){
        var statusList = [
            {displayText:'Draft Only',code:'DRAFT'},
            {displayText:'Approved Only',code:'APPROVED'},
            {displayText:'All Entries',code:'ALL'}
        ];
        $scope.statusList = statusList;
        $scope.limitStatus = getObj($scope.statusList,'DRAFT');
        Transactions.query(function(transactions) {
            $scope.transactions = transactions;
        });
    };
    $scope.findFilter = function(obj){
        return (obj.transState === $scope.limitStatus.code) ||($scope.limitStatus.code==='ALL') ;
    };
    $scope.create = function() {

        var items = [];
        $scope.transaction.items.forEach(function(item){
            items.splice(items,0,{
                color : item.color.code,
                width:item.width.code,
                thickness:item.thickness.code,
                rollSize: item.rollSize.code,
                quantity:item.quantity,
                boxNum:item.boxNum
            });

        });
        var trans = new Transactions({
            docId:$scope.transaction.docId,
            transDate:$scope.transaction.date,
            warehouse:$scope.transaction.warehouse.code,
            transType:$scope.directionCode,
            lines:items
        });
        trans.$save(function() {
            $location.path($scope.editLink);
        });
    };
    $scope.update = function() {
        var trans = $scope.trans;
        var items = [];
        $scope.transaction.items.forEach(function(item){
            items.splice(items,0,{
                color : item.color.code,
                width:item.width.code,
                thickness:item.thickness.code,
                rollSize: item.rollSize.code,
                quantity:item.quantity,
                boxNum:item.boxNum
            });

        });
        trans.docId=$scope.transaction.docId;
        trans.date=$scope.transaction.date;
        trans.warehouse=$scope.transaction.warehouse.code;
        trans.transType=$scope.directionCode;
        trans.lines=items;
        
        trans.$update(function() {
            $location.path($scope.editLink);
        });
    };
    $scope.remove = function(index) {
        $scope.transaction.items.splice(index,1);
    };
    $scope.find = function() {
        Transactions.query(function(transactions) {
            $scope.transactions = transactions;
        });
    };
    $scope.add = function() {
        if(!$scope.transaction ){
            $scope.transaction={};
            $scope.transaction.items=[];
        } else   if(!$scope.transaction.items ){
            $scope.transaction.items=[];
        }
        $scope.transaction.items.splice($scope.transaction.items,0,{

            color:$scope.newitem.color,
            width:$scope.newitem.width,
            thickness:$scope.newitem.thickness,
            rollSize: $scope.newitem.rollSize,
            quantity:$scope.newitem.quantity,
            boxNum:$scope.newitem.boxNum
        });

        $scope.newitem.color=null;
        $scope.newitem.width=null;
        $scope.newitem.thickness=null;
        $scope.newitem.rollSize=null;
        $scope.newitem.quantity=null;
        $scope.newitem.boxNum=null;
    };
    
    $scope.findOne = function() {
        
        Transactions.get({
            transactionId: $routeParams.transactionId
        }, function(transaction) {
            init();
            var items  = _.map(transaction.lines, function(line){
                var item  = {};
                item.color = getObj($scope.color,line.color);
                item.width = getObj($scope.width,line.width);
                item.thickness = getObj($scope.thickness,line.thickness);
                item.rollSize = getObj($scope.rollSize,line.rollSize);
                item.quantity = line.quantity;
                item.boxNum = line.boxNum;
                return item;
            });
            $scope.trans = transaction;
            $scope.transaction = {};
            $scope.transaction.docId=transaction.docId;
            $scope.transaction.date=transaction.transDate;
            $scope.transaction.canApprove=transaction.transState==='DRAFT';
            $scope.transaction.warehouse = $scope.getObj($scope.warehouse,transaction.warehouse);

            $scope.transaction.items = items;
        });
    };
    $scope.initCreate = function() {
        $scope.newitem = {};
        $scope.newitem.color=null;
        $scope.newitem.width=null;
        $scope.newitem.thickness=null;
        $scope.newitem.rollSize=null;
        $scope.newitem.quantity=null;
        $scope.newitem.boxNum=null;
        $scope.inward = {};
        init();
    };

    $scope.approve = function() {
        var trans = $scope.trans;
        trans.$approve(function() {
            $location.path($scope.editLink);
        });

    };
    
    $scope.getDisplayName =getDisplayName;
    $scope.getObj =getObj;
    function init(){
        $scope.color  = Color;
        $scope.thickness  = Thickness;
        $scope.width  = Width;
        $scope.warehouse = Warehouse;
        $scope.rollSize = RollSize;

    }
}]);