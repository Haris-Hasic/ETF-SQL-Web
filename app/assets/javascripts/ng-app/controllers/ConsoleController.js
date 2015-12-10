app.controller('ConsoleController', ['$rootScope','$scope', '$location','$http', function($rootScope,$scope, $location, $http) {
	
	var keywords = [ "SELECT", "FROM", "WHERE", "GROUP", "ORDER", "BY", "AS", 
	                 "CREATE", "INSERT", "INTO", "VALUES",
					 "UPDATE", "SET", "DELETE", "TRIGGER", "VIEW", "SEQUENCE" ];
	
	$scope.init = function() {
		$scope.queryResult = "Your results will be shown here!";
	};
	$scope.getUserHistory = function() {
		$scope.user_queries = [];
		if($rootScope.session.current_user) {
		$http({
    		url: '/user_histories.json', 
    		method: "GET",
    		params: {user_id: $rootScope.session.current_user.id}
 			}).then(historySuccessCallback, historyErrorCallback);
		}
	};
	var historySuccessCallback = function(response) {
		angular.forEach(response.data, function (value) {
			$scope.user_queries.push(value);
		});
	};
		var historyErrorCallback = function(response) {
		console.log(response);
	};
	$scope.insertOldQuery = function(index) {
		$scope.scriptContent = $scope.user_queries[index].scriptcontent;
		console.log($scope.scriptContent);
	};

	$scope.create = function () {
		var sc = $scope.scriptContent;
		var data = {
			scriptContent : sc,
			user_id: $rootScope.session.current_user.id
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
			setErrorLineAndColumn($scope.scriptContent, $scope.parse_error_offset)
			setCaretPosition("query", $scope.parse_error_offset);
			$scope.queryResult = "Error";
		}
	}
	
	var setErrorLineAndColumn = function(text, position) {
		if (!text || text === "") {
			$scope.line = 1;
			$scope.column = 1;
			return;
		}
		
		var textArray = text.split(/\n/);		
		var line = 0;
		var characters = 0;
		
		while (line < textArray.length && characters <= position) {
			characters += textArray[line].length + 1;
			line++;
		}
		
		$scope.line = line;
		$scope.column = textArray[line - 1].length + position - characters + 2;		
	}
	
	var queryErrorCallback = function(response) {
		$scope.queryResult = "Query Failed";
	}
	
	$scope.textEvaluate = function() {
		var textarray = $scope.scriptContent.split(/(\s+)/);
		
		for (var i = 0; i < keywords.length; i++) {
			if (keywords[i] == textarray[textarray.length - 1].toUpperCase()) {
				textarray[textarray.length-1] = textarray[textarray.length-1].toUpperCase();
				$scope.scriptContent = textarray.join("");
			}
		}
	};
}]);

function setCaretPosition(elemId, caretPos) {
    var elem = document.getElementById(elemId);

    if(elem != null) {
        if(elem.createTextRange) {
            var range = elem.createTextRange();
            range.move('character', caretPos);
            range.select();
        }
        else {
            if(elem.selectionStart) {
                elem.focus();
                elem.setSelectionRange(caretPos, caretPos);
            }
            else
                elem.focus();
        }
    }
};

function toggleTree() {
	$scope.tree_toggle.click(function () {
		$(this).parent().children('ul.tree').toggle(200);
	});
};