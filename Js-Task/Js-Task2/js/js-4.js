//头部按钮跳转
function deal(){
	window.location.href="../html/deal.html"
}
function backHome(){
	window.location.href="../index.html"
}
function log(){
	window.location.href = "../html/log.html";
}
$(document).ready(function(){

	//获取玩家数组
	var player = JSON.parse(sessionStorage.getItem("player"));
	console.log(player);

	clickBtnChange();

});
//流程点击事件
function clickBtnChange(){
	var dj1 = 0, dj2 = 0, dj3 = 0, dj4 = 0;
	$("#kill").click(function(){

		//url传参
		window.location.href="../html/log.html?kill"
		if(dj1 < 1){			//除第一次点击外，再次点击会弹窗提示
			dj1++;

			//点击变色事件
			$(this).css("background" , "#868686");
			$("#killsj").css("border-right-color" , "#868686");

			//页面跳转
			window.location.href = "../html/log.html"
		}else{
			alert("请进行下一步操作。");
		}
	});
	$("#dead").click(function(){
		if(dj2 < 1){			//只能顺序点击按钮并无法多次点击，再次点击会弹窗提示
			if(dj1 < 1){
				alert("请按顺序进行游戏。");
			}else{
				dj2++;
				$(this).css("background" , "#868686")
				$("#deadsj").css("border-right-color" , "#868686")
				alert("请死者亮明身份，并发表遗言。");
			}
		}else{
			alert("请进行下一步操作。");
		}
	});
	$("#talk").click(function(){
		if(dj3 < 1){			//只能顺序点击按钮并无法多次点击，再次点击会弹窗提示
			if(dj1 < 1){
				alert("请按顺序进行游戏。");
			}if(dj2 < 1){
			}else{
				dj3++;
				$(this).css("background" , "#868686")
				$("#talksj").css("border-right-color" , "#868686")
				alert("玩家开始依次发言讨论。");
			}
		}else{
			alert("请进行下一步操作。");
		}
	});
	$("#vote").click(function(){
		if(dj4 < 1){			//只能顺序点击按钮并无法多次点击，再次点击会弹窗提示
			if(dj1 < 1){
			}if(dj2 < 1){
			}if(dj3 < 1){
				alert("请按顺序进行游戏。");
			}else{
				dj4++;
				// url传参到log页
				sessionStorage.href = "../html/log.html?killers";

				//传递游戏天数
				var gameDay = {
					day: dj1,
				};
				sessionStorage.gameDay = JSON.stringify(gameDay);
				$(this).css("background" , "#868686");
				$("#votesj").css("border-right-color" , "#868686");

				//页面跳转
				window.location.href = "../html/log.html";
			}
		}else{
			alert("请进行下一步操作");
		}
	});
//点击天数隐藏显示
	$(".day").click(function(){
		$(".process").slideToggle();
	});
}
