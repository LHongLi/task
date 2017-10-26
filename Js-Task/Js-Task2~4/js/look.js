
//获取保存的参数
var killer = parseInt(sessionStorage.getItem("killerNum")),
	civilian = parseInt(sessionStorage.getItem("civilianNum")),
	players = killer + civilian;				//获取总人数

//设置全局变量
var PLAYOBJ = [],
	 NUM = 0;


//获取DOM节点
var topNum = document.getElementsByClassName("xh"),
	cardPage = document.getElementsByClassName("id"),
	lookBtnNum = document.getElementsByClassName("id1"),
	nextBtnNum = document.getElementsByClassName("id2"),
	pageOne = document.getElementById("one"),
	pageTwo = document.getElementById("two");
	btnLook = document.getElementById("btn1"),
	btnNext = document.getElementById("btn2"),
	btnJudge = document.getElementById("btn3");

//返回首页&返回上一页
function backPage(){
	window.location.href = "../html/deal.html"
}
function backHome(){
	window.location.href = "../index.html"
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

//分配身份及对象属性
function allorCards(){
	var cards = [];
	for( var i = 0; i < killer; i++){
		cards.push("杀手");
	}
	for( i = 0; i < civilian; i++){
		cards.push("平民");
	}
	cards.shuffle();
	for( i = 0; i < players; i++){
		var obj = {};
		obj.name = cards[i];
		obj.status = true;
		obj.deathStyle = null;
		obj.num = i+1;
		PLAYOBJ[i] = obj;
	}
	//保存参数
	var sava = JSON.stringify(PLAYOBJ);
	sessionStorage.setItem("player", sava);
	var gameDay = 1;
	sessionStorage.setItem("day", gameDay);
	//游戏流程页面按钮点击事件
	sessionStorage.setItem("order",1);
}
allorCards();

//查看身份页面分配
function allot(){
	//查看身份按钮
	btnLook.onclick = function(){
		btnNext.style.display = "block";
		pageOne.style.display = "none";
		pageTwo.style.display = "block";
		cardPage[0].value = PLAYOBJ[NUM].name;
		if(NUM+2 > PLAYOBJ.length){
			btnNext.style.display = "none";
			btnLook.style.display = "none";
			btnJudge.style.display = "block";
		}else{
			nextBtnNum[0].value = NUM+2;
			lookBtnNum[0].value = NUM+2;
		}
	}

	//传递并隐藏给x号按钮
	btnNext.onclick = function(){
		NUM++;
		topNum[0].value = NUM+1;
		btnNext.style.display = "none";
		pageOne.style.display = "block";
		pageTwo.style.display = "none";
	}

	//法官日志按钮跳转下一页面
	btnJudge.onclick = function(){
		window.location.href = "../html/log.html"
	}
}
allot();
