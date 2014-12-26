
default: index.html with_notes.html

%.png: %.svg
	convert -trim $< $@ 

%.html: %.md
	markdown $< > $@

index.html: convert.sh bitvote.md prep.html post.html
	sh convert.sh > $@

with_notes.html: convert.sh bitvote.md prep.html post.html
	sh convert.sh dont_remove_notes > $@
