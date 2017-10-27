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
	killedNum = document.getElementById("killednum"),
	killedName = document.getElementById("killedname"),
	voteNum = document.getElementById("votenum"),
	voteName = document.getElementById("votename");

//获取本地数据
var player = JSON.parse(sessionStorage.getItem("player")),
	gameDay = parseInt(sessionStorage.getItem("day")),
 	killNum = sessionStorage.getItem("killerNum"),
 	civilianNum = sessionStorage.getItem("civilianNum"),
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
/*===============流程事件===============*/
var dj = function(order,orderNum){
	if(order === orderNum){
		switch(orderNum){
			case 1:
				window.location.href = "../html/log.html?kill";
				kill.style.background = "#868686";
				killSJ.className = "change";
				console.log(order,orderNum);
				break;
			case 2:
				word.style.background = "#868686";
				wordSJ.className = "change";
				alert("请死者亮明身份，并发表遗言。");
				console.log(order,orderNum);
				break;
			case 3:
				talk.style.background = "#868686";
				talkSJ.className = "change";
				alert("玩家开始依次发言讨论。");
				console.log(order,orderNum);
				break;
			case 4:
				window.location.href = "../html/log.html?vote";
				console.log(order,orderNum);
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
	}else if(order < 4){
		alert("请按照游戏顺序进行游戏");
	}else{
		alert("请点击下一步");
	}
};

//游戏天数
(function(){
	day.innerHTML = gameDay;
})();

///杀人、投票页面返回信息
var url = location.search;
var str = url.substr(1);
function pageBack(){
	if(str === "kill"){
	   for(var i = 0; i < player.length; i++){
		   if(player[i].deathStyle === "kill"){
			   kill.style.background = "#868686";
			   killSJ.className = "change";
			   killMess.style.display = "block";
			   killedNum.innerHTML = player[i].num;
			   killedName.innerHTML = player[i].name;
			   navLogo[0].style.top = "5rem";
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
		   kill.style.background = "#868686";
		   killSJ.className = "change";
		   word.style.background = "#868686";
		   wordSJ.className = "change";
		   talk.style.background = "#868686";
		   talkSJ.className = "change";
		   vote.style.background = "#868686";
		   voteSJ.className = "change";
		   voteMess.style.display = "block";
		   killMess.style.display = "block";
		   navLogo[0].style.top = "5rem";
		   if(notKill === "null"){
			   killMess.innerHTML = "杀手未杀人。";
			   if(player[i].deathStyle === "vote"){
				   voteNum.innerHTML = player[i].num;
				   voteName.innerHTML = player[i].name;
			   }
		   }else if(not !=="null"){
			   if(player[i].deathStyle === "vote"){
				   voteNum.innerHTML = player[i].num;
				   voteName.innerHTML = player[i].name;
			   }else if(player[i].deathStyle === "kill"){
				   killedNum.innerHTML = player[i].num;
				   killedName.innerHTML = player[i].name;
			   }
		   }
	   }
   }
}
pageBack();
