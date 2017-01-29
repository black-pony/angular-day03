angular.module('myApp.myController2',['myApp.myService'])
        .controller('myController2',function($scope,myService){
            console.log(myService)
            $scope.school = myService.school;
            $scope.subject = myService.subject;
            $scope.lesson = 'Node.js';
        });