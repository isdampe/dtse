"use strict";

module.exports = function( dtseConfig ) {

  return function(req, res, next) {

  	console.log("Middleware");
		next();

	}
    
};