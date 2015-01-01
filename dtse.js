"use strict";

var log = require("./log.js");

exports.process = function(req,res) {

  //Get the request.
  var request = req.url;

  switch( request ) {
    case "/ping":
      doPingReply(req,res);
    break;
  }

};

function doPingReply(req,res) {

  var j = req.param("j");

  if ( typeof j ==="undefined" ) {
    log.print("Malformed ping packet. Missing ping data.");
    doSyntaxErrorReply("-1", res);
    return;
  }

  try {
    var json = JSON.parse(j);
  } catch (err) {
    log.print("Malformed ping packet, invalid json " + err);
    doSyntaxErrorReply("-2", res);
    return;
  }

  if ( typeof json.p === "undefined" || typeof json.u === "undefined" ) {
    log.print("Malformed ping packet, json missing structure");
    doSyntaxErrorReply("-3", res);
    return;
  }

  var requestData = JSON.stringify({
    p: json.p,
    u: json.u
  });

  log.print("Pong " + json.p + " to " + json.u);
  res.end(requestData);
  return true;

};

function doSyntaxErrorReply(code,res) {

  var requestData = JSON.stringify({
    e: code
  });

  res.end(requestData);

}