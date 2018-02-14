var module;
try {
  module = angular.module('bonitasoft.ui.fragments');
} catch (e) {
  module = angular.module('bonitasoft.ui.fragments', []);
  angular.module('bonitasoft.ui').requires.push('bonitasoft.ui.fragments');
}
module.directive('pbFragmentDemarchesAdministrativesServicesPostauxFragment', function() {
  return {
    template: '<div>    <div class="row">\n        <div pb-property-values=\'b89300c4-0173-43c3-83db-82372cba7287\'>\n    <div ng-if="!properties.hidden" class="component col-xs-12  col-sm-12  col-md-12  col-lg-12" ng-class="properties.cssClasses">\n        <pb-input></pb-input>\n    </div>\n</div>\n    </div>\n    <div class="row">\n        <div pb-property-values=\'cbeb3422-879c-4aaf-80d1-edec7fa26712\'>\n    <div ng-if="!properties.hidden" class="component col-xs-12  col-sm-12  col-md-8  col-lg-6" ng-class="properties.cssClasses">\n        <pb-input></pb-input>\n    </div>\n</div><div pb-property-values=\'5b67f855-4475-467e-8782-1bc55d5b9860\'>\n    <div ng-if="!properties.hidden" class="component col-xs-12  col-sm-12  col-md-4  col-lg-6" ng-class="properties.cssClasses">\n        <pb-input></pb-input>\n    </div>\n</div>\n    </div>\n</div>'
  };
});
