'use strict';

angular.module('VTS.users').controller('UserController', ['$scope', '$routeParams', '$location', 'Global', 'ManageUsers',
    function($scope, $routeParams, $location, Global, ManageUsers) {
        $scope.global = Global;

        $scope.validateOldPassword = function() {};
        $scope.changePassword = function() {


            var user = new ManageUsers({
                oldPassword: $scope.manageUser.oldPassword,
                newPassword: $scope.manageUser.newPassword
            });
            console.log('---------------------');
            user.$changePassword(function(result) {
                console.log(result);
                if (result.code !== 'ERROR') {
                    $location.path('home');
                } else {
                    $scope.manageUser.oldPassword = '';
                    $scope.manageUser.newPassword = '';
//TODO : Add code to show error message
                }
            });
        };

    }
]);
