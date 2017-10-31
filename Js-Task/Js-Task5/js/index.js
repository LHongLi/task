//获取DOM
var login = document.getElementById("btn"),
	account = document.getElementById("account"),
	password = document.getElementById("password");



//==========原生写法==========
// 点击登录按钮获取输入框内容
// login.onclick = function(){
// 	//获取输入框的值
// 	var aot = account.value,
// 	pwd = password.value;
// 	//创建AJAX对象
// 	var ajax = new XMLHttpRequest();
// 	// 指定HTTP动作、请求的网址、是否异步(异步为true，同步为false)
// 	ajax.open("post", "/carrots-admin-ajax/a/login", true);
// 	//设置请求头部信息
// 	ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
// 	// 发送HTTP请求
// 	ajax.send("name="+aot+"&pwd="+pwd);
// 	ajax.onreadystatechange = function(){
// 		$(".error").remove();
// 		if(ajax.readyState === 4){
// 			if(ajax.status === 200){
// 				var data = JSON.parse(ajax.responseText);
// 				console.log(data.code);
// 				if(data.code === -5003){
// 					$(".log_in").before("<p class=error>"+data.message+"</p>");
// 				}else if(data.code === -5004){
// 					$(".log_in").before("<p class=error>"+data.message+"</p>");
// 				}else if(data.code === 0){
// 					window.location.href = "/carrots-admin-ajax/";
// 				};
// 			}else{
// 				alert("发生错误："+ajax.statusText);
// 			}
// 		}
// 	}
// };

//==========jQuery写法==========
$(document).ready(function(){
	$(".log_in").click(function(){
		$(".error").remove();
		$.ajax({
			//请求地址
			url: "/carrots-admin-ajax/a/login",
			//请求动作
			type: "post",
			//是否异步
			async: true,
			//传递出去的数据
			data:{"name": account.value,"pwd": password.value},
			//data的转化方式
			dataType: "json",
			//请求头部信息
			beforeSend: function(xhr){xhr.setRequestHeader('X-Test-Header', 'test-value');},
			success:function(data){
				if(data.code === -5003){
					$(".log_in").before("<p class=error>"+data.message+"</p>");
				}else if(data.code === -5004){
					$(".log_in").before("<p class=error>"+data.message+"</p>");
				}else if(data.code === 0){
					window.location.href = "/carrots-admin-ajax/";
				}
			}
		})
	})
});
