'use strict';

angular.module('VTS.transactions').controller('TransactionController', ['$scope', '$routeParams', '$location', 'Global','TransactionsIn','TransactionsOut','_',function ($scope, $routeParams, $location, Global,TransactionsIn,TransactionsOut,_) {

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
        $scope.color  = [
            { internalCode :'SB 001', code : ' BAVARIAN BEECH' , displayText : 'Bavarian Beech'},
            { internalCode :'SB 002', code : ' MAHAGONY' , displayText : 'Mahagony'},
            { internalCode :'SB 005', code : ' CENTURY WHITE' , displayText : 'Century White'},
            { internalCode :'SB 006', code : ' FROSTY WHITE' , displayText : 'Frosty White'},
            { internalCode :'SB 007', code : ' SILVER GREY' , displayText : 'Silver Grey'},
            { internalCode :'SB 008', code : ' SLATE GREY' , displayText : 'Slate Grey'},
            { internalCode :'SB 009', code : ' BLACK' , displayText : 'Black'},
            { internalCode :'SB 010', code : ' MYSORE IVORY' , displayText : 'Mysore Ivory'},
            { internalCode :'SB 011', code : ' RED ORANGE' , displayText : 'Red Orange'},
            { internalCode :'SB 012', code : ' YELLOW ORANGE' , displayText : 'Yellow Orange'},
            { internalCode :'SB 013', code : ' PARROT GREEN' , displayText : 'Parrot Green'},
            { internalCode :'SB 014', code : ' DARK GREEN' , displayText : 'Dark Green'},
            { internalCode :'SB 015', code : ' CHOCLATE' , displayText : 'Choclate'},
            { internalCode :'SB 016', code : ' ELECTRIC BLUE' , displayText : 'Electric Blue'},
            { internalCode :'SB 017', code : ' SKY BLUE' , displayText : 'Sky Blue'},
            { internalCode :'SB 018', code : ' YELLOW' , displayText : 'Yellow'},
            { internalCode :'SB 019', code : ' RED' , displayText : 'Red'},
            { internalCode :'SB 022', code : ' WENGI-I' , displayText : 'Wengi-I'},
            { internalCode :'SB 024', code : ' WHITE BEECH' , displayText : 'White Beech'},
            { internalCode :'SB 025', code : ' HIGHLAND PINE' , displayText : 'Highland Pine'},
            { internalCode :'SB 026', code : ' WALNUT' , displayText : 'Walnut'},
            { internalCode :'SB 027', code : ' PRECIOUS BEECH' , displayText : 'Precious Beech'},
            { internalCode :'SB 028', code : ' ASIAN MAPLE' , displayText : 'Asian Maple'},
            { internalCode :'SB 029', code : ' OCEAN RECON' , displayText : 'Ocean Recon'},
            { internalCode :'SB 030', code : ' DOUGLAS PINE' , displayText : 'Douglas Pine'},
            { internalCode :'SB 031', code : ' CANADIAN WALNUT' , displayText : 'Canadian Walnut'},
            { internalCode :'SB 032', code : ' STRAIGHT WALNUT' , displayText : 'Straight Walnut'},
            { internalCode :'SB 033', code : ' NR TEAK' , displayText : 'NR Teak'},
            { internalCode :'SB 036', code : ' RED CHERRY ' , displayText : 'Red Cherry '},
            { internalCode :'SB 039', code : ' SAPELLI' , displayText : 'Sapelli'},
            { internalCode :'SB 040', code : ' WINDSOR BIRCH' , displayText : 'Windsor Birch'},
            { internalCode :'SB 042', code : ' MANGFALI BEECH' , displayText : 'Mangfali Beech'},
            { internalCode :'SP 003', code : ' OXFORD CHERRY' , displayText : 'Oxford Cherry'},
            { internalCode :'SP 004', code : ' ROYAL CHERRY' , displayText : 'Royal Cherry'},
            { internalCode :'SP 034', code : ' NATURAL TEAK' , displayText : 'Natural Teak'},
            { internalCode :'SP 035', code : ' SANDY RECON' , displayText : 'Sandy Recon'},
            { internalCode :'SP 037', code : ' BALINESE PINE' , displayText : 'Balinese Pine'},
            { internalCode :'SP 043', code : ' ALBERTA MAPLE' , displayText : 'Alberta Maple'},
            { internalCode :'SP 046', code : ' INTAL BEECH' , displayText : 'Intal Beech'},
            { internalCode :'SP 047', code : ' OXFORD WALNUT' , displayText : 'Oxford Walnut'},
            { internalCode :'SP 048', code : ' SANGARILA' , displayText : 'Sangarila'},
            { internalCode :'SP 049', code : ' MODULA ACACIA' , displayText : 'Modula Acacia'},
            { internalCode :'SS 020', code : ' KAYA MAHAGONY' , displayText : 'Kaya Mahagony'},
            { internalCode :'SS 021', code : ' MALASI WENGI' , displayText : 'Malasi Wengi'},
            { internalCode :'NC 045', code : ' ALUWAVE' , displayText : 'Aluwave'},
            { internalCode :'NC 044', code : ' ASIAN TEAK ' , displayText : 'Asian Teak '},
            { internalCode :'NC 041', code : ' CLEAR OAK' , displayText : 'Clear Oak'},
            { internalCode :'NC 023', code : ' COLONIAL BEECH' , displayText : 'Colonial Beech'},
            { internalCode :'NC 038', code : ' IVORY ' , displayText : 'Ivory '},
            { internalCode :'NC 050', code : ' MILK WHITE' , displayText : 'Milk White'},
            { internalCode :'NC 051', code : ' WENGI-II' , displayText : 'Wengi-II'}

        ];
        $scope.thickness  = [
            {code:'2.0',displayText:'2.0mm'},
            {code:'0.8',displayText:'0.8mm'},
            {code:'0.5',displayText:'0.5mm'}
        ];
        $scope.width  = [
            {code:'22',displayText:'22mm'},
            {code:'30',displayText:'30mm'}
        ];
        $scope.warehouse = [
            {code:'MEDCHAL',displayText:'Medchal'},
            {code:'PUNJAGUTTA',displayText:'Punjagutta'}
        ];
        $scope.rollSize = [
            {code:'100MTRS',displayText:'100 Meters',lengthInMeter:100},
            {code:'200MTRS',displayText:'200 Meters',lengthInMeter:200}
        ];

    }
}]);