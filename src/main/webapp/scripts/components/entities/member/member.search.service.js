'use strict';

angular.module('doodiableApp')
    .factory('MemberSearch', function ($resource) {
        return $resource('api/_search/members/:query', {}, {
            'query': { method: 'GET', isArray: true}
        });
    });
