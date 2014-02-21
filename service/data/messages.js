load('./config.js');

function addMessage(msg) {
    msg.date = new Date();
    db.messages.insert(msg);
}

function setKeywords(msg) {
	msg.keywords = msg.content.toLowerCase().split(' ');
	msg.keywords.push(msg.author.username.toLowerCase());
    msg.keywords.push(msg.author.email.toLowerCase());
}

var userID = config.userId;

for(var i=0,l=2000; i<l; i++) {
    var userIdSuffix = i % 99,
    	msg = {"_id": ObjectId(), "content": "Message number " + i, "status": 1, 
    			"author": {"email": "user"+userIdSuffix+"@goo.com", 
                            "username": "user"+userIdSuffix,
                            "avatar": "SomeAvatar.png"
                        },
                "room": config.roomId};

    setKeywords(msg);
    addMessage(msg);
}
