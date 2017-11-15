//列表筛选
angular.module("myApp").controller("formTop", function ($scope, $http, $state, $stateParams) {
	//日期选择
	$scope.format = "yyyy/MM/dd";
	$scope.altInputFormats = ['yyyy/M!/d!'];
	$scope.popup1 = {	//开始日期
		opened: false
	};
	$scope.popup2 = {	//结束时间
		opened: false
	};
	$scope.open1 = function () {	//开始日期
		$scope.popup1.opened = true;
	};
	$scope.open2 = function () {	//结束时间
		$scope.popup2.opened = true;
	};

	//类型下拉框
	$scope.typeLists = [{ id: null, name: "全部" }, { id: "0", name: "首页Banner" }, { id: "2", name: "找精英Banner" }, { id: "1", name: "找职位Banner" }, { id: "3", name: "行业大图" }];

	//状态下拉框
	$scope.statusLists = [{ id: null, name: "全部" }, { id: "1", name: "草稿" }, { id: "2", name: "上线" }];

	//格式化类型/状态
	$scope.typeUrl = $stateParams.type;
	$scope.statusUrl = $stateParams.status;
	if ($stateParams.startAt !== null & $stateParams.endAt !== null) {
		console.log("aaaa")
		var start = $stateParams.startAt;
		start = new Date(parseInt(start));
		$scope.startDate = start;
		var end = $stateParams.endAt;
		end = new Date(parseInt(end));
		$scope.endDate = end;
	}
	//搜索
	$scope.search = function () {
		if ($scope.startDate !== undefined & $scope.endDate !== undefined) {
			console.log("有日期")
			var start = new Date($scope.startDate);
			$scope.startAt = start.getTime();
			var end = new Date($scope.endDate);
			end.setHours(23, 59, 59);
			$scope.endAt = end.getTime();
			$state.go("home.article", {
				page: 1,
				type: $scope.typeUrl,
				status: $scope.statusUrl,
				startAt: $scope.startAt,
				endAt: $scope.endAt
			})
		} else if ($scope.startAt === undefined & $scope.endAt === undefined) {
			console.log("有日期")
			$state.go("home.article", {
				
				page: 1,
				type: $scope.typeUrl,
				status: $scope.statusUrl
			})
		}
	}

	//清空
	$scope.reset = function () {
		$scope.typeUrl = null;
		$scope.statusUrl = null;
		$scope.startAt = null;
		$scope.endAt = null;
		$state.go("home.article", {
			page: 1,
			type: $scope.typeUrl,
			status: $scope.statusUrl,
			startAt: $scope.startAt,
			endAt: $scope.endAt
		})
	};
});
//获取后台信息
angular.module("myApp").controller("myList", function ($scope, $http, $state, $stateParams) {
	//获取后台数据
	$http({
		method: "get",
		url: "/carrots-admin-ajax/a/article/search",
		params: {
			size: $stateParams.size,
			page: $stateParams.page,
			status: $stateParams.status,
			type: $stateParams.type,
			startAt: $stateParams.startAt,
			endAt: $stateParams.endAt
		}
	}).then(function (response) {
		//获取所有信息
		$scope.lists = response.data.data;

		//最大条数
		$scope.total = $scope.lists.total;
		$scope.size = $scope.lists.size;

		//获取总页数
		var pages = new Array();
		var page = Math.ceil($scope.lists.total / $scope.lists.size);
		$scope.maxPage = page;	//最大页数
		for (var i = 0; i < page; i++) {
			pages.push(i + 1);
		}
		$scope.pages = pages;
	});

	//点击页码跳转
	$scope.pageNum = function (x) {
		$scope.page = x;
		$state.go("home.article", { page: x })
	};

	//上一页
	$scope.prePage = function () {
		if ($stateParams.page > 1) {
			$stateParams.page--;
			$state.go("home.article", { page: $stateParams.page })
		} else {
			alert("已经是第一页了！");
		}
	};

	//下一页
	$scope.nextPage = function () {
		if ($stateParams.page < $scope.maxPage) {
			$stateParams.page++;
			$state.go("home.article", { page: $stateParams.page })
		} else {
			alert("已经是最后一页了！");
		}
	}

	//首页&尾页
	$scope.pageHome = function () {
		$state.go("home.article", { page: 1 })
	};
	$scope.pageEnd = function () {
		$state.go("home.article", { page: $scope.maxPage })
	}

	//输入页码进行跳转
	$scope.pageJump = $stateParams.page;
	$scope.pageGo = function () {
		if ($scope.pageJump <= $scope.maxPage) {
			$state.go("home.article", { page: $scope.pageJump })
		} else {
			alert("请输入正确的页码！")
		}
	};

	//修改页面显示信息条数
	$scope.disSize = $stateParams.size;
	$scope.sizeMod = function () {
		$state.go("home.article", { size: $scope.disSize })
	};

	/**
	 * 信息操作
	 */
	//上/下线
	$scope.offLine = function (x, y) {
		if (x === 2) {
			var statusCode = confirm("确定要将此条信息下线并存为草稿么");
			if (statusCode === true) {
				x = 1;
			}
		} else if (x === 1) {
			var statusCode = confirm("确定要将此条信息上线么");
			if (statusCode === true) {
				x = 2;
			}
		}
		$http({
			method: "put",
			url: "/carrots-admin-ajax/a/u/article/status",
			params: {
				status: x,
				id: y
			}
		}).then(function (response) {
			console.log(response.data.message);
			if (response.data.message === "success") {
				$state.go("home.article", {}, { reload: true });
			} else {
				alert("操作错误，重新尝试！")
			}
		})
	}
	//编辑
	$scope.edit = function (x) {
		$state.go("home.newArticle", { id: x })
	}
	//删除
	$scope.delete = function (x) {
		$http({
			method: "delete",
			url: "/carrots-admin-ajax/a/u/article/" + x,
		}).then(function (response) {
			var backInfo = response.data;
			console.log(backInfo.message)
			if (backInfo.message === "success") {
				alert("删除成功")
				$state.go("home.article", {}, { reload: true })
			} else {
				alert("删除失败！请稍后重试！")
			}
		})
	}

});

//转化类型和状态的含义
angular.module("myApp").filter("type", function () {
	return function (type) {
		if (type === 0) {
			type = "首页banner";
			return type;
		} else if (type === 1) {
			type = "找职位banner";
			return type;
		} else if (type === 2) {
			type = "找精英banner";
			return type;
		} else if (type === 3) {
			type = "行业大图";
			return type;
		}
	}
}).filter("status", function () {
	return function (status) {
		if (status === 1) {
			status = "草稿";
			return status;
		} else if (status === 2) {
			status = "上线";
			return status;
		}
	}
}).filter("btn", function () {
	return function (status) {
		if (status === 1) {
			status = "上线";
			return status;
		} else if (status === 2) {
			status = "下线";
			return status;
		}
	}
})



