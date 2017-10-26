
//获取保存的参数
var player = JSON.parse(sessionStorage.getItem("player"));
var gameDay = parseInt(sessionStorage.getItem("day"));
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

//点击事件
function backPage(){
	window.location.href = "../html/deal.html";
}
function backHome(){
	window.location.href = "../index.html";
}
function goGame(){
	//点击之后赋值对象的死活状态
	for(var i = 0; i < player.length; i++){
		if(player[i].deathStyle !== null){
			player[i].status = false;
		}
	}
	var sava = JSON.stringify(player);
	sessionStorage.setItem("player",sava);
	window.location.href = "../html/process.html";
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
	var url = location.search;
	var url = url.substr(1);
	// 杀手杀人按钮跳转
	if(url === "kill"){
		killSkip();
		// 游戏流程页面交互
		for(var i = 0; i < player.length; i++){
			(function(i){
				idCard[i].onclick = function(){
					if(player[i].status !== true){
						alert("你连尸体也有兴趣么？");
					}else if(player[i].name === "杀手" ){
						alert("快停火！是友军！");
					}else{
						$(".kill").hide();
						killed[i].style.display = "block";
						for(var j = 0; j < player.length; j++){
							if(player[j].status === true){
								player[j].deathStyle = null;
							}
						}
						player[i].deathStyle = url;
					}
				}

			})(i);
		}
	}else if(url === "vote"){
		voteSkip();
		// var processJudge = JSON.parse(sessionStorage.getItem("process"));
		for(var i = 0; i < player.length; i++){
			if(player[i].status === false){
				idCard[i].style.background = "#8ab09a";
			}
			(function(i){
				idCard[i].onclick = function(){
					if(player[i].status !== true){
						alert("你连尸体也有兴趣么？");
					}else{
						$(".kill").hide();
						killed[i].style.display = "block";
						for(var k = 0; k < player.length; k++){
							if(player[k].status === true){
								player[k].deathStyle = null;
							}
						}
						player[i].deathStyle = url;
					}
				}
			})(i)
		}
	}
}
page();
