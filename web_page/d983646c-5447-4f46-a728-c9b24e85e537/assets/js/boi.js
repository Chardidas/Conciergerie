angular.module('bonitasoft.ui.extensions')
  .filter('camelToText', ['$window', function ($window) {
    return function camelToText(input) {
      return input.replace(/([A-Z])/g, ' $1').replace(/^./, function(str){ return str.toUpperCase(); });;
    };
}]);

angular.module('bonitasoft.ui.extensions')
  .filter('millisToDate', ['$window', function ($window) {
    return function millisToDate(input) {
      return moment(input).format("DD MMM YYYY hh:mm a")
    };
}]);
