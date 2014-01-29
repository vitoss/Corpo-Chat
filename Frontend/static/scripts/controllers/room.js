
angular.module('corpoApp')
.controller('RoomCtrl', ['$scope', '$routeParams', 'Restangular', 'session', 'broker',
  function($scope, $routeParams, Restangular, session, broker) {
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
  }
]);