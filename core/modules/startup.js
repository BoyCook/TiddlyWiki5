/*\
title: $:/core/modules/startup.js
type: application/javascript
module-type: startup

This is the main application logic for both the client and server

\*/
(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

exports.startup = function() {
	var modules,n,m,f,commander;
	// Load modules
	$tw.modules.applyMethods("global",$tw);
	$tw.modules.applyMethods("config",$tw.config);
	$tw.modules.applyMethods("utils",$tw.utils);
	if($tw.browser) {
		$tw.utils.getBrowserInfo($tw.browser);
	}
	$tw.version = $tw.utils.extractVersionInfo();
	$tw.Tiddler.fieldModules = $tw.modules.getModulesByTypeAsHashmap("tiddlerfield");
	$tw.modules.applyMethods("tiddlermethod",$tw.Tiddler.prototype);
	$tw.modules.applyMethods("wikimethod",$tw.Wiki.prototype);
	$tw.modules.applyMethods("tiddlerdeserializer",$tw.Wiki.tiddlerDeserializerModules);
	// Set up the wiki store
	$tw.wiki.initParsers();
	$tw.wiki.initSyncers();
	$tw.wiki.initServerConnections();
	// Set up the command modules
	$tw.Commander.initCommands();
	// Get the default tiddlers
	var defaultTiddlersTitle = "$:/DefaultTiddlers",
		defaultTiddlersTiddler = $tw.wiki.getTiddler(defaultTiddlersTitle),
		defaultTiddlers = [];
	if(defaultTiddlersTiddler) {
		defaultTiddlers = $tw.wiki.filterTiddlers(defaultTiddlersTiddler.fields.text);
	}
	// Initialise the story and history
	var storyTitle = "$:/StoryList",
		story = [];
	for(var t=0; t<defaultTiddlers.length; t++) {
		story[t] = defaultTiddlers[t];
	}
	$tw.wiki.addTiddler({title: storyTitle, text: story.join("\n")});
	// Host-specific startup
	if($tw.browser) {
		// Call browser startup modules
		$tw.modules.forEachModuleOfType("browser-startup",function(title,module) {
			if(module.startup) {
				module.startup();
			}
		});
		// Install the popup manager
		$tw.popup = new $tw.utils.Popup({
			rootElement: document.body
		});
		// Install the modal message mechanism
		$tw.modal = new $tw.utils.Modal($tw.wiki);
		document.addEventListener("tw-modal",function(event) {
			$tw.modal.display(event.param);
		},false);
		// Install the syncer message mechanism
		var handleSyncerEvent = function(event) {
			$tw.wiki.handleSyncerEvent.call($tw.wiki,event);
		};
		document.addEventListener("tw-login",handleSyncerEvent,false);
		document.addEventListener("tw-logout",handleSyncerEvent,false);
		// Install the scroller
		$tw.pageScroller = new $tw.utils.PageScroller();
		document.addEventListener("tw-scroll",$tw.pageScroller,false);
		// Install the sprite factory
		$tw.sprite = new $tw.utils.Sprite();
		// Install the save action handler
		$tw.wiki.initSavers();
		document.addEventListener("tw-save-wiki",function(event) {
			$tw.wiki.saveWiki({
				template: event.param,
				downloadType: "text/plain"
			});
		},false);
		// Install the crypto event handler
		document.addEventListener("tw-set-password",function(event) {
			$tw.passwordPrompt.createPrompt({
				serviceName: "Set new password for this TiddlyWiki",
				noUserName: true,
				submitText: "Set password",
				callback: function(data) {
					$tw.crypto.setPassword(data.password);
					return true; // Get rid of the password prompt
				}
			});
		});
		document.addEventListener("tw-clear-password",function(event) {
			$tw.crypto.setPassword(null);
		});
		// Apply stylesheets
		var styleTiddlers = $tw.wiki.getTiddlersWithTag("$:/core/styles");
		$tw.utils.each(styleTiddlers,function(title) {
			// Stylesheets don't refresh, yet
			var parser = $tw.wiki.parseTiddler(title),
				renderTree = new $tw.WikiRenderTree(parser,{wiki: $tw.wiki});
			renderTree.execute({tiddlerTitle: title});
			var styleNode = document.createElement("style");
			styleNode.type = "text/css";
			styleNode.appendChild(document.createTextNode(renderTree.render("text/plain")));
			document.getElementsByTagName("head")[0].appendChild(styleNode);
		});
		// If we're being viewed on a data: URI then give instructions for how to save
		if(document.location.protocol === "data:") {
			var event = document.createEvent("Event");
			event.initEvent("tw-modal",true,true);
			event.param = "$:/messages/SaveInstructions";
			document.dispatchEvent(event);
		} 
		// Display the PageTemplate
		var templateTitle = "$:/templates/PageTemplate",
			parser = $tw.wiki.parseTiddler(templateTitle),
			renderTree = new $tw.WikiRenderTree(parser,{wiki: $tw.wiki});
		renderTree.execute({tiddlerTitle: templateTitle});
		var container = document.createElement("div");
		document.body.insertBefore(container,document.body.firstChild);
		renderTree.renderInDom(container);
		$tw.wiki.addEventListener("",function(changes) {
			renderTree.refreshInDom(changes);
		});
	} else {
        //Start any server modules first
        $tw.modules.forEachModuleOfType("server",function(title,module) {
            console.log('Found server module [%s]', title);
            if(module.execute) {
                module.execute();
            }
        });

		// On the server, start a commander with the command line arguments
		commander = new $tw.Commander(
			Array.prototype.slice.call(process.argv,2),
			function(err) {
				if(err) {
					console.log("Error: " + err);
				}
			},
			$tw.wiki,
			{output: process.stdout, error: process.stderr}
		);
		commander.execute();
	}

};

})();
