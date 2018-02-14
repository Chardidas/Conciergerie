(function () {
  try {
    return angular.module('bonitasoft.ui.widgets');
  } catch(e) {
    return angular.module('bonitasoft.ui.widgets', []);
  }
})().directive('customAutocompleteKey', function() {
    return {
      controllerAs: 'ctrl',
      controller: function PbAutocompleteCtrl($scope, $parse, $log, widgetNameFactory) {

  'use strict';
  var vm=this;
  

  function createGetter(accessor) {
    return accessor && $parse(accessor);
  }

  this.expl='';
  this.getvalue = function () {

      if ( ! $scope.properties.returnKey ) {
        $scope.properties.value = this.valuebrut;
        this.expl="noreturnkey";
        return this.valuebrut;
      } else {
        $scope.properties.value = this.valuebrut[ $scope.properties.returnKey ];
        this.expl="returnkey["+$scope.properties.returnKey+"]";
        return this.valuebrut[ $scope.properties.returnKey ];
      }
  }
  this.setvalue = function ( value ) {
      if (! $scope.properties.returnKey) {
        // we can not do that
      } else if (! $scope.properties.availableValues ) {
          console.log( "availableValues is undefined");
      } else {
    
        console.log( "Set Value Avaialable value=["+JSON.stringify($scope.properties.availableValues)+"]");
              
          for (var i=0; i<  $scope.properties.availableValues.length; i++) {
              var item =  $scope.properties.availableValues[ i ];
              if (item[ $scope.properties.returnKey ] == value)
              {
                   // console.log( "Set valuebrut=["+JSON.stringify(item)+"]");
                  this.valuebrut = item;
              }
          }
      }
  }
  
  
  this.getLabel = createGetter($scope.properties.displayedKey) || function (item) {
    return typeof item === 'string' ? item : JSON.stringify(item);
  };

  this.name = widgetNameFactory.getName('customAutocompleteExt');

  if (!$scope.properties.isBound('value')) {
    $log.error('the customAutocompleteExt property named "value" need to be bound to a variable');
  }
  
  
  // wait available value and when it's arrive, use it
 $scope.$watch('properties.availableValues', function() {
    // console.log( "CALL Avaialable value=["+JSON.stringify($scope.properties.availableValues)+"]");
     vm.setvalue( $scope.properties.value );
     
 });
  
  this.setvalue( $scope.properties.value);
  
 // $scope.$watch('properties.value', function() {
 //    this.setvalue( $scope.properties.value );
  // });
 
 
}
,
      template: '<div ng-class="{\n    \'form-horizontal\': properties.labelPosition === \'left\' && !properties.labelHidden,\n    \'row\': properties.labelPosition === \'top\' && !properties.labelHidden || properties.labelHidden\n    }">\n    <div class="form-group">\n        <label\n            ng-if="!properties.labelHidden"\n            ng-class="{ \'control-label--required\': properties.required }"\n            class="control-label col-xs-{{ !properties.labelHidden && properties.labelPosition === \'left\' ? properties.labelWidth : 12 }}">\n            {{ properties.label | uiTranslate }}\n        </label>\n        <div class="col-xs-{{ 12 - (!properties.labelHidden && properties.labelPosition === \'left\' ? properties.labelWidth : 0) }}" >\n            <input\n                type="text"\n                class="form-control"\n                placeholder="{{ properties.placeholder | uiTranslate }}"\n                typeahead-append-to-body="true"\n                typeahead="item as ctrl.getLabel(item) for item in properties.availableValues | filter:$viewValue"\n                typeahead-template-url="customTypeaheadForInputAutocomplete.html"\n                ng-model="ctrl.valuebrut"\n                name="{{ctrl.name}}"\n                ng-required="properties.required"\n                ng-readonly="properties.readOnly">\n\n            <div ng-messages="$form[ctrl.name].$dirty && $form[ctrl.name].$error " ng-messages-include="forms-generic-errors.html" role="alert"></div>\n\n            <span style="visibility:hidden;">{{ctrl.getvalue()}}</span>\n            <!-- It doesn\'t work if we put it inside form.html -->\n            <script type="text/ng-template" id="customTypeaheadForInputAutocomplete.html">\n                <a  bind-html-unsafe="match.label | typeaheadHighlight:query"></a>\n            </script>\n        </div>\n    </div>\n</div>\n'
    };
  });
