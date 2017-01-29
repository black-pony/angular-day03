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

		$scope.tasks = tasks;

		$scope.add = function(){
			var id;
			// if(!$scope.tasks){ <-- 视频中的判断条件有问题，因为数组判断总是为true
			if($scope.tasks.length == 0){
				id = 1;
			}else{
				// id = $scope.tasks[$scope.tasks.length - 1].id + 1; <-- 视频这样求id值有问题，有可能出现重复的现象
				var maxId = -1;
				for(var i=0;i<$scope.tasks.length;i++){
					if($scope.tasks[i].id > maxId){
						maxId = $scope.tasks[i].id;
					}
				}
			}
			$scope.tasks.push({id:maxId + 1,name:$scope.newTask,completed:false});
			$scope.newTask = '';
		};

		$scope.remove = function(id){
			console.log(id);
			for(var i=0;i<$scope.tasks.length;i++){
				var item = $scope.tasks[i];
				if(item.id == id){
					$scope.tasks.splice(i,1);
					return;
				}
			}
	};

	$scope.isEditingId = -1;
	$scope.edit = function(id){
		$scope.isEditingId = id;
	};

	$scope.save = function(){
		$scope.isEditingId = -1;
	}
	}]);
})(angular);
