default: png

png: randgraph.png neato_randgraph.png tfc_png

tfc_png: tinfoilchat_inspired/tinfoilchat_inspired_screen_key.png tinfoilchat_inspired/tinfoilchat_inspired_statelook.png

randgraph.dot: randgraph.sh
	sh randgraph.sh 20 20 > randgraph.dot

randgraph.svg: randgraph.dot
	cat randgraph.dot | dot -Tsvg -o randgraph.svg

neato_randgraph.svg: randgraph.dot
	cat randgraph.dot | neato -Tsvg -o neato_randgraph.svg

%.png: %.svg
	convert $< $@
