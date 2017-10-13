//点击跳转页面
function deal(){
	window.location.href="JavaScript-Task-2-Deal.html"
}
function backHome(){
	window.location.href="JavaScript-Task-2.html"
}


//触发键盘事件
document.onkeydown=function(event){
     var e = event || window.event || arguments.callee.caller.arguments[0];
     if(e && e.keyCode==13){ // 按 enter
         goDeal();
	 }
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
var allCards = [];
function idCards(){
	killCards = document.getElementById("killers").value;
	civyCards = document.getElementById("civys").value;
	var k = new Array();
	for(var i = 0; i < killCards; i++){
		k[i] = "杀手";
	}
	var c = new Array();
	for(var i = 0; i < civyCards; i++){
		c[i] = "平民";
	}
	allCards = k.concat(c);
}
//获取玩家总数量
function peoNum(){
	var peo = document.getElementById("number").value;
	var kill = document.getElementById("killers").value;
	var civy = document.getElementById("civys").value;
	if(peo > 3 && peo < 9){
		kill = 1;
		civy = peo - kill;
		document.getElementById("killers").value = kill;
		document.getElementById("civys").value = civy;
	}else if(peo > 8 && peo < 12){
		kill = 2;
		civy = peo - kill;
		document.getElementById("killers").value = kill;
		document.getElementById("civys").value = civy;
	}else if(peo > 11 && peo < 16){
		kill = 3;
		civy = peo - kill;
		document.getElementById("killers").value = kill;
		document.getElementById("civys").value = civy;
	}else if(peo > 15 && peo < 19){
		kill = 4;
		civy = peo - kill;
		document.getElementById("killers").value = kill;
		document.getElementById("civys").value = civy;
	}
}


//传参
function next(){
	var cardsSave = JSON.stringify(allCards);
	sessionStorage.setItem("cards" , cardsSave);
}


// 限制玩家数量输入格式及页面跳转至身份页面
function goDeal(){
	var peoples = document.getElementById("number").value;
	if(peoples >= 4 && peoples <= 18){
		idCards();
		allCards.shuffle();
		next();
		window.location.href="JavaScript-Task-3.html"
	}else{
		alert("请输入正确的玩家数量。")
	}
}
