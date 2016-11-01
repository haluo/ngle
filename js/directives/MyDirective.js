/**
 * Created by JesseZhu on 16/10/26.
 */


var myDirective  = angular.module("myApp.myDirective",[]);

//myDirective.directive('loginDialog', function (AUTH_EVENTS) {
//    return {
//        restrict: 'A',
//        template: '<div ng-if="visible" ng-include="\'tpls/login.html\'">',
//        link: function (scope) {
//            var showDialog = function () {
//                scope.visible = true;
//            };
//
//            scope.visible = false;
//            scope.$on(AUTH_EVENTS.notAuthenticated, showDialog);
//            scope.$on(AUTH_EVENTS.sessionTimeout, showDialog);
//            scope.$on(AUTH_EVENTS.notLogin, showDialog);
//        }
//    };
//});

myDirective.directive('loginShow',function($uibModal,AUTH_EVENTS,loginService){
   return {
       restrict: 'AE',
       templateUrl:'js/directives/tpls/login.html',
       scope:{},
       link:function($scope){
           var showLogin = function(){
               var modalInstance = $uibModal.open({
                   animation: true,
                   ariaLabelledBy: 'modal-title',
                   ariaDescribedBy: 'modal-body',
                   templateUrl: 'myModalContent.html',
                   controller : 'LoginModalCtrl',
                   size:'sm'

               });

               modalInstance.result.then(function (user) {
                   //$ctrl.selected = selectedItem;
                   console.log("login in user :"+(user.name)+" pass:"+(user.passwd));
                   loginService.login(user);
               }, function () {
                   console.log("login show 2");
               });
           };
           $scope.$on(AUTH_EVENTS.notAuthenticated, showLogin);
           $scope.$on(AUTH_EVENTS.sessionTimeout, showLogin);
           $scope.$on(AUTH_EVENTS.notLogin, showLogin);
       }
   }
});
