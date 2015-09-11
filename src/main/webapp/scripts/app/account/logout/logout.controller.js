'use strict';

angular.module('doodiableApp')
    .controller('LogoutController', function (Auth) {
        Auth.logout();
    });
