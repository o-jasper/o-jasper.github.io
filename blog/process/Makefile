
MCONV = replace '<code>' '<span class="math">' '</code>' '</span>' '&amp;' '&'\
 '<pre>' '<blockquote class="math">' '</pre>' '</blockquote>'

default: voting_power_for_decision.html

voting_power_for_decision.html: voting_power_for_decision.md Makefile
#	cp InsuranceGamble_header $@; 
	markdown $< | $(MCONV) >> $@

%.html: %.md
	markdown $< > $@
