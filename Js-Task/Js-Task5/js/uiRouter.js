// 创建app作用域，并使用路由传参来进行页面局部刷新
var myApp = angular.module("myApp" , ["ui.router","ui.bootstrap"])
	myApp.config(function ($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.when("", "/home");
		$stateProvider
			.state("home",{
				url: "/home",
				templateUrl:"../html/home.html"
			})
			.state("home.article",{
				params:{
					page:null
				},
				url: "/article?page",
				templateUrl: "../html/list.html"
			})
			.state("home.newArticle",{
				url: "/newArticle",
				templateUrl: "../html/new_article.html"
			})
	});
