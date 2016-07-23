(function($) {
	var MultiPicker = function () {
		this.options   = {
			activeClass : "active",
			valueSource : "index",
			prePopulate : null,
			disabled	: null,
			cssOptions  : {
				vertical  : false,
				quadratic : false,
				size	  : "medium",
				picker    : null,
				element   : null,
				hover     : null,
				selected  : null
			}
		};
		this.type      = "inline";
		this.input     = null;
		this.selector  = null;
		this.isPressed = false;
		this.lastElem  = "";

		this.setEvendHandlers = function () {
			var picker = this;
			this.items.click(function () {
				picker.select.call(this, picker, false);
			});

			this.items.mousemove(function (e) {
				if ((picker.isPressed) && picker.lastElem !== e.target) {
					picker.hover(e);
					picker.lastElem = e.target;
				}
			});

			this.selector.mousedown(function (e) {
				picker.isPressed = true;
			});

			this.selector.mouseleave(function (e) {
				picker.isPressed = false;
			});

			this.items.mouseup(this.finishHover.bind(this));
		};

		this.hover = function (e) {
			var element = $(e.target);
			this.select.call(element, this, false);
		};

		this.finishHover = function (e) {
			this.lastElem = null;
			this.isPressed = false;
		};

		//	arguments: element as this, picker, isPrepopulated flag which is true only on init
		this.select = function (picker, isPrepopulated) {
			var selectedVal;
			if ($(this).attr("data-disabled")) {
				return;
			}

			if (picker.options.valueSource === "index") {
				selectedVal = $(this).index();
			} else if (picker.options.valueSource.substring(0, 5) === "data-") {
				selectedVal = $(this).attr(picker.options.valueSource);
			} else if (picker.options.valueSource === "text") {
				selectedVal = $(this).text();
			} else {
				selectedVal = $(this).val();
			}

			if (picker.options.isSingle) {
				picker.clear();

				$(this).siblings("." + picker.options.activeClass).removeClass();
				$(this).addClass(picker.options.activeClass);

				picker.addValue(this, selectedVal);
				return;
			}
			if ($(this).hasClass(picker.options.activeClass)) {
				// unselect case
				$(this).removeClass();

				picker.removeValue(this, selectedVal);
				MultiPicker.updateClasses($(this), picker.options.activeClass);
				if (picker.options.onUnselect && typeof picker.options.onUnselect === "function" && !isPrepopulated) {
					picker.options.onUnselect(this, selectedVal);
				}
			} else {
				// select case
				$(this).addClass(picker.options.activeClass);

				picker.addValue(this, selectedVal);

				MultiPicker.updateClasses($(this), picker.options.activeClass);
				if (picker.options.onSelect && typeof picker.options.onSelect === "function" && !isPrepopulated) {
					picker.options.onSelect(this, selectedVal);
				}
			}
		};

		this.addValue = function (el, val) {
			if (this.type === "inline") {
				var currValue = this.input.val();
				if (currValue) {
					currValue += ",";
				}
				currValue += val;

				this.input.val(currValue);
			} else {
				this.selector.find("input[value='" + $(el).attr("data-value") + "']").attr("checked", true);
			}
		};

		this.removeValue = function (el, val) {
			if (this.type === "inline") {
				var currValue = this.input.val();
				currValue = currValue.replace("," + val, "").replace(val + ",", "").replace(val, "");
				this.input.val(currValue);
			} else {
				this.selector.find("input[value='" + $(el).attr("data-value") + "']").attr("checked", false);
			}
		};

		this.clear = function () {
			if (this.type === "inline") {
				this.input.val("");
			} else {
				this.selector.find("input").attr("checked", false);
			}
		};

		this.prePopulate = function () {
			if (MultiPicker.isArray(this.options.prePopulate) && this.options.prePopulate.length) {
				for (var key in this.options.prePopulate) {
					var searched = this.options.prePopulate[key];
					var element = this.getElementSelector(searched);

					if ($(element).index() < 0) {
						console.warn("Multipicker: prepopulated element doesn`t found `%s`", searched);
					} else {
						this.select.call(element, this, true);
					}
				}
			} else {
				var element = this.getElementSelector(this.options.prePopulate);
				if ($(element).index() < 0) {
					console.warn("Multipicker: prepopulated element doesn`t found`%s`", this.options.prePopulate);
				} else {
					this.select.call(element, this, true);
				}
			}
		},

		this.disable = function () {
			if (MultiPicker.isArray(this.options.disabled) && this.options.disabled.length) {
				for (var key in this.options.disabled) {
					var searched = this.options.disabled[key];
					var element = this.getElementSelector(searched);

					if ($(element).index() < 0) {
						console.warn("Multipicker: prepopulated element doesn`t found `%s`", searched);
					} else {
						$(element).attr("data-disabled", true);
					}
				}
			} else {
				var element = this.getElementSelector(this.options.disabled);
				if ($(element).index() < 0) {
					console.warn("Multipicker: disabled element doesn`t found`%s`", this.options.disabled);
				} else {
					$(element).attr("data-disabled", true);
				}
			}
		},

		this.getElementSelector = function (searched) {
			if (this.options.valueSource === "index" || !this.options.valueSource) {
				return this.items.eq(searched);
			} else if (this.options.valueSource.substring(0, 5) === "data-") {
				return this.selector.find(this.options.selector + "[" + this.options.valueSource + "='" + searched + "']");
			} else if (this.options.valueSource === "text") {
				return this.selector.find(this.options.selector + ":contains('" + searched + "')");
			}
		};
	};

	MultiPicker.isArray = function (obj) {
		if (Object.prototype.toString.call(obj) === '[object Array]') {
			return true;
		}
	}

	MultiPicker.updateClasses = function (item, className) {
		if ($(item).hasClass(className)) {
			if ($(item).next().hasClass(className) && $(item).prev().hasClass(className)) {
				if ($(item).next().next().hasClass(className)) {
					$(item).next().attr('class', className + " center-side");
				} else {
					$(item).next().attr('class', className + " right-side");
				}
				if ($(item).prev().prev().hasClass(className)) {
					$(item).prev().attr('class', className + " center-side");
				} else {
					$(item).prev().attr('class', className + " left-side");
				}
				$(item).attr("class", "active center-side");
			} else if ($(item).next().hasClass(className) && !$(item).prev().hasClass(className)) {
				if ($(item).next().next().hasClass(className)) {
					$(item).next().attr("class", className + " center-side");
				} else {
					$(item).next().attr("class", className + " right-side");
				}
				$(item).attr("class", "active left-side");
			} else if (!$(item).next().hasClass(className) && $(item).prev().hasClass(className)) {
				if ($(item).prev().prev().hasClass(className)) {
					$(item).prev().attr("class", className + " center-side");
				} else {
					$(item).prev().attr("class", className + " left-side");
				}
				$(item).attr("class", className + " right-side");
			}
		} else {
			if ($(item).next().hasClass("right-side")) {
				$(item).next().attr("class", className);
			}
			if ($(item).prev().hasClass("left-side")) {
				$(item).prev().attr("class", className);
			}
			if ($(item).prev().hasClass("center-side")) {
				$(item).prev().attr("class", className + " right-side");
			}
			if ($(item).next().hasClass("center-side")) {
				$(item).next().attr("class", className + " left-side");
			}
		}
	};

	MultiPicker.generateStyles = function (id, cssOptions) {
		var styles = "";
		if (cssOptions.picker) {
			styles += "#" + id + ".checklist {";
			for (var key in cssOptions.picker) {
				styles += key + ":" + cssOptions.picker[key] + ";";
			}
			styles += "}";
		}

		if (cssOptions.element) {
			styles += "#" + id + " > * {"
			for (var key in cssOptions.element) {
				styles += key + ":" + cssOptions.element[key] + ";";
			}
			styles += "}";
		}

		if (cssOptions.selected) {
			styles += "#" + id + " > *.active {"
			for (var key in cssOptions.selected) {
				styles += key + ":" + cssOptions.selected[key] + ";";
			}
			styles += "}";
		}

		if (cssOptions.hover) {
			styles += "#" + id + " > *:hover {"
			for (var key in cssOptions.hover) {
				styles +=  key + ":" + cssOptions.hover[key] + ";";
			}
			styles += "}";
		}
		$("head").append("<style type='text/css'>" + styles + "</style>");
	};

	$.fn.extend({
		multiPicker: function (opt) {
			var picker = new MultiPicker();
			// init picker instance
			picker.options 	= Object.assign(picker.options, opt);
			picker.selector = $("#" + this.attr("id"));

			if (picker.options.selector === "checkbox" || picker.options.selector === "radio") {
				// in the case when checkbox / radiobutton used for picker, hide them and append new
				// `span` tags for each input, with the same value stored in `data-value` attribute
				picker.type = picker.options.selector;
				if (picker.type === "radio")
					picker.options.isSingle = true;

				// hide all labels inside picker
				picker.selector.find("label").css("display", "none");

				if (picker.options.disabled) {
					if (!MultiPicker.isArray(picker.options.disabled)) {
						picker.options.disabled = [picker.options.disabled];
					}
				} else {
				 	picker.options.disabled = [];
				}
				$(picker.selector).find("input").each(function (index, item) {
					var itemValue = $(item).val();
					// use label text if provided else use input `value` attribute
					var labelText = $("label[for='" + $(item).attr("id") + "']").text() || itemValue;
					picker.selector.append("<span data-value='" + itemValue + "'>" + labelText + "</span>");
					if ($(item).prop('disabled')) {
						picker.options.disabled.push(itemValue);
					}
				});

				picker.items = picker.selector.find("span");
				picker.options.valueSource = "data-value";
				picker.options.selector = "span";

				if (picker.options.cssOptions.vertical) {
					picker.selector.addClass("more-padded-t");
				} else {
					picker.selector.addClass("more-padded-l");
				}
			} else {
				// not checkbox or radiobuttons used for picker
				picker.options.inputName = picker.options.inputName || this.attr("id");

				if (picker.type === "inline") {
					if (!$("[name=" + picker.options.inputName + "]").length) {
						picker.selector.after("<input type='hidden' name='" + picker.options.inputName + "'>");
						picker.input = $("[name=" + picker.options.inputName + "]");
					} else {
						picker.input = $("[name=" + picker.options.inputName + "]");
					}
				}
				picker.items = picker.selector.find(picker.options.selector);
			}

			picker.selector.addClass("checklist");

			if (picker.options.cssOptions.vertical) {
				picker.selector.addClass("vertical");
			}

			if (picker.options.cssOptions.size) {
				picker.selector.addClass(picker.options.cssOptions.size);
			}

			if (picker.options.cssOptions.quadratic) {
				picker.selector.addClass("quadratic");
			}

			if (picker.options.cssOptions.picker || picker.options.cssOptions.element || picker.options.cssOptions.hover || picker.options.cssOptions.selected) {
				MultiPicker.generateStyles(this.attr("id"), picker.options.cssOptions);
			}

			if (picker.options.prePopulate && MultiPicker.isArray(picker.options.prePopulate) && picker.options.prePopulate.length > 1 && picker.options.isSingle) {
				throw "Can not prePopulate more then 1 item, with `isSingle` true option";
			}

			if (picker.options.valueSource && !(picker.options.valueSource !== "index" || picker.options.valueSource !== "text" || picker.options.valueSource.substring(0, 5) === "data-")) {
				throw "Invalid value source";
			} else if (picker.options.valueSource === "data-disabled") {
				throw "`data-disabled` attribute is reserved, choose another name";
			}

			if (picker.options.prePopulate || picker.options.prePopulate === 0) {
				picker.prePopulate();
			}

			if (picker.options.disabled || picker.options.disabled === 0) {
				picker.disable();
			}

			picker.selector.attr("ondragstart", 'return false');
			picker.setEvendHandlers();

			if (picker.options.onInit && typeof picker.options.onInit === "function") {
				picker.options.onInit();
			}
		}
	});
})(jQuery);