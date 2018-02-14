(function () {
  try {
    return angular.module('bonitasoft.ui.widgets');
  } catch(e) {
    return angular.module('bonitasoft.ui.widgets', []);
  }
})().directive('customScrollDown', function() {
    return {
      controllerAs: 'ctrl',
      controller: function ($scope, $location, $anchorScroll) {
    'use strict';

  $scope.scrollDown = function(){
        window.parent.document.body.scrollTop = window.parent.document.body.scrollHeight;
    }
},
      template: ' <a style="background-color:#dbd8d8;width: 56px;height: 58px;position: fixed;right: 10px;z-index: 99;border-radius:10px" href="#" ng-click="scrollDown()">\n    <img src="widgets/customScrollDown/assets/img/down-arrow.png">\n</a>'
    };
  });
