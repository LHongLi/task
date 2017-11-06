//获取本地保存的登录页用户名
var name = JSON.parse(sessionStorage.getItem("name"));
//点击 显示/隐藏 Article列表
$("#mgt_article").click(function(){
	$(".son").slideToggle();
});
console.log(name);
