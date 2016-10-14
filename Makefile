LIBRARIES := bower_components/svg.js/dist/svg.js bower_components/svg.draggable.js/dist/svg.draggable.js bower_components/svg.topath.js
LIBRARIES_TARGET_FOLDER = app/lib/
LIBRARIES_TARGET := $(patsubst %,$(LIBRARIES_TARGET_FOLDER)%, $(notdir $(LIBRARIES)))
TARGET = app/target
CSS_SRC = src/css/main.css
CSS_TARGET = app/target/main.css


.PHONY: clean debug
all: $(LIBRARIES_TARGET) $(TARGET) $(CSS_TARGET)
debug:
	@echo $(LIBRARIES_TARGET)
	@echo $(LIBRARIES_TARGET_FOLDER)

clean:
	rm -r app/lib app/target bower_components

$(LIBRARIES):
	npm run bower -- install $(notdir $@) --production

$(LIBRARIES_TARGET_FOLDER):
	npm run mkdirp -- $(dir $@)

$(LIBRARIES_TARGET): $(LIBRARIES) $(LIBRARIES_TARGET_FOLDER) 
	npm run cp -- $< $@

$(TARGET):
	npm run mkdirp -- $@

$(CSS_TARGET): $(CSS_SRC)
	npm run cp -- $(CSS_SRC) $@ 