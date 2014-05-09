
MCONV = replace '<code>' '<span class="math">' '</code>' '</span>' '&amp;' '&'\
 '<pre>' '<blockquote><b>' '</pre>' '</b></blockquote>'

default: ../_posts/2014-05-09-InsuranceGamble.html

../_posts/2014-05-09-InsuranceGamble.html: InsuranceGamble.md InsuranceGamble_header
	cp InsuranceGamble_header $@; \
	markdown $< | $(MCONV) >> $@

%.html: %.md
	markdown $< > $@
