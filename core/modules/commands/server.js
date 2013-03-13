/*\
title: $:/core/modules/commands/server.js
type: application/javascript
module-type: command

Serve tiddlers over http

\*/
(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

exports.info = {
	name: "server",
	synchronous: true
};

var Command = function(params,commander,callback) {
	this.params = params;
	this.commander = commander;
	this.callback = callback;
};

Command.prototype.execute = function() {
	var self = this,
		util = require("util"),
		fs = require("fs"),
		url = require("url"),
		path = require("path"),
		http = require("http"),
		port = this.params[0] || "8080",
		rootTiddler = this.params[1] || "$:/core/templates/tiddlywiki5.template.html",
		renderType = this.params[2] || "text/plain",
		serveType = this.params[3] || "text/html";

    var handler = function(request, response) {
        var requestPath = url.parse(request.url).pathname,
            text;
        switch(request.method) {
            case "PUT":
                var data = "";
                request.on("data",function(chunk) {
                    data += chunk.toString();
                });
                request.on("end",function() {
                    var prefix = "/recipes/default/tiddlers/";
                    if(requestPath.indexOf(prefix) === 0) {
                        var title = decodeURIComponent(requestPath.substr(prefix.length)),
                            fields = JSON.parse(data);
                        // Use the title from the PUT URL if we don't have one
                        if(!fields.title) {
                            fields.title = title;
                        }
                        // Pull up any subfields in the `fields` object
                        if(fields.fields) {
                            $tw.utils.each(fields.fields,function(field,name) {
                                fields[name] = field;
                            });
                            delete fields.fields;
                        }
                        // Remove any revision field
                        if(fields["revision"]) {
                            delete fields["revision"];
                        }
                        console.log("PUT tiddler",title,fields)
//						self.commander.wiki.addTiddler(new $tw.Tiddler(JSON.parse(data),{title: title}));
                        var changeCount = self.commander.wiki.getChangeCount(title).toString();
                        response.writeHead(204, "OK",{
                            Etag: "\"default/" + title + "/" + changeCount + ":\""
                        });
                        response.end();
                    } else {
                        response.writeHead(404);
                        response.end();
                    }
                });
                break;
            case "DELETE":
                var prefix = "/bags/default/tiddlers/";
                if(requestPath.indexOf(prefix) === 0) {
                    var title = decodeURIComponent(requestPath.substr(prefix.length));
                    console.log("DELETE tiddler",title)
//					self.commander.wiki.deleteTiddler(decodeURIComponent(title));
                    response.writeHead(204, "OK");
                    response.end();
                } else {
                    response.writeHead(404);
                    response.end();
                }
                break;
            case "GET":
                if(requestPath === "/") {
                    response.writeHead(200, {"Content-Type": serveType});
                    text = self.commander.wiki.renderTiddler(renderType,rootTiddler);
                    response.end(text,"utf8");
                } else if(requestPath === "/status") {
                    response.writeHead(200, {"Content-Type": "application/json"});
                    text = JSON.stringify({
                        username: "ANONYMOUS",
                        space: {
                            recipe: "default"
                        },
                        tiddlywiki_version: $tw.version
                    });
                    response.end(text,"utf8");
                } else if(requestPath === "/recipes/default/tiddlers.json") {
                    response.writeHead(200, {"Content-Type": "application/json"});
                    var tiddlers = [];
                    $tw.wiki.forEachTiddler("title",function(title,tiddler) {
                        var tiddlerFields = {};
                        $tw.utils.each(tiddler.fields,function(field,name) {
                            if(name !== "text") {
                                tiddlerFields[name] = tiddler.getFieldString(name);
                            }
                        });
                        tiddlerFields["revision"] = $tw.wiki.getChangeCount(title);
                        tiddlers.push(tiddlerFields);
                    });
                    text = JSON.stringify(tiddlers);
                    response.end(text,"utf8");
                } else {
                    response.writeHead(404);
                    response.end();
                }
                break;
        }
    };

    var app = require('http').createServer(handler),
        io = require('socket.io').listen(app);
    io.set('log level', 1);
    app.listen(port);

    $tw.server = {app: app, io: io};
    $tw.wiki.initServerSyncers();

	if(this.commander.verbose) {
		console.log("Serving on port " + port);
	}
	return null;
};

exports.Command = Command;

})();
