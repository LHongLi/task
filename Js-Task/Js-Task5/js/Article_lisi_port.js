//定义发布时间的日期空间
angular.module("myApp").controller("myDate",function($scope){
             $scope.dat = new Date();
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
			page: $stateParams.page
		}
	}).then(function(response){
		$scope.lists = response.data.data;
		var pages = new Array();
		var page = Math.ceil($scope.lists.total/$scope.lists.size);
		for(var i = 0; i < page; i++){
			pages.push(i+1);
		}
		//总页数
		$scope.pages = pages;
	});
	//直接跳转至xx页
	$scope.page_x = function(x){
		$scope.page = x;
		$state.go("home.article",{page:x})
	}
});
