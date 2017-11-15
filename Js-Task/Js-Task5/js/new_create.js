angular.module("myApp").controller("formUp", function ($scope, $http, $state, $stateParams) {
    $scope.editName = null;
    var con = $stateParams.id;
    console.log(con)
    if (con !== null) {
        //编辑信息
        $scope.editName = "编辑";
        $http({
            method: "get",
            url: "/carrots-admin-ajax/a/article/" + con,
        }).then(function (response) {
            var info = response.data.data;
            var types = info.article.type;
            type = types.toString();
            var industrys = info.article.industry;
            industry = industrys.toString();
            var edit = info.article.content;

            $scope.title = info.article.title;
            $scope.type = type;
            $scope.industry = industry;
            $scope.lookUrl = info.article.img;
            $scope.imgLink = info.article.url;
            editor.txt.html(edit);
            $scope.dateCreate = info.article.createAt;
        })
    } else if (con === null) {
        $scope.editName = "新增"
    }
    //新增信息
    $scope.type = null;
    $scope.industry = null;
    $scope.typeOptions = [{ id: null, name: "请选择" }, { id: "0", name: "首页Banner" }, { id: "1", name: "找精英Banner" }, { id: "2", name: "找职位Banner" }, { id: "3", name: "行业大图" }];

    $scope.industryOptions = [{ id: null, name: "请选择" }, { id: "0", name: "移动互联网" }, { id: "1", name: "电子商务" }, { id: "2", name: "企业服务" }, { id: "3", name: "O2O" }, { id: "4", name: "教育" }, { id: "5", name: "金融" }, { id: "6", name: "游戏" }];

    //立即上线

    $scope.upLoad = function (x) {
        $scope.content = editor.txt.html();
        console.log($scope.content);
        if ($scope.myForm.$invalid || $scope.lookUrl === undefined) {
            alert("请填写所有项目！")
        } else {
            //判断是编辑按钮还是新增按钮
            if (con !== null) {
                console.log("这是编辑页面...");
                $http({
                    method: "put",
                    url: "/carrots-admin-ajax/a/u/article/" + con,
                    params: {
                        title: $scope.title,
                        type: $scope.type,
                        status: x,
                        img: $scope.imgLink,
                        url: $scope.imgLink,
                        content: $scope.content,
                        createAt: $scope.dateCreate,
                        industry: $scope.industry
                    }
                }).then(function (response) {
                    console.log(response.data.code)
                    $state.go("home.article", { size: 10, page: 1 });
                });
            } else {
                console.log("这是新增页面...");
                $http({
                    method: "post",
                    url: "/carrots-admin-ajax/a/u/article",
                    params: {
                        title: $scope.title,
                        type: $scope.type,
                        status: x,
                        img: $scope.imgLink,
                        url: $scope.imgLink,
                        content: $scope.content,
                        industry: $scope.industry
                    }
                }).then(function (response) {

                    $state.go("home.article", {
                        page: 1,
                        size: 10
                    });
                });
            }
        }
    }

    //取消按钮
    $scope.cancel = function () {

        // var back = confirm("确定放弃本次编辑并返回么");
        // if (back === true) {
        //     $state.go("home.article", { size: 10, page: 1 });
        // }

        console.log($scope.type);
        console.log($scope.industry);
    }

    //富文本
    var E = window.wangEditor;
    var editor = new E('#editor');
    // 或者 var editor = new E( document.getElementById('#editor') )
    editor.create();
});

//自定义指令获取图片信息及上传
angular.module("myApp").directive("imgDirective", function ($http) {
    return {
        restrict: "EACM",
        replace: true,

        compile: function (tElement) {
            return {
                post: function (scope, iElement) {
                    var vm = scope.vm = {
                        value: 0
                    };
                    //图片上传
                    scope.showImg = function (source) {
                        scope.files = source.files
                        scope.file = source.files[0];
                        vm.value = 0;
                        scope.$apply();
                        //图片上传
                        scope.imgGo = function () {
                            var formData = new FormData()
                            formData.append("file", scope.file);
                            $http({
                                method: "post",
                                url: "/carrots-admin-ajax/a/u/img/task",
                                data: formData,
                                headers: {
                                    'Content-Type': undefined
                                },
                                uploadEventHandlers: {
                                    progress: function (e) {
                                        vm.value = (e.loaded / e.total) * 100;
                                        vm.style = 'progress-bar-info';
                                        vm.showLabel = true;
                                        vm.striped = true;
                                        vm.wid = 100;
                                    }
                                }
                            }).then(function (response) {
                                scope.lookUrl = response.data.data.url;
                                scope.imgLink = scope.lookUrl;
                            })
                        }
                    }

                }
            }
        }
    }
})

//自定义文件大小过滤器
angular.module("myApp").filter("size", function () {
    return function (b) {
        var mb = (b / 1024 / 1024);
        size = Math.round(parseFloat(mb) * 100) / 100 + "Mb";
        return size;
    };
})



