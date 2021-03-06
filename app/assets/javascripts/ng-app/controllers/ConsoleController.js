app.controller('ConsoleController', ['$rootScope', '$scope', '$location', '$http', function($rootScope, $scope, $location, $http) {
	
	var keywords = [ "SELECT", "FROM", "WHERE", "GROUP", "ORDER", "BY", "AS", 
	                 "CREATE", "INSERT", "INTO", "VALUES",
                     "UPDATE", "SET", "DELETE", "TRIGGER", "VIEW", "SEQUENCE" ];
	$scope.connectionStatus = { status: false };
	$scope.getConnections = function() {
	$scope.connections = [];
  
    $scope.init = function() {
		$scope.queryResult = "Your results will be shown here!";
		//$scope.isnewconnection = false;
		
        $scope.session = undefined;
        if($rootScope.session)
		    $scope.session = $rootScope.session.current_user;
	};
  
    // Fill connections list
	if($rootScope.session.current_user) {
		$http({
    		url: '/connections.json', 
    		method: "GET",
    		params: {user_id: $rootScope.session.current_user.id}
 			}).then(connectionsSuccessCallback, connectionsErrorCallback);
		}
	};
  
    var connectionsSuccessCallback = function(response) {
    	console.log(response);
		angular.forEach(response.data, function (value) {
			$scope.connections.push(value);
		});
	};
  
	var connectionsErrorCallback = function(response) {
		console.log(response);
	};
  
    // Load connection
	var loadConnection = function(response) {
		console.log(response);
		$scope.current_connection = {
			databaseLocation: response[0].databaselocation
		};
	};
  
    // Get User History
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
  
    // Insert Old Query
	$scope.insertOldQuery = function(index) {
		$scope.scriptContent = $scope.user_queries[index].scriptcontent;
		console.log($scope.scriptContent);
	};

    // Insert Old Connections
	$scope.insertOldConnections = function(index) {
		$scope.current_connection = angular.copy($scope.connections[index]);
	};
  
    // Insert Old Connections For Edit
	$scope.insertOldConnectionsForEdit = function(index) {
		$scope.current_connection = angular.copy($scope.connections[index]);
	};
  
    // Create New Connection
	$scope.createNewConnection = function(index) {
		$scope.current_connection = {
			databasetype: '',
			databaseusername: '',
			databasepassword_digest: '',
			databaselocation: '',
			sid: '',
			port: ''
		};
		$scope.isnewconnection = true;
	};
  
    // Save Connection
	$scope.saveConnection = function() {
		//console.log($scope.current_connection.preference_id);
		if(!$scope.isnewconnection) {
			$http({
	    		url: '/connections/' + $scope.current_connection.id, 
	    		method: "PUT",
	    		params: {
	    			databasetype: $scope.current_connection.databasetype, 
	    			databaseusername: $scope.current_connection.databaseusername, 
	    			databasepassword_digest: $scope.current_connection.databasepassword_digest, 
	    			databaselocation: $scope.current_connection.databaselocation,
	    			sid: $scope.current_connection.sid, 
	    			port:$scope.current_connection.port
	    		}
 			}).then(connectionsEditSuccessCallback, connectionsEditErrorCallback);
		}
		else {
			$http({
	    		url: '/connections.json',
	    		method: "POST",
	    		params: {
	    			databasetype: $scope.current_connection.databasetype, 
	    			databaseusername: $scope.current_connection.databaseusername, 
	    			databasepassword_digest: $scope.current_connection.databasepassword_digest, 
	    			databaselocation: $scope.current_connection.databaselocation,
	    			preference_id: $scope.current_connection.preference_id,
	    			sid: $scope.current_connection.sid, 
	    			port:$scope.current_connection.port
	    		}
 			}).then(connectionsEditSuccessCallback, connectionsEditErrorCallback);
		}
	};
  
	var connectionsEditSuccessCallback = function(response) {
		console.log(response);
	};
  
	var connectionsEditErrorCallback = function(response) {
		console.log(response);
	};
  
    // Connect
	$scope.connect = function() {
		if($scope.current_connection) {
			data = {
				scriptContent: "SELECT * FROM EMPLOYEES",
				user_id: 0,
				databasetype: $scope.current_connection.databasetype, 
			   	databaseusername: $scope.current_connection.databaseusername, 
			   	databasepassword_digest: $scope.current_connection.databasepassword_digest, 
			   	databaselocation: $scope.current_connection.databaselocation, 
			   	sid: $scope.current_connection.sid, 
			    port:$scope.current_connection.port
			};
			//$http.post('/console.json', data).then(testsuccessCallback);
			$http.post('/dbconnect', data).then(connectSuccessCallback);
		};
	};
	var connectSuccessCallback = function(response) {
		if(response.data.status == "OK") {
			$scope.connectionStatus.status = true;
			toastr.success("Konekcija uspostavljena");
					
		}
		else {
			$scope.connectionStatus.status = false;
			toastr.error("Konekcija nije uspostavljena");
		}
	};

	$scope.disconnect = function() {
		$http.delete('/dbdisconnect').then(disconnectSuccessCallback);
	};
	var disconnectSuccessCallback = function(response) {
		if(response.data.status == "OK") {
			$scope.connectionStatus.status = true;
			toastr.success("Konekcija prekinuta");
					
		}
		else {
			$scope.connectionStatus.status = false;
			toastr.error("Došlo je do greške.");
		}
	};

	$scope.create = function () {
		if($scope.current_connection) {
			var sc = $scope.scriptContent;
			var data = {
				scriptContent : sc,
				user_id: $rootScope.session.current_user.id,
				databasetype: $scope.current_connection.databasetype, 
	    		databaseusername: $scope.current_connection.databaseusername, 
	    		databasepassword_digest: $scope.current_connection.databasepassword_digest, 
	    		databaselocation: $scope.current_connection.databaselocation, 
	    		sid: $scope.current_connection.sid, 
	      		port:$scope.current_connection.port
			};
			var successCallback = {};
			$scope.column_names = [];
			$scope.rows_result = [];
			$http.post('/user_histories', data).then(successCallback);
			$http.post('/console.json', data).then(querySuccessCallback, queryErrorCallback);
		}
		else {
			$scope.error = 'No connection!';
			$scope.queryResult = "Error";
		}
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

app.controller('TreeController', function() {
  this.bag = [{
      label: 'Glasses',
      value: 'glasses',
      children: [{
        label: 'Top Hat',
        value: 'top_hat'
      },{
        label: 'Curly Mustache',
        value: 'mustachio'
      }]
  }];

  this.awesomeCallback = function(node, tree) {
    // Do something with node or tree
  };

  this.otherAwesomeCallback = function(node, isSelected, tree) {
    // Do soemthing with node or tree based on isSelected
  }
});
