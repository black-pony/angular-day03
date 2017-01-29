//!important:从这个例子开始，大家在测试的时候为了避免上一次的localStorage影响
//每次重新打开的时候在控制台执行一下 localStorage.setItem('todos','')
//如果想看当前的localStorage中的数据可以在控制台执行：localStorage.getItem('todos')
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


		// 3.删除数据
        this.remove=function(id){
            for (var i = 0; i < tasks.length; i++) {
               var item = tasks[i];
               if(item.id==id){
                // 从数组中移除数据
				tasks.splice(i,1);
				// storage.setItem('todos',JSON.stringify(tasks));
                 this.save();//需要是return前调用
                 return;
               }
           }
        }
		// 保存任务
        this.save=function(){
            storage.setItem('todos',JSON.stringify(tasks));
        };

		 // 6.批量切换任务的状态
        this.toggleAll=function(isSelected){
            for (var i = 0; i < tasks.length; i++) {
              var item = tasks[i];
              item.completed=isSelected;
           }
           this.save();
        };


		//清除已完成

		this.clearCompleted = function(){
			var tmp = [];
			// 将未完成的任务添加到临时数组中
			for (var i = 0; i < tasks.length; i++) {
				var item = tasks[i];
				if (!item.completed) {
				tmp.push(item);
				}
			}

			tasks = tmp;
		};

		//判断是否有已完成的任务
		this.hasCompleted = function(){
			for (var i = 0; i < tasks.length; i++) {
				var item = tasks[i];
				if (item.completed) {
				return true;
				}
			}
			return false;
		};

		//获取所有未完成的任务数
		this.unCompleted = function(){
			var count = 0;
			for (var i = 0; i < tasks.length; i++) {
				var item = tasks[i];
				if (!item.completed) {
				count++;
				}
			}
			return count;
		};
	}]);
})(angular);
