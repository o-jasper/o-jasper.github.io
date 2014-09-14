
default: test

test: assurance_ent.lll.evm test.py
	python2 test.py

%.lll.evm: %.lll
	lllc -x $< > $@

%.se.evm: %.se
	serpent compile $< > $@

