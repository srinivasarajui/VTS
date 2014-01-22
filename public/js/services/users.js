'use strict';

angular.module('VTS.users').factory('ManageUsers', ['$resource', function($resource) {
    return $resource('/users/changePassword',{
        userId: '@_id'
    },{
            changePassword:{
                url : '/users/changePassword',
                method: 'POST'
            },
            validateOldPassword:{
                url : '/users/validateOldPassword',
                method: 'POST'
            }
        
        });
}]);