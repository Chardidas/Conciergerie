var module;
try {
  module = angular.module('bonitasoft.ui.fragments');
} catch (e) {
  module = angular.module('bonitasoft.ui.fragments', []);
  angular.module('bonitasoft.ui').requires.push('bonitasoft.ui.fragments');
}
module.directive('pbFragmentReservationPanier', function() {
  return {
    template: '<div>    <div class="row">\n        <div pb-property-values=\'8e64d8e8-4c78-4bcd-9178-5110f4767308\'>\n    <div class="col-md-12  col-sm-12  col-xs-12  col-lg-12" ng-class="properties.cssClasses"\n         ng-if="!properties.hidden" ng-repeat="$item in ($collection = properties.repeatedCollection) track by $index">\n            <div class="row">\n        <div pb-property-values=\'59e8a997-0e0e-41b6-bf5e-906d5fc46506\'>\n    <div ng-if="!properties.hidden" class="component col-md-3  col-sm-12  col-xs-12  col-lg-3" ng-class="properties.cssClasses">\n        <pb-input></pb-input>\n    </div>\n</div><div pb-property-values=\'d78e7463-57fa-47a1-be79-fdfa201ba973\'>\n    <div ng-if="!properties.hidden" class="component col-xs-12  col-sm-12  col-md-3  col-lg-3" ng-class="properties.cssClasses">\n        <pb-input></pb-input>\n    </div>\n</div><div pb-property-values=\'c22aa59c-4504-45c1-b976-4a765bb11586\'>\n    <div ng-if="!properties.hidden" class="component col-md-3  col-sm-12  col-xs-12  col-lg-3" ng-class="properties.cssClasses">\n        <pb-input></pb-input>\n    </div>\n</div><div pb-property-values=\'c3d8216c-e311-419f-9944-2f7084bb627f\'>\n    <div ng-if="!properties.hidden" class="component col-xs-12  col-sm-12  col-md-3  col-lg-3" ng-class="properties.cssClasses">\n        <pb-input></pb-input>\n    </div>\n</div>\n    </div>\n\n    </div>\n</div>\n\n\n    </div>\n    <div class="row">\n        <div pb-property-values=\'c6df470d-ee50-42da-a0b9-5d39710f36dd\'>\n    <div ng-if="!properties.hidden" class="component col-xs-12  col-sm-12  col-md-12  col-lg-12" ng-class="properties.cssClasses">\n        <pb-input></pb-input>\n    </div>\n</div>\n    </div>\n</div>'
  };
});
