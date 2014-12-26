#!/bin/bash

DONT_REMOVE_NOTES=$1

between() {
    if [ "$(tail -n+$1 $TMP | head -c 9)" == "<p>NOTES:$DONT_REMOVE_NOTES" ]; then
        echo -n
    else
        echo '<section class="slide">'
        tail -n+$1 $TMP | head -n $(expr $2 - $1)
        echo '</section>'
    fi
}

TMP=/tmp/$RANDOM.bv.html
markdown bitvote.md > $TMP

cat prep.html

PREV=""
cat $TMP | grep -nE '<h2|NOTES:' | cut -f 1 -d: | while read line; do
    if [ "$PREV" != "" ]; then
        between $PREV $line
    fi
    PREV=$line
done

cat post.html

