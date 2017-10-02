// 获取小格子的dom
var block=document.getElementsByClassName('box');
//设置延时
function start(){
	setInterval("startShow()",1);
}
//触发点击按钮事件
function startShow(){
	var num=Array();
	while(num.length<3){//设置'num'数组循环三次
		var randomNum=Math.floor(Math.random()*9);
		if(num.indexOf(randomNum)<0){
			num.push(randomNum);
		}
		//使用'indexOf'来判断数组中有没有相同的随机数
		var randomColor=Math.floor(Math.random()*0xffffff).toString(16);
		while(randomColor.length<6){
			randomColor='0'+randomColor;
		}
		//设置随机色数组长度小于'6'时添加'0'在首位
		randomColor='#'+randomColor;
		//设置随机色数组的首位加入'#'来打到符合16进制颜色值额的标准
		block[randomNum].style.background=[randomColor];
	}
}
