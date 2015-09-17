'use strict';

angular.module('doodiableApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('member', {
                parent: 'entity',
                url: '/members',
                data: {
                    roles: ['ROLE_USER'],
                    pageTitle: 'Members'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/member/members.html',
                        controller: 'MemberController'
                    }
                },
                resolve: {
                }
            })
            .state('member.detail', {
                parent: 'entity',
                url: '/member/{id}',
                data: {
                    roles: ['ROLE_USER'],
                    pageTitle: 'Member'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/member/member-detail.html',
                        controller: 'MemberDetailController'
                    }
                },
                resolve: {
                    entity: ['$stateParams', 'Member', function($stateParams, Member) {
                        return Member.get({id : $stateParams.id});
                    }]
                }
            })
            .state('member.new', {
                parent: 'member',
                url: '/new',
                data: {
                    roles: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$modal', function($stateParams, $state, $modal) {
                    $modal.open({
                        templateUrl: 'scripts/app/entities/member/member-dialog.html',
                        controller: 'MemberDialogController',
                        size: 'lg',
                        resolve: {
                            entity: function () {
                                return {casNumber: null, firstName: null, lastName: null, registrationDate: null, id: null};
                            }
                        }
                    }).result.then(function(result) {
                        $state.go('member', null, { reload: true });
                    }, function() {
                        $state.go('member');
                    })
                }]
            })
            .state('member.edit', {
                parent: 'member',
                url: '/{id}/edit',
                data: {
                    roles: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$modal', function($stateParams, $state, $modal) {
                    $modal.open({
                        templateUrl: 'scripts/app/entities/member/member-dialog.html',
                        controller: 'MemberDialogController',
                        size: 'lg',
                        resolve: {
                            entity: ['Member', function(Member) {
                                return Member.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('member', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            });
    });
