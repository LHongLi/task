//设置页面之间跳转
function deal(){
	window.location.href="JavaScript-Task-2-Deal.html"
}
function backHome(){
	window.location.href="JavaScript-Task-2.html"
}

// 洗牌算法Fisher-Yates shuffle
Array.prototype.shuffle=function(){
	var input = this;

	for (var i = input.length-1; i>=0; i--){
		var randomIndex = Math.floor(Math.random()*(i+1));

		var itemAtIndex = input[randomIndex];

		input[randomIndex] = input[i];
		input[i] = itemAtIndex;
	}
}
//根据总人数来自动分配杀手和平民的人数
function peoNum(){
 	var peo=document.getElementById("number").value;
 	var kill=document.getElementById("killerNum").value;
	var civy=document.getElementById("civyNum").value;
	if(peo>3&&peo<9){//当总人数大于3并小于9时
		kill=1;
		civy=peo-kill;
		document.getElementById("killerNum").value=kill;
		document.getElementById("civyNum").value=civy;
	} else if (peo>8&&peo<12){//当总人数大于8并小于12时
		kill=2;
		civy=peo-kill;
		document.getElementById("killerNum").value=kill;
		document.getElementById("civyNum").value=civy;
	} else if (peo>11&&peo<16){//当总人数大于11并小于16时
		kill=3;
		civy=peo-kill;
		document.getElementById("killerNum").value=kill;
		document.getElementById("civyNum").value=civy;
	} else if (peo>15&&peo<19){//当总人数大于15并小于19时
		kill=4;
		civy=peo-kill;
		document.getElementById("killerNum").value=kill;
		document.getElementById("civyNum").value=civy;
	}
}
//获取杀手和平民的数组并打乱
function dealing(){
	killName = document.getElementById("killerNum").value;
	civyName = document.getElementById("civyNum").value;
	var k = new Array();
	for(var i = 0; i < killName; i++){
		k[i] = "杀手";
	}
	var p = new Array();
	for( var i = 0; i< civyName; i++){
		p[i] = "平民";
	}
	people = k.concat(p);
}
// 限制数值
function goDeal(){
	var pd = document.getElementById("number").value;
	if(pd<4||pd>18){
		alert("请输入正确的数值");
	}else{
		dealing();
		people.shuffle();
		packAge();
		window.location.href="JavaScript-Task-3.html"
	}
}
//传参
function packAge(){
	peoples=JSON.stringify(people);
	sessionStorage.setItem("people",peoples);
}
// 添加键盘事件
document.onkeydown=function(event){
     var e = event || window.event || arguments.callee.caller.arguments[0];
     if(e && e.keyCode==13){ // 按 enter
         goDeal();
	 }
}
