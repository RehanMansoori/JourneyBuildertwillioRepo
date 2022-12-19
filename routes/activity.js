'use strict';
var util = require('util');

// Deps
const Path = require('path');
const JWT = require(Path.join(__dirname, '..', 'lib', 'jwtDecoder.js'));
var http = require('https');

exports.logExecuteData = [];

function logData(req) {
    exports.logExecuteData.push({
        body: req.body,
        headers: req.headers,
        trailers: req.trailers,
        method: req.method,
        url: req.url,
        params: req.params,
        query: req.query,
        route: req.route,
        cookies: req.cookies,
        ip: req.ip,
        path: req.path, 
        host: req.host,
        fresh: req.fresh,
        stale: req.stale,
        protocol: req.protocol,
        secure: req.secure,
        originalUrl: req.originalUrl
    });
    console.log("body: " + util.inspect(req.body));
    console.log("headers: " + req.headers);
    console.log("trailers: " + req.trailers);
    console.log("method: " + req.method);
    console.log("url: " + req.url);
    console.log("params: " + util.inspect(req.params));
    console.log("query: " + util.inspect(req.query));
    console.log("route: " + req.route);
    console.log("cookies: " + req.cookies);
    console.log("ip: " + req.ip);
    console.log("path: " + req.path);
    console.log("host: " + req.host);
    console.log("fresh: " + req.fresh);
    console.log("stale: " + req.stale);
    console.log("protocol: " + req.protocol);
    console.log("secure: " + req.secure);
    console.log("originalUrl: " + req.originalUrl);
}

/*
 * POST Handler for / route of Activity (this is the edit route).
 */
exports.edit = function (req, res) {

    console.log("5 -- For Edit");	
    console.log("4");	
    console.log("3");	
    console.log("2");	
    console.log("1");	
    //console.log("Edited: "+req.body.inArguments[0]);    
    
    // Data from the req and put it in an array accessible to the main app.
    //console.log( req.body );
    //res.send(200, 'Edit');
    res.send({"status" : "true"});
};

/*
 * POST Handler for /save/ route of Activity.
 */
exports.save = function (req, res) {
    
    console.log("5 -- For Save");	
    console.log("4");	
    //console.log("Saved: "+req.body.inArguments[0]);
    
    // Data from the req and put it in an array accessible to the main app.
    console.log(req.body);
    //res.send(200, 'Save');
    res.send({"status" : "true"});
};

/*
 * POST Handler for /execute/ route of Activity.
 */
exports.execute = function (req, res) {

    console.log("5 -- For Execute");	
    console.log("4");
    var RequestBody = JSON.stringify(req.body);
      var  jsonRequestBody = JSON.parse(RequestBody);
      console.log( "jsonRequestBody is:::  ",  jsonRequestBody.inArguments[0]);
      
      var clientId = '3MVG9n_HvETGhr3BTx_IIe00PIjo01Q79Srg0EYI1npGcSgwizYCv9xQgaDdIX2eo593elKpWzc6T4DwCJCQ3'; 
      var clinetsecret = 'FA19B10545EDFBC7BD2EFCF2BDDA570D732E14E03B9CF9026202D8CAE17C19F3';
      var accesstokenURL = 'https://login.salesforce.com/services/oauth2/token';
      var endPointURL = 'https://myorgbrisk-dev-ed.my.salesforce.com/services/data/v56.0/sobjects/Contact/0032w00000qovuP';
      var email  = jsonRequestBody.inArguments[0].email;
      console.log( "email value is "+  email);	

      var request = require('request');
      var options = {
      'method': 'POST',
      'url': accesstokenURL,
    'headers': {
      'Cookie': 'BrowserId=37NM5lnREe2Ik1X6ObvKKA; CookieConsentPolicy=0:0; LSKey-c$CookieConsentPolicy=0:0'
    },
    formData: {
      'client_id': clientId,
      'client_secret': clinetsecret,
      'grant_type': 'password',
      'username': 'rehan@mansoori.com',
      'password': '785392resh'
  }
};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
  var body = JSON.parse(response.body);

  var accrequest = require('request');
	var accoptions = {
  'method': 'GET',
  'url': 'https://myorgbrisk-dev-ed.my.salesforce.com/services/data/v56.0/sobjects/Contact/0032w00000qovuP?fields=isEmailActive__c,Email',
  'headers': {
    'Authorization': 'Bearer '+body.access_token,
    'Cookie': 'BrowserId=37NM5lnREe2Ik1X6ObvKKA; CookieConsentPolicy=0:1; LSKey-c$CookieConsentPolicy=0:1'
  }
};
  accrequest(accoptions, function (error, response1) {
  if (error) throw new Error(error);
  var body1 = JSON.parse(response1.body);
  console.log('body is', body1);
  console.log('email is = ',body1.isEmailActive__c);
});

//res.send({"status" : "true"});
});


};


/*
 * POST Handler for /publish/ route of Activity.
 */
exports.publish = function (req, res) {

    console.log("5 -- For Publish");	
    console.log("4");	
    //console.log("Published: "+req.body.inArguments[0]);        
    
    // Data from the req and put it in an array accessible to the main app.
    //console.log( req.body );
   //res.send(200, 'Publish');
   res.send({"status" : "true"});
   
};

/*
 * POST Handler for /validate/ route of Activity.
 */
exports.validate = function (req, res) {

    console.log("5 -- For Validate");	
    console.log("4");		
    //console.log("Validated: "+req.body.inArguments[0]);       
    
    // Data from the req and put it in an array accessible to the main app.
    //console.log( req.body );
    //res.send(200, 'Validate');
    res.send({"status" : "true"});
};
