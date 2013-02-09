<h1 class=''>
Welcome to <a class='tw-tiddlylink tw-tiddlylink-internal tw-tiddlylink-resolves' href='TiddlyWiki5'>
TiddlyWiki5</a>
</h1>
<div class='tw-transclude'>
<p>
Welcome to <a class='tw-tiddlylink tw-tiddlylink-internal tw-tiddlylink-resolves' href='TiddlyWiki5'>
TiddlyWiki5</a>
, a reboot of <a class='tw-tiddlylink tw-tiddlylink-internal tw-tiddlylink-resolves' href='TiddlyWiki'>
TiddlyWiki</a>
, the reusable non-linear personal web notebook <a class='tw-tiddlylink tw-tiddlylink-internal tw-tiddlylink-resolves' href='History'>
first released in 2004</a>
. It is a complete interactive wiki in <a class='tw-tiddlylink tw-tiddlylink-internal tw-tiddlylink-missing' href='JavaScript'>
JavaScript</a>
 that can be run from a single HTML file in the browser or as a powerful <a class='tw-tiddlylink tw-tiddlylink-internal tw-tiddlylink-resolves' href='node.js'>
node.js application</a>
.</p>
<p>
<a class='tw-tiddlylink tw-tiddlylink-internal tw-tiddlylink-resolves' href='TiddlyWiki'>
TiddlyWiki</a>
 is designed to fit around your brain, giving you a better way of managing information than traditional documents and emails. The fundamental idea is that information is more useful and reusable if we cut it up into the smallest semantically meaningful chunks &ndash; <a class='tw-tiddlylink tw-tiddlylink-internal tw-tiddlylink-resolves' href='Tiddlers'>
tiddlers</a>
 &ndash; and give them titles so that they can be structured with links, tags and macros.  <a class='tw-tiddlylink tw-tiddlylink-internal tw-tiddlylink-resolves' href='TiddlyWiki'>
TiddlyWiki</a>
 aims to provide a fluid interface for working with tiddlers, allowing them to be aggregated and composed into longer narratives.</p>
<p>
<a class='tw-tiddlylink tw-tiddlylink-internal tw-tiddlylink-resolves' href='TiddlyWiki5'>
TiddlyWiki5</a>
 has many <a class='tw-tiddlylink tw-tiddlylink-internal tw-tiddlylink-resolves' href='Improvements'>
improvements</a>
 over the original. It is currently labelled alpha, meaning it is working but incomplete. It is the best possible time to get involved and support its future development. You can:</p>
<ul>
<li>
Explore its features online at <a class='tw-tiddlylink tw-tiddlylink-external' href='http://five.tiddlywiki.com/'>
http://five.tiddlywiki.com/</a>
</li>
<li>
Get involved in the <a class='tw-tiddlylink tw-tiddlylink-external' href='https://github.com/Jermolene/TiddlyWiki5'>
development on GitHub</a>
</li>
<li>
Join the discussions on <a class='tw-tiddlylink tw-tiddlylink-external' href='http://groups.google.com/group/TiddlyWikiDev'>
the TiddlyWikiDev Google Group</a>
</li>
<li>
Follow <a class='tw-tiddlylink tw-tiddlylink-external' href='http://twitter.com/#!/TiddlyWiki'>
@TiddlyWiki on Twitter</a>
 for the latest news</li>
</ul>
</div>
<h1 class=''>
Usage</h1>
<div class='tw-transclude tw-tiddler-missing'>
</div>
<h1 class=''>
Architecture</h1>
<div class='tw-transclude'>
<h1 class=''>
Overview</h1>
<p>
The heart of <a class='tw-tiddlylink tw-tiddlylink-internal tw-tiddlylink-resolves' href='TiddlyWiki'>
TiddlyWiki</a>
 can be seen as an extensible representation transformation engine. Given the text of a tiddler and its associated <a class='tw-tiddlylink tw-tiddlylink-internal tw-tiddlylink-missing' href='ContentType'>
ContentType</a>
, the engine can produce a rendering of the tiddler in a new <a class='tw-tiddlylink tw-tiddlylink-internal tw-tiddlylink-missing' href='ContentType'>
ContentType</a>
. Furthermore, it can efficiently selectively update the rendering to track any changes in the tiddler or its dependents.</p>
<p>
The primary use of the engine is to convert raw <code>
text/vnd.tiddlywiki</code>
 <a class='tw-tiddlylink tw-tiddlylink-internal tw-tiddlylink-resolves' href='WikiText'>
WikiText</a>
 into a <code>
text/html</code>
 or <code>
text/plain</code>
 representation for display. The transclusion and templating features of <a class='tw-tiddlylink tw-tiddlylink-internal tw-tiddlylink-resolves' href='WikiText'>
WikiText</a>
 allow the engine to also be used to generate <a class='tw-tiddlylink tw-tiddlylink-internal tw-tiddlylink-resolves' href='TiddlyWiki'>
TiddlyWiki</a>
 HTML files from raw tiddlers.</p>
<p>
You can explore this mechanism by opening the <a class='tw-tiddlylink tw-tiddlylink-internal tw-tiddlylink-missing' href='JavaScript'>
JavaScript</a>
 console in your browser. Typing this command will replace the text of the tiddler <code>
HelloThere</code>
 with new content:</p>
<pre>
$tw.wiki.addTiddler({title: &quot;HelloThere&quot;, text: &quot;This is some new content&quot;});</pre>
<p>
If the tiddler <code>
HelloThere</code>
 is visible then you'll see it instantly change to reflect the new content. If you create a tiddler that doesn't currently exist (like <a class='tw-tiddlylink tw-tiddlylink-internal tw-tiddlylink-missing' href='IntentionallyMissingTiddler'>
IntentionallyMissingTiddler</a>
) then you'll see any displayed links to it instantly change from italicised to normal:</p>
<pre>
$tw.wiki.addTiddler({title: &quot;IntentionallyMissingTiddler&quot;, text: &quot;This tiddler now exists&quot;});</pre>
<p>
If you're interested in understanding more about the internal operation of <a class='tw-tiddlylink tw-tiddlylink-internal tw-tiddlylink-resolves' href='TiddlyWiki'>
TiddlyWiki</a>
, it is recommended that you review the <a class='tw-tiddlylink tw-tiddlylink-internal tw-tiddlylink-resolves' href='Docs'>
Docs</a>
 and read the code &ndash; start with the boot kernel <a class='tw-tiddlylink tw-tiddlylink-internal tw-tiddlylink-resolves' href='%24%3A%2Fcore%2Fboot.js'>
$:/core/boot.js</a>
.
</p>
</div>
<h1 class=''>
Boot Mechanism</h1>
<div class='tw-transclude'>
<h1 class=''>
Introduction</h1>
<p>
<a class='tw-tiddlylink tw-tiddlylink-internal tw-tiddlylink-resolves' href='TiddlyWiki5'>
TiddlyWiki5</a>
 is based on a 1,000 line boot kernel that runs on node.js or in the browser, with all other functionality added via dynamically loaded modules.</p>
<p>
The kernel boots just enough of the <a class='tw-tiddlylink tw-tiddlylink-internal tw-tiddlylink-resolves' href='TiddlyWiki'>
TiddlyWiki</a>
 environment to allow it to load tiddlers and execute <a class='tw-tiddlylink tw-tiddlylink-internal tw-tiddlylink-missing' href='JavaScript'>
JavaScript</a>
 modules. Plugin modules are written like <code>
node.js</code>
 modules.</p>
<p>
There are many <a class='tw-tiddlylink tw-tiddlylink-internal tw-tiddlylink-resolves' href='ModuleType'>
different types of module</a>
: parsers, serializers, deserializers, macros etc. It goes much further than you might expect. For example, individual tiddler fields are modules, too: there's a module that knows how to handle the <code>
tags</code>
 field, and another that knows how to handle the special behaviour of the <code>
modified</code>
 and <code>
created</code>
 fields.</p>
<p>
Some plugin modules have further sub-plugins: the wikitext parser, for instance, accepts rules as individual plugin modules.</p>
<h1 class=''>
Plugins and Modules</h1>
<p>
In <a class='tw-tiddlylink tw-tiddlylink-internal tw-tiddlylink-resolves' href='TiddlyWiki5'>
TiddlyWiki5</a>
, <a class='tw-tiddlylink tw-tiddlylink-internal tw-tiddlylink-resolves' href='Plugins'>
Plugins</a>
 are bundles of tiddlers that are distributed and managed as one; <a class='tw-tiddlylink tw-tiddlylink-internal tw-tiddlylink-resolves' href='Modules'>
Modules</a>
 are <a class='tw-tiddlylink tw-tiddlylink-internal tw-tiddlylink-missing' href='JavaScript'>
JavaScript</a>
 tiddlers with a module type identifying when and how they should be executed.</p>
<p>
The tiddler <a class='tw-tiddlylink tw-tiddlylink-internal tw-tiddlylink-resolves' href='%24%3A%2Fcore%2Fboot.js'>
$:/core/boot.js</a>
 is a barebones <a class='tw-tiddlylink tw-tiddlylink-internal tw-tiddlylink-resolves' href='TiddlyWiki'>
TiddlyWiki</a>
 kernel that is just sufficient to load the core plugin modules and trigger a startup module to load up the rest of the application.</p>
<p>
The kernel includes:</p>
<ul>
<li>
Several short shared utility functions</li>
<li>
A handful of methods implementing the plugin module mechanism</li>
<li>
The <code>
$tw.Tiddler</code>
 class (and field definition plugins)</li>
<li>
The <code>
$tw.Wiki</code>
 class (and tiddler deserialization methods)</li>
<li>
Code for the browser to load tiddlers from the HTML DOM</li>
<li>
Code for the server to load tiddlers from the file system</li>
</ul>
<p>
Each module is an ordinary <code>
node.js</code>
-style module, using the <code>
require()</code>
 function to access other modules and the <code>
exports</code>
 global to return <a class='tw-tiddlylink tw-tiddlylink-internal tw-tiddlylink-missing' href='JavaScript'>
JavaScript</a>
 values. The boot kernel smooths over the differences between <code>
node.js</code>
 and the browser, allowing the same plugin modules to execute in both environments.</p>
<p>
In the browser, <code>
core/boot.js</code>
 is packed into a template HTML file that contains the following elements in order:</p>
<ul>
<li>
Ordinary and shadow tiddlers, packed as HTML <code>
&lt;DIV&gt;</code>
 elements</li>
<li>
<code>
core/bootprefix.js</code>
, containing a few lines to set up the plugin environment</li>
<li>
<a class='tw-tiddlylink tw-tiddlylink-internal tw-tiddlylink-missing' href='JavaScript'>
JavaScript</a>
 modules, packed as HTML <code>
&lt;SCRIPT&gt;</code>
 blocks</li>
<li>
<code>
core/boot.js</code>
, containing the boot kernel</li>
</ul>
<p>
On the server, <code>
core/boot.js</code>
 is executed directly. It uses the <code>
node.js</code>
 local file API to load plugins directly from the file system in the <code>
core/modules</code>
 directory. The code loading is performed synchronously for brevity (and because the system is in any case inherently blocked until plugins are loaded).</p>
<p>
The boot kernel sets up the <code>
$tw</code>
 global variable that is used to store all the state data of the system.
</p>
</div>
<p>
<em>
This <code>
readme</code>
 file was automatically generated by <a class='tw-tiddlylink tw-tiddlylink-internal tw-tiddlylink-resolves' href='TiddlyWiki5'>
TiddlyWiki5</a>
</em>

</p>
