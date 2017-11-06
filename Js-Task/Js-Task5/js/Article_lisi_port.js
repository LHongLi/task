angular.module("myApp").controller("myList",function($scope,$http){
	$http.get("/carrots-admin-ajax/a/article/search").then(function(response){
		$scope.lists = response.data.data.articleList;
	});
})
