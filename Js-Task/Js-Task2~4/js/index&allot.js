/*===============点击开始杀人游戏简化版===============*/
function startGame(){
	window.location.href = "html/deal.html";
}

/*===============玩家配比页面===============*/
//点击返回首页
function backHome(){
	window.location.href = "../index.html";
}

//获取杀手和平民的DOM节点
var killer = document.getElementById("killer"),
	civilian = document.getElementById("civilian");

//设置构造函数来分配杀手和平民的人数比
function allPeople(x){
	var x;
	var y = allPlayer - x;
	killer.value = x;
	civilian.value = y;
}

//获取玩家总人数并设置杀手人数
function peoNum(){
	allPlayer = document.getElementById("number").value;
	if( allPlayer > 3 && allPlayer < 9 ){
		allPeople(1);
	}else if( allPlayer > 8 && allPlayer < 12 ){
		allPeople(2);
	}else if( allPlayer > 11 && allPlayer < 16 ){
		allPeople(3);
	}else if( allPlayer > 15 && allPlayer < 19 ){
		allPeople(4);
	}
}

//把杀手人数和平民人数保存到本地并跳转页面
function sava(){
	sessionStorage.setItem("killerNum", killer.value);
	sessionStorage.setItem("civilianNum", civilian.value);
	window.location.href = "../html/look.html";
}

//设置点击事件
function goDeal(){
	if( allPlayer >= 4 && allPlayer <= 18){
		peoNum();
		sava();
	}else{
		alert("请输入正确的玩家数量。");
	}
}

//设置键盘事件
document.onkeydown=function(event){
     var e = event || window.event || arguments.callee.caller.arguments[0];
     if(e && e.keyCode==13){ //  enter键
         goDeal();
	 }
}
