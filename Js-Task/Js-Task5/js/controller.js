
//侧边栏点击时,Atricle列表向左箭头变换并展开Atricle子列表
angular.module("myApp").controller('nav' , function($scope){
	$("#mgt_article").click(function(){
		$(".son").slideToggle();
		angular.element("#mgt_article").find("p").next("i").toggleClass("glyphicon-menu-left glyphicon-menu-down");
	});
});