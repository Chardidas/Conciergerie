(function () {
  try {
    return angular.module('bonitasoft.ui.widgets');
  } catch(e) {
    return angular.module('bonitasoft.ui.widgets', []);
  }
})().directive('customHtml2pdf', function() {
    return {
      controllerAs: 'ctrl',
      controller: function generatePDF($scope) {
    this.clicked = function(){
    var fileName = $scope.properties.fileName;
    var widthCanvas = $scope.properties.width;
    var elementScope = $scope.properties.canvasScope;
    var selectedClass = $scope.properties.selectedClass;

    //first create canvas out of the entire body, and use then function that will be executed once the export is ready:
    if (elementScope == "body") {
        html2canvas(document.body).then(function(canvas){
        var imageFullQuality = canvas.toDataURL();
        var docDefinition = {
            content: [{
                image : imageFullQuality,
                width : widthCanvas,
            }]
        };
        new  pdfMake.createPdf(docDefinition).download(fileName + ".pdf");
        });
    }
    else {
        //current version supports only one element with the given class name (the first one in the page)
    html2canvas(document.querySelectorAll("."+selectedClass)[0]).then(function(canvas){
        var imageFullQuality = canvas.toDataURL();
            var docDefinition = {
                content: [{
                    image : imageFullQuality,
                    width : widthCanvas,
                }]
            };
            new  pdfMake.createPdf(docDefinition).download(fileName + ".pdf");
    });
    }
};
},
      template: '<!-- The custom widget template is defined here\n   - You can use standard HTML tags and AngularJS built-in directives, scope and interpolation system\n   - Custom widget properties defined on the right can be used as variables in a templates with properties.newProperty\n   - Functions exposed in the controller can be used with ctrl.newFunction()\n   - You can use the \'environment\' property injected in the scope when inside the Editor whiteboard. It allows to define a mockup\n     of the Custom Widget to be displayed in the whiteboard only. By default the widget is represented by an auto-generated icon\n     and its name (See the <span> below).\n-->\n \n<button ng-click="ctrl.clicked()" class="btn {{ properties.buttonStyle }}">{{ properties.label }}</button>'
    };
  });
