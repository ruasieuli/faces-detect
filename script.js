// Code goes here
var app = angular.module('app', []);

app.factory('recognizeService', function($http) {
    return {
        recognize: function(imgLink) {
            var url = 'https://wt-df4c854225b46229dc8abf520a994e22-0.run.webtask.io/khoana';
            return $http({
                method: 'POST',
                url,
                data: {
                    url: imgLink
                }
            });
        }
    }
});

app.controller('mainCtrl', function($scope, recognizeService) {
    $scope.isLoading = false;

    $scope.$watch('imageLink', function(oldValue, newValue) {
        $scope.faces = [];
        $scope.faceDisplay = [];
    });

    // Gọi hàm này khi người dùng click button "Nhận diện"
    $scope.recognize = function() {
        if ($scope.isLoading)
            return;

        $scope.isLoading = true;
        // Gọi hàm recognize của service
        recognizeService.recognize($scope.imageLink).then(result => {
            $scope.faces = result.data;

            // Dựa vào kết quả trả về để set style động cho class idol-face
            $scope.faceDisplay = result.data.map(rs => {
                return {
                    style: {
                        top: rs.face.top + 'px',
                        left: rs.face.left + 'px',
                        width: rs.face.width + 'px',
                        height: rs.face.height + 'px'
                    },
                    name: rs.idol.name
                }
            });
            $scope.isLoading = false;
        });
    }

    // Danh sách ảnh để test
    $scope.testImages = ["http://media-cache-ec0.pinimg.com/736x/37/cd/d6/37cdd6e27b712f3b86ae559dc623e0c3.jpg", "https://media.ngoisao.vn/resize_580/news/2016/01/27/huong-hana-la-ai-2-ngoisao.vn.stamp2.jpg", "http://media.ngoisao.vn/resize_580/news/2014/11/30/miu-le-20.jpg", "http://2.bp.blogspot.com/-DjUlZDv1WC8/TfMbd9zu7GI/AAAAAAAAZKs/yBMj-cJQg9o/s1600/Hoang-Thuy-Linh-2.jpg"];

    // Danh sách idol
    $scope.idols = [
        "Ngọc Trinh",
        "Bà tưng",
        "Hường Hana",
        "Hoàng Thùy Linh",
        "Elly Trần",
        "Thuỷ Top",
        "Tâm Tít",
        "Midu",
        "Miu Lê",
        "Chi Pu",
        "Khả Ngân",
        "Angela Phương Trinh"
    ];
});
