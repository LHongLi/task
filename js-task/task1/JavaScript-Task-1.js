
var block=document.getElementsByClassName("box");//获取格子的dom



var open;
var click=true;			//设置'click' 的boolean真值
function start() {
    if(click) {			//在'click'的boolean值为真的情况下,开启延迟执行函数
        open = setInterval(startShow, 1000);
        click=false;	//同时返回一个'click'的Boolean值为假的信息
    }
}
//终止函数，所有块回复原背景色
function stop(){
    clearInterval(open); //清除延迟执行函数
	//设置循环,当'i'小于'block'的数组长度时.i++
	for(var i=0;i<block.length;i++){
		block[i].style.background="orange";	//'block'数组中编号为'i'的元素颜色设置为'orange'
	}
	click=true;
}
function startShow(){
	randomNum();
	var num = randomNum();
	for(var i=0;i<9;i++){
		if(i<3){			//加入判断语句,判断当i<3时执行下面的代码
			//指定'block'数组中的下标为随机色
			block[num[i]].style.background = randomColor()
		}else{				//当'i>3'时格子颜色为'orange'
			block[num[i]].style.background = "orange"
		}
	}
	//生成三个随机数
	function randomNum(){
		var num=new Array();		//存放随机数
		while(num.length<9){
			var randomNum=Math.floor(Math.random()*9);	//随机数产生
			if(num.indexOf(randomNum)<0){
				num.push(randomNum);
			}//排除重复的随机数,如果有重复的随机数重新循环
		}
		return num;
	}


	//获取随机颜色
	function randomColor(){
		color=Math.floor(Math.random()*16777215).toString(16);
		if(color.hength<6){			//判断'color'的数组长度是否'<6'
			for(var i=0;i<6;i++){
				color="0"+color[i];//当'color'的数组长度小于6在首位加一个'0'
			}
		}
		return '#'+color;	//在返回的颜色数组前加上'#'来满足16进制颜色数值规格
		//生成随机色
	}
}
