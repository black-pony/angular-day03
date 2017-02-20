angular.module('myApp.myController1',[])
        .controller('myController1',function($scope,myService){
            console.log(myService)
            $scope.school = myService.school;
            $scope.subject = myService.subject;
            $scope.lesson = '流行框架';
        });