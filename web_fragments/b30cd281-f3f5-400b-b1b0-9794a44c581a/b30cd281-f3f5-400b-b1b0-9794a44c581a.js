var module;
try {
  module = angular.module('bonitasoft.ui.fragments');
} catch (e) {
  module = angular.module('bonitasoft.ui.fragments', []);
  angular.module('bonitasoft.ui').requires.push('bonitasoft.ui.fragments');
}
module.directive('pbFragmentConfirmationPageVodafone', function() {
  return {
    template: '<div>    <div class="row">\n        <div pb-property-values=\'ea278f18-135f-4131-952c-6b87cc14c9a8\'>\n    <div class="col-lg-12  col-md-12  col-sm-12  col-xs-12" ng-class="properties.cssClasses"\n         ng-if="!properties.hidden" >\n            <div class="row">\n        <div pb-property-values=\'5d7c0ff6-144b-47f2-8c80-dc81904f5a4f\'>\n    <div ng-if="!properties.hidden" class="component col-lg-12  col-md-12  col-sm-12  col-xs-12" ng-class="properties.cssClasses">\n        <pb-text></pb-text>\n    </div>\n</div>\n    </div>\n    <div class="row">\n        <div pb-property-values=\'6736a6d3-1b04-46d9-8ff4-60580a8c3ac6\'>\n    <div ng-if="!properties.hidden" class="component col-lg-12  col-md-12  col-sm-12  col-xs-12" ng-class="properties.cssClasses">\n        <custom-button-with-redirect></custom-button-with-redirect>\n    </div>\n</div>\n    </div>\n\n    </div>\n</div>\n\n\n    </div>\n</div>'
  };
});
