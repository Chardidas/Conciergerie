var module;
try {
  module = angular.module('bonitasoft.ui.fragments');
} catch (e) {
  module = angular.module('bonitasoft.ui.fragments', []);
  angular.module('bonitasoft.ui').requires.push('bonitasoft.ui.fragments');
}
module.directive('pbFragmentBandeauActions', function() {
  return {
    template: '<div>    <div class="row">\n        <div pb-property-values=\'94dfcf37-286b-4128-bee0-13d5cec4f337\'>\n    <div class="col-xs-12  col-sm-12  col-md-7  col-lg-7" ng-class="properties.cssClasses"\n         ng-if="!properties.hidden" ng-repeat="$item in ($collection = properties.repeatedCollection) track by $index">\n            <div class="row">\n        <div pb-property-values=\'3e634b26-b732-4ae1-be0c-e9c0e719e260\'>\n    <div ng-if="!properties.hidden" class="component col-xs-12  col-sm-12  col-md-12  col-lg-12" ng-class="properties.cssClasses">\n        <pb-link></pb-link>\n    </div>\n</div>\n    </div>\n\n    </div>\n</div>\n\n<div pb-property-values=\'efef2fcd-9d7d-445b-9756-0de6330be198\'>\n    <div ng-if="!properties.hidden" class="component col-xs-12  col-sm-12  col-md-1  col-lg-1" ng-class="properties.cssClasses">\n        <custom-button-close-modal></custom-button-close-modal>\n    </div>\n</div><div pb-property-values=\'951a9b3b-31cf-4e65-aa9a-171d7c6aa1c0\'>\n    <div ng-if="!properties.hidden" class="component col-xs-12  col-sm-12  col-md-1  col-lg-1" ng-class="properties.cssClasses">\n        <pb-button></pb-button>\n    </div>\n</div><div pb-property-values=\'22c4bc62-3748-4d52-a41e-9dfe4df72a65\'>\n    <div ng-if="!properties.hidden" class="component col-xs-12  col-sm-12  col-md-3  col-lg-3" ng-class="properties.cssClasses">\n        <custom-button-with-print></custom-button-with-print>\n    </div>\n</div>\n    </div>\n    <div class="row">\n        <div pb-property-values=\'02a84c61-6e4e-49f3-8ccd-32af689cbfc5\'>\n    <div ng-if="!properties.hidden" class="component col-xs-12  col-sm-12  col-md-12  col-lg-12" ng-class="properties.cssClasses">\n        <pb-text></pb-text>\n    </div>\n</div>\n    </div>\n</div>'
  };
});
