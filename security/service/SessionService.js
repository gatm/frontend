angular.module('security').service('SessionService', function () {
    this.create = function (username, token, userRole) {
        this.username = username;
        this.token = token;
        this.userRole = userRole;
    };
    this.destroy = function () {
        this.username = null;
        this.token = null;
        this.userRole = null;
    };
    return this;
})
.constant('AUTH_EVENTS', {
    loginSuccess: 'auth-login-success',
    loginFailed: 'auth-login-failed',
    logoutSuccess: 'auth-logout-success',
    sessionTimeout: 'auth-session-timeout',
    notAuthenticated: 'auth-not-authenticated',
    notAuthorized: 'auth-not-authorized'
})
.constant('USER_ROLES', {
    all: '*',
    admin: 'admin',
    editor: 'editor',
    guest: 'guest'
});
