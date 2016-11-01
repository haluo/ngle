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

myDirective.directive('loginShow',function($rootScope,$state,$uibModal,AUTH_EVENTS,loginService){
   return {
       restrict: 'AE',
       templateUrl:'js/directives/tpls/login.html',
       link:function($scope){
           var showLogin = function(event,data){
               var modalInstance = $uibModal.open({
                   animation: true,
                   ariaLabelledBy: 'modal-title',
                   ariaDescribedBy: 'modal-body',
                   templateUrl: 'myModalContent.html',
                   controller : 'loginModalCtrl',
                   size:'sm'
               });

               modalInstance.result.then(function (user) {
                   //$ctrl.selected = selectedItem;
                   console.log("login in user :"+(user.name)+" pass:"+(user.passwd)+" dara:"+data);
                   loginService.login(user);
                   $state.go(data);
               }, function () {
                   console.log("login show 2");
               });
           };
           $scope.$on(AUTH_EVENTS.notLogin, showLogin);
       }
   }
});
