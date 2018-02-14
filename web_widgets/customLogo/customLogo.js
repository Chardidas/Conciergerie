(function () {
  try {
    return angular.module('bonitasoft.ui.widgets');
  } catch(e) {
    return angular.module('bonitasoft.ui.widgets', []);
  }
})().directive('customLogo', function() {
    return {
      controllerAs: 'ctrl',
      controller: function ($scope){
    var ctrl = this;
    var mainPath = window.top.location.pathname.split( '/' );
    var newPathname = "";
    
    for (var i = 1; i < mainPath.length - 2; i++) {
      newPathname += "/";
      newPathname += mainPath[i];
    }
    
    ctrl.defaultUrl = window.location.protocol + "//" + window.location.host + newPathname;
},
      template: '<a ng-if="properties.targetUrl != \'\'" href="{{ properties.targetUrl }}" target="{{ properties.targetBlank ? \'_blank\' : \'_self\' }}"> \n    <img class="img-responsive" ng-if="(properties.srcType ===\'Asset\' &amp;&amp; properties.assetName) || (properties.srcType !== \'Asset\' &amp;&amp; properties.url)" ng-src="{{ (properties.srcType===\'Asset\')? ((environment.editor.pageId) ? \'preview/page/\' + environment.editor.pageId + \'/\' : \'\' ) + \'assets/img/\' + properties.assetName : properties.url }}" alt="{{ properties.alt }}">\n    <img class="img-responsive" ng-if="!(properties.srcType ===\'Asset\' &amp;&amp; properties.assetName) &amp;&amp; !(properties.srcType !== \'Asset\' &amp;&amp; properties.url)" ng-src="data:image/svg+xml,%3Csvg%20xmlns%3D\'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg\'%20viewBox%3D\'0%200%2050%2020\'%3E%3Cpath%20fill%3D\'%23ccc\'%20d%3D\'M10%201v18h30V1H10zm29%2017H11V2h28v16zM20%209.1l3%203%205-7L36%2016H14l6-6.9zM18%206c0%201.1-.9%202-2%202s-2-.9-2-2%20.9-2%202-2%202%20.9%202%202z\'%2F%3E%3C%2Fsvg%3E">\n</a>\n\n<a ng-if="properties.targetUrl == \'\'" href="{{ ctrl.defaultUrl }}" target="{{ properties.targetBlank ? \'_blank\' : \'_self\' }}"> \n    <img class="img-responsive" ng-if="(properties.srcType ===\'Asset\' &amp;&amp; properties.assetName) || (properties.srcType !== \'Asset\' &amp;&amp; properties.url)" ng-src="{{ (properties.srcType===\'Asset\')? ((environment.editor.pageId) ? \'preview/page/\' + environment.editor.pageId + \'/\' : \'\' ) + \'assets/img/\' + properties.assetName : properties.url }}" alt="{{ properties.alt }}">\n    <img class="img-responsive" ng-if="!(properties.srcType ===\'Asset\' &amp;&amp; properties.assetName) &amp;&amp; !(properties.srcType !== \'Asset\' &amp;&amp; properties.url)" ng-src="data:image/svg+xml,%3Csvg%20xmlns%3D\'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg\'%20viewBox%3D\'0%200%2050%2020\'%3E%3Cpath%20fill%3D\'%23ccc\'%20d%3D\'M10%201v18h30V1H10zm29%2017H11V2h28v16zM20%209.1l3%203%205-7L36%2016H14l6-6.9zM18%206c0%201.1-.9%202-2%202s-2-.9-2-2%20.9-2%202-2%202%20.9%202%202z\'%2F%3E%3C%2Fsvg%3E">\n</a>'
    };
  });
