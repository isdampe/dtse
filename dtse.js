"use strict";

module.exports = function( dtseConfig ) {

  return function(req, res, next) {

  	var url = req.url;

  	switch( url ) {
  		case "/ping":
  			dtsePingReply(req,res);
  		break;
  	}

		next();

	}
    
};

function dtsePingReply(req,res) {

	//Ensure we have the correct ping data.
	console.log(req);

}