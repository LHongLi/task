//定义发布时间的日期空间
angular.module("myApp").controller("myDate",function($scope){
             $scope.format = "yyyy/MM/dd";
             $scope.altInputFormats = ['yyyy/M!/d!'];
             $scope.popup1 = {
                 opened: false
             };
             $scope.open1 = function () {
                 $scope.popup1.opened = true;
             };
});
//获取后台信息
angular.module("myApp").controller("myList",function($scope,$http,$state,$stateParams){
	//获取后台数据
	$http({
		method:"get",
		url:"/carrots-admin-ajax/a/article/search",
		params: {
			size:$stateParams.size,
			page: $stateParams.page
		}
	}).then(function(response){
		$scope.lists = response.data.data;
		//最大条数
		$scope.total = $scope.lists.total;
		$scope.size = $scope.lists.size;
		//获取总页数
		var pages = new Array();
		var page = Math.ceil($scope.lists.total/$scope.lists.size);
		$scope.maxPage = page; //最大页数
		for(var i = 0; i < page; i++){
			pages.push(i+1);
		}
		$scope.pages = pages;
	});

	//点击页码跳转
	$scope.pageJump = function(x){
		$scope.page = x;
		$state.go("home.article",{page:x})
	};

	//上一页
	$scope.prePage = function(){
		if($stateParams.page > 1){
			$stateParams.page--;
			$state.go("home.article",{page:$stateParams.page})
		}else{
			alert("已经是第一页了！");
		}
	};

	//下一页
	$scope.nextPage = function(){
		if($stateParams.page < $scope.maxPage){
			$stateParams.page++;
			$state.go("home.article",{page:$stateParams.page})
		}else{
			alert("已经是最后一页了！");
		}
	}

	//首页&尾页
	$scope.pageHome = function(){
		$state.go("home.article",{page:1})
	};
	$scope.pageEnd = function(){
		$state.go("home.article",{page:$scope.maxPage})
	}

	//输入页码进行跳转
	$scope.pageJump = $stateParams.page;
	$scope.pageGo = function(){
		if($scope.pageJump <= $scope.maxPage){
			$state.go("home.article",{page:$scope.pageJump})
		}else{
			alert("请输入正确的页码！")
		}
	};

	//修改页面显示信息条数
	$scope.disSize = $stateParams.size;
	$scope.sizeMod = function(){
		$state.go("home.article",{size:$scope.disSize})
	};
});

//转化类型和状态的含义
angular.module("myApp").filter("type",function(){
	return function(type){
		if(type === 0){
			type = "首页banner";
			return type;
		}else if(type === 1){
			type = "找职位banner";
			return type;
		}else if(type === 2){
			type = "找精英banner";
			return type;
		}else if(type === 3){
			type = "行业大图";
			return type;
		}
	}
}).filter("status",function(){
	return function(status){
		if(status === 1){
			status = "草稿";
			return status;
		}else if(status === 2){
			status = "上线";
			return status;
		}
	}
});
