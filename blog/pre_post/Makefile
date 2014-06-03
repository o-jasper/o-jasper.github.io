
MCONV = replace '<code>' '<span class="math">' '</code>' '</span>' '&amp;' '&'\
 '<pre>' '<blockquote class="math">' '</pre>' '</blockquote>'

default: ../_posts/2014-05-09-InsuranceGamble.html ../_posts/2014-05-29-voting_power_for_decision.md ../parts/wrong_prev.png ../parts/hanging_blocks.png

../_posts/2014-05-09-InsuranceGamble.html: InsuranceGamble.md InsuranceGamble_header
	cp InsuranceGamble_header $@; \
	markdown $< | $(MCONV) >> $@

../_posts/2014-05-29-voting_power_for_decision.md: voting_power_for_decision.md
	cp voting_power_for_decision_header $@; \
	markdown $< | $(MCONV) >> $@

%.html: %.md
	markdown $< > $@

../parts/%.png: %.svg
	convert -trim $< $@
