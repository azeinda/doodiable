 'use strict';

angular.module('doodiableApp')
    .factory('notificationInterceptor', function ($q, AlertService) {
        return {
            response: function(response) {
                var alertKey = response.headers('X-doodiableApp-alert');
                if (angular.isString(alertKey)) {
                    AlertService.success(alertKey, { param : response.headers('X-doodiableApp-params')});
                }
                return response;
            },
        };
    });