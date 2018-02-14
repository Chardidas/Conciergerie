var module;
try {
  module = angular.module('bonitasoft.ui.fragments');
} catch (e) {
  module = angular.module('bonitasoft.ui.fragments', []);
  angular.module('bonitasoft.ui').requires.push('bonitasoft.ui.fragments');
}
module.directive('pbFragmentServicesRendusFragment', function() {
  return {
    template: '<div>    <div class="row">\n        <div pb-property-values=\'da944c79-5f90-4dfd-a8a1-ccc553fb2d81\'>\n    <div ng-if="!properties.hidden" class="component col-xs-12  col-sm-12  col-md-12  col-lg-12" ng-class="properties.cssClasses">\n        <pb-date-picker></pb-date-picker>\n    </div>\n</div>\n    </div>\n    <div class="row">\n        <div pb-property-values=\'cd55375e-57ea-4e76-b62d-aa6b28466a6e\'>\n    <div ng-if="!properties.hidden" class="component col-xs-12  col-sm-12  col-md-12  col-lg-12" ng-class="properties.cssClasses">\n        <pb-textarea></pb-textarea>\n    </div>\n</div>\n    </div>\n</div>'
  };
});
