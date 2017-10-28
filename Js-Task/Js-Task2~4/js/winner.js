//获取dom
var winnerName = document.getElementById("winner"),
	winTipName = document.getElementById("winnerTip"),
	playerNum = document.getElementById("playerNum"),
	dayTip = document.getElementById("daytip");


//获取保存数据
var winner = sessionStorage.getItem("winner"),
	killerNum = sessionStorage.getItem("killerNum"),
	civilianNum = sessionStorage.getItem("civilianNum"),
	player = JSON.parse(sessionStorage.getItem("player")),
	gameDay = parseInt(sessionStorage.getItem("day"));

//获取游戏信息
	//胜者名字
winnerName.innerHTML = winner;
	//胜者信息
winTipName.innerHTML = winner;
	//杀手、平民数量
playerNum.innerHTML = "杀&emsp;手 "+killerNum+" 人&emsp;&emsp;"+"平&emsp;民 "+civilianNum+" 人";
	// 天数信息
function playerTip(){
	//遍历玩家信息
	for(var d = 1; d < gameDay+1; d++){
		var kname = "" , knum = "" , vname = "" , vnum = "";
		for(var j = 0; j < player.length; j++){
			if(player[j].deathDay === d){
				if(player[j].deathStyle === "kill"){
					knum = j+1;
					kname = player[j].name;
				}else{
					vnum = j+1;
					vname = player[j].name;
				}
			}
		}
		if(kname === ""){
			$(".mark").before(
				'<ul class="course">'+
					'<li class="main-top">'+
						'<p class="day">第'+d+'天</p>'+
						'<p class="time">0小时07分</p>'+
					'</li>'+
					'<li>晚上：今晚杀手信了佛。</li>'+
					'<li>白天：'+vnum+'号被全民投票投死了，他的身份是'+vname+'</li>'+
				'</ul>'
			);
		}else if(vname === ""){
			$(".mark").before(
				'<ul class="course">'+
				'<li class="main-top">'+
				'<p class="day">第'+d+'天</p>'+
				'<p class="time">0小时07分</p>'+
				'</li>'+
				'<li>晚上：'+knum+'号被杀手杀死了，他的身份是'+kname+'。</li>'+
				'<li>白天：这一切都已经结束了。</li>'+
				'</ul>'
			)
		}else{
			$(".mark").before(
				'<ul class="course">'+
				'<li class="main-top">'+
				'<p class="day">第'+d+'天</p>'+
				'<p class="time">0小时07分</p>'+
				'</li>'+
				'<li>晚上：'+knum+'号被杀手杀死了，他的身份是'+kname+'。</li>'+
				'<li>白天：'+vnum+'号被全民投票投死了，他的身份是'+vname+'。</li>'+
				'</ul>'
			);
		}
	}
}
playerTip();

//按钮点击
function backHome(){
	window.location.href = "../index.html";
}
function again(){
	window.location.href = "../html/deal.html";
}
