(function () {
  try {
    return angular.module('bonitasoft.ui.widgets');
  } catch(e) {
    return angular.module('bonitasoft.ui.widgets', []);
  }
})().directive('customLivingApplicationIFrame', function() {
    return {
      controllerAs: 'ctrl',
      controller: function WidgetlivingApplicationIFrameController($scope, $element, $interval, $sce) {
    var iframe = $element.find('iframe')[0];
    
    var polling = $interval(function() {
        if(iframe.contentDocument.documentElement){
			iframe.style.height = (iframe.contentDocument.documentElement.scrollHeight || 400) + "px";
		}
    }, 100);
    
    $scope.$on('$destroy', function() {
        $interval.cancel(polling);
    });
    
    $scope.secureUrl = function() {
        return $sce.trustAsResourceUrl($scope.properties.src);
    }
},
      template: '<iframe target="_top" width="100%" style="border: 0; min-height:{{properties.height}}" scrolling="no" ng-src="{{secureUrl()}}"></iframe>'
    };
  });
