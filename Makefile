SHELL				:= /bin/bash

TIME				:= $(shell date "+%m/%d %I:%M%p")
COMPLETE			:= \033[32mSuccess ✔\033[39m

UGLIFY				?= uglifyjs
BROWSERIFY			?= browserify
COMPRESSOR			?= zip --junk-paths

LIB					:= lib
DIST				:= dist
LICENSE				:= LICENSE
JS					:= $(shell find $(LIB) -name '*.js')
# MAIN				:= $(LIB)/main.js
SRC					:= $(LIB)/browser.js
DST					:= $(LIB)/furlong.js
DST_MIN				:= $(LIB)/furlong.min.js
ZIP					:= $(DIST)/furlong.zip

.PHONY: clean all test package publish

all: $(DST) $(DST_MIN)

package: $(ZIP) $(DST) 

test:
	@npm test

publish: 
	make package
	# @npm publish

clean:
	@rm -f -- $(DST) $(DST_MIN) $(ZIP)
	@rm -rf -- $(DIST)

$(DST): $(SRC)
	@browserify $< | $(UGLIFY) - -b indent_level=2 > $@

# mangle & compress with warnings off
$(DST_MIN): $(SRC)
	@printf "\n$(TIME) · \033[35mCompiling...\033[39m"
	@browserify $< | $(UGLIFY) -mc --warnings=false > $@
	@printf " $(COMPLETE)\n"

$(ZIP): $(LICENSE) $(DST) $(DST_MIN)
	@mkdir -p $(DIST)
	@cp -r $^ $(DIST)
	@$(COMPRESSOR) $@ $^ > /dev/null
