(function () {
  try {
    return angular.module('bonitasoft.ui.widgets');
  } catch(e) {
    return angular.module('bonitasoft.ui.widgets', []);
  }
})().directive('customButtonCloseModal', function() {
    return {
      controllerAs: 'ctrl',
      controller: function PbButtonCtrl($scope, $http, $location, $log, $window) {

  'use strict';

  var vm = this;

   $scope.close = function () {
    var id;
    $scope.properties.objectToNullify = {};
  };

}
,
      template: '<div class="text-{{ properties.alignment }}">\n    <button\n        ng-class="\'btn btn-\' + properties.buttonStyle"\n        ng-click="close()"\n        type="button"\n        ng-disabled="properties.disabled || ctrl.busy" ng-bind-html="properties.label | uiTranslate"></button>\n</div>\n'
    };
  });
