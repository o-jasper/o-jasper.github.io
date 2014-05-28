
MCONV = replace '<code>' '<span class="math">' '</code>' '</span>' '&amp;' '&'\
 '<pre>' '<blockquote><b>' '</pre>' '</b></blockquote>'

default: ../_posts/2014-05-09-InsuranceGamble.html ../_drafts/2014-05-28-voting_power_for_decision.md

../_posts/2014-05-09-InsuranceGamble.html: InsuranceGamble.md InsuranceGamble_header
	cp InsuranceGamble_header $@; \
	markdown $< | $(MCONV) >> $@

../_drafts/2014-05-28-voting_power_for_decision.md: voting_power_for_decision.md
	cp voting_power_for_decision_header $@; \
	markdown $< | $(MCONV) >> $@

%.html: %.md
	markdown $< > $@
