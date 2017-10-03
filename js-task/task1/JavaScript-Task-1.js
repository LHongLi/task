
var block=document.getElementsByClassName("box");//获取格子的dom
function start(){
    //生成三个随机数
	randomNum();
	var num = randomNum();
	for(var i=0;i<9;i++){
		if(i<3){
			block[num[i]].style.background = randomColor()
		}else{
			block[num[i]].style.background = "orange"
		}

	}
	}

	function randomNum(){
		var num=new Array();//存放随机数
		while(num.length<9){
			var randomNum=Math.floor(Math.random()*9);//随机数产生
			if(num.indexOf(randomNum)<0){
				num.push(randomNum);
			}
		}
		return num;
	}


	//获取随机颜色
	function randomColor(){
		color=Math.floor(Math.random()*0xffffff).toString(16);
		while(color.length<6){
			color='0'+color;
		}
		return '#'+color;
		//生成随机色
	}



//给这个三个小格子随机改变颜色,并且其他6个格子不变
//点击开始按钮后开始变色
//点击关闭后恢复格子原本颜色
