load('./config.js');

function addUser(user) {
  db.users.insert(user);
}

var userID = config.userId;
addUser({"_id": userID, "email": "admin@goo.com"});

for(var i=99; i>9; i--) {
	addUser({"_id": ObjectId(config.userIdPrefix+i), "email": "admin@goo.com"});
}