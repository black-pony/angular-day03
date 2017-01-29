var myApp = angular.module('myApp',[]);
myApp.controller('myController',function($scope){
	$scope.tasks = [
		{id:1,name:'eat',completed:true,editing:false},
		{id:2,name:'sleep',completed:false,editing:false},
		{id:3,name:'play',completed:true,editing:false},
	];

	$scope.$watch('tasks',function(newVal,oldVal){
		var len = $scope.tasks.filter(function(item){return item.completed == true}).length;
		console.log(len);
		if(len == 0){
			$scope.isCompleted = false;
		}else{
			$scope.isCompleted = true;
		}
		$scope.uncompletedNum = $scope.tasks.length - len;
	},true);

	// keypress 相当keyup + keydown click 相当于mousedown mouseup
	$scope.addTask = function(e){
		if(e.code != 'Enter' || !$scope.newTask){
			return;
		}

		var maxId = -1;
		$scope.tasks.forEach(function(item,index){
			if(item.id > maxId){
				maxId = item.id;
			}
		});
		var newItem = {id:maxId + 1,name:$scope.newTask,completed:false,editing:false};
		$scope.tasks.push(newItem);
		$scope.newTask = '';

	};

	//找到对应的id --> splice
	$scope.removeTask = function(id){
		for(var i=0;i<$scope.tasks.length;i++){
			if($scope.tasks[i].id === id){
				$scope.tasks.splice(i,1);
				break;
			}
		}
	};



	//indexOf
	$scope.editTask = function(id){
		for(var i=0;i<$scope.tasks.length;i++){
			if($scope.tasks[i].id === id){
				$scope.tasks[i].editing = true;
				break;
			}
		}
	};


	$scope.saveTask = function(e,id){
		if(e.code != 'Enter')return;
		for(var i=0;i<$scope.tasks.length;i++){
			if($scope.tasks[i].id === id){
				$scope.tasks[i].editing = false;
				break;
			}
		}
	};


	$scope.toggleAll = function(){
		for(var i=0;i<$scope.tasks.length;i++){
			$scope.tasks[i].completed = $scope.isAllCompleted;
		}
	};


	$scope.clearCompleted = function(){
		$scope.tasks = $scope.tasks.filter(function(item){return item.completed == false});
	};

	
});
