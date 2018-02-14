(function () {
  try {
    return angular.module('bonitasoft.ui.widgets');
  } catch(e) {
    return angular.module('bonitasoft.ui.widgets', []);
  }
})().directive('customButtonWithRedirect', function() {
    return {
      controllerAs: 'ctrl',
      controller: function PbButtonCtrl($scope, $location, $window) {

  'use strict';

  this.action = function action() {
 
    if ($scope.properties.URL) {
          $window.top.location.assign($scope.properties.URL);
        }
  };
}
,
      template: '<div class="text-{{ properties.alignment }}">\n    <button\n        ng-class="\'btn btn-\' + properties.buttonStyle"\n        ng-click="ctrl.action()"\n        type="button"\n        ng-disabled="properties.disabled">{{ properties.label | uiTranslate }}</button>\n</div>\n'
    };
  });
