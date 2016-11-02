"use strict";
var myApp = angular.module('myApp', ['ui.router', 'ngCookies', 'ui.bootstrap','highcharts-ng','myApp.myCtrl', 'myApp.myService', 'myApp.myDirective']);

myApp.run(function ($rootScope, AUTH_EVENTS,MENUS, loginService) {
    //路由改变时验证用户权限
    $rootScope.$on('$stateChangeStart', function (event, next){
        if(next){
            var url = next.url;
            for(var key in MENUS){
                console.log(key);
                if(url.indexOf(key)!=-1){
                    MENUS[key].isOpen = true;
                }else {
                    MENUS[key].isOpen = false;
                }
            }
        }
        if (next && next.data) {
            var authorizedRoles = next.data.authorizedRoles;
            if (!loginService.isAuthorized(authorizedRoles)) {
                event.preventDefault();
                if (!loginService.isLogin()) {
                    $rootScope.$broadcast(AUTH_EVENTS.notLogin,next.name);
                } else {
                    $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated,next.name);
                }
            }
        }
    });
});


myApp.config(['$stateProvider', '$urlRouterProvider', 'USER_ROLES', function ($stateProvider, $urlRouterProvider, USER_ROLES) {
    $urlRouterProvider.otherwise('/base/list');
    $stateProvider.state('home',
        {
            url: '/base/home',
            controller: 'homeCtrl',
            templateUrl: 'tpls/home.html',
            data: {
                authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor]
            }
        }
    ).state('list', {
        url: '/base/list',
        controller: 'listCtrl',
        templateUrl: 'tpls/list.html'
    }).state('chart',
        {
            url: '/base/chart',
            controller: 'chartCtrl',
            templateUrl: 'tpls/chart.html'
        }
    ).state('heihei',
        {
            url: '/other/heihei',
            template: '<span>heihei</span>'
        }
    ).state('hehe',
        {
            url: '/other/hehe',
            template: '<span>hehe</span>'
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









