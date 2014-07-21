#!/bin/bash

between() {
    echo '<section class="slide">'
    tail -n+$1 $TMP | head -n $(expr $2 - $1)
    echo '</section>'
}

TMP=/tmp/$RANDOM.bv.html
markdown bitvote.md > $TMP

cp prep.html index.html

PREV=""
cat $TMP | grep -n '<h2' | cut -f 1 -d: | while read line; do
    if [ "$PREV" != "" ]; then
        between $PREV $line
    fi
    PREV=$line
done >> index.html

cat post.html >> index.html

