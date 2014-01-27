'use strict';

(function() {
    // Articles Controller Spec
    describe('VTS controllers', function() {
        describe('StocksController', function() {

            beforeEach(function() {
                this.addMatchers({
                    toEqualData: function(expected) {
                        return angular.equals(this.actual, expected);
                    }
                });
            });

            // Load the controllers module
            beforeEach(module('VTS'));

            // Initialize the controller and a mock scope
            var StocksController,
                scope,
                $httpBackend,
                $routeParams,
                $location;

            
            beforeEach(inject(function($controller, $rootScope, _$location_, _$routeParams_, _$httpBackend_) {

                scope = $rootScope.$new();

                StocksController = $controller('StocksController', {
                    $scope: scope
                });

                $routeParams = _$routeParams_;

                $httpBackend = _$httpBackend_;

                $location = _$location_;

            }));
           describe('stockFilter', function() {
           	beforeEach(inject(function($controller, $rootScope, _$location_, _$routeParams_, _$httpBackend_) {
           		StocksController.init();
                

            }));
           it('Testing stockFilter valid case', function() {
           		
           		 expect(scope.title).toEqual(scope.stockFilter(stock););
           		

           });
       }

        });
    });
}());