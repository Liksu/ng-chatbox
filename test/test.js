function randomText() {
	var n = (Math.random() * 3 + 3) << 0;
	var str = [];
	while (n--) str.push( Math.random().toString(36).substr(2, 7).replace(/\d/g, '') );
	return str.join(' ');
}

angular.module('app', ['ngChatbox']).controller('ctrl', function($scope) {
	$scope.messages = [];

	$scope.add = function() {
		$scope.messages.push({
			time: new Date().toISOString().replace(/T/, ' ').substr(0, 19),
			text: randomText(),
			own: Math.random() > 0.5 ? 'their' : 'mine'
		});
	};
});