function deal(){
	window.location.href="../html/deal.html"
}
function backHome(){
	window.location.href="../index.html"
}
var getCards = JSON.parse(sessionStorage.getItem("cards"));
//创建n个身份牌，n等于杀手&平民总人数
function createCardsNum(){
	var b = "<div class=\"cards\">"+
							"<button class=\"con\">"+
								"<input type=\"text\" class=\"id\" readonly>"+
								"<p class=\"num\">号</p>"+
							"</button>"+
						"</div>";
	var c = b;
	for(var i = 0; i < getCards.length-1; i++){
		b = c + b;
	}
	var cardsBox = document.getElementsByClassName("all")[0];
	cardsBox.innerHTML = b;
}
//每个身份牌分配身份
function allotCard(){
	var cardNum = document.getElementsByClassName("id");
	var serial = document.getElementsByClassName("num");
	for(var i = 0; i < getCards.length; i++){
		cardNum[i].value = getCards[i];
		serial[i].innerHTML = i+1+"号";
	}
	return serial;
}
window.onload = function(){
	createCardsNum();
	allotCard();
}
//开始游戏
function goGame(){
	window.location.href = "../html/process.html";
}
//创建页面头部
function createHeader1(){
	$(".header").after(
		"<div class=\"tip\">"+
			"<p class=\"top\">杀手请睁眼，杀手请选择要杀的对象</p>"+
			"<div class=\"downsj\"></div>"+
			"<p class=\"bot\">点击下方玩家头像，对被杀的玩家进行标记</p>"+
		"</div>"
	);
}
function createHeader2(){
	$(".header").after(
		"<div class=\"tip\">"+
			"<p class=\"top\">发言讨论结束，大家请投票</p>"+
			"<div class=\"downsj\"></div>"+
			"<p class=\"bot\">点击得票数最多的人的头像</p>"+
		"</div>"
	);
}
var killer = sessionStorage.getItem("kill");
var vote = sessionStorage.getItem("vote");
//传递到游戏流程界面
var firePlayer = [];
for(i = 0; i < getCards.length; i++){
	function p(){
		this.name = getCards[i];
		this.day = 1;
		this.num = i+1;
		this.kill = 0;
		this.vote = 0;
		this.status = true;
	}
	var player = new p();
	firePlayer.push(player);
}
var url = window.location.search;
console.log(url);
var str = url.substr(1);
console.log(str);
// if(gameDay.day > 0){
// 	createHeader1();
// 	}if(vote > 1){
// 	createHeader2();
// }
var player = JSON.stringify(firePlayer);
sessionStorage.setItem("player", player);
