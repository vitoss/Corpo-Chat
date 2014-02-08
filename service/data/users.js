load('./config.js');

function addUser(user) {
  db.users.insert(user);
}

var userID = config.userId;
addUser({"_id": userID, "email": "admin@goo.com", "avatar": ""});

for(var i=99; i>9; i--) {
	addUser({"_id": ObjectId(config.userIdPrefix+i), "email": "admin"+i+"@goo.com", "avatar": ""});
}