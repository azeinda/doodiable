'use strict';

angular.module('doodiableApp').controller('MemberDialogController',
    ['$scope', '$stateParams', '$modalInstance', 'entity', 'Member',
        function($scope, $stateParams, $modalInstance, entity, Member) {

        $scope.member = entity;
        $scope.load = function(id) {
            Member.get({id : id}, function(result) {
                $scope.member = result;
            });
        };

        var onSaveFinished = function (result) {
            $scope.$emit('doodiableApp:memberUpdate', result);
            $modalInstance.close(result);
        };

        $scope.save = function () {
            if ($scope.member.id != null) {
                Member.update($scope.member, onSaveFinished);
            } else {
                Member.save($scope.member, onSaveFinished);
            }
        };

        $scope.clear = function() {
            $modalInstance.dismiss('cancel');
        };
}]);
