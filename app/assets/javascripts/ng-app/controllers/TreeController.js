app.controller('TreeController', ['$scope', '$http', function($scope, $http) {

	// Početna struktura drveta
	this.bag = [{
		label: 'Tabele',
		value: 'tabele',
			children: [{
        			label: 'Trenutno nema učitanih objekata...',
        			value: 'prazno'
        		}]}, {
		label: 'Sekvence',
		value: 'sekvence',
			children: [{
        			label: 'Trenutno nema učitanih objekata...',
        			value: 'prazno'
        		}]}, {
		label: 'Ograničenja',
		value: 'ogranicenja',
			children: [{
        			label: 'Trenutno nema učitanih objekata...',
        			value: 'prazno'
        		}]}, {
        	label: 'Indeksi',
		value: 'indeksi',
			children: [{
        			label: 'Trenutno nema učitanih objekata...',
        			value: 'prazno'
        		}]},{
        	label: 'Pogledi',
		value: 'pogledi',
			children: [{
        			label: 'Trenutno nema učitanih objekata...',
        			value: 'prazno'
        		}]},{
        	label: 'Procedure',
		value: 'procedure',
			children: [{
        			label: 'Trenutno nema učitanih objekata...',
        			value: 'prazno'
        		}]}, {
        	label: 'Funkcije',
		value: 'funckije',
			children: [{
        			label: 'Trenutno nema učitanih objekata...',
        			value: 'prazno'
        		}]}, {
		label: 'Triggeri',
		value: 'triggeri',
			children: [{
        			label: 'Trenutno nema učitanih objekata...',
        			value: 'prazno'
        		}]
        	}];
	
	this.formirajDrvo = function() {
	
		var sc = "SELECT * FROM user_objects";
				
		var data = {
			scriptContent : sc,
			user_id: $scope.session.current_user.id,
			databasetype: $scope.current_connection.databasetype, 
	    		databaseusername: $scope.current_connection.databaseusername, 
	    		databasepassword_digest: $scope.current_connection.databasepassword_digest, 
	    		databaselocation: $scope.current_connection.databaselocation, 
	    		sid: $scope.current_connection.sid, 
	      		port:$scope.current_connection.port
		};

		$scope.tabele = [];
		$scope.sekvence = [];
		$scope.ogranicenja = [];
		$scope.indeksi = [];
		$scope.pogledi = [];
		$scope.procedure = [];
		$scope.funkcije = [];
		$scope.trigeri = [];
		
		$http.post('/console.json', data).success(
		
			function(response) {
			
				angular.forEach(response.rows, function (value) {
					if(value[4] === "TABLE") {
						$scope.tabele.push('{ "label": ' + JSON.stringify(value[0]) + ', "value": ' + JSON.stringify(value[0]) + '}');
					}
					else if(value[4] === "SEQUENCE") {
						$scope.sekvence.push('{ "label": ' + JSON.stringify(value[0]) + ', "value": ' + JSON.stringify(value[0]) + '}');
					}
					else if(value[4] === "CONSTRAINT") {
						$scope.ogranicenja.push('{ "label": ' + JSON.stringify(value[0]) + ', "value": ' + JSON.stringify(value[0]) + '}');
					}
					else if(value[4] === "INDEX") {
						$scope.indeksi.push('{ "label": ' + JSON.stringify(value[0]) + ', "value": ' + JSON.stringify(value[0]) + '}');
					}
					else if(value[4] === "VIEW") {
						$scope.pogledi.push('{ "label": ' + JSON.stringify(value[0]) + ', "value": ' + JSON.stringify(value[0]) + '}');
					}
					else if(value[4] === "PROCEDURE") {
						$scope.procedure.push('{ "label": ' + JSON.stringify(value[0]) + ', "value": ' + JSON.stringify(value[0]) + '}');
					}
					else if(value[4] === "FUNCTION") {
						$scope.funkcije.push('{ "label": ' + JSON.stringify(value[0]) + ', "value": ' + JSON.stringify(value[0]) + '}');
					}
					else if(value[4] === "TRIGGER") {
						$scope.trigeri.push('{ "label": ' + JSON.stringify(value[0]) + ', "value": ' + JSON.stringify(value[0]) + '}');
					}
				
				});
				
        		})
        		.error(function(err) {
        			alert("Neuspjelo učitavanje objekata !");
        		});
	};
	
	this.osvjeziDrvo = function() {
		
		var rezultat = '';
		
		var pocetak = '[{ "label": "Tabele", "value": "tabele", "children": [';
		var krajCvora = ' ]}, ';
		var kraj = ' ]}]';
		var sredina = '';
		
		angular.forEach($scope.tabele, function (value) {
			sredina = sredina + value + ",";
		});
		
		rezultat = rezultat + pocetak + sredina.substring(0, sredina.length - 1) + krajCvora;
		
		pocetak = '{ "label": "Sekvence", "value": "sekvence", "children": [';
		sredina = '';
		
		angular.forEach($scope.sekvence, function (value) {
			sredina = sredina + value + ",";
		});
		
		rezultat = rezultat + pocetak + sredina.substring(0, sredina.length - 1) + krajCvora;
		
		pocetak = '{ "label": "Ogranicenja", "value": "ogranicenja", "children": [';
		sredina = '';
		
		angular.forEach($scope.ogranicenja, function (value) {
			sredina = sredina + value + ",";
		});
		
		rezultat = rezultat + pocetak + sredina.substring(0, sredina.length - 1) + krajCvora;
		
		pocetak = '{ "label": "Indeksi", "value": "indeksi", "children": [';
		sredina = '';
		
		angular.forEach($scope.indeksi, function (value) {
			sredina = sredina + value + ",";
		});
		
		rezultat = rezultat + pocetak + sredina.substring(0, sredina.length - 1) + krajCvora;
		
		pocetak = '{ "label": "Pogledi", "value": "pogledi", "children": [';
		sredina = '';
		
		angular.forEach($scope.pogledi, function (value) {
			sredina = sredina + value + ",";
		});
		
		rezultat = rezultat + pocetak + sredina.substring(0, sredina.length - 1) + krajCvora;
		
		pocetak = '{ "label": "Procedure", "value": "procedure", "children": [';
		sredina = '';
		
		angular.forEach($scope.procedure, function (value) {
			sredina = sredina + value + ",";
		});
		
		rezultat = rezultat + pocetak + sredina.substring(0, sredina.length - 1) + krajCvora;
		
		pocetak = '{ "label": "Funckije", "value": "funkcije", "children": [';
		sredina = '';
		
		angular.forEach($scope.funkcije, function (value) {
			sredina = sredina + value + ",";
		});
		
		rezultat = rezultat + pocetak + sredina.substring(0, sredina.length - 1) + krajCvora;
		
		pocetak = '{ "label": "Triggeri", "value": "triggeri", "children": [';
		sredina = '';
		
		angular.forEach($scope.trigeri, function (value) {
			sredina = sredina + value + ",";
		});
		
		rezultat = rezultat + pocetak + sredina.substring(0, sredina.length - 1) + kraj;
		
		this.bag = JSON.parse(rezultat);
	};
	
	/*
	var ucitajObjekteUspjeh = function(response) {
		
		angular.forEach(response.data.columns, function (value) {
			$scope.column_names.push(value);
		});
		angular.forEach(response.data.rows, function (value) {
			$scope.rows_result.push(value);
		});
		
		this.bag = [{
			label: 'Triggeri',
			value: 'triggeri',
				children: [{
        				label: $scope.rows_result[0][4],
        				value: $scope.rows_result[0][4]
        			},{
        				label: $scope.rows_result[1][4],
        				value: $scope.rows_result[1][4]
        			}]}, {
			label: 'Tabele',
			value: 'tabele',
				children: [{
        			},{
        				label: $scope.rows_result[1][4],
        				value: $scope.rows_result[1][4]
        			},{
        			},{
        				label: $scope.rows_result[1][4],
        				value: $scope.rows_result[1][4]
        			}]
        		}];
	};
	
	var ucitajObjekteNeuspjeh = function(response) {
		alert("Neuspjelo učitavanje objekata !");
	}; */
	
	this.toggleCallback = function(node, isExpanded, tree) {
	
	};
	
	this.otherAwesomeCallback = function(node, isSelected, tree) {
		// Do soemthing with node or tree based on isSelected
	}
}]);
