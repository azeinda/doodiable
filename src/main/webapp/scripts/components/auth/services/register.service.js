'use strict';

angular.module('doodiableApp')
    .factory('Register', function ($resource) {
        return $resource('api/register', {}, {
        });
    });


