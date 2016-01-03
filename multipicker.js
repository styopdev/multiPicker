var MultiPicker = function () {
	this.options  	 = {
		valueSource: "index",
		prePopulate: null
	};
	this.lastElem 	 = "";
	this.input    	 = null;
	this.selector 	 = null;

	this.setEvendHandlers = function () {
		var picker = this;
		$(this.selector + " li").click(function () {
			picker.select.call(this, picker, false);
		});

		$(this.selector + " li").mousemove(function (e) {
			if ((e.which || e.button) && picker.lastElem != e.target) {
				picker.hover(e);
				picker.lastElem = e.target;
			}
		});

		$(this.selector + " li").mouseup(this.finishHover);
	};

	this.hover = function (e) {
		var element = $(e.target);
		this.select.call(element, this, false);
	};

	this.finishHover = function (e) {
		this.lastElem = null;
	};

	//	arguments: element as this, picker, isPrepopulated flag which is true only on init
	this.select = function (picker, isPrepopulated) {
		var selectedVal;

		if (picker.options.valueSource == "index") {
			selectedVal = $(this).index();
		} else if (picker.options.valueSource.substring(0, 5) == "data-") {
			selectedVal = $(this).attr(picker.options.valueSource);
		} else {
			selectedVal = $(this).text();
		}

		if (picker.options.isSingle) {
			picker.clear();

			$(this).siblings("." + picker.options.activeClass).removeClass();
			$(this).addClass(picker.options.activeClass);

			picker.addValue(selectedVal);
			return;
		}
		if ($(this).hasClass(picker.options.activeClass)) {
			// unselect case
			$(this).removeClass();

			picker.removeValue(selectedVal);
			MultiPicker.updateClasses($(this), picker.options.activeClass);
			if (picker.options.onUnselect && typeof picker.options.onUnselect === "function" && !isPrepopulated) {
				picker.options.onUnselect(this, selectedVal);
			}
		} else {
			// select case
			$(this).addClass(picker.options.activeClass);

			picker.addValue(selectedVal);
			
			MultiPicker.updateClasses($(this), picker.options.activeClass);
			if (picker.options.onSelect && typeof picker.options.onSelect === "function" && !isPrepopulated) {
				picker.options.onSelect(this, selectedVal);
			}
		}
	};

	this.addValue = function (val) {
		var currValue = this.input.val();
		if (currValue) {
			currValue += ",";
		}
		currValue += val;

		this.input.val(currValue);
	};

	this.removeValue = function (val) {
		var currValue = this.input.val();
		currValue = currValue.replace("," + val, "").replace(val + ",", "").replace(val, "");

		this.input.val(currValue);
	};

	this.clear = function () {
		this.input.val("");
	};

	this.prePopulate = function () {
		if (MultiPicker.isArray(this.options.prePopulate) && this.options.prePopulate.length) {
			for (var key in this.options.prePopulate) {
				var searched = this.options.prePopulate[key];
				var element = this.getPrepopulateSelector(searched);

				if ($(element).index() < 0)
					console.warn("Multipicker: prepopulated element doesn`t found `%s`", searched);
				else
					this.select.call(index, this, true);
			}
		} else {
			var element = this.getPrepopulateSelector(this.options.prePopulate);
			if ($(element).index() < 0)
				console.warn("Multipicker: prepopulated element doesn`t found`%s`", this.options.prePopulate);
			else
				this.select.call(element, this, true);
		}
	};

	this.getPrepopulateSelector = function (searched) {
		if (this.options.valueSource == "index" || !this.options.valueSource) {
			return $(this.selector + " li:eq(" + searched + ")");
		} else if (this.options.valueSource.substring(0, 5) == "data-") {
			return $(this.selector + " li[" + this.options.valueSource + "='" + searched + "']");
		} else if (this.options.valueSource == "text") {
			return $(this.selector + " li:contains('" + searched + "')");
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
};

jQuery.fn.extend({
	multiPicker: function (opt) {
		// init picker instance
		var picker = new MultiPicker();
		picker.options 	= Object.assign(picker.options, opt);
		picker.selector = "#" + this.attr("id");
		picker.input 	= $("[name=" + picker.options.inputName + "]");

		if (!picker.input.length) {
			throw "Input with name `" + picker.options.inputName + "` does`nt exist";
		}

		if (picker.options.prePopulate && MultiPicker.isArray(picker.options.prePopulate) && picker.options.prePopulate.length > 1 && picker.options.isSingle) {
			throw "Can not prePopulate more then 1 item, with `isSingle` true option";
		}

		if (picker.options.valueSource && !(picker.options.valueSource != "index" || picker.options.valueSource != "text" || picker.options.valueSource.substring(0, 5) == "data-")) {
			throw "Invalid value source";
		}

		if (!picker.options.activeClass) {
			picker.options.activeClass = "active";
		}

		if (picker.options.prePopulate) {
			picker.prePopulate();
		}

		$(picker.selector).attr("ondragstart", 'return false');
		picker.setEvendHandlers();

		if (picker.options.onInit && typeof picker.options.onInit === "function") {
			picker.options.onInit();
		}
	}
});