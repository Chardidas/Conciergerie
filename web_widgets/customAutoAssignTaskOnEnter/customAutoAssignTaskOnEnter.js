(function () {
  try {
    return angular.module('bonitasoft.ui.widgets');
  } catch(e) {
    return angular.module('bonitasoft.ui.widgets', []);
  }
})().directive('customAutoAssignTaskOnEnter', function() {
    return {
      controllerAs: 'ctrl',
      controller: function ($scope, $http) {
    $scope.$watch(function() {
        return $scope.properties.userId;
    },
    function(newValue, oldValue) {
        if(newValue != oldValue) {
            var request = $http({
                method: "put",
                url: "../API/bpm/humanTask/"+ $scope.properties.taskId,
                data: {
                    "assigned_id" :$scope.properties.userId 
                }
            });
            // Store the data-dump of the FORM scope.
            request.success(
                function( response ) {
                    console.log("sucecss",response);
                }
            );
            request.error(
                function (response){
                    console.log("error",response);
                    
                }                
            );
        }  
    })

},
      template: ''
    };
  });
