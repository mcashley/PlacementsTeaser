(function() {
	'use strict';
	var app = angular.module('lineitems', ['ngAria','ngTouch', 'ngResource']);
	
	app.controller('ListCntrl', ['$scope', 'LineItem', function($scope, LineItem){
		$scope.lineItems = LineItem.query();
		$scope.totalBillable = 0;
		$scope.lineItems.$promise.then(function(data) {
			angular.forEach($scope.lineItems, function(value, index) {
				value.billable = value.adjustments + value.actual_amount;
				$scope.totalBillable += value.billable;
			});
			$scope.numLineItems = $scope.lineItems.length;
			$scope.numPages = $scope.numLineItems / $scope.pageSize;
		});
		
		
		
		// Sorting Vars and Fns
		$scope.sortType = 'line_item_name';
		$scope.sortRev = false;
		
		$scope.setSort = function(sortType) {
			if (sortType === $scope.sortType) {
				$scope.sortRev = !$scope.sortRev;
			}
			else {
				$scope.sortType = sortType;
				$scope.sortRev = false;
			}
		}
		
		// Paging vars and Fns
		$scope.pageSize = 20;
		$scope.currentPage = 0;
		
		$scope.prevPage = function(){
			if ($scope.currentPage > 0)
				$scope.currentPage -= 1;
			else $scope.currentPage = $scope.numPages - 1;
		};
		$scope.nextPage = function(){
			if (($scope.currentPage + 1)  < $scope.numPages)
				$scope.currentPage += 1;
			else $scope.currentPage = 0;
		};
	}]);

	app.factory('LineItem', ['$resource',
	  function($resource){
	    return $resource('./data/placements_teaser_data.json', {}, {
	      query: {method:'GET', isArray:true}
	    });
	  }]);
	  
	  app.filter('startFrom', function() {
	      return function(input, start) {
	          start = +start; //parse to int
	          return input.slice(start);
	      }
	  });
	  
    app.filter('campaign', function() {
  	      return function(input) {
  	          start = +start; //parse to int
  	          return input.slice(start);
  	      }
	 });
	
})();