var module;
try {
  module = angular.module('bonitasoft.ui.fragments');
} catch (e) {
  module = angular.module('bonitasoft.ui.fragments', []);
  angular.module('bonitasoft.ui').requires.push('bonitasoft.ui.fragments');
}
module.directive('pbFragmentDemandeServiceFragment', function() {
  return {
    template: '<div>    <div class="row">\n        <div pb-property-values=\'b88bc2b0-f67c-41ff-87c8-15d6a90cbcd7\'>\n    <div ng-if="!properties.hidden" class="component col-md-12  col-sm-12  col-xs-12  col-lg-12" ng-class="properties.cssClasses">\n        <pb-title></pb-title>\n    </div>\n</div>\n    </div>\n    <div class="row">\n        <div pb-property-values=\'c231c6e6-b92a-49eb-a3fd-ffb25403d610\'>\n    <div ng-if="!properties.hidden" class="component col-xs-12  col-sm-12  col-md-12  col-lg-12" ng-class="properties.cssClasses">\n        <pb-title></pb-title>\n    </div>\n</div>\n    </div>\n    <div class="row">\n        <div pb-property-values=\'fa536f5f-d344-46b5-a2b0-11b9f7da978a\'>\n    <div class="col-xs-12  col-sm-12  col-md-12  col-lg-12" ng-class="properties.cssClasses" ng-if="!properties.hidden">\n        <tabset>\n                <tab>\n                    <tab-heading ui-translate>Demande</tab-heading>\n                    <div pb-property-values=\'fd5af477-66ef-4f65-a21b-dfb5533860bb\'>\n    <div class="col-xs-12" ng-class="properties.cssClasses"\n         ng-if="!properties.hidden" >\n            <div class="row">\n        <div pb-property-values=\'ffe27df0-ffcf-4fe0-83aa-babaed5c8700\'>\n    <div ng-if="!properties.hidden" class="component col-md-12  col-sm-12  col-xs-12  col-lg-12" ng-class="properties.cssClasses">\n        <pb-input></pb-input>\n    </div>\n</div>\n    </div>\n    <div class="row">\n        <div pb-property-values=\'7c8148d4-a0ed-479d-8cca-f210246afbb5\'>\n    <div ng-if="!properties.hidden" class="component col-xs-12  col-sm-12  col-md-6  col-lg-6" ng-class="properties.cssClasses">\n        <pb-input></pb-input>\n    </div>\n</div><div pb-property-values=\'49ce6ad9-061a-46cf-97e3-ff3c6b385f7c\'>\n    <div ng-if="!properties.hidden" class="component col-xs-12  col-sm-12  col-md-6  col-lg-6" ng-class="properties.cssClasses">\n        <pb-input></pb-input>\n    </div>\n</div>\n    </div>\n    <div class="row">\n        <div pb-property-values=\'664f04d5-a192-422b-b53e-88170da5c5f6\'>\n    <div pb-model=\'b050de3c-44b6-4ba9-92b0-e7ff02231727\' pb-model-properties=\'664f04d5-a192-422b-b53e-88170da5c5f6\'>\n        <pb-fragment-familles-fragment class="col-xs-12  col-sm-12  col-md-12  col-lg-12" ng-class="properties.cssClasses" ng-if="!properties.hidden">\n        </pb-fragment-familles-fragment>\n    </div>\n</div>\n\n    </div>\n    <div class="row">\n        <div pb-property-values=\'1a337efc-dccf-4b3a-958f-174e69d814f5\'>\n    <div ng-if="!properties.hidden" class="component col-xs-12  col-sm-12  col-md-12  col-lg-12" ng-class="properties.cssClasses">\n        <pb-title></pb-title>\n    </div>\n</div>\n    </div>\n    <div class="row">\n        <div pb-property-values=\'f69c90b1-e0c4-4be3-b725-cf7551eaf52a\'>\n    <div ng-if="!properties.hidden" class="component col-xs-12  col-sm-12  col-md-12  col-lg-12" ng-class="properties.cssClasses">\n        <pb-title></pb-title>\n    </div>\n</div>\n    </div>\n    <div class="row">\n        <div pb-property-values=\'466bc756-a305-46be-abe7-54e35a99dd42\'>\n    <div ng-if="!properties.hidden" class="component col-xs-12  col-sm-12  col-md-12  col-lg-12" ng-class="properties.cssClasses">\n        <pb-title></pb-title>\n    </div>\n</div>\n    </div>\n    <div class="row">\n        <div pb-property-values=\'a87a425d-b152-4fb2-bafa-aa2587e797ec\'>\n    <div pb-model=\'afea4243-5331-4f68-add0-cacafe445b8d\' pb-model-properties=\'a87a425d-b152-4fb2-bafa-aa2587e797ec\'>\n        <pb-fragment-lavage-fragment class="col-xs-12  col-sm-12  col-md-12  col-lg-12" ng-class="properties.cssClasses" ng-if="!properties.hidden">\n        </pb-fragment-lavage-fragment>\n    </div>\n</div>\n\n    </div>\n    <div class="row">\n        <div pb-property-values=\'1791dff2-6e7b-45e3-b105-688f3e2204e2\'>\n    <div pb-model=\'43b81f75-0b4d-4016-a54b-51062e6b4feb\' pb-model-properties=\'1791dff2-6e7b-45e3-b105-688f3e2204e2\'>\n        <pb-fragment-revision-entretien-reparation-fragment class="col-xs-12  col-sm-12  col-md-12  col-lg-12" ng-class="properties.cssClasses" ng-if="!properties.hidden">\n        </pb-fragment-revision-entretien-reparation-fragment>\n    </div>\n</div>\n\n    </div>\n    <div class="row">\n        <div pb-property-values=\'37ecae18-2c90-4f46-8351-9b5e1297f5c2\'>\n    <div pb-model=\'c59120af-60a4-4207-99b0-a9a2c9bd4668\' pb-model-properties=\'37ecae18-2c90-4f46-8351-9b5e1297f5c2\'>\n        <pb-fragment-pneus-fragment class="col-xs-12  col-sm-12  col-md-12  col-lg-12" ng-class="properties.cssClasses" ng-if="!properties.hidden">\n        </pb-fragment-pneus-fragment>\n    </div>\n</div>\n\n    </div>\n    <div class="row">\n        <div pb-property-values=\'ccf56f5b-e75f-47ce-be81-596fecc5c433\'>\n    <div pb-model=\'f0388863-2364-406a-a708-c3a62538a49b\' pb-model-properties=\'ccf56f5b-e75f-47ce-be81-596fecc5c433\'>\n        <pb-fragment-controle-technique-fragment class="col-xs-12  col-sm-12  col-md-12  col-lg-12" ng-class="properties.cssClasses" ng-if="!properties.hidden">\n        </pb-fragment-controle-technique-fragment>\n    </div>\n</div>\n\n    </div>\n    <div class="row">\n        <div pb-property-values=\'5ccde92b-557d-499a-b5cb-c8ca851b0f80\'>\n    <div pb-model=\'04777f2c-7a99-4b51-ad63-264affcc77d5\' pb-model-properties=\'5ccde92b-557d-499a-b5cb-c8ca851b0f80\'>\n        <pb-fragment-recherche-artisan-fragment class="col-xs-12  col-sm-12  col-md-12  col-lg-12" ng-class="properties.cssClasses" ng-if="!properties.hidden">\n        </pb-fragment-recherche-artisan-fragment>\n    </div>\n</div>\n\n    </div>\n    <div class="row">\n        <div pb-property-values=\'c5f15b77-27c6-4775-85ca-31996d44c032\'>\n    <div pb-model=\'f481f2ac-101c-4197-b1f4-8341769d5b0c\' pb-model-properties=\'c5f15b77-27c6-4775-85ca-31996d44c032\'>\n        <pb-fragment-service-a-domicile-fragment class="col-xs-12  col-sm-12  col-md-12  col-lg-12" ng-class="properties.cssClasses" ng-if="!properties.hidden">\n        </pb-fragment-service-a-domicile-fragment>\n    </div>\n</div>\n\n    </div>\n    <div class="row">\n        <div pb-property-values=\'83733766-df03-4116-9bd9-a7859584fe30\'>\n    <div pb-model=\'38bde3f7-746a-4e05-94d1-6b0642519942\' pb-model-properties=\'83733766-df03-4116-9bd9-a7859584fe30\'>\n        <pb-fragment-courses-autres-fragment class="col-xs-12  col-sm-12  col-md-12  col-lg-12" ng-class="properties.cssClasses" ng-if="!properties.hidden">\n        </pb-fragment-courses-autres-fragment>\n    </div>\n</div>\n\n    </div>\n    <div class="row">\n        <div pb-property-values=\'bd77719c-ca31-42f1-aa54-080e67678643\'>\n    <div pb-model=\'ddb8fd53-90b7-4d80-9dc8-3abd31b05845\' pb-model-properties=\'bd77719c-ca31-42f1-aa54-080e67678643\'>\n        <pb-fragment-demarches-administratives-services-postaux-fragment class="col-xs-12  col-sm-12  col-md-12  col-lg-12" ng-class="properties.cssClasses" ng-if="!properties.hidden">\n        </pb-fragment-demarches-administratives-services-postaux-fragment>\n    </div>\n</div>\n\n    </div>\n    <div class="row">\n        <div pb-property-values=\'de8640d3-c70b-4182-a420-b1af0347730e\'>\n    <div pb-model=\'d3ff1daa-f1b4-4acb-b5f5-5d770d31e91d\' pb-model-properties=\'de8640d3-c70b-4182-a420-b1af0347730e\'>\n        <pb-fragment-services-rendus-fragment class="col-xs-12  col-sm-12  col-md-12  col-lg-12" ng-class="properties.cssClasses" ng-if="!properties.hidden">\n        </pb-fragment-services-rendus-fragment>\n    </div>\n</div>\n\n    </div>\n\n    </div>\n</div>\n\n\n                </tab>\n                <tab>\n                    <tab-heading ui-translate>Pièces jointes</tab-heading>\n                    <div pb-property-values=\'5d8671ed-1468-4d0a-8ae3-ba83d5b4a36f\'>\n    <div class="col-xs-12" ng-class="properties.cssClasses"\n         ng-if="!properties.hidden" >\n            <div class="row">\n        <div pb-property-values=\'c892c514-f1ee-400d-a68b-bc1131e7007b\'>\n    <div ng-if="!properties.hidden" class="component col-xs-12  col-sm-12  col-md-12  col-lg-12" ng-class="properties.cssClasses">\n        <pb-title></pb-title>\n    </div>\n</div>\n    </div>\n    <div class="row">\n        <div pb-property-values=\'d341d714-ce16-414a-ad0a-a926943f6af2\'>\n    <div ng-if="!properties.hidden" class="component col-xs-12  col-sm-12  col-md-12  col-lg-12" ng-class="properties.cssClasses">\n        <pb-title></pb-title>\n    </div>\n</div>\n    </div>\n    <div class="row">\n        <div pb-property-values=\'2a59ad08-1d64-4450-8ab7-69337e14f527\'>\n    <div class="col-xs-12  col-sm-12  col-md-12  col-lg-12" ng-class="properties.cssClasses"\n         ng-if="!properties.hidden" ng-repeat="$item in ($collection = properties.repeatedCollection) track by $index">\n            <div class="row">\n        <div pb-property-values=\'dd1dddf6-110e-4bfa-8853-b4e66cf930e3\'>\n    <div ng-if="!properties.hidden" class="component col-xs-12  col-sm-12  col-md-12  col-lg-12" ng-class="properties.cssClasses">\n        <pb-link></pb-link>\n    </div>\n</div>\n    </div>\n\n    </div>\n</div>\n\n\n    </div>\n    <div class="row">\n        <div pb-property-values=\'291dfcc2-ea16-40ba-a983-99a0c4ab8e29\'>\n    <div class="col-xs-12  col-sm-12  col-md-12  col-lg-12" ng-class="properties.cssClasses"\n         ng-if="!properties.hidden" ng-repeat="$item in ($collection = properties.repeatedCollection) track by $index">\n            <div class="row">\n        <div pb-property-values=\'2dc93f73-d1ac-4bd5-8d69-b3ff4090eba9\'>\n    <div ng-if="!properties.hidden" class="component col-xs-12  col-sm-12  col-md-6  col-lg-6" ng-class="properties.cssClasses">\n        <pb-upload></pb-upload>\n    </div>\n</div><div pb-property-values=\'e0f195a8-8690-4b7a-871d-850067a3b7c6\'>\n    <div ng-if="!properties.hidden" class="component col-xs-12  col-sm-12  col-md-6  col-lg-6" ng-class="properties.cssClasses">\n        <pb-button></pb-button>\n    </div>\n</div>\n    </div>\n\n    </div>\n</div>\n\n\n    </div>\n    <div class="row">\n        <div pb-property-values=\'6ea0c8e1-5ff8-4f99-9853-0b8ea168ad3e\'>\n    <div ng-if="!properties.hidden" class="component col-xs-12  col-sm-12  col-md-12  col-lg-12" ng-class="properties.cssClasses">\n        <pb-button></pb-button>\n    </div>\n</div>\n    </div>\n\n    </div>\n</div>\n\n\n                </tab>\n                <tab>\n                    <tab-heading ui-translate>Echanges</tab-heading>\n                    <div pb-property-values=\'33cbb82b-4199-4bec-88cd-1ed9fdda4e27\'>\n    <div class="col-xs-12" ng-class="properties.cssClasses"\n         ng-if="!properties.hidden" >\n            <div class="row">\n        <div pb-property-values=\'96c3e62b-20d0-4c88-b335-6e8fb8e6e0d7\'>\n    <div pb-model=\'805bf02d-c567-492a-b1b6-0b77daab7260\' pb-model-properties=\'96c3e62b-20d0-4c88-b335-6e8fb8e6e0d7\'>\n        <pb-fragment-echanges-fragment class="col-xs-12  col-sm-12  col-md-12  col-lg-12" ng-class="properties.cssClasses" ng-if="!properties.hidden">\n        </pb-fragment-echanges-fragment>\n    </div>\n</div>\n\n    </div>\n\n    </div>\n</div>\n\n\n                </tab>\n        </tabset>\n    </div>\n</div>\n\n    </div>\n    <div class="row">\n        <div pb-property-values=\'22d612b1-625f-437a-aee9-541a290c28e6\'>\n    <div ng-if="!properties.hidden" class="component col-xs-12  col-sm-12  col-md-12  col-lg-12" ng-class="properties.cssClasses">\n        <pb-title></pb-title>\n    </div>\n</div>\n    </div>\n    <div class="row">\n        <div pb-property-values=\'abb73655-2152-40b7-9b00-25fa38bbb00c\'>\n    <div ng-if="!properties.hidden" class="component col-xs-12  col-sm-12  col-md-12  col-lg-12" ng-class="properties.cssClasses">\n        <pb-text></pb-text>\n    </div>\n</div>\n    </div>\n</div>'
  };
});
