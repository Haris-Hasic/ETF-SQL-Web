app.controller('ConsoleController', ['$scope', '$location','$http', function($scope, $location,$http) {
	$scope.init = function() {
		$scope.queryresult = "Your results will be shown here!";
	};
	   $scope.create = function () {
	   	   var sc = $scope.scriptcontent;
	   	   var data = {
	   	   	 scriptcontent : sc
	   	   };
	   	   var config = {};
	   	   var successCallback = {};
	   	   $scope.column_names = [];
	   	   $scope.rows_result = [];
           $http.post('/user_histories', data, config).then(successCallback);
           $http.post('/consoles.json', data, config).then(function(response) {
           	 $scope.queryresult = response.data.columns;
           	 angular.forEach($scope.queryresult, function (value) {
                    $scope.column_names.push(value);
                });
           	 $scope.queryresult = response.data.rows;
           	 angular.forEach($scope.queryresult, function (value) {
                    $scope.rows_result.push(value);
                });
           });
        };
        $scope.textevaluate = function() {
        	$scope.textarray = $scope.scriptcontent.split(" ");
        	if($scope.textarray[$scope.textarray.length-1].toUpperCase() == "SELECT" || $scope.textarray[$scope.textarray.length-1].toUpperCase() == "FROM" || $scope.textarray[$scope.textarray.length-1].toUpperCase() == "WHERE" || $scope.textarray[$scope.textarray.length-1].toUpperCase() == "GROUP" || $scope.textarray[$scope.textarray.length-1].toUpperCase() == "BY" || $scope.textarray[$scope.textarray.length-1].toUpperCase() == "ORDER" || $scope.textarray[$scope.textarray.length-1].toUpperCase() == "TRIGGER") {
        		$scope.textarray[$scope.textarray.length-1] = $scope.textarray[$scope.textarray.length-1].toUpperCase();
        		$scope.scriptcontent = $scope.textarray.join(" ");
        	}
        };
}]);