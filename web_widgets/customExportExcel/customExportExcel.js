(function () {
  try {
    return angular.module('bonitasoft.ui.widgets');
  } catch(e) {
    return angular.module('bonitasoft.ui.widgets', []);
  }
})().directive('customExportExcel', function() {
    return {
      controllerAs: 'ctrl',
      controller: function PbButtonCtrl($scope, $log) {

  'use strict';

  var vm = this;

  this.action = function action() {

    //var header = {"statutDemande": "Statut de la demande","caseId":"Numéro de la demande", "famille" : "Famille", "sousFamille":"Sous Famille","dateDemande": "Date de la demande","libelleDemande": "Libéllé de la demande"};
	//$scope.exportedData = angular.copy($scope.taskDetails);
	//$scope.exportedData = $filter('filter')($scope.exportedData, $scope.customFilter);
	
	$scope.properties.exportedData.unshift($scope.properties.header);
	//$scope.properties.exportedData.unshift(header);
	alasql('SELECT * INTO XLSX("' + $scope.properties.filename +'",{headers:false}) FROM ?',[$scope.properties.exportedData]);
  };
}
,
      template: '<div class="text-{{ properties.alignment }}">\n    <button\n        ng-class="\'btn btn-\' + properties.buttonStyle"\n        ng-click="ctrl.action()"\n        type="button"\n        ng-disabled="properties.disabled || ctrl.busy" ng-bind-html="properties.label | uiTranslate"></button>\n</div>\n'
    };
  });
