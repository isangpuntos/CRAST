'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const restService = express();
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var Promise = require('promise');
var google = require('googleapis');

restService.use(bodyParser.urlencoded({
    extended: true
}));

restService.use(bodyParser.json());

restService.post('/echo', function(req, res) {
    var speech = req.body.result && req.body.result.parameters && req.body.result.parameters.echoText ? req.body.result.parameters.echoText : "Seems like some problem. Speak again."
    return res.json({
        speech: speech,
        displayText: speech,
        source: 'webhook-echo-sample'
    });
});

restService.post('/testToken', function(req, res) {
    var command = req.body.result && req.body.result.parameters && req.body.result.parameters.command? req.body.result.parameters.command : "";
    var state = req.body.result && req.body.result.parameters && req.body.result.parameters.state? req.body.result.parameters.state : "";
    var sendCommand = (command + " " + state).trim();
    
    var clientId="862675482394-53d0qctv04es2ikt30klg5g1tkgvl24o.apps.googleusercontent.com";
    var clientSecret="8-YHNjXJd1_Og8gDqt2Nd0PD";
    var redirectUrl="https://oauth-redirect.googleusercontent.com/r/crast-webhook";
    var oauth2Client = new auth.OAuth2(clientId, clientSecret,redirectUrl);
    var dateTimeRetrieved = req.body.result && req.body.result.parameters && req.body.result.parameters.date-time? req.body.result.parameters.date-time: "";
    var any = req.body.result && req.body.result.parameters && req.body.result.parameters.any? 
    
    makeRequest('POST', 'https://api.thingspeak.com/talkbacks/16926/commands.json', sendCommand).then((output) => {
    res.setHeader('Content-Type', 'application/json');
    if(sendCommand !== "") {
        res.send(JSON.stringify({ 'speech': output, 'displayText': output }));
    }
    else {
        res.send(JSON.stringify({ 'speech': "Sorry I cannot understand you", 'displayText': "Sorry I cannot understand you" }));
    }

    }).catch((error) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({ 'speech': error, 'displayText': error }));
    });
    //console.log(dateTimeRetrieved)
    //console.log("dateTimeRetrieved")
    /*var resource = {
        summary: events.Event_name,
        location: location.Location,
        start: {
            dateTime: dateTimeRetrieved
        },
        end: {
            dateTime: dateTimeRetrieved
        },
        attendees: ['me']
    };
              
    if(command === "") {
        var calendar = google.calendar('v3');
        calendar.events.insert({
        auth: oauth2Client,
        calendarId: 'primary',
        sendNotifications: true,
        resource: resource
            },function(err,resp) {
                if (err) {
                    res.send(JSON.stringify({ 'speech': "Sorry there is an error", 'displayText': "Sorry there is an error" }));
                }
                else {
                    res.send(JSON.stringify({ 'speech': "Event is set", 'displayText': "Event is set" }));
                }
            }); 
        }
    //var command = req.body.result && req.body.result.parameters && req.body.result.parameters.? 
    if(command === "turn") {

    }
    else {
        makeRequest('POST', 'https://api.thingspeak.com/talkbacks/16926/commands.json', 'help').then((output) => {
        res.setHeader('Content-Type', 'application/json');
        if(sendCommand !== "") {
            res.send(JSON.stringify({ 'speech': 'help', 'displayText': 'help' }));
        }
        else {
            res.send(JSON.stringify({ 'speech': "Sorry I cannot understand you", 'displayText': "Sorry I cannot understand you" }));
        }

        }).catch((error) => {
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify({ 'speech': error, 'displayText': error }));
        });
    }*/

});

function makeRequest (method, url, commandString) { 
    return new Promise((resolve, reject) => {
        var postData = {
                "api_key":"4CFZ1SDPFO5PG9HM",
                "command_string": commandString
               };
        var async = true;
        var status = 0;

        var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
        var request = new XMLHttpRequest();

        request.onreadystatechange = (function () {
            if (this.readyState === 4 && this.status === 200) {
                resolve(request.responseText);
            } else {
                reject({status: this.status,statusText: request.statusText});
            };
        });
        request.open(method, url, false);
        request.setRequestHeader("Content-Type", "application/json");
        request.send(JSON.stringify(postData));
        
    });
}
restService.post('/getToken', function(req, res) {
    var speech = ""//req.body.result && req.body.result.parameters && req.body.result.parameters.token ? req.body.result.parameters.token : "Seems like some problem. Speak again."
	var url = "http://www.google.com/";
	var method = "POST";
	var postData = "Some data";
	var async = true;

	var request = new XMLHttpRequest();
	request.onload = function () {
	   var status = request.status; // HTTP response status, e.g., 200 for "200 OK"
	   var speech = request.responseText; // Returned data, e.g., an HTML document.
	}

	request.open(method, url, async);
	request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	request.send(postData);

    return res.json({
        speech: speech,
        displayText: speech,
        source: 'webhook-echo-sample'
    });
});

restService.post('/slack-test', function(req, res) {

    var slack_message = {
        "text": "Details of JIRA board for Browse and Commerce",
        "attachments": [{
            "title": "JIRA Board",
            "title_link": "http://www.google.com",
            "color": "#36a64f",

            "fields": [{
                "title": "Epic Count",
                "value": "50",
                "short": "false"
            }, {
                "title": "Story Count",
                "value": "40",
                "short": "false"
            }],

            "thumb_url": "https://stiltsoft.com/blog/wp-content/uploads/2016/01/5.jira_.png"
        }, {
            "title": "Story status count",
            "title_link": "http://www.google.com",
            "color": "#f49e42",

            "fields": [{
                "title": "Not started",
                "value": "50",
                "short": "false"
            }, {
                "title": "Development",
                "value": "40",
                "short": "false"
            }, {
                "title": "Development",
                "value": "40",
                "short": "false"
            }, {
                "title": "Development",
                "value": "40",
                "short": "false"
            }]
        }]
    }
    return res.json({
        speech: "speech",
        displayText: "speech",
        source: 'webhook-echo-sample',
        data: {
            "slack": slack_message
        }
    });
});




restService.listen((process.env.PORT || 8000), function() {
    console.log("Server up and listening");
});
