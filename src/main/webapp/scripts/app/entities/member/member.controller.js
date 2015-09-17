'use strict';

angular.module('doodiableApp')
    .controller('MemberController', function ($scope, Member, MemberSearch, ParseLinks) {
        $scope.members = [];
        $scope.page = 1;
        $scope.loadAll = function() {
            Member.query({page: $scope.page, per_page: 20}, function(result, headers) {
                $scope.links = ParseLinks.parse(headers('link'));
                $scope.members = result;
            });
        };
        $scope.loadPage = function(page) {
            $scope.page = page;
            $scope.loadAll();
        };
        $scope.loadAll();

        $scope.delete = function (id) {
            Member.get({id: id}, function(result) {
                $scope.member = result;
                $('#deleteMemberConfirmation').modal('show');
            });
        };

        $scope.confirmDelete = function (id) {
            Member.delete({id: id},
                function () {
                    $scope.loadAll();
                    $('#deleteMemberConfirmation').modal('hide');
                    $scope.clear();
                });
        };

        $scope.search = function () {
            MemberSearch.query({query: $scope.searchQuery}, function(result) {
                $scope.members = result;
            }, function(response) {
                if(response.status === 404) {
                    $scope.loadAll();
                }
            });
        };

        $scope.refresh = function () {
            $scope.loadAll();
            $scope.clear();
        };

        $scope.clear = function () {
            $scope.member = {casNumber: null, firstName: null, lastName: null, registrationDate: null, id: null};
        };
    });
