var selector;
var options;

function init(sel, opt) {
	options  = opt;
	selector = sel;

	if (!options.inputName) {
		options.inputName = "week_days";
	}

	if (!$("[name='" + options.inputName + "']").length) {
		throw "Input with name `" + options.inputName + "` does`nt exist";
	}

	if (options.prePopulate && options.prePopulate.length && options.isSingle) {
		throw "Can not use `prePopulate` with `isSingle` options";
	}

	if (options.prePopulate && options.prePopulate.length) {
		for (var key in options.prePopulate) {
			var index = options.prePopulate[key];
			select.call($(selector + " li:eq(" + index + ")"));
		}
	}

	$(selector + " li").click(select);
}

function select() {
	if (options.isSingle) {
		removeValue($(selector + " li.active").index());

		$(this).siblings(".active").removeClass();

		$(this).addClass("active");
		
		addValue($(this).index());
		return;
	}

	// unselect case
	if ($(this).hasClass("active")) {
		$(this).removeClass();

		removeValue($(this).index());

		// check previous days
		if ($(this).prev().hasClass("active")) {
			if ($(this).prev().hasClass("center-side")) {
				$(this).prev().removeClass("center-side");
				$(this).prev().addClass("right-side");
			} else if ($(this).prev().hasClass("left-side")) {
				$(this).prev().removeClass("left-side");
			}
		}

		// check next days
		if ($(this).next().hasClass("active")) {
			if ($(this).next().hasClass("center-side")) {
				$(this).next().removeClass("center-side");
				$(this).next().addClass("left-side");
			} else if ($(this).next().hasClass("right-side")) {
				$(this).next().removeClass("right-side");
			}
		}
	// select case
	} else {
		$(this).addClass("active");

		addValue($(this).index());

		// check previous days
		if ($(this).prev().hasClass("active")) {
			if ($(this).next().hasClass("active")) {
				$(this).addClass("center-side");
			} else {
				$(this).addClass("right-side");
			}
			checkClassRecursive($(this), "left");
		}

		// check next days
		if ($(this).next().hasClass("active")) {
			if ($(this).prev().hasClass("active")) {
				$(this).addClass("center-side");
			} else {
				$(this).addClass("left-side");
			}
			checkClassRecursive($(this), "right");
		}
	}
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
	var searchText = "," + val;
	currValue = currValue.replace(searchText, "").replace(val, "")

	$("[name=" + options.inputName + "]").val(currValue);
}

function checkClassRecursive(element, side) {
	if (side == "right") {
		if (element.next().hasClass("center-side") || element.next().attr("class") == "active") {
			element.next().addClass("right-side");
			element.next().removeClass("center-side");
			checkClassRecursive(element.next(), "right-side");
		} else if (element.next().hasClass("left-side")) {
			element.next().removeClass("left-side");
			element.next().addClass("center-side");
		}
	} else if (side == "left") {
		if (element.prev().hasClass("center-side") || element.prev().attr("class") == "active") {
			element.prev().addClass("left-side");
			element.prev().removeClass("center-side");
			checkClassRecursive(element.prev(), "left-side");
		} else if (element.prev().hasClass("right-side")) {
			element.prev().removeClass("right-side");
			element.prev().addClass("center-side");
		}
	}
}