var a=Math.random()*9;
var b=Math.floor(a);
var c=document.getElementsByClassName('box');				//数组
var d='#'+Math.floor(Math.random()*0xffffff).toString(16);
for(var i=0;i<3;i++){
	a=Math.random()*9;
	b=Math.floor(a);
	c[b].style.background=[d];
	var d='#'+Math.floor(Math.random()*0xffffff).toString(16);
}
