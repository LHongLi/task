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
					page:null,
					size: null,
					type: null,
					status: null,
					starAt: null,
					endAt: null
				},
				url: "/article?page&size&type&status&startAt&endAt",
				templateUrl: "../html/list.html"
			})
			.state("home.newArticle",{
				url: "/newArticle",
				templateUrl: "../html/new_article.html"
			})
	});
