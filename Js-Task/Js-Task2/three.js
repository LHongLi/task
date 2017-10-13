//页面头部按钮点击跳转
function deal(){
	window.location.href = "JavaScript-Task-2-Deal.html"
}
function backHome(){
	window.location.href = "JavaScript-Task-2.html"
}
//进入法官日志页
function nextPage(){
	window.location.href = "JavaScript-Task-3-end.html"
}
//读取参数
var getCards = JSON.parse(sessionStorage.getItem("cards"));
//添加点击事件
var a = 0;
//点击查看身份
function look(){
	if(a+2 > getCards.length){//当a+2小于身份的数组长度时按钮变为跳转法官日志
		var btn1 = document.getElementById("btn1");
		btn1.style.display = "none";
		var btn2 = document.getElementById("btn2");
		btn2.style.display = "none";
		var btn3 = document.getElementById("btn3");
		btn3.style.display = "block";
	}else {//点击按钮
		var btn1 = document.getElementById("btn1");
		btn1.style.display = "none";
		var btn2 = document.getElementById("btn2");
		btn2.style.display = "block";
		document.getElementsByClassName("id1")[0].value = a+2;
		//因为a初始为0,而id1的input默认为1,所以查看按钮直接跳过1,等于2,然后next会在每次点击之后a++,所以id1的input会在没有点击next之前等于2
	 }
	 peos();
}
function next(){
	var k = document.getElementById("kq");
	k.style.display = "none";
	var g = document.getElementById("yc");
	g.style.display = "block";
	var btn1 = document.getElementById("btn1");
	btn1.style.display = "block";
	var btn2 = document.getElementById("btn2");
	btn2.style.display = "none";
	a++;//点击next按钮时a+10
	document.getElementsByClassName("xh")[0].value = a+1;
	// alert(a);
}
function peos(){
	var k = document.getElementById("kq");
 	k.style.display = "block";
 	var g = document.getElementById("yc");
 	g.style.display = "none";
	document.getElementsByClassName("id")[0].value = getCards[a];
	//设置角色名的下标等于a
	document.getElementsByClassName("id2")[0].value = a+2;
	//设置按钮2中的2号等于a+2,因为需要传递给下一位所以+2
}
