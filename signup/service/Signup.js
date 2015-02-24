angular.module('signup').factory('Signup',function($http) {

	var Signup = {};

    Signup.register = function (signupData) {
        return $http({
            method: 'POST',
            url: 'http://localhost:8080/gatm/v1/signup', //TODO: Fix url
            headers: {'Content-Type': 'application/json;charset=UTF-8'},
            data: {
                email: signupData.email,
                name: signupData.name,
                password: signupData.password
            }
        }).then(function (res) {
            return signupData;
        });

    };

	return Signup;
});
