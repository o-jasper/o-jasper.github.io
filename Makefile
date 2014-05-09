default: make view

make:
	cd blog/pre_post; make

view:
	jekyll serve
