angular.module('dashboard').controller('AddTimeSliceCtrl',function($scope, $modalInstance){

    $scope.ok = function () {
        $modalInstance.close();
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

});
