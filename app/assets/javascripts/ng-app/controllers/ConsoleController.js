app.controller('ConsoleController', ['$scope', '$location','$http', function($scope, $location,$http) {
	
	var keywords = [ "SELECT", "FROM", "WHERE", "GROUP", "ORDER", "BY", "AS", 
	                 "CREATE", "INSERT", "INTO", "VALUES",
					 "UPDATE", "SET", "DELETE", "TRIGGER", "VIEW", "SEQUENCE" ];
	
	$scope.init = function() {
		$scope.queryresult = "Your results will be shown here!";
	};
	
	$scope.create = function () {
		var sc = $scope.scriptContent;
		var data = {
			scriptContent : sc
		};
		var successCallback = {};
		$scope.column_names = [];
		$scope.rows_result = [];
		$http.post('/user_histories', data).then(successCallback);
		$http.post('/console.json', data).then(querySuccessCallback, queryErrorCallback);
	};
	
	var querySuccessCallback = function(response) {
		$scope.queryresult = response.data.columns;
		angular.forEach($scope.queryresult, function (value) {
			$scope.column_names.push(value);
		});
		$scope.queryresult = response.data.rows;
		angular.forEach($scope.queryresult, function (value) {
			$scope.rows_result.push(value);
		});
		
		$scope.queryresult = "";
	}
	
	var queryErrorCallback = function(response) {
		$scope.queryresult = "Query Failed";
	}
	
	$scope.textEvaluate = function() {
		$scope.textarray = $scope.scriptContent.split(" ");
		
		for (var i = 0; i < keywords.length; i++) {
			if (keywords[i] == $scope.textarray[$scope.textarray.length - 1].toUpperCase()) {
				$scope.textarray[$scope.textarray.length-1] = $scope.textarray[$scope.textarray.length-1].toUpperCase();
				$scope.scriptContent = $scope.textarray.join(" ");
			}
		}
	};
}]);