(function () {
    app.controller('Demo.Manage', ['$scope', '$window', '$timeout',
        function ($scope, $window, $timeout) {
            var vm = this;
            vm.Save = function () {
                if ($scope.formTicket.$valid) {
                    alert('submit ok');
                }
            }

        }]);

})();
