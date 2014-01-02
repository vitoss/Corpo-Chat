load('./config.js');

function addMessage(msg) {
    msg.date = new Date();
    db.messages.insert(msg);
}

function setKeywords(msg) {
	msg.keywords = msg.content.split(' ');
	msg.keywords.push(msg.author);
}

var userID = config.userId;

for(var i=0,l=2000; i<l; i++) {
    var userIdSuffix = i % 99,
    	msg = {"_id": ObjectId(), "content": "Message number " + i, "status": 1, 
    			"author": config.userIdPrefix+userIdSuffix, "room": config.roomId};

    setKeywords(msg);
    addMessage(msg);
}
