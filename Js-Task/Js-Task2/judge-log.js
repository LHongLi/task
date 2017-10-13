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
		console.log(getCards[i])
		cardNum[i].value = getCards[i];
		serial[i].innerHTML = i+1+"号";
	}
}
window.onload = function(){
	createCardsNum();
	allotCard();
}
