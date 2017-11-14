angular.module("myApp").controller("formUp", function ($scope, $http) {
    $scope.title = null;
    $scope.type = null;
    $scope.typeOptions = [{ id: null, name: "请选择" }, { id: "0", name: "首页Banner" }, { id: "2", name: "找精英Banner" }, { id: "1", name: "找职位Banner" }, { id: "3", name: "行业大图" }];
    $scope.lookUrl = null;
    //立即上线
    $scope.upLoad = function () {
        $http({
            method: "post",
            url: "/carrots-admin-ajax/a/u/article",
            params: {
                title: $scope.title,
                type: $scope.type,
                status: "1",
                img: $scope.lookUrl
            }
        }).then(function (response) {
            console.log(response.data.message);
        })
    }
    //存为草稿按钮
    //取消按钮
    $scope.cancel = function () {
        var no = confirm('确定放弃此次新建内容么?');
        if (no === true) {
            
        }
    }
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

