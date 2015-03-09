angular.module('dashboard').controller('HeaderCtrl', function($scope, $modal){

    $scope.open = function () {
        var modalInstance = $modal.open({
            templateUrl: 'myModalContent.html',
            controller: 'AddTimeSliceCtrl',
            resolve: {
                items: function () {
                    return $scope.items;
                }
            }
        });

        modalInstance.result.then(function () {
        }, function () {
            console.log('Modal dismissed at: ' + new Date());
        });
    };
});
