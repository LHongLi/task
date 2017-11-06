var myApp = angular.module("myApp" , ["ui.router"])
	myApp.config(function ($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.when("", "/home");
		$stateProvider
			.state("home",{
				url: "/home",
				templateUrl:"../html/home.html"
			})
			.state("home.article",{
				url: "/article",
				templateUrl: "../html/list.html"
			})
			.state("home.newArticle",{
				url: "/newArticle",
				templateUrl: "../html/new_article.html"
			})
	});
