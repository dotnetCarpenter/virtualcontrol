SVGJS = bower_components/svg.js/dist/svg.min.js
MOVEDSVGJS = lib/svg.js/svg.min.js

all: $(MOVEDSVGJS)

$(SVGJS):
	npm run bower -- install svg.js


$(MOVEDSVGJS): | $(SVGJS)
	npm run mkdirp -- lib/svg.js
	npm run cp -- $(SVGJS) $(MOVEDSVGJS)