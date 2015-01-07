default: make view

make:
	cd blog/pre_post; make
	cd presentation/;make

view: make
	jekyll serve

preview: make
	jekyll serve --drafts --watch
