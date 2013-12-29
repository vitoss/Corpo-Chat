function addUser(user) {
  db.users.insert(user);
}

function addRoom(room) {
    room.created_at = new Date();
    db.rooms.insert(room);
}

function setKeywords(room) {
	room.keywords = room.name.split(' ');
	room.keywords.push(room.name);
}

var userID = '52bffacbefb24c6bd59b3983';
addUser({"_id": userID, "email": "admin@goo.com"});

for(var i=0,l=200; i<l; i++) {
    var room = {"_id": ObjectId(), "name": "Room " + i, "status": 1, "owner": userID};

    setKeywords(room);
    addRoom(room);
}

//some predefined room
var specialRoom = {"_id": ObjectId('63bffacbefb24c6bd59b3983'), "name": "Special Room", "status": 1, "owner": userID};
setKeywords(specialRoom);
addRoom(specialRoom);