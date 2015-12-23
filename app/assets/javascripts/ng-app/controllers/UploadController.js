app
.directive('onReadFile', function ($parse) {
    return {
        restrict: 'A',
        scope: false,
        link: function(scope, element, attrs) {
            element.bind('change', function(e) {
                
                var onFileReadFn = $parse(attrs.onReadFile);
                var reader = new FileReader();
                
                reader.onload = function() {
                    var fileContents = reader.result;
                    // invoke parsed function on scope
                    // special syntax for passing in data
                    // to named parameters
                    // in the parsed function
                    // we are providing a value for the property 'contents'
                    // in the scope we pass in to the function
                    scope.$apply(function() {
                        onFileReadFn(scope, {
                            'contents' : fileContents
                        });
                    });
                };
                reader.readAsText(element[0].files[0]);
            });
        }
    };
})
.controller('UploadController', ['$rootScope', '$scope','$http', function($rootScope, $scope, $http) {


    $scope.displayFileContents = function(contents) {
        $scope.results = contents;
    };

    $scope.query = { 
        'first' : ''
    };
    
    $scope.search = function() {
        $scope.results = "results from http get using query:" + $scope.query.first;
    };
    
    $scope.init = function() {
        $scope.session = undefined;
        if($rootScope.session)
		    $scope.session = $rootScope.session.current_user;
    }
    
    $scope.executeScript = function() {
	var sc = $scope.results;
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
	if (response.data.columns) {
		angular.forEach(response.data.columns, function (value) {
			$scope.column_names.push(value);
		});
		angular.forEach(response.data.rows, function (value) {
			$scope.rows_result.push(value);
		});
		$scope.queryResult = "Success";
	}
	else {
		$scope.error = response.data.error;
		$scope.parse_error_offset = response.data.parse_error_offset;
		$scope.queryResult = "Error";
	}
}
    
    var queryErrorCallback = function(response) {
	$scope.queryResult = "Query Failed";
	}
	
    var printResults = function() {
	$scope.queryResult = "Success";
	}
}]);

$('#myModal').on('shown.bs.modal', function () {
    $('#textareaID').focus();
})
