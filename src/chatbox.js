angular
	.module('ngChatbox', [])
	.directive('ngChatbox', function() {
		return {
			templateUrl: '/chatbox.html',
			replace: true,
			scope: {
				messages: '=ngModel'
			},
			link: function($scope, element, attrs, ctrl) {
				$scope.wrap = element[0].querySelector(".wrap");
				$scope.holder = element[0].querySelector(".scroller");
			},
			controller: function($scope) {
				$scope.$watch('messages.length', val => {
					if (!val) return void 0;
					setTimeout(function() {
						$scope.holder.scrollTop = $scope.wrap.scrollHeight + 1000;
					}, 0);
				});
			}
		}
	})
	.filter('chatboxExtractText', function () {
		return msg => msg instanceof Object ? msg.text : msg
	});
