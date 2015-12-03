app.controller('ConsoleController', ['$scope', '$location', function($scope, $location) { 
	   $scope.SubmitQuery = function (query) {
            $scope.queryresult = "bar";
        };
}]);