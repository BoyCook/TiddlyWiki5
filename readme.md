<h1 class=''>
Welcome to <span>
TiddlyWiki5</span></h1><div class='tw-transclude'>
<p>
Welcome to <span>
TiddlyWiki5</span>, a reboot of <span>
TiddlyWiki</span>, the reusable non-linear personal web notebook <span>
first released in 2004</span>. It is a complete interactive wiki in <span>
JavaScript</span> that can be run from a single HTML file in the browser or as a powerful <span>
node.js application</span>.</p><p>
<span>
TiddlyWiki</span> is designed to fit around your brain, giving you a better way of managing information than traditional documents and emails. The fundamental idea is that information is more useful and reusable if we cut it up into the smallest semantically meaningful chunks &ndash; <span>
tiddlers</span> &ndash; and give them titles so that they can be structured with links, tags and macros.  <span>
TiddlyWiki</span> aims to provide a fluid interface for working with tiddlers, allowing them to be aggregated and composed into longer narratives.</p><p>
<span>
TiddlyWiki5</span> has many <span>
improvements</span> over the original. It is currently labelled alpha, meaning it is working but incomplete. It is a great time to get involved and support its <span>
future development</span>. You can:</p><ul>
<li>
Explore its features online at <span>
http://five.tiddlywiki.com/</span></li><li>
Get involved in the <span>
development on GitHub</span></li><li>
Join the discussions on <span>
the TiddlyWikiDev Google Group</span></li><li>
Follow <span>
@TiddlyWiki on Twitter</span> for the latest news</li><li>
Learn how to <span>
help the TiddlyWiki project and community</span></li></ul></div><h1 class=''>
Getting started with <span>
TiddlyWiki</span> under node.js</h1><div class='tw-transclude'>
<p>
<span>
TiddlyWiki5</span> can be used on the command line to perform an extensive set of operations based on tiddlers, <span>
TiddlerFiles</span> and <span>
TiddlyWikiFiles</span>. For example, this loads the tiddlers from a <span>
TiddlyWiki</span> HTML file and then saves one of them in HTML:</p><pre>
node tiddlywiki.js --verbose --load mywiki.html --savetiddler ReadMe ./readme.html</pre><h2 class=''>
Usage</h2><p>
Running <code>
tiddlywiki.js</code> from the command line boots the <span>
TiddlyWiki</span> kernel, loads the core plugins and establishes an empty wiki store. It then sequentially processes the command line arguments from left to right. The arguments are separated with spaces.</p><p>
The first argument is the optional path to the wiki directory to be loaded. If not present, then the current directory is used.</p><p>
The commands and their individual arguments follow, each command being identified by the prefix <code>
--</code>.</p><pre>
node tiddlywiki.js [&lt;wikipath&gt;] [--&lt;command&gt; [&lt;arg&gt;[,&lt;arg&gt;]]]</pre><h2 class=''>
Batch Files</h2><p>
For trying <span>
TiddlyWiki5</span> out under node.js, several batch files are provided:</p><ul>
<li>
<code>
bld.sh</code> builds the new <span>
TiddlyWiki</span> 5 HTML file</li><li>
<code>
2bld.sh</code> builds <span>
TiddlyWiki</span> 2.6.5 from its original source</li></ul><h2 class=''>
Commands</h2><p>
The following commands are available:</p><div class='tw-list-frame'>
<div class='tw-list-element'>
<span class='tw-transclude'>
<h3 class=''>
<span class='tw-view-link'>
<span>
DumpCommand</span></span></h3><div>
<div class='tw-transclude'>
<h3 class=''>
dump tiddlers</h3><p>
Dump the titles of the tiddlers in the wiki store </p><pre>
--dump tiddlers</pre><h3 class=''>
dump tiddler</h3><p>
Dump the fields of an individual tiddler </p><pre>
--dump tiddler &lt;title&gt;</pre><h3 class=''>
dump shadows</h3><p>
Dump the titles of the shadow tiddlers in the wiki store </p><pre>
--dump shadows</pre><h3 class=''>
dump config</h3><p>
Dump the current core configuration </p><pre>
--dump config</pre></div></div></span></div><div class='tw-list-element'>
<span class='tw-transclude'>
<h3 class=''>
<span class='tw-view-link'>
<span>
LoadCommand</span></span></h3><div>
<div class='tw-transclude'>
<p>
Load tiddlers from 2.x.x <span>
TiddlyWiki</span> files (<code>
.html</code>), <code>
.tiddler</code>, <code>
.tid</code>, <code>
.json</code> or other files </p><pre>
--load &lt;filepath&gt;</pre></div></div></span></div><div class='tw-list-element'>
<span class='tw-transclude'>
<h3 class=''>
<span class='tw-view-link'>
<span>
SaveTiddlerCommand</span></span></h3><div>
<div class='tw-transclude'>
<p>
Save an individual tiddler as a specified <span>
ContentType</span>, defaults to <code>
text/html</code> </p><pre>
--savetiddler &lt;title&gt; &lt;filename&gt; [&lt;type&gt;]</pre></div></div></span></div><div class='tw-list-element'>
<span class='tw-transclude'>
<h3 class=''>
<span class='tw-view-link'>
<span>
ServerCommand</span></span></h3><div>
<div class='tw-transclude'>
<p>
The server is very simple. At the root, it serves a rendering of a specified tiddler. Away from the root, it serves individual tiddlers encoded in JSON, and supports the basic HTTP operations for <code>
GET</code>, <code>
PUT</code> and <code>
DELETE</code>.</p><pre>
--server &lt;port&gt; &lt;roottiddler&gt; &lt;rendertype&gt; &lt;servetype&gt;</pre><p>
For example:</p><pre>
--server 8080 $:/core/tiddlywiki5.template.html text/plain text/html</pre><p>
The parameters are:</p><pre>
--server &lt;port&gt; &lt;roottiddler&gt; &lt;rendertype&gt; &lt;servetype&gt;</pre><ul>
<li>
<strong>
port</strong> - port number to serve from (defaults to &quot;8080&quot;)</li><li>
<strong>
roottiddler</strong> - the tiddler to serve at the root (defaults to &quot;$:/core/tiddlywiki5.template.html&quot;) </li><li>
<strong>
rendertype</strong> - the content type to which the root tiddler should be rendered (defaults to &quot;text/plain&quot;)</li><li>
<strong>
servetype</strong> - the content type with which the root tiddler should be served (defaults to &quot;text/html&quot;)</li></ul></div></div></span></div><div class='tw-list-element'>
<span class='tw-transclude'>
<h3 class=''>
<span class='tw-view-link'>
<span>
VerboseCommand</span></span></h3><div>
<div class='tw-transclude'>
<p>
Triggers verbose output, useful for debugging </p><pre>
--verbose</pre></div></div></span></div><div class='tw-list-element'>
<span class='tw-transclude'>
<h3 class=''>
<span class='tw-view-link'>
<span>
VersionCommand</span></span></h3><div>
<div class='tw-transclude'>
<p>
Displays the version number of <span>
TiddlyWiki</span>.</p><pre>
--version</pre></div></div></span></div></div></div><p>
<em>
This readme file was automatically generated by <span>
TiddlyWiki5</span></em>
</p>