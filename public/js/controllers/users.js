'use strict';

angular.module('VTS.users').controller('UserController', ['$scope', '$routeParams', '$location', 'Global', 'ManageUsers', function ($scope, $routeParams, $location, Global, ManageUsers) {
    $scope.global = Global;

    $scope.validateOldPassword=function(){};
    $scope.changePassword=function(){
        console.log($scope.manageUser.oldPassword);
        console.log($scope.manageUser.newPassword);
        var user = new ManageUsers({
            oldPassword : $scope.manageUser.oldPassword,
            newPassword : $scope.manageUser.newPassword
        });
        user.$changePassword(function() {
            $location.path('home');
        });
    };

}]);
