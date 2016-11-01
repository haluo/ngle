/**
 * Created by JesseZhu on 16/10/25.
 */


var service  = angular.module("myApp.myService",[]);


service.factory("listService",function(){
    return {
        getData : function(currentPage,numPerPage){
            return {
                currentPage:currentPage,
                totalItems:100,
                numPerPage:numPerPage,
                data :[{'name':'nihao1 page'+currentPage,'age':18},{'name':'nihao2 page'+currentPage,'age':18},{'name':'nihao3  page'+currentPage,'age':18},{'name':'nihao4  page'+currentPage,'age':18}]
            }
        }
    }
});


//登陆相关事件
service.constant('AUTH_EVENTS', {
    loginSuccess: 'auth-login-success',//登陆成功
    loginFailed: 'auth-login-failed',//登陆失败
    logoutSuccess: 'auth-logout-success',//登出
    sessionTimeout: 'auth-session-timeout',//session超时
    notAuthenticated: 'auth-not-authenticated',//未授权
    notLogin: 'auth-not-login' //未登陆
});
//角色
service.constant('USER_ROLES', {
    all: '*',
    admin: 'admin',
    editor: 'editor',
    guest: 'guest'
});
//session保存登录用户
service.service('Session', function () {
    this.create = function (sessionId, userId, userRole) {
        this.id = sessionId;
        this.userId = userId;
        this.userRole = userRole;
    };
    this.destroy = function () {
        this.id = null;
        this.userId = null;
        this.userRole = null;
    };
    return this;
});

//service.factory("loginService",function($http,Session){
//    return {
//        login : function(user){
//            //todo  return $http.post("/login",user);
//            Session.create("1","1","admin")
//        },
//        isLogin :function(){
//            return !!Session.userId;
//        },
//        //判断用户是否有访问某功能的权限  authorizedRoles 为访问某功能所需要的权限列表
//        isAuthorized:function (authorizedRoles) {
//            if (!angular.isArray(authorizedRoles)) {
//                authorizedRoles = [authorizedRoles];
//            }
//            return (this.isLogin() &&
//            authorizedRoles.indexOf(Session.userRole) !== -1);
//        }
//    }
//});

service.factory("loginService",function($http,$cookieStore){
    return {
        login : function(user){
            //todo  return $http.post("/login",user);
            //Session.create("1","1","admin")
            $cookieStore.put('Session',{
                id:'1',
                userId:'1',
                userRole:'admin'
            });
        },
        isLogin :function(){
            var Session = $cookieStore.get("Session");
            if(!Session) return false;
            return !!Session.userId;
        },
        //判断用户是否有访问某功能的权限  authorizedRoles 为访问某功能所需要的权限列表
        isAuthorized:function (authorizedRoles) {
            var Session = $cookieStore.get("Session");
            if(!Session) return false;

            if (!angular.isArray(authorizedRoles)) {
                authorizedRoles = [authorizedRoles];
            }
            return (this.isLogin() &&
            authorizedRoles.indexOf(Session.userRole) !== -1);
        },
        getCurrentUser:function(){
            var Session = $cookieStore.get("Session");
            return Session;
        }
    }
});




