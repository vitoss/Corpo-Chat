function addUser(user) {
  db.users.insert(user);
}

function addRoom(room) {
    room.created_at = new Date();
    db.rooms.insert(room);
}

function setKeywords(room) {
	room.keywords = room.name.split(' ');
}

var userID = ObjectId();
addUser({"_id": userID, "email": "admin@goo.com"});

for(var i=0,l=200; i<l; i++) {
    var room = {"_id": ObjectId(), "name": "Room " + i, "status": 1, "owner": userID};

    setKeywords(room);
    addRoom(room);
}