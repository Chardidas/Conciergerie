(function () {
  try {
    return angular.module('bonitasoft.ui.widgets');
  } catch(e) {
    return angular.module('bonitasoft.ui.widgets', []);
  }
})().directive('customLogin', function() {
    return {
      controllerAs: 'ctrl',
      controller: function WidgetsimpleButtonController($scope, $http, $location) {
    'use strict';
    var ctrl = this;
    var mainPath = window.top.location.pathname.split( '/' );
    var newPathname = "";
    
    for (var i = 1; i < mainPath.length - 2; i++) {
      newPathname += "/";
      newPathname += mainPath[i];
    }
  
    function getSession() {
       return  $http.get('/bonita/API/system/session/unusedid');
    }
    
    function getUser(id) {
        $http.get('/bonita/API/identity/user/'+id).success(function(data){
            $scope.firstName = data.firstname;
            $scope.lastName = data.lastname;
            $scope.icon = "/bonita/portal/attachmentImage?src="+data.icon;
        });
    }
    
    getSession().then(function(response) {
        var session = response.data;
        getUser(session.user_id);
    });

    $scope.logout = function(){
        
        $http.get('/bonita/logoutservice').
            success(function(data, status, headers, config) {
                if($scope.properties.redirectUrl){
                    window.top.location.href = "/bonita/login.jsp?redirectUrl=" + $scope.properties.redirectUrl;
                    
                    //Go back to actual page
                    //window.top.location.href = window.location.href;
                }else{
                    window.top.location.href = "/bonita/login.jsp?redirectUrl=" + newPathname;
                }
        });
    };
},
      template: '<style>\n    .login{\n        display:inline-block;\n    }\n    .login span{\n        display:inline-block;\n        margin:10px;\n    }\n    .login img{\n        display:inline-block; \n        max-width: 40px;\n        margin-top: 4px; \n        float: {{ properties.avatarAlignment }};\n    }\n</style>\n\n<div class="text-{{ properties.alignment }}">\n    <div class="login">\n        <span style="">{{ firstName }} {{ lastName }}</span>\n        <img ng-if="icon && properties.showAvatar" ng-src="{{ icon }}" class="img-responsive"/>\n    </div>\n    <a ng-click="logout()" ng-class="\'btn btn-\' + properties.buttonStyle">{{ properties.value | uiTranslate }}</a>\n</div>\n\n\n'
    };
  });
