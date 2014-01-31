
angular.module('corpoApp')
.controller('RoomCtrl', ['$scope', '$routeParams', 'Restangular', 'session', 'broker', '$location',
  function($scope, $routeParams, Restangular, session, broker, $location) {
    var roomId = $routeParams.roomId,
      subscription,
      brokerDelegate,
      messages = [];

    Restangular.one('rooms', roomId)
      .get().then(function(room) {
        $scope.room = room;

        session.add(room);
      });

    brokerDelegate = {
      connected: function(data) {
        subscription.history();

        messages.push({date: new Date(), content: 'Connected to the room'});
      },
      message: function(msg) {
        messages.push(msg);
      }
    };

    subscription = broker.subscribe(roomId, brokerDelegate);

    $scope.messages = messages;

    $scope.draft = '';

    $scope.send = function sendMessage() {
      subscription.send($scope.draft);
      $scope.draft = '';
    };

    $scope.leave = function leaveRoom() {
      session.remove($scope.room);

      $location.path('/')
    };
  }
]);