SVGJS = bower_components/svg.js/dist/svg.min.js
MOVED_SVGJS = app/lib/svg.js/svg.min.js
MOVED_SVGJS_FOLDER = $(dir $(MOVED_SVGJS))

all: $(MOVED_SVGJS)

$(SVGJS):
	npm run bower -- install svg.js


$(MOVED_SVGJS): | $(SVGJS)
	npm run mkdirp -- $(MOVED_SVGJS_FOLDER)
	npm run cp -- $(SVGJS) $(MOVED_SVGJS_FOLDER)