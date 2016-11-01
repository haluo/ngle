/**
 * Created by JesseZhu on 16/10/25.
 */



var app = angular.module("myApp.myCtrl",[]);


//全局 防止污染rootscope
app.controller("ApplicationController",function($scope,USER_ROLES,loginService,$uibModal){
    //$scope.currentUser = null;
    //$scope.userRoles = USER_ROLES;
    //$scope.isAuthorized = loginService.isAuthorized;
    //
    //$scope.setCurrentUser = function (user) {
    //    $scope.currentUser = user;
    //};
    //$scope.ok = function ok() {
    //    $scope.$modalInstance.close();
    //    //$log.log("1111");
    //};
    //
    //$scope.cancel = function cancel() {
    //    $scope.$modalInstance.dismiss('cancel');
    //};

});

app.controller('LoginModalCtrl',function($scope,$uibModalInstance){
    $scope.user={
        name:'',
        passwd:''
    };
    $scope.ok = function(){
        $uibModalInstance.close($scope.user); //关闭并返回当前选项
    };
    $scope.cancel = function(){
        $uibModalInstance.dismiss('cancel'); // 退出
    }
});


app.controller("homeCtrl",function($scope,$log,$cookieStore,$state){
    $scope.user = {};
    $scope.user.name = $cookieStore.get("cname");
    $log.log("---->"+$scope.user.name);
    $scope.logOut = function(){
        $scope.user = {};
        $cookieStore.remove("cname");
        $state.go("home");
    }
});
app.controller("listCtrl",function($scope,$log,listService){

    $scope.pager = listService.getData(1,10);
    $scope.pageChanged = function() {
        $scope.pager = listService.getData($scope.pager.currentPage,$scope.pager.numPerPage);
    };
});
app.controller("loginCtrl",function($scope,$log,$rootScope,loginService,AUTH_EVENTS){
    $scope.login = function(user) {
        //$log.log($scope.user.name);
        //$cookieStore.put("cname",$scope.user.name);
        //$state.go("home");
        loginService.login(user).then(function(user){
            $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
        },function(){

        })
    };
});

