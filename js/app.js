"use strict";
var myApp = angular.module('myApp',['ui.router','ngCookies','ui.bootstrap','myApp.myCtrl','myApp.myService','myApp.myDirective']);

myApp.run(function($rootScope, AUTH_EVENTS, loginService){
    //路由改变时验证用户权限
    $rootScope.$on('$stateChangeStart', function (event, next ) {
        if(next && next.data){
            console.log("~~~~~~~~~~");
            var authorizedRoles = next.data.authorizedRoles;
            if (!loginService.isAuthorized(authorizedRoles)) {
                $rootScope.nextUrl = next.name;
                event.preventDefault();
                if (!loginService.isLogin()) {
                    $rootScope.$broadcast(AUTH_EVENTS.notLogin);
                } else {
                    $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
                }
            }
        }
    });
});


myApp.config(['$stateProvider','$urlRouterProvider','USER_ROLES',function($stateProvider,$urlRouterProvider,USER_ROLES) {
    $urlRouterProvider.otherwise('/list');
	$stateProvider.state(
        {
            name: 'home',
            url: '/home',
            controller:'homeCtrl',
            templateUrl: 'tpls/home.html',
            data: {
                authorizedRoles: [USER_ROLES.admin,USER_ROLES.editor]
            }
        }
    ).state({
        name: 'list',
        url: '/list',
        controller:'listCtrl',
        templateUrl: 'tpls/list.html'
    }).state(
        {
            name: 'login',
            url: '/login',
            controller:'loginCtrl',
            templateUrl: 'tpls/login.html'
        }
    )
}]);

//myApp.config(function ($httpProvider) {
//    $httpProvider.interceptors.push([
//        '$injector',
//        function ($injector) {
//            return $injector.get('LoginInterceptor');
//        }
//    ]);
//}).factory('LoginInterceptor', function ($rootScope, $q,
//                                        AUTH_EVENTS) {
//    return {
//        responseError: function (response) {
//            $rootScope.$broadcast({
//                401: AUTH_EVENTS.notAuthenticated,
//                403: AUTH_EVENTS.notAuthorized,
//                419: AUTH_EVENTS.sessionTimeout,
//                440: AUTH_EVENTS.sessionTimeout
//            }[response.status], response);
//            return $q.reject(response);
//        }
//    };
//});









