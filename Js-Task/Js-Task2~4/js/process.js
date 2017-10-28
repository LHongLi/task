//获取DOM
var day = document.getElementById("gameDay"),
	kill = document.getElementById("kill")
	killSJ = document.getElementById("killsj"),
	word = document.getElementById("dead"),
	wordSJ = document.getElementById("deadsj"),
	talk = document.getElementById("talk"),
	talkSJ = document.getElementById("talksj"),
	vote = document.getElementById("vote"),
	voteSJ = document.getElementById("votesj"),
	navLogo = document.getElementsByClassName("sun"),
	killMess = document.getElementById("killmess"),
	voteMess = document.getElementById("votemess"),
	create = document.getElementById("create"),
	next = document.getElementsByClassName("process");

//获取本地数据
var player = JSON.parse(sessionStorage.getItem("player")),
	gameDay = parseInt(sessionStorage.getItem("day")),
 	killNum = parseInt(sessionStorage.getItem("killerNum")),
 	civilianNum = parseInt(sessionStorage.getItem("civilianNum")),
	notKill = sessionStorage.getItem("notKill");
	not = sessionStorage.getItem("not");

//判断按钮点击顺序
var order = parseInt(sessionStorage.getItem("order"));

//header按钮点击事件
function backPage(){
	window.location.href = "../html/deal.html";
}
function backHome(){
	window.location.href = "../index.html";
}

//插入天数
function days(){
	for(var i = 1; i < gameDay; i++){
		var kName = "" , kNum = "" , vName = "" , vNum = "";
		for(var j = 0; j < player.length; j++){
			if(player[j].deathDay === i){
				if(player[j].deathStyle === "kill"){
					kNum = j+1;
					kName = player[j].name;
				}else{
					vNum = j+1;
					vName = player[j].name;
				}
			}
		}
		if(kName === ""){
			$("#create").before(
				"<div>"+
					"<p class=day>第"+i+"天</p>"+
					"<div class=process>"+
						"<div class=sjx></div>"+
						"<div class=nav>"+
							"<div class=line></div>"+
							"<div class=moon></div>"+
							"<div class=sun></div>"+
						"</div>"+
						"<ul class=list>"+
							"<li class='event reset'>"+
								"<div class=change ></div>杀手杀人</li>"+
							"<h3 class='message messII'>杀手未杀人。</h3>"+
							"<li class='event reset'>"+
								"<div class=change></div>亡灵发表遗言</li>"+
							"<li class='event reset'>"+
								"<div class=change></div>玩家依次发言</li>"+
							"<li class='event reset nomar'>"+
								"<div class=change></div>全民投票</li>"+
							"<h3 class='message nomar messII'>"+vNum+"号被投票投死，他的身份是"+vName+"。"+
							"</h3>"+
						"</ul>"+
					"</div>"+
				"</div>"
			)
		}else{
			$("#create").before(
				"<div>"+
					"<p class=day>第"+i+"天</p>"+
					"<div class=process>"+
						"<div class=sjx></div>"+
						"<div class=nav>"+
							"<div class=line></div>"+
							"<div class=moon></div>"+
							"<div class=sun></div>"+
						"</div>"+
						"<ul class=list>"+
							"<li class='event reset'>"+
								"<div class=change></div>杀手杀人</li>"+
							"<h3 class='message messII'>"+kNum+"号被杀,他的身份是"+kName+"。</h3>"+
							"<li class='event reset'>"+
								"<div class=change></div>亡灵发表遗言</li>"+
							"<li class='event reset'>"+
								"<div class=change></div>玩家依次发言</li>"+
							"<li class='event reset nomar'>"+
								"<div class=change></div>全民投票</li>"+
							"<h3 class='message nomar messII'>"+vNum+"号被投票投死，他的身份是"+vName+"。</h3>"+
						"</ul>"+
					"</div>"+
				"</div>"
			)
		}
	}
}
days();

/*===============流程事件===============*/
$(".day").click(function(){
	$(this).next(".process").slideToggle();
});
var dj = function(order,orderNum){
	if(order === orderNum){
		switch(orderNum){
			case 1:
				window.location.href = "../html/log.html?kill";
				kill.style.background = "#868686";
				killSJ.className = "change";
				// console.log(order,orderNum);
				break;
			case 2:
				word.style.background = "#868686";
				wordSJ.className = "change";
				alert("请死者亮明身份，并发表遗言。");
				// console.log(order,orderNum);
				break;
			case 3:
				talk.style.background = "#868686";
				talkSJ.className = "change";
				alert("玩家开始依次发言讨论。");
				// console.log(order,orderNum);
				break;
			case 4:
				window.location.href = "../html/log.html?vote";
				// console.log(order,orderNum);
				break;
		}
	}
}
//杀手杀人
kill.onclick = function(){
	if(order === 1){
		dj(order, 1);
		order++;
	}else if(order > 1){
		alert("请点击下一步");
	}
	sessionStorage.setItem("order",order);
}
//亡灵发表遗言
word.onclick = function(){
	if(order === 2){
		dj(order, 2);
		order++;
	}else if(order < 2){
		alert("请按照游戏顺序进行游戏");
	}else{
		alert("请点击下一步");
	}
}
//玩家依次发言
talk.onclick = function(){
	if(order === 3){
		dj(order, 3);
		order++;
	}else if(order < 3){
		alert("请按照游戏顺序进行游戏");
	}else{
		alert("请点击下一步");
	}
}
//全民投票
vote.onclick = function(){
	if(order === 4){
		dj(order, 4);
		order = 1;
		sessionStorage.setItem("order",order);
	}else if(order < 4){
		alert("请按照游戏顺序进行游戏");
	}else{
		alert("请点击下一步");
	}
};

///杀人、投票页面返回信息
$(".process").hide();
next[gameDay-1].style.display = "flex";
var url = location.search;
var str = url.substr(1);
day.innerHTML = gameDay;
function pageBack(){
	//判断是哪个页面返回的
	if(str === "kill"){
	   for(var i = 0; i < player.length; i++){
		   if(player[i].deathStyle === "kill"){
			   kill.style.background = "#868686";
			   killSJ.className = "change";
			   killMess.style.display = "block";
			   killMess.innerHTML = player[i].num+"号被杀，他的身份是"+player[i].name;
			   navLogo[0].style.top = "5rem";
			   $(".process").hide();
			   next[gameDay-1].style.display = "flex";
		   }
	   }
   }else if(str === "nokill"){
		kill.style.background = "#868686";
		killSJ.className = "change";
		killMess.style.display = "block";
		killMess.innerHTML = "杀手未杀人。";
		navLogo[0].style.top = "5rem";
	}else if(str === "vote"){
	   for(var i = 0; i < player.length; i++){
		   $(".process").hide();
		   next[gameDay-1].style.display = "flex";
		   navLogo[0].style.top = "5rem";
		   if(notKill === "null"){
			   killMess.innerHTML = "杀手未杀人。";
			   if(player[i].deathStyle === "vote"){
				   voteMess.innerHTML = player[i].num+"号被投票投死，他的身份是"+player[i].name;
			   }
		   }else if(not !=="null"){
			   if(player[i].deathStyle === "vote"){
				   voteMess.innerHTML = player[i].num+"号被投票投死，他的身份是"+player[i].name;
			   }else if(player[i].deathStyle === "kill"){
					killMess.innerHTML = player[i].num+"号被杀，他的身份是"+player[i].name;
			   }
		   }
	   }
   }
}
pageBack();

//底部按钮点击事件
function over(){
	var a = confirm("确定要退出么?");
	if(a === true){
		window.location.href ="../index.html";
	}
}
function log(){
	// window.location.href = "../html/log.html?log";
}
