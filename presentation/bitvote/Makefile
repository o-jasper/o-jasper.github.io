
default: index.html

%.png: %.svg
	convert -trim $< $@ 

%.html: %.md
	markdown $< > $@

index.html: convert.sh bitvote.md prep.html post.html
	sh convert.sh
