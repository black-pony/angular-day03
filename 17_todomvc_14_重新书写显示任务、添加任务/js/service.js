(function(angular){
	//创建服务
	var app = angular.module('todos.service',[]);

	//第一个参数：也是一个名字
	//第二个参数：类似于控制器的第二个
	//第二个参数主要是因为没有依赖注入任何其他东西，所以只有一个回调函数，大家也可以不用数组来写
	app.service('Todos',['$window',function($window){
		// this.name = '小明';
		var storage = $window.localStorage;

		//拿到数据
		var str = storage.getItem('todos');
		var tasks = JSON.parse(str||'[]');
		this.get = function(){
			return tasks;
		};

		this.add = function(newTask){
			var maxId = -1;
			if(tasks.length == 0){
				maxId = 0;
			}else{
				for(var i=0;i<tasks.length;i++){
					if(tasks[i].id > maxId){
						maxId = tasks[i].id;
					}
				}
			}
			tasks.push({id:maxId+1,name:newTask,completed:false});
			this.save();
		};


		// 保存任务
        this.save=function(){
            storage.setItem('todos',JSON.stringify(tasks));
        }
	}]);
})(angular);
