SVGJS = bower_components/svg.js/dist/svg.min.js
MOVED_SVGJS = app/lib/svg.js/svg.min.js
MOVED_SVGJS_FOLDER = $(dir $(MOVED_SVGJS))
TARGET = app/target
CSS_SRC = src/css/main.css
CSS_TARGET = app/target/main.css

.PHONY: clean
all: $(MOVED_SVGJS) $(TARGET) $(CSS_TARGET)

clean:
	-rm -r app/lib app/target bower_components

$(SVGJS):
	npm run bower -- install svg.js

$(MOVED_SVGJS): | $(SVGJS)
	npm run mkdirp -- $(MOVED_SVGJS_FOLDER)
	npm run cp -- $(SVGJS) $(MOVED_SVGJS_FOLDER)

$(TARGET):
	npm run mkdirp -- $@

$(CSS_TARGET): $(CSS_SRC)
	npm run cp -- $(CSS_SRC) $@ 