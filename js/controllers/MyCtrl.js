/**
 * Created by JesseZhu on 16/10/25.
 */



var app = angular.module("myApp.myCtrl",[]);


//全局 防止污染rootscope
app.controller("ApplicationController",function($scope,USER_ROLES,AUTH_EVENTS,loginService,$location){
    $scope.userRoles = USER_ROLES;
    $scope.isAuthorized = loginService.isAuthorized;
    $scope.isLogin = loginService.isLogin;
    $scope.getCurrentUser = loginService.getCurrentUser;
    $scope.logout = loginService.logout;
    $scope.urlActive = function (url){
        return url === $location.path();
    }
    $scope.login = function(){
        $scope.$broadcast(AUTH_EVENTS.notLogin,"list")
    }
});

app.controller('loginModalCtrl',function($scope,$uibModalInstance){
    $scope.ok = function(user){
        $uibModalInstance.close(user); //关闭并返回当前选项
    };
    $scope.cancel = function(){
        $uibModalInstance.dismiss('cancel'); // 退出
    }
});


app.controller("homeCtrl",function(){

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

