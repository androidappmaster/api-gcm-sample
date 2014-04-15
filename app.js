var express = require('express');
var server = express();

//server.use(express.urlencoded());
server.use(express.bodyParser());

var Params = require('constants');
// GCM config

var gcm = require('node-gcm');
// Server API key
var sender = new gcm.Sender('AIzaSyA7jY_TGnF-xfwucF2eN3O5savqFTtu6II');
var registrationIds = [];

// Routes

// Register device
server.post("/register", function(req, res) {

	var regId = req.body.regId;
	registrationIds.push(regId);

	console.log("new regId " + regId + "/n");

	res.status(200);
});

// test push method
server.get('/test-push', function(req, res) {

	sendPush();

	res.status(200);
});

var sendPush = function () {

	var message = new gcm.Message({
	    collapseKey: 'appmaster',
	    delayWhileIdle: true,
	    timeToLive: 3,
	    data: {
	        user: 'Fran',
	        message: 'Hola, que tal?',
	        photo: 'http://www.comolohago.cl/wp-content/uploads/2013/06/ANDROID.png'
	    }
	});

	sender.send(message, registrationIds, 4, function (err, result) {
	    console.log(result);
	});

};

console.log("Server started");
server.listen(9999);

sendPush();
