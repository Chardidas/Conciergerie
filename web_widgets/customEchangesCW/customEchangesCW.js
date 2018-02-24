(function () {
  try {
    return angular.module('bonitasoft.ui.widgets');
  } catch(e) {
    return angular.module('bonitasoft.ui.widgets', []);
  }
})().directive('customEchangesCW', function() {
    return {
      controllerAs: 'ctrl',
      controller: /**
 * The controller is a JavaScript function that augments the AngularJS scope and exposes functions that can be used in the custom widget template
 * 
 * Custom widget properties defined on the right can be used as variables in a controller with $scope.properties
 * To use AngularJS standard services, you must declare them in the main function arguments.
 * 
 * You can leave the controller empty if you do not need it.
 */
function ($scope) {
    
    this.customFormat = function(maDate){
        return moment(maDate).locale("fr").format('LLL');
    };
    
},
      template: '<div class="historyWL">\n<p ng-repeat="elem in properties.echanges">\n    <span>{{elem.userFullName}}\n        <span class="date"> {{ ctrl.customFormat(elem.datePostage) }} </span>\n    </span>\n    {{elem.contenu}}\n</p>\n</div>'
    };
  });
