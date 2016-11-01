QUnit.test("Simple initialization ", function(assert) {
  assert.expect(3);

  $("#days").multiPicker({
  	selector: "li",
  	onInit: function () {
	  	assert.ok(true, "onInit called");
	  }
	});
	assert.ok($("#days").hasClass("checklist"), "Css class `checklist` added");
	assert.ok($("input[type='hidden'][name='days']").length === 1, "Hidden input created");
});

QUnit.test("Initialization with prepopulate", function(assert) {
	assert.expect(8);

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
	assert.ok($("#prepopulate  li:eq(0)").hasClass("active"), "Day 1 selected");	
	assert.ok($("#prepopulate  li:eq(1)").hasClass("active"), "Day 2 selected");	
	assert.ok(!$("#prepopulate li:eq(2)").hasClass("active"), "Day 3 is not selected");	
	assert.ok(!$("#prepopulate li:eq(3)").hasClass("active"), "Day 4 is not selected");
	assert.ok(!$("#prepopulate li:eq(4)").hasClass("active"), "Day 5 is not selected");

	assert.ok($("#prepopulate").hasClass("checklist"), "Css class `checklist` added");
	assert.ok($("input[type='hidden'][name='prepopulate']").length === 1, "Hidden input created");
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
	assert.ok($("input[type='hidden'][name='single']").length === 1, "Hidden input created");
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
	assert.ok($("input[type='hidden'][name='yes-or-no']").length === 1, "New input with specified name created");
	assert.ok($("input[type='hidden'][name='input-name-specified']").length === 0, "Id doesnt used for new input name");
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
	assert.ok($("input[type='hidden'][name='programming-languages']").length === 0, "No hidden input created");
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
	assert.ok($("input[type='hidden'][name='languages']").length === 0, "No hidden input created");
});
