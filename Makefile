SVGJS = bower_components/svg.js/dist/svg.min.js
MOVEDSVGJS = app/lib/svg.js/svg.min.js

all: $(MOVEDSVGJS)

$(SVGJS):
	npm run bower -- install svg.js


$(MOVEDSVGJS): | $(SVGJS)
	npm run mkdirp -- $(filter-out svg.min.js,$(MOVEDSVGJS))
	npm run cp -- $(SVGJS) $(MOVEDSVGJS)