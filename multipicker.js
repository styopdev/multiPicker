var multiPicker = {
	selector: null,
	lastElem: null,
	options: {},

	setEvendHandlers: function() {
		$(multiPicker.selector + " li").click(function(){
			multiPicker.select.call(this, false);
		});

		$(multiPicker.selector + " li").mousemove(function(e) {
			if ((e.which || e.button) && multiPicker.lastElem != e.target) {
				multiPicker.hover(e);
				multiPicker.lastElem = e.target;
			}
		});

		$(multiPicker.selector + " li").mouseup(multiPicker.finishHover);
	},

	hover: function(e) {
		var element = $(e.target);
		multiPicker.select.call(element);
	},

	finishHover: function(e) {
		multiPicker.lastElem = null;
	},

	select: function(isPrepopulated) {
		var selectedVal;

		if (multiPicker.options.valueSource == "index") {
			selectedVal = $(this).index();
		} else if (multiPicker.options.valueSource.substring(0, 5) == "data-") {
			selectedVal = $(this).attr(multiPicker.options.valueSource);
		} else {
			selectedVal = $(this).text();
		}

		if (multiPicker.options.isSingle) {
			multiPicker.clear();

			$(this).siblings("." + multiPicker.options.activeClass).removeClass();
			$(this).addClass(multiPicker.options.activeClass);

			multiPicker.addValue(selectedVal);
			return;
		}
		// unselect case
		if ($(this).hasClass(multiPicker.options.activeClass)) {
			$(this).removeClass();

			multiPicker.removeValue(selectedVal);
			// select case
			multiPicker.updateClasses($(this), multiPicker.options.activeClass);
			if (multiPicker.options.onUnselect && typeof multiPicker.options.onUnselect === "function" && !isPrepopulated) {
				multiPicker.options.onUnselect(this, selectedVal);
			}
		} else {
			$(this).addClass(multiPicker.options.activeClass);

			multiPicker.addValue(selectedVal);
			
			multiPicker.updateClasses($(this), multiPicker.options.activeClass);
			if (multiPicker.options.onSelect && typeof multiPicker.options.onSelect === "function" && !isPrepopulated) {
				multiPicker.options.onSelect(this, selectedVal);
			}
		}
	},

	addValue: function(val) {
		var currValue = $("[name=" + multiPicker.options.inputName + "]").val();
		if (currValue) {
			currValue += ",";
		}
		currValue += val;

		$("[name=" + multiPicker.options.inputName + "]").val(currValue);
	},

	removeValue: function(val) {
		var currValue = $("[name=" + multiPicker.options.inputName + "]").val();
		currValue = currValue.replace("," + val, "").replace(val + ",", "").replace(val, "");

		$("[name=" + multiPicker.options.inputName + "]").val(currValue);
	},

	clear: function() {
		$("[name=" + multiPicker.options.inputName + "]").val("");	
	},

	updateClasses: function(item, className) {
		if ($(item).hasClass(className)) {
			if ($(item).next().hasClass(className) && $(item).prev().hasClass(className)) {
				if ($(item).next().next().hasClass(className)) {
					$(item).next().removeClass();
					$(item).next().addClass(className + " center-side");
				} else {
					$(item).next().removeClass();
					$(item).next().addClass(className + " right-side");
				}
				if ($(item).prev().prev().hasClass(className)) {
					$(item).prev().removeClass();
					$(item).prev().addClass(className + " center-side");
				} else {
					$(item).prev().removeClass();
					$(item).prev().addClass(className + " left-side");
				}
				$(item).removeClass();
				$(item).addClass("active center-side");
			} else if ($(item).next().hasClass(className) && !$(item).prev().hasClass(className)) {
				if ($(item).next().next().hasClass(className)) {
					$(item).next().removeClass();
					$(item).next().addClass(className + " center-side");
				} else {
					$(item).next().removeClass();
					$(item).next().addClass(className + " right-side");
				}
				$(item).removeClass();
				$(item).addClass("active left-side");
			} else if (!$(item).next().hasClass(className) && $(item).prev().hasClass(className)) {
				if ($(item).prev().prev().hasClass(className)) {
					$(item).prev().removeClass();
					$(item).prev().addClass(className + " center-side");
				} else {
					$(item).prev().removeClass();
					$(item).prev().addClass(className + " left-side");
				}
				$(item).removeClass();
				$(item).addClass(className + " right-side");
			}
		} else {
			if ($(item).next().hasClass("right-side")) {
				$(item).next().removeClass();
				$(item).next().addClass(className);
			}
			if ($(item).prev().hasClass("left-side")) {
				$(item).prev().removeClass();
				$(item).prev().addClass(className);
			}
			if ($(item).prev().hasClass("center-side")) {
				$(item).prev().removeClass();
				$(item).prev().addClass(className + " right-side");
			}
			if ($(item).next().hasClass("center-side")) {
				$(item).next().removeClass();
				$(item).next().addClass(className + " left-side");
			}
		}
	},

	prePopulate: function() {
		if (multiPicker.isArray(multiPicker.options.prePopulate) && multiPicker.options.prePopulate.length) {;
			for (var key in multiPicker.options.prePopulate) {
				var searched = multiPicker.options.prePopulate[key];
				multiPicker.select.call(multiPicker.getPrepopulateSelector(searched), true);
			}
		} else {
			multiPicker.select.call(multiPicker.getPrepopulateSelector(multiPicker.options.prePopulate), true);
		}
	},

	getPrepopulateSelector: function(searched) {
		if (multiPicker.options.valueSource == "index" || !multiPicker.options.valueSource) {
			return $(multiPicker.selector + " li:eq(" + searched + ")");
		} else if (multiPicker.options.valueSource.substring(0, 5) == "data-") {
			return $(multiPicker.selector + " li[" + multiPicker.options.valueSource + "='" + searched + "']");
		} else if (multiPicker.options.valueSource == "text") {
			if (multiPicker.isArray(multiPicker.options.prePopulate)) {
				return $(multiPicker.selector + " li:contains('" + searched + "')");
			}
		}
	},

	isArray: function(obj) {
		if (Object.prototype.toString.call(obj) === '[object Array]') {
			return true;
		}
	}
};

jQuery.fn.extend({
	multiPicker: function(opt) {
		multiPicker.options = opt;
		multiPicker.selector = "#" + this.attr("id");

		if (!$("[name='" + multiPicker.options.inputName + "']").length) {
			throw "Input with name `" + multiPicker.options.inputName + "` does`nt exist";
		}

		if (multiPicker.options.prePopulate && multiPicker.options.prePopulate.length > 1 && multiPicker.options.isSingle) {
			throw "Can not prePopulate more then 1 item, with `isSingle` true option";
		}

		if (multiPicker.options.valueSource && !(multiPicker.options.valueSource != "index" || multiPicker.options.valueSource != "text" || multiPicker.options.valueSource.substring(0, 5) == "data-")) {
			throw "Invalid value source";
		}

		if (!multiPicker.options.activeClass) {
			multiPicker.options.activeClass = "active";
		}

		if (multiPicker.options.prePopulate) {
			multiPicker.prePopulate();
		}

		multiPicker.setEvendHandlers();

		if (multiPicker.options.onInit && typeof multiPicker.options.onInit === "function") {
			multiPicker.options.onInit();
		}
	}
});