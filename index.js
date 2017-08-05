'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const restService = express();
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var Promise = require('promise');
var firebase = require('firebase');
var Nexmo = require('nexmo');

var app = firebase.initializeApp({
    ServiceAccount: {
       projectId: "copycat-a727c",
       clientEmail: "isang.puntos@gmail.com",
       privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQC99n7ey2K88nmm\nCmzPM65PGAP9ko/GeMuo9OG5HtRgqKPxbSfsI7jqp9m/QdGaNu38GP5A9gayBcMz\nwoeB7Ny7AHJxXf8XQwnSpaafHXFVo3Mr1aiShE/WzGRKFZE6nRmHrMri4Li+xAtP\nyMWcz6gnr//eytgMfy+VwdAdX4raFaashd5edJ3S/c4zH29rGb9DLYDGNkl6XKGL\n5vh23yw5FnAXGHSOY/GSVo+pB/MnUZQETZw7Z+LdI9PMO+4O53VKu/neACQZncQB\nclj8k3sFLMya4EEq+DWpAr94wLV8z5iCUQv0dfOpPXo5A6+S+dRYwVfJ8L5Mbt63\nstOunagvAgMBAAECggEAQFMnwum8FZ9F8iO1lLQ7Yi0PrN3kMaDV1fCWPslhwRlZ\n6na7/gpao5sS8OCoyT+wdp0/+19UBRROdUh5+lTqqagNGLZrmsTonpvZQCgIKKeg\naEeBPZvwLRwpGa0T8HUiH/8y9ICEDpTz/6BMyjzHBClky1yErDalNmDayBeCPTZh\nLB9f81W+1polFoFZFJkFLCw/S/5nn/2VlCYCatRfsnSFBWNQ8UyGzztzqdmBkpGM\nbWBX8mHZmOODJ4s7VbdRmZo9noPtAF41B6tYXGaT+9R4uXlASJJ4pSrduTSpYi7h\nfGyPNCM8h21BzUzBqBjuj8R+m5fW2tA2OHpTzuSmAQKBgQD5jsNiRColIhb8DdTA\n50Qi22f7o7bOgVZMAVl6P32R0Y3jyHY4YSmJIpozctgZlgdDEdp4Owk2xb8457ok\nPSNznyF1soeUQrrY3JbZTUHew8f4xuBG8zZ48iNYqscDwt4H2arNuCNXIhS3XIi0\nIPwxLtAp2U4LGrkGKiElhTincQKBgQDC3eROe35+0vGTYk98PjoW5o4zdZTZTpsI\nvVxSR1xQUAtSm1GwZzZwPMSh6xlikIQZOBH+r8ipkW2ClhU6NlOEtILO0e+pcfs4\nOhQpZpwsMWxXorJYU/bhK9mlgwMT1tNwCzucixs7gVMbJiQPsS0uC6Mf6VznZa2H\nPdP78b25nwKBgC6T/tOwdU1I95FD45m9kHIREW9eNxiD+19kQRcYEo/M1PbWy3nq\naJ433yALJ1pfLivOgUA/hJC8h9xPI+bvolZKNSyKjdOWQNmJEn6sdMbnM8OzGtkj\nO9+HEiHSfiKtlFNSxRZwb+grbEJs+vbj0S481o15CZ/49N+5rUYbf1+BAoGAfIKx\nRWBtE/YO+4A+j4FnNoi8Za8Em9E5CF2OJtiH6J0sjuzFRnS8ePyrG1aP0sXKUh7c\niKKjEY3lriHdkGNz/AAm8KV9gARfY67ggQ+aTDaMJnbDg+KqhXeySqoqhjumwBm9\nTiooDV51zowRUKGB38D5ywMeJJB4T0i3MW1mL7sCgYBvqgQXdODsY3tJn2pUQyr+\ncjgN6juelqrbr34FWorgCA3IPA9sh5kKiZXBzNlnyN6Ki/me+dL5d8jy4ClfdMni\nOlibtLRPLWaLa04+6xojH4R/CDdk8Mhj67ghwRFyaNanYOrSWb3j0YgZpdag1QDf\nSChEBuPN1NdqpRL4dtIrUQ==\n-----END PRIVATE KEY-----\n"
    },
   databaseURL: "copycat-a727c.firebaseio.com"
});

var nexmo = new Nexmo({
    apiKey: 0d015ab6,
    apiSecret: 2bd6d40b997174c1
  });

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
    var date = req.body.result && req.body.result.parameters && req.body.result.parameters.date? req.body.result.parameters.date : "";
    var time = req.body.result && req.body.result.parameters && req.body.result.parameters.time? req.body.result.parameters.time : "";
    var task = req.body.result && req.body.result.parameters && req.body.result.parameters.any? req.body.result.parameters.any : "";
    var contact = req.body.result && req.body.result.parameters && req.body.result.parameters.number? req.body.result.parameters.number : "";

    var sendCommand = (command + " " + state).trim();
	
	console.log(command)
	console.log(state)
	console.log(date)
	console.log(time)
	console.log(task)
	console.log(contact)
	
    if(sendCommand !== "" && command === "turn") {
        makeRequest('POST', 'https://api.thingspeak.com/talkbacks/16926/commands.json', sendCommand).then((output) => {
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify({ 'speech': "Light is " + state, 'displayText': "Light is " + state }));

        }).catch((error) => {
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify({ 'speech': error, 'displayText': error }));
        });
    } else if(sendCommand === "send" && contact !== "" && task !== "") {
        nexmo.message.sendSms("09477007889", contact, task,
        (err, responseData) => {
           if (err) {
               console.log(err);
               res.send(JSON.stringify({ 'speech': "Error Sending Message", 'displayText': "Error Sending Message" }));
           } else {
               console.dir(responseData);
               res.send(JSON.stringify({ 'speech': "Message Sent", 'displayText': "Message Sent" }));
              }
            }
        );
    } else if(sendCommand === "help" || sendCommand === "danger") {
        makeRequest('POST', 'https://api.thingspeak.com/talkbacks/16926/commands.json', "help").then((output) => {
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify({ 'speech': "Help alarm is on", 'displayText': "Help alarm is on" }));

        }).catch((error) => {
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify({ 'speech': error, 'displayText': error }));
        });
    } else if(date !== "" && time !== "" && task !== "") {
		try {
			firebase.database().ref(date).update({
				[time] : task
			});
			res.send(JSON.stringify({ 'speech': "Schedule has been set", 'displayText': "Schedule has been set" }));
		} catch (err) {
			res.send(JSON.stringify({ 'speech': "I have problems in setting schedule", 'displayText': "I have problems in setting schedule" }));
		}
        
    } else if(date !== "" && time === "" && task === "") {
        firebase.database().ref('/').on("value", function(snapshot) {
            var sched = date + "\n"
            var obj = JSON.parse(JSON.stringify(snapshot.val()));
            var array = Object.keys(obj);
            for (var i = 0; i < array.length; i++) {
                if(array[i] === date) {
                    var innerJSON = JSON.parse(JSON.stringify(obj[array[i]]))
                    var innerArr = Object.keys(innerJSON)
                    for (var j = 0; j < innerArr.length; j++) 
                        sched += innerArr[j] + " - " + innerJSON[innerArr[j]] + "\n";
                }
            }
                res.send(JSON.stringify({ 'speech': sched, 'displayText': sched }));
            }, function (errorObject) {
                res.send(JSON.stringify({ 'speech': "read failed", 'displayText': "read failed" }));
        });
    }
    else {
        res.send(JSON.stringify({ 'speech': "Sorry I cannot understand you", 'displayText': "Sorry I cannot understand you" }));
    }
    
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
