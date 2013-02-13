<h1 class=''>
Using <a class='tw-tiddlylink tw-tiddlylink-internal tw-tiddlylink-resolves' href='TiddlyWiki5'>
TiddlyWiki5</a> to build <a class='tw-tiddlylink tw-tiddlylink-internal tw-tiddlylink-missing' href='TiddlyWikiClassic'>
TiddlyWikiClassic</a></h1><p>
<a class='tw-tiddlylink tw-tiddlylink-internal tw-tiddlylink-resolves' href='TiddlyWiki5'>
TiddlyWiki5</a> can be used to build older 2.x.x versions of <a class='tw-tiddlylink tw-tiddlylink-internal tw-tiddlylink-resolves' href='TiddlyWiki'>
TiddlyWiki</a> from their constituent components. Doing so involves these additional features over and above those used for building <a class='tw-tiddlylink tw-tiddlylink-internal tw-tiddlylink-resolves' href='TiddlyWiki5'>
TiddlyWiki5</a>:</p><ul>
<li>
The <code>
tiddlywiki2/loadrecipe</code> plugin, containing a deserializer module which allows tiddlers to be loaded from <a class='tw-tiddlylink tw-tiddlylink-internal tw-tiddlylink-resolves' href='TiddlyWiki'>
TiddlyWiki</a> 2.x.x <code>
.recipe</code> files</li><li>
The <code>
tiddlywiki2/stripcomments</code> plugin, containing a new viewer format for the <code>
&lt;$view&gt;</code> widget that strips single line <a class='tw-tiddlylink tw-tiddlylink-internal tw-tiddlylink-missing' href='JavaScript'>
JavaScript</a> comments starting <code>
//#</code></li><li>
The <code>
stripTitlePrefix='yes'</code> attribute of the <code>
&lt;$fields&gt;</code> widget, which removes prefixes wrapped in curly braces from the <code>
title</code> attribute<ul>
<li>
For example, <code>
{tiddler}HelloThere</code> would be transformed to <code>
HelloThere</code></li></ul></li></ul><h1 class=''>
Usage</h1><p>
<a class='tw-tiddlylink tw-tiddlylink-internal tw-tiddlylink-missing' href='TiddlyWikiClassic'>
TiddlyWikiClassic</a> is built from the command line by running <a class='tw-tiddlylink tw-tiddlylink-internal tw-tiddlylink-resolves' href='TiddlyWiki5'>
TiddlyWiki5</a> under node.js. A typical usage would be:</p><pre>
node ../../tiddlywiki.js \
	--verbose \
	--load &lt;path_to_recipe_file&gt; \
	--savetiddler $:/core/templates/tiddlywiki2.template.html &lt;path_to_write_index_file&gt; text/plain \
	|| exit 1</pre>