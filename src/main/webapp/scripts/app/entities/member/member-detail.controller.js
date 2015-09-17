'use strict';

angular.module('doodiableApp')
    .controller('MemberDetailController', function ($scope, $rootScope, $stateParams, entity, Member) {
        $scope.member = entity;
        $scope.load = function (id) {
            Member.get({id: id}, function(result) {
                $scope.member = result;
            });
        };
        $rootScope.$on('doodiableApp:memberUpdate', function(event, result) {
            $scope.member = result;
        });
    });
