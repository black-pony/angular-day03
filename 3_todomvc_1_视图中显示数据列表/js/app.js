(function(angular) {
  'use strict';

  // Your starting point. Enjoy the ride!
	var app = angular.module('todos',[]);
	app.controller('todosController',['$scope',function($scope){
		var tasks = [{
      id: 1,
      name: '吃饭',
      completed: false
    }, {
      id: 2,
      name: '睡觉',
      completed: true
    }, {
      id: 3,
      name: '学习',
      completed: false
    }, {
      id: 4,
      name: '休息',
      completed: true
    }, {
      id: 5,
      name: '打球',
      completed: true
    }];

		//把tasks数组挂载到$scope身上，这个数据模型要通过ng-repeat在视图当中进行显示
		$scope.tasks = tasks;

	}]);
})(angular);
