/*\
title: $:/core/modules/parsers/textparser.js
type: application/javascript
module-type: parser

The plain text parser processes blocks of source text into a degenerate parse tree consisting of a single text node

\*/
(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

var TextParser = function(type,text,options) {
	this.tree = [{
		type: "element",
		tag: "pre",
		children: [{
			type: "text",
			text: text
		}]
	}];
};

exports["text/plain"] = TextParser;
exports["application/vnd.tiddlywiki2"] = TextParser;
exports["application/javascript"] = TextParser;
exports["application/json"] = TextParser;
exports["text/css"] = TextParser;

})();

