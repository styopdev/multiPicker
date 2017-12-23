QUnit.test("Simple initialization", function(assert) {
  assert.expect(4);

  var picker = $("#days").multiPicker({
  	selector: "li",
  	onInit: function () {
	  	assert.ok(true, "onInit called");
	  }
	});

	assert.ok($("#days").hasClass("checklist"), "Css class `checklist` added");
	assert.equal($("input[type='hidden'][name='days']").length, 1, "Hidden input has been created");
	assert.equal($("#days .active").length, 0, "No elements has been selected");
});

QUnit.test("Initialization with prepopulate", function(assert) {
	assert.expect(5);

	$("#prepopulate").multiPicker({
		selector: "li",
		prePopulate: ["0", "1"],
		cssOptions: {
			size: "large",
			element: {
				"font-size": "11px"
			}
		},
		onInit: function () {
			assert.ok(true, "on init");
		}
	});
	assert.ok($("#prepopulate  li:eq(0)").hasClass("active") && $("#prepopulate  li:eq(1)").hasClass("active"), "Days 0, 2 have been selected");
	assert.ok(!$("#prepopulate li:eq(3)").hasClass("active") && !$("#prepopulate li:eq(4)").hasClass("active") && !$("#prepopulate li:eq(5)").hasClass("active"), "Days 3, 4, 5 are not selected");

	assert.ok($("#prepopulate").hasClass("checklist"), "Css class `checklist` added");
	assert.equal($("input[type='hidden'][name='prepopulate']").length, 1, "Hidden input created");
});

QUnit.test("Initializate single picker", function(assert) {
	assert.expect(3);

	$("#single").multiPicker({
		selector: "li",
		isSingle: true,
		onInit: function () {
			assert.ok(true, "onInit called");
		}
	});

	assert.ok($("#single").hasClass("checklist"), "Css class `checklist` added");
	assert.equal($("input[type='hidden'][name='single']").length, 1, "Hidden input created");
});

QUnit.test("Initialize with specified input name option", function(assert) {
	assert.expect(4);
	$("#input-name-specified").multiPicker({
		selector: "li",
		inputName: "yes-or-no",
		onInit: function() {
			assert.ok(true, "onInit called");
		}
	});

	assert.ok($("#input-name-specified").hasClass("checklist"), "Css class `checklist` added");
	assert.equal($("input[type='hidden'][name='yes-or-no']").length, 1, "New input with specified name created");
	assert.equal($("input[type='hidden'][name='input-name-specified']").length, 0, "Id doesnt used for new input name");
});

QUnit.test("Initialize checkbox", function(assert) {
	assert.expect(3);
	$("#programming-languages").multiPicker({
		selector: "checkbox",
		onInit: function() {
			assert.ok(true, "onInit called");
		}
	});

	assert.ok($("#programming-languages").hasClass("checklist"), "CSS class `checklist` added");
	assert.equal($("input[type='hidden'][name='programming-languages']").length, 0, "No hidden input created");
});

QUnit.test("Initialize radiobuttons", function(assert) {
	assert.expect(3);
	$("#languages").multiPicker({
		selector: "radio",
		onInit: function() {
			assert.ok(true, "onInit called");
		}
	});

	assert.ok($("#languages").hasClass("checklist"), "Css class `checklist` added");
	assert.equal($("input[type='hidden'][name='languages']").length, 0, "No hidden input created");
});

QUnit.test("Test events ", function(assert) {
  assert.expect(5);

  var picker = $("#test-events").multiPicker({
  	selector: "li",
  	onInit: function () {
	  	assert.ok(true, "onInit called");
	  },
	  onSelect: function (el, val) {
	  	assert.ok(true, "on Select called");
	  	assert.equal(val, "1", "on Select value is ok");
	  },
	  onUnselect : function (el, val) {
	  	assert.ok(true, "Unselect called");
	  	assert.equal(val, "1", "Unselect value is ok");
	  }
	});

	picker.multiPicker("select", ["1"]);
	picker.multiPicker("unselect", ["1"]);
});

QUnit.test("Api test", function(assert) {
	assert.expect(11);

	var picker = $("#api-test").multiPicker({
		selector: "li"
	});

	picker.multiPicker('select', [1, 3]);
	assert.ok($("#api-test li:eq(1)").hasClass("active") && $("#api-test li:eq(3)").hasClass("active"), "Days 1, 3 have been selected");

	picker.multiPicker('select', 4);
	assert.ok($("#api-test li:eq(4)").hasClass("active"), "Day 4 has been selected");

	picker.multiPicker('unselect', 4);
	assert.ok(!$("#api-test li:eq(4)").hasClass("active"), "Day 4 has been unselected");

	picker.multiPicker('unselect', [1, 3]);
	assert.ok(!$("#api-test li:eq(1)").hasClass("active") && !$("#api-test li:eq(3)").hasClass("active"), "Days 1, 3 have been unselected");

	picker.multiPicker('select', [2, 4]);
	picker.multiPicker('clear');
	assert.equal($("#api-test .active").length, 0, "Picker cleared");
	picker.multiPicker('get', function (val) {
		assert.ok(!val, 'Pickers value cleared');
	});

	picker.multiPicker('select', [1, 3]);
	picker.multiPicker('get', function (val) {
		assert.equal(val, '1,3', "Picker values specified correctly");
	});

	picker.multiPicker('disable', 0);
	assert.ok($("#api-test li:eq(0)").attr("data-disabled"), "Day 0 has been disabled");

	picker.multiPicker('enable', 0);
	assert.ok(!$("#api-test li:eq(0)").attr("data-disabled"), "Day 0 has been enabled");

	picker.multiPicker('disable', [1, 3, 4]);
	assert.ok($("#api-test li:eq(1)").attr("data-disabled") && $("#api-test li:eq(3)").attr("data-disabled") && $("#api-test li:eq(4)").attr("data-disabled"), "Day 1, 3, 4 have been disabled");

	picker.multiPicker('enable', [1, 3, 4]);
	assert.ok(!$("#api-test li:eq(1)").attr("data-disabled") && !$("#api-test li:eq(3)").attr("data-disabled") && !$("#api-test li:eq(4)").attr("data-disabled"), "Day 1, 3, 4 have been enabled");
});
$("#api-test-radio").multiPicker({
  selector: "radio"
});

QUnit.test("Api test checkboxes", function(assert) {
	assert.expect(11);

	var picker = $("#api-test-checkbox").multiPicker({
		selector: "checkbox"
	});

	picker.multiPicker('select', ["EN", "RU"]);
	assert.ok($("#api-test-checkbox span[data-value='EN']").hasClass("active") && $("#api-test-checkbox span[data-value='RU']").hasClass("active"), "Langs EN, HY have been selected");

	picker.multiPicker('select', "HY");
	assert.ok($("#api-test-checkbox span[data-value='HY']").hasClass("active"), "Lang HY has been selected");

	picker.multiPicker('unselect', "HY");
	assert.ok(!$("#api-test-checkbox span[data-value='HY']").hasClass("active"), "Lang HY has been unselected");

	picker.multiPicker('unselect', ["EN", "RU"]);
	assert.ok(!$("#api-test-checkbox span[data-value='EN']").hasClass("active") && !$("#api-test-checkbox span[data-value='RU']").hasClass("active"), "Langs EN, HY have been unselected");

	picker.multiPicker('select', ["HY", "JP"]);
	picker.multiPicker('clear');
	assert.equal($("#api-test-checkbox .active").length, 0, "Picker cleared");
	picker.multiPicker('get', function (val) {
		assert.equal(val.length, 0, 'Pickers value cleared');
	});

	picker.multiPicker('select', ["EN", "RU"]);
	picker.multiPicker('get', function (val) {
		assert.deepEqual(val, ["EN", "RU"], "Picker values specified correctly");
	});

	picker.multiPicker('disable', "HY");
	assert.ok($("#api-test-checkbox span[data-value='HY']").attr("data-disabled"), "Lang HY has been disabled");

	picker.multiPicker('enable', "HY");
	assert.ok(!$("#api-test-checkbox span[data-value='HY']").attr("data-disabled"), "Lang HY has been enabled");

	picker.multiPicker('disable', ["EN", "RU", "JP"]);
	assert.ok($("#api-test-checkbox span[data-value='EN']").attr("data-disabled") && $("#api-test-checkbox span[data-value='RU']").attr("data-disabled") && $("#api-test-checkbox span[data-value='JP']").attr("data-disabled"), "Langs EN, RU, JP have been disabled");

	picker.multiPicker('enable', ["EN", "RU", "JP"]);
	assert.ok(!$("#api-test-checkbox span[data-value='EN']").attr("data-disabled") && !$("#api-test-checkbox span[data-value='RU']").attr("data-disabled") && !$("#api-test-checkbox span[data-value='JP']").attr("data-disabled"), "Langs EN, RU, JP have been enabled");
});
