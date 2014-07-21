
default: approach1.png browser_contract.png index.html

%.png: %.svg
	convert -trim $< $@ 

%.html: %.md
	markdown $< > $@

index.html: convert.sh bitvote.md
	sh convert.sh
