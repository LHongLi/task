angular.module("myApp").controller('myCtrl' , function($scope){
	//当登录页的用户名为ture时，显示欢迎
	if(name){
		$scope.name = 'Master';
	}
});
//侧边栏点击时,Atricle列表向左箭头变换并展开Atricle子列表
angular.module("myApp").controller('nav' , function($scope){
	$("#mgt_article").click(function(){
		$(".son").slideToggle();
		angular.element("#mgt_article").find("p").next("i").toggleClass("glyphicon-menu-left glyphicon-menu-down");
	});
});
