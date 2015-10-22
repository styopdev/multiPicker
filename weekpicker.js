var selector;
var options;
var lastElem;
var className = "active";

$.fn.multiPicker = function(opt) {
	options  = opt;
	selector = "#" + this.attr("id");

	if (!$("[name='" + options.inputName + "']").length) {
		throw "Input with name `" + options.inputName + "` does`nt exist";
	}

	if (options.prePopulate && options.prePopulate.length > 1 && options.isSingle) {
		throw "Can not use `prePopulate` with `isSingle` option";
	}
	
	if (options.valueSource && !(options.valueSource != "index" || options.valueSource != "text" || options.valueSource.substring(0, 5) == "data-")) {
		throw "Invalid value source";
	}

	if (options.prePopulate) {
		if (isArray(options.prePopulate) && options.prePopulate.length) {;
			for (var key in options.prePopulate) {
				var searched = options.prePopulate[key];
				console.log(JSON.stringify(getPrepopulateSelector(searched)))
				select.call(getPrepopulateSelector(searched));
			}
		} else {
			select.call( getPrepopulateSelector(options.prePopulate));
		}
	}

	$(selector + " li").click(select);

	$(selector + " li").mousemove(function(e) {
		if ((e.which || e.button) && lastElem != e.target) {
			hover(e);
			lastElem = e.target;
		}
	});

	$(selector + " li").mouseup(finishHover);
}

function hover(e) {
	var element = $(e.target);
	select.call(element, "active");
}

function finishHover(e) {
	lastElem = null;
}

function select() {
	var selectedVal = $(this).attr("data-value") ? $(this).attr("data-value") : $(this).index();

	if (options.isSingle) {
		removeValue($(selector + " li.active").attr("data-value") ? $(selector + " li.active").attr("data-value") : $(selector + " li.active").index());

		$(this).siblings("." + className).removeClass();

		$(this).addClass(className);
		
		addValue(selectedVal);
		return;
	}

	// unselect case
	if ($(this).hasClass(className)) {
		$(this).removeClass();

		removeValue(selectedVal);

	// select case
	} else {
		$(this).addClass(className);

		addValue(selectedVal);
	}

	updateClasses($(this), className);
}

function addValue(val) {
	var currValue = $("[name=" + options.inputName + "]").val();
	if (currValue) {
		currValue += ",";
	}
	currValue += val;

	$("[name=" + options.inputName + "]").val(currValue);
}

function removeValue(val) {
	var currValue = $("[name=" + options.inputName + "]").val();
	currValue = currValue.replace("," + val, "").replace(val + ",", "").replace(val, "");

	$("[name=" + options.inputName + "]").val(currValue);
}

function updateClasses(item, className) {
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
			}
			else {
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
			}
			else {
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
}

function getPrepopulateSelector(searched) {
	if (options.valueSource == "index" || !options.valueSource) {
		return $(selector + " li:eq(" + searched + ")");
	} else if (options.valueSource.substring(0, 5) == "data-") {
		return $(selector + " li[" + options.valueSource + "='" + searched + "']");
	} else if (options.valueSource == "text") {
		if (isArray(options.prePopulate)) {
			for (var key in options.prePopulate) {
				var toReturn;
				$(selector + " li").each(function(index, item) {
					if ($(item).html() == options.prePopulate[key]) {
						toReturn = $(item);
						return false;
					}
				});
				return toReturn;
			}
		} else {
			var toReturn;
			$(selector + " li").each(function(index, item) {
				if ($(item).html() == options.prePopulate) {
					toReturn = $(item);
					return false;
				}
			});
			return toReturn;
		}
	}
}

function isArray(obj) {
	if (Object.prototype.toString.call(obj) === '[object Array]') {
	   return true;
	}
}
