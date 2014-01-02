load('./config.js');

function addRoom(room) {
    room.created_at = new Date();
    db.rooms.insert(room);
}

function setKeywords(room) {
	room.keywords = room.name.split(' ');
	room.keywords.push(room.name);
}

var userID = config.userId;

for(var i=0,l=200; i<l; i++) {
    var room = {"_id": ObjectId(), "name": "Room " + i, "status": 1, "owner": userID};

    setKeywords(room);
    addRoom(room);
}

//some predefined room
var specialRoom = {"_id": ObjectId(config.roomId), "name": "Special Room", "status": 1, "owner": userID};
setKeywords(specialRoom);
addRoom(specialRoom);