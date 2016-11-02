/**
 * Created by JesseZhu on 16/10/25.
 */



var app = angular.module("myApp.myCtrl",[]);

function padInt2Str(num, size) {
    var s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
}

//全局 防止污染rootscope
app.controller("ApplicationController",function($scope,USER_ROLES,MENUS,AUTH_EVENTS,loginService,$location){
    $scope.userRoles = USER_ROLES;
    $scope.isAuthorized = loginService.isAuthorized;
    $scope.isLogin = loginService.isLogin;
    $scope.getCurrentUser = loginService.getCurrentUser;
    $scope.logout = loginService.logout;
    $scope.urlActive = function (url){
        return url === $location.path();
    };
    $scope.menu = MENUS;
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
app.controller("chartCtrl",function($scope,$timeout){
    $scope.addPoints = function () {
        var seriesArray = $scope.chartConfig.series;
        var rndIdx = Math.floor(Math.random() * seriesArray.length);
        seriesArray[rndIdx].data = seriesArray[rndIdx].data.concat([1, 10, 20])
    };

    $scope.addSeries = function () {
        var rnd = [];
        for (var i = 0; i < 10; i++) {
            rnd.push(Math.floor(Math.random() * 20) + 1)
        }
        $scope.chartConfig.series.push({
            data: rnd
        })
    };

    $scope.removeRandomSeries = function () {
        var seriesArray = $scope.chartConfig.series;
        var rndIdx = Math.floor(Math.random() * seriesArray.length);
        seriesArray.splice(rndIdx, 1)
    };

    $scope.swapChartType = function () {
        if (this.chartConfig.options.chart.type === 'line') {
            this.chartConfig.options.chart.type = 'bar'
        } else {
            this.chartConfig.options.chart.type = 'line'
        }
    };
    $scope.chartConfig = {

        options: {
            chart: {
                type: 'bar'
            },
            tooltip: {
                style: {
                    padding: 10,
                    fontWeight: 'bold'
                }
            }
        },
        //The below properties are watched separately for changes.

        //Series object (optional) - a list of series using normal Highcharts series options.
        series: [{
            data: [10, 15, 12, 8, 7]
        }],
        //Title configuration (optional)
        title: {
            text: 'Hello'
        },
        //Boolean to control showing loading status on chart (optional)
        //Could be a string if you want to show specific loading text.
        loading: false,
        //Configuration for the xAxis (optional). Currently only one x axis can be dynamically controlled.
        //properties currentMin and currentMax provided 2-way binding to the chart's maximum and minimum
        xAxis: {
            currentMin: 0,
            currentMax: 20,
            title: {text: 'values'}
        },
        //Whether to use Highstocks instead of Highcharts (optional). Defaults to false.
        useHighStocks: false,
        //size (optional) if left out the chart will default to size of the div or something sensible.
        size: {
            width: 400,
            height: 300
        },
        credits: {
            text:"",
            href:""
        },
        //function (optional)
        func: function (chart) {
            //setup some logic for the chart
        }
    };

    $scope.chartConfig2 = {

        options: {
            chart: {
                type: 'line'
            },
            tooltip: {
                style: {
                    padding: 10,
                    fontWeight: 'bold'
                }
            }
        },
        //The below properties are watched separately for changes.

        //Series object (optional) - a list of series using normal Highcharts series options.
        series: [{
            name: 'OP/s',
            data: []
        }],
        //Title configuration (optional)
        title: {
            text: 'OPS'
        },
        loading: false,
        xAxis: {
            title: {
                style: {
                    display: 'none',
                }
            },
            labels: {
                formatter: function () {
                    var d = new Date(this.value);
                    return padInt2Str(d.getHours(), 2) + ":" + padInt2Str(d.getMinutes(), 2) + ":" + padInt2Str(d.getSeconds(), 2);
                }
            }
        },
        yAxis: {
            title: {
                style: {
                    display: 'none',
                }
            },
        },
        useHighStocks: false,
        size: {
            width: 400,
            height: 300
        },
        credits: {
            text:"",
            href:""
        },
        //function (optional)
        func: function (chart) {
            //setup some logic for the chart
        }
    };



    var timer;
    var timerF = function(){
        timer = $timeout(function(){
            var dataArray = $scope.chartConfig2.series[0].data;

            if(dataArray.length==20){
                dataArray.shift();
            }
            dataArray.push({x: new Date(), y: Math.floor(Math.random()*20)});
            $scope.chartConfig2.series[0].data = dataArray;
            $timeout.cancel(timer);
            timerF();
        },500);
    };
    timerF();
    $scope.$on(
        "$destroy",
        function( event ) {
            $timeout.cancel( timer );
        }
    );


});
