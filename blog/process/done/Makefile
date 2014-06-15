
MCONV = replace '<code>' '<b>' '</code>' '</b>' '&amp;' '&'\
 '<blockquote>' '<blockquote><b>' '</blockquote>' '</b></blockquote>'

default: InsuranceGamble.html

Stake.html: Stake.md
	markdown $< | $(MCONV) > $@

InsuranceGamble.html: InsuranceGamble.md
	markdown $< | $(MCONV) > $@

%.html: %.md
	markdown $< > $@
