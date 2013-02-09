#!/bin/bash

# serve TiddlyWiki5 over HTTP

if [  -z "$TW5_EDITION" ]; then
    TW5_EDITION=editions/tw5.com
fi

if [  ! -d "$TW5_EDITION" ]; then
    echo 'A valid TW5_EDITION directory must be set'
    exit 1
fi

echo "Using TW5_EDITION as [$TW5_EDITION]"
pushd $TW5_EDITION > /dev/null

if [  -z "$TW5_LOC" ]; then
    TW5_LOC="../../tiddlywiki.js"
fi

if [  ! -f "$TW5_LOC" ]; then
    echo 'A valid TW5_LOC file must be set'
    exit 1
fi

if [ $# -eq 1 ]
then
    nohup node $TW5_LOC \
        --verbose \
        --server 30080 $:/core/templates/tiddlywiki5.template.html text/plain text/html \
        1> ../../webserver.log &
else
    node $TW5_LOC \
        --verbose \
        --server 30080 $:/core/templates/tiddlywiki5.template.html text/plain text/html \
        || exit 1
fi

popd > /dev/null

