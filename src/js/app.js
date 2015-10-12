(function() {
	'use strict';
	var app = angular.module('lineitems', ['ngAria','ngTouch','ngResource', 'ui.bootstrap']);
	
	app.controller('ListCntrl', ['$scope', 'LineItem','$filter','filterFilter', function($scope, LineItem, $filter,filterFilter){
		$scope.lineItems = LineItem.query();
		$scope.filtered = [];
		$scope.totalBillable = 0;
		$scope.selected = undefined;
		$scope.filteredTotal =0;
		$scope.campaignsHash = new Object();
		$scope.campaignsList = [];
		
		$scope.lineItems.$promise.then(function(data) {
			angular.forEach($scope.lineItems, function(value, index) {
				value.billable = value.adjustments + value.actual_amount;
				$scope.totalBillable += value.billable;
				 
				var key = value.campaign_name.replace(/\s+/g, '').toLowerCase().substr(0,12);
				
				if (!Object.prototype.hasOwnProperty.call($scope.campaignsHash, key)) {
					$scope.campaignsHash[key] = value.campaign_name;	
				}

			});
			 
			for (var name in $scope.campaignsHash) {
				$scope.campaignsList.push($scope.campaignsHash[name]);
			}
			$scope.filterSelect('');
		});
		
		
		// Sorting Vars and Fns
		$scope.sortType = 'line_item_name';
		$scope.sortRev = false;
		
		$scope.setSort = function(sortType) {
			$scope.currentPage = 0;
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
		
		$scope.filterSelect = function($item, $model, $label) {
			if ($item === '') {
				$scope.selected = '';
			}
			$scope.currentPage = 0;
			$scope.filtered = filterFilter($scope.lineItems, $scope.selected);
			$scope.numPages = Math.ceil($scope.filtered.length / $scope.pageSize);
			if ( $scope.selected != '') {
				$scope.filteredTotal = $scope.filtered.reduce(function(a, b){
					console.log(parseFloat(a) + " " + parseFloat(b.billable));
					if (isNaN(a))
						a = 0;
					return parseFloat(a) + parseFloat(b.billable);
				});
			}
			else $scope.filteredTotal = 0;
			console.log($scope.filteredTotal);
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
})();