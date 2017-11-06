//获取本地保存的登录页用户名
var name = JSON.parse(sessionStorage.getItem("name"));
//点击 显示/隐藏 Article列表
$("#mgt_article").click(function(){
	$(".son").slideToggle();
	$("#mgt_article").find(".glyphicon-triangle-left").toggleClass("glyphicon-triangle-bottom");
});
console.log(name);
