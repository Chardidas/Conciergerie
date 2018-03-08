var module;
try {
  module = angular.module('bonitasoft.ui.fragments');
} catch (e) {
  module = angular.module('bonitasoft.ui.fragments', []);
  angular.module('bonitasoft.ui').requires.push('bonitasoft.ui.fragments');
}
module.directive('pbFragmentDemandeurFragment', function() {
  return {
    template: '<div>    <div class="row">\n        <div pb-property-values=\'1f2bdada-3073-4ebc-8cce-53903e7a5d8f\'>\n    <div ng-if="!properties.hidden" class="component col-xs-12  col-sm-12  col-md-12  col-lg-12" ng-class="properties.cssClasses">\n        <pb-title></pb-title>\n    </div>\n</div>\n    </div>\n    <div class="row">\n        <div pb-property-values=\'57ae4755-2cae-4d41-9b95-587a18141fa5\'>\n    <div ng-if="!properties.hidden" class="component col-xs-12  col-sm-12  col-md-12  col-lg-12" ng-class="properties.cssClasses">\n        <pb-checkbox></pb-checkbox>\n    </div>\n</div>\n    </div>\n    <div class="row">\n        <div pb-property-values=\'848f8995-b220-45b1-8f97-f9cddf905551\'>\n    <div class="col-xs-12  col-sm-12  col-md-12  col-lg-12" ng-class="properties.cssClasses"\n         ng-if="!properties.hidden" >\n            <div class="row">\n        <div pb-property-values=\'73de8a4f-ee9d-41e7-afbc-78d3e824cbbf\'>\n    <div ng-if="!properties.hidden" class="component col-xs-12  col-sm-12  col-md-9  col-lg-9" ng-class="properties.cssClasses">\n        <pb-input></pb-input>\n    </div>\n</div><div pb-property-values=\'0575a959-a2f3-4f60-99b0-a5bede33d471\'>\n    <div ng-if="!properties.hidden" class="component col-xs-12  col-sm-12  col-md-3  col-lg-3" ng-class="properties.cssClasses">\n        <pb-button></pb-button>\n    </div>\n</div>\n    </div>\n    <div class="row">\n        <div pb-property-values=\'2da9e514-28cb-44bc-bbd1-958dfce7b8ac\'>\n    <div ng-if="!properties.hidden" class="component col-xs-12  col-sm-12  col-md-12  col-lg-12" ng-class="properties.cssClasses">\n        <pb-data-table></pb-data-table>\n    </div>\n</div>\n    </div>\n    <div class="row">\n        <div pb-property-values=\'5bf5d602-fab4-45d1-aea1-f7b7775135fe\'>\n    <div ng-if="!properties.hidden" class="component col-xs-12  col-sm-12  col-md-12  col-lg-12" ng-class="properties.cssClasses">\n        <pb-text></pb-text>\n    </div>\n</div>\n    </div>\n\n    </div>\n</div>\n\n\n    </div>\n    <div class="row">\n        <div pb-property-values=\'276dd7d0-457c-435e-aeca-3e7c4e2e9e09\'>\n    <div ng-if="!properties.hidden" class="component col-xs-12  col-sm-12  col-md-12  col-lg-12" ng-class="properties.cssClasses">\n        <pb-text></pb-text>\n    </div>\n</div>\n    </div>\n    <div class="row">\n        <div pb-property-values=\'86646db7-e0ef-4006-aec8-c17a2b1c5057\'>\n    <div ng-if="!properties.hidden" class="component col-xs-12  col-sm-12  col-md-6  col-lg-6" ng-class="properties.cssClasses">\n        <pb-input></pb-input>\n    </div>\n</div><div pb-property-values=\'8e2e5f20-2f74-4370-8504-1a1fd73a3446\'>\n    <div ng-if="!properties.hidden" class="component col-xs-12  col-sm-12  col-md-6  col-lg-6" ng-class="properties.cssClasses">\n        <pb-input></pb-input>\n    </div>\n</div>\n    </div>\n    <div class="row">\n        <div pb-property-values=\'328d44ab-97ad-4a29-a87b-21fa7194d6e6\'>\n    <div ng-if="!properties.hidden" class="component col-xs-12  col-sm-12  col-md-6  col-lg-6" ng-class="properties.cssClasses">\n        <pb-input></pb-input>\n    </div>\n</div><div pb-property-values=\'bfc94005-64fc-4777-81e6-6ca5d7e6ad8d\'>\n    <div ng-if="!properties.hidden" class="component col-xs-12  col-sm-12  col-md-6  col-lg-6" ng-class="properties.cssClasses">\n        <pb-input></pb-input>\n    </div>\n</div>\n    </div>\n    <div class="row">\n        <div pb-property-values=\'8a0ada5d-853f-45ef-8810-d7bec48b808d\'>\n    <div ng-if="!properties.hidden" class="component col-xs-12  col-sm-12  col-md-12  col-lg-12" ng-class="properties.cssClasses">\n        <pb-title></pb-title>\n    </div>\n</div>\n    </div>\n</div>'
  };
});
