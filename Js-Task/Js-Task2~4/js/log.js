
//获取保存的参数
var player = JSON.parse(sessionStorage.getItem("player")),
	gameDay = parseInt(sessionStorage.getItem("day")),
	killNum = parseInt(sessionStorage.getItem("killerNum")),
 	civilianNum = parseInt(sessionStorage.getItem("civilianNum")),
	playerNum = killNum + civilianNum;
// console.log(gameDay);

//获取DOM
var btnBack = document.getElementsByClassName("back"),
	btnBackHome = document.getElementsByClassName("close"),
	btnGoGame = document.getElementsByClassName("game"),
	fatherEle = document.getElementsByClassName("all"),
	idCard = document.getElementsByClassName("con"),
	cardName = document.getElementsByClassName("id"),
	cardNum = document.getElementsByClassName("num"),
	killed = document.getElementsByClassName("kill");

//杀手未杀人传参
var url = location.search,
	str = url.substr(1);


var notKill = null;
var not = null;

//页头按钮点击事件
function backPage(){
	window.location.href = "../html/deal.html";
}
function backHome(){
	window.location.href = "../index.html";
}

//创建HTML元素
function element(){
	var createEle = "<div class=cards><button class=con><input type=text  class=id readonly><p class=num>号</p><div class=kill></div></button></div>"
	for(var i = 0; i < player.length; i++){
		$(".all").append(createEle);
		//加入身份、序号
		cardName[i].value = player[i].name;
		cardNum[i].innerHTML = player[i].num+"号";
	}
}
element();

//杀手杀人页头
function killSkip(){
	var killPage = "<div class=tip><p class=top>杀手请睁眼，杀手请选择要杀的对象</p><div class=downsj></div><p class=bot>点击下方玩家头像，对被杀的玩家进行标记</p></div>";
	$(".header").after(killPage);
	$(".game").text("确定");
}
//玩家投票页头
function voteSkip(){
	var votePage = "<div class=tip><p class=top>发言讨论结束，大家请投票</p><div class=downsj></div><p class=bot>点击得票数最多的人的头像</p></div>";
	$(".header").after(votePage);
	$(".game").text("投他一票");
}
//判断页面
function page(){
	// 杀手杀人按钮跳转
	if(str === "kill"){
		killSkip();
		// 游戏流程页面交互
		for(var i = 0; i < player.length; i++){
			if(player[i].status === false){
				idCard[i].style.background = "#8ab09a";
			}
			(function(i){
				idCard[i].onclick = function(){
					if(player[i].status !== true){
						alert("你连尸体也有兴趣么？");
					}else if(player[i].name === "杀手" ){
						alert("快停火！是友军！");
					}else{
						for(var j = 0; j < player.length; j++){
							notKill = j;
							if(player[j].status === true){
								player[j].deathStyle = null;
							}
							$(".kill").hide();
							player[j].click = 0;
							killed[i].style.display = "block";
							player[i].deathStyle = str;
							player[i].click = 1;
						}
					}
					sessionStorage.setItem("notKill", notKill);
				}
			})(i);
		}
//投票按钮跳转
	}else if(str === "vote"){
		voteSkip();
		// 渲染被杀手杀死的人
		for(var i = 0; i < player.length; i++){
			if(player[i].status === false){
				idCard[i].style.background = "#8ab09a";
			}
			(function(i){
				idCard[i].onclick = function(){
					if(player[i].status !== true){
						alert("你连尸体也有兴趣么？");
					}else{
						for(var k = 0; k < player.length; k++){
							not = k;
							if(player[k].status === true){
								player[k].deathStyle = null;
							}
							$(".kill").hide();
							player[k].click = 0;
							killed[i].style.display = "block";
							player[i].deathStyle = str;
							player[i].click = 1;
						}
					}
					sessionStorage.setItem("not", not);
				}
			})(i)
		}
	}else if(str === "log"){
		for(var i = 0; i < player.length; i++){
			if(player[i].status === false){
				idCard[i].style.background = "#8ab09a";
			}
		}
	}
}
page();

//计算活着的人数量
var $killerNum = killNum,
	$civilianNum = civilianNum;
function winner(){
	for(var i = 0; i < player.length; i++){
		if(player[i].name === "杀手" && player[i].status !== true){
			$killerNum --;
		}
		if(player[i].name === "平民" && player[i].status !== true){
			$civilianNum --;
		}
	}
}

//开始游戏、杀人、投票按钮点击事件
function goGame(){
	//点击之后赋值对象的死活状态
	if(str === "kill"){
		for(var i = 0; i < player.length; i++){
			//判断是否有人被杀
			if(notKill !== null){
				for(var j = 0; j < player.length; j++){
					if(player[j].click === 1){
						player[j].status = false;
						player[j].deathDay = gameDay;
						player[i].click = 0;
					}
				}
				window.location.href = "../html/process.html?kill";
			}else{
				window.location.href = "../html/process.html?nokill";
				sessionStorage.setItem("notKill",notKill);
			}
		}
		winner();
		if($killerNum === $civilianNum){
			sessionStorage.setItem("winner" , "杀手" );
			window.location.href = "../html/winner.html";
		}
		//投票确认
	}else if(str === "vote"){
			if(not !== null){
				for(var j = 0; j < player.length; j++){
					if(player[j].click === 1){
						player[j].status = false;
						player[j].deathDay = gameDay;
						player[j].click = 0;
					}
				}
				var days = gameDay+1;
				sessionStorage.setItem("day",days);
				window.location.href = "../html/process.html?vote";
			}else{
				alert("必须投票");
			}
			winner();
			if($killerNum === $civilianNum){
				sessionStorage.setItem("winner" , "杀手" );
				window.location.href = "../html/winner.html";
				var days = gameDay;
				sessionStorage.setItem("day",days);
			}else if($killerNum === 0){
				sessionStorage.setItem("winner" , "平民" );
				window.location.href = "../html/winner.html";
				var days = gameDay;
				sessionStorage.setItem("day",days);
			}
	}else{
		window.location.href = "../html/process.html";
	}
	var sava = JSON.stringify(player);
	sessionStorage.setItem("player",sava);
}
