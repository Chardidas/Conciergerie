var module;
try {
  module = angular.module('bonitasoft.ui.fragments');
} catch (e) {
  module = angular.module('bonitasoft.ui.fragments', []);
  angular.module('bonitasoft.ui').requires.push('bonitasoft.ui.fragments');
}
module.directive('pbFragmentLavageFragment', function() {
  return {
    template: '<div>    <div class="row">\n        <div pb-property-values=\'ffb3ad27-0795-4a78-95e1-3c18eb663886\'>\n    <div class="col-xs-12  col-sm-12  col-md-12  col-lg-12" ng-class="properties.cssClasses"\n         ng-if="!properties.hidden" >\n            <div class="row">\n        <div pb-property-values=\'fcf5e810-ca64-421b-8054-feb23f13915d\'>\n    <div ng-if="!properties.hidden" class="component col-xs-12  col-sm-12  col-md-6  col-lg-6" ng-class="properties.cssClasses">\n        <pb-input></pb-input>\n    </div>\n</div><div pb-property-values=\'0c64c244-244c-4d1f-9dfe-d912e2a35ba7\'>\n    <div ng-if="!properties.hidden" class="component col-xs-12  col-sm-12  col-md-6  col-lg-6" ng-class="properties.cssClasses">\n        <pb-input></pb-input>\n    </div>\n</div>\n    </div>\n    <div class="row">\n        <div pb-property-values=\'8af4bd74-d036-42cb-bc18-ecbe0e052707\'>\n    <div ng-if="!properties.hidden" class="component col-xs-12  col-sm-12  col-md-12  col-lg-12" ng-class="properties.cssClasses">\n        <pb-radio-buttons></pb-radio-buttons>\n    </div>\n</div>\n    </div>\n    <div class="row">\n        <div pb-property-values=\'be84efac-8ae5-4445-806a-67ad3cdbc48d\'>\n    <div ng-if="!properties.hidden" class="component col-xs-12  col-sm-12  col-md-12  col-lg-12" ng-class="properties.cssClasses">\n        <pb-textarea></pb-textarea>\n    </div>\n</div>\n    </div>\n\n    </div>\n</div>\n\n\n    </div>\n</div>'
  };
});
