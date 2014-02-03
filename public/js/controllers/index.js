'use strict';

angular.module('VTS.system').controller('IndexController', ['$scope', 'Global', '$location',
    function($scope, Global, $location) {
        $scope.global = Global;
        if (Global.authenticated) {
            $location.path('stock');
        }
    }
]);
