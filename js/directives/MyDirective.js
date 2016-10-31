/**
 * Created by JesseZhu on 16/10/26.
 */


var myDirective  = angular.module("myApp.myDirective",[]);

myDirective.directive('loginDialog', function (AUTH_EVENTS) {
    return {
        restrict: 'A',
        template: '<div ng-if="visible" ng-include="\'tpls/login.html\'">',
        link: function (scope) {
            var showDialog = function () {
                scope.visible = true;
            };

            scope.visible = false;
            scope.$on(AUTH_EVENTS.notAuthenticated, showDialog);
            scope.$on(AUTH_EVENTS.sessionTimeout, showDialog);
            scope.$on(AUTH_EVENTS.notLogin, showDialog);
        }
    };
});
myDirective.directive('loginShow',function($uibModal,AUTH_EVENTS,$log){
   return {
       restrict: 'A',
       link:function($scope){
           var showLogin = function(){
               var modalInstance = $uibModal.open({
                   animation: true,
                   ariaLabelledBy: 'modal-title',
                   ariaDescribedBy: 'modal-body',
                   templateUrl: 'myModalContent.html',
                   controller: 'ApplicationController'
                   //size:'sm'
                   //,
                   //resolve: {
                   //    items: function () {
                   //        return $ctrl.items;
                   //    }
                   //}
               });

               modalInstance.result.then(function () {
                   //$ctrl.selected = selectedItem;
                   console.log("login show 1");
               }, function () {
                   console.log("login show 2");
               });
               $scope.$modalInstance = modalInstance;
           };
           $scope.$on(AUTH_EVENTS.notAuthenticated, showLogin);
           $scope.$on(AUTH_EVENTS.sessionTimeout, showLogin);
           $scope.$on(AUTH_EVENTS.notLogin, showLogin);
           $scope.ok = function () {
               //scope.$modalInstance.close();
               $log.log("1111");
           };

           $scope.cancel = function () {
               //scope.$modalInstance.dismiss('cancel');
           };
       }
   }
});