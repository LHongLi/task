function deal(){
	window.location.href="JavaScript-Task-2-Deal.html"
}
function backHome(){
	window.location.href="JavaScript-Task-2.html"
}
function look(){
	if(a+2>peo.length){
		document.getElementById("btn1").innerHTML="法官日志";
	}else {
		var btn1=document.getElementById("btn1");
		btn1.style.display="none";
		var btn2=document.getElementById("btn2");
		btn2.style.display="block";
		document.getElementsByClassName("id1")[0].value = a+2;
		//因为a初始为0,而id1的input默认为1,所以查看按钮直接跳过1,等于2,然后next会在每次点击之后a++,所以id1的input会在没有点击next之前等于2
	 }
	 peos();
}
function next(){
	var k=document.getElementById("kq");
	k.style.display="none";
	var g=document.getElementById("yc");
	g.style.display="block";
	var btn1=document.getElementById("btn1");
	btn1.style.display="block";
	var btn2=document.getElementById("btn2");
	btn2.style.display="none";
	a++;//点击next按钮时a+1
	document.getElementsByClassName("xh")[0].value = a+1;
}
var peo = JSON.parse(sessionStorage.getItem("people"));//获取task2的随机分配数组
var a = 0;//设置a为元素下标
function peos(){
	var k=document.getElementById("kq");
 	k.style.display="block";
 	var g=document.getElementById("yc");
 	g.style.display="none";
	document.getElementsByClassName("id")[0].value = peo[a];
	//设置角色名的下标等于peo的a下标
	document.getElementsByClassName("id2")[0].value = a+2;
	//设置按钮2中的2号等于a+2,因为需要传递给下一位所以+2
}
