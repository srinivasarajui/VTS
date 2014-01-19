'use strict';

//Setting up route
angular.module('VTS').config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/articles', {
            templateUrl: 'views/articles/list.html'
        }).
        when('/articles/create', {
            templateUrl: 'views/articles/create.html'
        }).
        when('/articles/:articleId/edit', {
            templateUrl: 'views/articles/edit.html'
        }).
        when('/articles/:articleId', {
            templateUrl: 'views/articles/view.html'
        }).
        when('/index', {
            templateUrl: 'views/index.html'
        }).
        when('/transactionIn', {
            templateUrl: 'views/transaction/list.html',
            controller: 'TransactionController'
        }).
         when('/transactionIn/create', {
            templateUrl: 'views/transaction/create.html',
            controller: 'TransactionController'
        }).
         when('/transactionIn/:transactionId/edit', {
            templateUrl: 'views/transaction/edit.html',
            controller: 'TransactionController'
        }).
         when('/transactionIn/:transactionId/view', {
            templateUrl: 'views/transaction/view.html',
            controller: 'TransactionController'
        }).
         when('/transactionOut', {
            templateUrl: 'views/transaction/list.html',
            controller: 'TransactionController'
        }).
         when('/transactionOut/create', {
            templateUrl: 'views/transaction/create.html',
            controller: 'TransactionController'
        }).
         when('/transactionOut/:transactionId/edit', {
            templateUrl: 'views/transaction/edit.html',
            controller: 'TransactionController'
        }).
         when('/transactionOut/:transactionId/view', {
            templateUrl: 'views/transaction/view.html',
            controller: 'TransactionController'
        }).
         when('/stock', {
            templateUrl: 'views/stock/list.html',
            controller: 'StocksController'
        }).
        otherwise({
            redirectTo: '/stock'
        });
    }
]);

//Setting HTML5 Location Mode
angular.module('VTS').config(['$locationProvider',
    function($locationProvider) {
        $locationProvider.hashPrefix('!');
    }
]);