var module;
try {
  module = angular.module('bonitasoft.ui.fragments');
} catch (e) {
  module = angular.module('bonitasoft.ui.fragments', []);
  angular.module('bonitasoft.ui').requires.push('bonitasoft.ui.fragments');
}
module.directive('pbFragmentRevisionEntretienReparationFragment', function() {
  return {
    template: '<div>    <div class="row">\n        <div pb-property-values=\'8fa4c38f-265f-49c0-8df8-64c10f7d39dc\'>\n    <div ng-if="!properties.hidden" class="component col-xs-12  col-sm-12  col-md-6  col-lg-6" ng-class="properties.cssClasses">\n        <pb-input></pb-input>\n    </div>\n</div><div pb-property-values=\'0405fc27-a590-4fd4-9e30-aeef3560baa8\'>\n    <div ng-if="!properties.hidden" class="component col-xs-12  col-sm-12  col-md-6  col-lg-6" ng-class="properties.cssClasses">\n        <pb-input></pb-input>\n    </div>\n</div>\n    </div>\n    <div class="row">\n        <div pb-property-values=\'8c89c8f3-e504-4295-85a0-7b9b9610baad\'>\n    <div ng-if="!properties.hidden" class="component col-xs-12  col-sm-12  col-md-6  col-lg-6" ng-class="properties.cssClasses">\n        <pb-input></pb-input>\n    </div>\n</div>\n    </div>\n    <div class="row">\n        <div pb-property-values=\'1b99f2e8-5d0f-4944-86d1-d73102769c96\'>\n    <div ng-if="!properties.hidden" class="component col-xs-12  col-sm-12  col-md-12  col-lg-12" ng-class="properties.cssClasses">\n        <pb-upload></pb-upload>\n    </div>\n</div>\n    </div>\n    <div class="row">\n        <div pb-property-values=\'ccf083d3-d0fb-4ef3-b75d-60a590e6681e\'>\n    <div ng-if="!properties.hidden" class="component col-xs-12  col-sm-12  col-md-12  col-lg-12" ng-class="properties.cssClasses">\n        <pb-link></pb-link>\n    </div>\n</div>\n    </div>\n    <div class="row">\n        <div pb-property-values=\'e200fd4e-2441-45f8-9769-791b746751da\'>\n    <div ng-if="!properties.hidden" class="component col-xs-12  col-sm-12  col-md-12  col-lg-12" ng-class="properties.cssClasses">\n        <pb-textarea></pb-textarea>\n    </div>\n</div>\n    </div>\n    <div class="row">\n        <div pb-property-values=\'d46ca27a-01ba-45a8-a458-88b7509a3909\'>\n    <div ng-if="!properties.hidden" class="component col-xs-12  col-sm-12  col-md-12  col-lg-12" ng-class="properties.cssClasses">\n        <pb-textarea></pb-textarea>\n    </div>\n</div>\n    </div>\n</div>'
  };
});
