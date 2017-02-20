angular.module('myApp.myService',[])
        //将来我们在别的模块里面引入了当前这个模块之后，可以在控制器中使用这个叫myService的服务，这个myService对象是通过这个回调函数作为构造器来new出来的
       .service('myService',function(){
           this.school = 'itcast';
           this.subject = 'front end';
       });