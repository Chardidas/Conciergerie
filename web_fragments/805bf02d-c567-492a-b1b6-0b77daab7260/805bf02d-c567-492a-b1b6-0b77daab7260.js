var module;
try {
  module = angular.module('bonitasoft.ui.fragments');
} catch (e) {
  module = angular.module('bonitasoft.ui.fragments', []);
  angular.module('bonitasoft.ui').requires.push('bonitasoft.ui.fragments');
}
module.directive('pbFragmentEchangesFragment', function() {
  return {
    template: '<div>    <div class="row">\n        <div pb-property-values=\'094cca90-243f-4e4b-90c2-96b7e7fad830\'>\n    <div ng-if="!properties.hidden" class="component col-xs-12  col-sm-12  col-md-12  col-lg-12" ng-class="properties.cssClasses">\n        <custom-echanges-c-w></custom-echanges-c-w>\n    </div>\n</div>\n    </div>\n    <div class="row">\n        <div pb-property-values=\'0498eaac-5d5c-4a77-8ca5-f3c3902a5f0b\'>\n    <div ng-if="!properties.hidden" class="component col-xs-12  col-sm-12  col-md-12  col-lg-12" ng-class="properties.cssClasses">\n        <pb-textarea></pb-textarea>\n    </div>\n</div>\n    </div>\n</div>'
  };
});
