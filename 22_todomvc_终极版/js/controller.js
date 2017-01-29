(function(angular){
	var app = angular.module('todos.controller',['ngRoute']);
	app.config(['$routeProvider',function($routeProvider){
		$routeProvider
		.when('/:status',{templateUrl:'todoId',controller:'todosController'})
		.otherwise({//默认的情况，比如根路径就会走这里
			redirectTo:'/all'
		});
	}]);
	app.controller('todosController',['$scope','$location','$routeParams','Todos',function($scope,$location,$routeParams,Todos){

		//功能1 显示列表
		$scope.tasks = Todos.get();


		// 功能2 添加任务
       //暴露数据模型
		$scope.add=function(){
            if(!$scope.newTask){
                return;
            }
            Todos.add($scope.newTask);
           // 清空文本框架的值
           $scope.newTask='';
       }

		// 功能3 删除任务 这块不能像视频里面的写法，this的指向会出错
			// $scope.remove = Todos.remove; <--- 错的

			// var obj1 = {
			// 	name:'obj1',
			// 	fn:function(){
			// 		console.log(this);
			// 	}
			// };

			// var obj2 = {name:'obj2'};
			// obj2.fn = obj1.fn;
			// obj2.fn();


       $scope.remove= function(id){
				//  console.log(444);
				 Todos.remove(id);
			 }

	// $scope.isEditingId = -1;
	// $scope.edit = function(id){
	// 	$scope.isEditingId = id;
	// };

	$scope.save = function(){
		$scope.isEditingId = -1;
	};


	// 功能5 切换任务是否完成的状态
       // 不需要写任务js代码
       $scope.$watch('tasks',function(nowValue,oldVAlue){
            Todos.save();
       },true);// 加上true表示  深度监听


	 // 功能6 批量切换任务是否完成的状态
       $scope.isSelected=false;
       $scope.toggleAll=function(){
           Todos.toggleAll($scope.isSelected);
       }


	// // 功能7 清除已完成任务
    $scope.clearCompleted = function() {
		Todos.clearCompleted();
        $scope.tasks=Todos.get();
    }


	// 功能7.1 控制清除已完成任务按钮的显示与否
    $scope.isShow = function() {
		return Todos.hasCompleted();
    }



	// 	// 功能8 显示未完成的任务数

    $scope.unCompleted = function() {
		return Todos.unCompleted();
    }


	// //功能9  切换不同状态任务的显示与否
	// 	$scope.isCompleted = {};
	// 	$scope.active = function(){
	// 		$scope.isCompleted = {completed:false};
	// 	};
	// 	$scope.completed = function(){
	// 		$scope.isCompleted = {completed:true};
	// 	};
	// 	$scope.all = function(){
	// 		$scope.isCompleted = {};
	// 	};

		// var hash = $location.url();
		// $scope.location = $location;
		// $scope.$watch('location.url()',function(nowValue,oldValue){
		// 	switch(nowValue){
		// 		case '/active':
		// 			$scope.isCompleted = {completed:false};
		// 			break;
		// 		case '/completed':
		// 			$scope.isCompleted = {completed:true};
		// 			break;
		// 		case '/':
		// 			$scope.isCompleted = {completed:undefined};
		// 			break;
		// 	}
		// });


		// console.log($routeParams.status);
		switch($routeParams.status){
			case 'active':
				$scope.isCompleted = {completed:false};
				break;
			case 'completed':
				$scope.isCompleted = {completed:true};
				break;
			case 'all':
				$scope.isCompleted = {completed:undefined};
				break;
		}
	}]);

})(angular);
