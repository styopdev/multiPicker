## Multipicker

Plugin's [`official website`](http://styopdev.github.io/multiPicker/) with demos, also [`available in Russian`](http://styopdev.github.io/multiPicker/ru.html).

Multipicker is jQuery plugin for selecting days, numbers or other elements, it supports multi selecting (like checkboxes) or single element selection (like radio buttons).

#### How to use

There are several ways for multipicker plugin installation:

+ using npm:   `npm install multipicker`

+ using bower: `bower install multipicker`

+ download and unpack zip file from [github repository](https://github.com/styopdev/multiPicker).

Load the latest version of jQuery library and plugin's files from `dist` folder in the html document.

```
<script type="text/javascript" src="//code.jquery.com/jquery-latest.min.js"></script>
<script type="text/javascript" src="multiPicker/dist/multipicker.min.js"></script>
<link rel="stylesheet" href="multiPicker/dist/multipicker.min.js"></script>
```
##### Multipicker usage basic example.

```html
<ul id="days">
    <li>Su</li>
    <li>Mo</li>
    <li>Tu</li>
    <li>We</li>
    <li>Th</li>
    <li>Fr</li>
    <li>Sa</li>
</ul>
```

```javascript
$("#days").multiPicker({ selector : "li" });
```
![Multipicker usage basic example](https://cloud.githubusercontent.com/assets/6073745/15856615/b172e880-2cc7-11e6-8402-1b739f005c08.gif)

### Options
* `selector` (required) - element type used inside of picker (html tag like `li` / `span` / `i`, `checkbox` / `radio` - for input type `checkbox` / `radio`)
* `inputName` - name of input where checked values will be stored. Plugin will create new one if input does not exist on the page (only for non checkbox / radio elements). If `inputName` doesn't specified, picker container's id will be used for input name. For avoiding conflict strongly recommend to provide valid, unique name.
* `valueSource` - source from where plugin should get value for element, possible values are: `index`, `text`, `data-*` attribute, default value is `index` (only for non checkbox / radio elements)
* `prePopulate` - string or array of element(s) which should be selected by default (useful for edit mode), could be `index`, `data-*` or `text` of elements', must match to valueSource
* `disabled` - string or array of element(s) which should be disabled (useful for edit mode), could be `index`, `data-*` or `text` of elements', must match to valueSource. Also its possible to disable elements using checkboxes' and radiobuttons' disabled attribute, like `<input type="checkbox" disabled="true">`
* `isSingle` - allows user to select only one option from picker (like input[type="radio"] in pure html forms) default value is false (only for non checkbox / radio elements)
* `cssOptions` - object with options described below:


|  Option   | Default value  | Description  |
|-----------|----------------|--------------|
| vertical  | false          | picker's horizontal / vertical position |
| quadratic | false          | by default picker is rounded, specify this option true to make it square |
| size      | "medium"       | picker's size, available values are "small", "medium", "large" |
| picker    | empty object   | css styles (key / value js object) will be assigned to the picker |
| element   | empty object   | css styles (key / value js object) will be assigned to the elements inside of picker |
| selected  | empty object   | css styles (key / value js object) will be assigned to the selected elements inside of picker |
| hover     | empty object   | css styles (key / value js object) will be assigned to the hover elements inside of picker |             |  

### Events
* `onInit` - called when picker has finished initialization, doesn't receive any argument
* `onSelect` - called when item selected, function receive 2 arguments: selected item and it's value
* `onUnselect` - called when item deselected, function receive 2 arguments: deselected item and it's value

### Methods
Methods are implemented in bootstrap.js style - `.multiPicker("methodname").multiPicker("anotherMethod", options)`. All methods are chainable, some of them accepts arguments.

* `get` - get picker's current value, receive callback style function as an argument.
```js
$("#days").multiPicker({ selector: 'li' }).multiPicker('get', function (value) { /* value available here */ });
```
* `select` - select elements, receive array or string of element(s) values which should be selected.
```js
$("#days").multiPicker({ selector: 'li' }).multiPicker('select', [1, 2]);
```
* `unselect` - select elements, receive array or string of element(s) values which should be unselected.
```js
$("#days").multiPicker({ selector: 'li' }).multiPicker('unselect', "2");
```
* `disable` - disable elements, receive array or string of element(s) values which should be disabled.
```js
$("#days").multiPicker({ selector: 'li' }).multiPicker('disable', [1, 2]);
```
* `enable` - enable elements, receive array or string of element(s) values which should be enabled
```js
$("#days").multiPicker({ selector: 'li' }).multiPicker('enable', [1, 2]);
```
* `clear` - reset picker, doesn't receive any argument.
```js
$("#days").multiPicker({ selector: 'li' }).multiPicker('clear');
```

#### Usage with checkboxes and radiobuttons.
In case when html tags like `li` or `span` used in multipicker, it will store values in hidden input, which will be a string separated by commas, like this `"Su, Mo, Fr, Sa"`.
You should split this string on the server (on client in some cases), to store these values in database or make it possible to use them in picker in the future (for example when user wants to edit his choices).

In case when you are using checkboxes or radiobuttons, selected items will check checkbox/radiobutton in standart html way. Picker will modify your markup, and you will get html code like these:

 multiple items for checkboxes
```html
<div id="programming-languages">
    <input type="checkbox" name="lang" value="C" checked="true">
    <input type="checkbox" name="lang" value="JS">
    <input type="checkbox" name="lang" value="Swift" checked="true">
    <input type="checkbox" name="lang" value="Java">
    <input type="checkbox" name="lag" value="C#">
    <input type="checkbox" name="lang" value="C++" checked="true" >
    <input type="checkbox" name="lang" value="PHP">
</div>
```
or single selected item for radiobuttons
```html
<div id="programming-languages">
    <input type="radio" name="lang" value="C">
    <input type="radio" name="lang" value="JS">
    <input type="radio" name="lang" value="Swift" checked="true">
    <input type="radio" name="lang" value="Java">
    <input type="radio" name="lag" value="C#">
    <input type="radio" name="lang" value="C++">
    <input type="radio" name="lang" value="PHP">
</div>
```

You can access selected values in standart way as you would do with checkboxes and radiobuttons if plugin wouldn't been used.

##### More Examples:

Set `isSingle`: true to make only one element selectable like radiobuttons in html.
```javascript
$("#days").multiPicker({
    selector: "li",
    isSingle: true
});
```
![Multipicker usage with isSingle=true option  example](https://cloud.githubusercontent.com/assets/6073745/15856616/b187b774-2cc7-11e6-8d70-accd5c44aa4c.gif)

Specify `prePopulate` array and valueSource options to get some options selected by default

```javascript
$("#days").multiPicker({
    selector : "li",
    prePopulate : ["Tu", "Fr"],
    valueSource : "data-value"
});
```
![Multipicker usage with prepopuated selectors  example](https://cloud.githubusercontent.com/assets/6073745/15856614/b153e19c-2cc7-11e6-9f24-ca9f62ec3e20.gif)


To make your picker vertical just use `cssOptions` `vertical : true` property

```html
<div id="days-vertical">
    <span>Su</span>
    <span>Mo</span>
    <span>Tu</span>
    <span>We</span>
    <span>Th</span>
    <span>Fr</span>
    <span>Sa</span>
</div>
```
```javascript
$("#days-vertical").multiPicker({
    selector   : "span",
    cssOptions : {
        vertical: true
    }
});
```

![Multipicker usage with `vertical=true` css option  example](https://cloud.githubusercontent.com/assets/6073745/15857611/503ea1fc-2ccd-11e6-95b6-989dff377e66.gif)

##### Using radiobuttons

```html
<div id="languages">
	<input type="radio" name="language" value="EN">
	<input type="radio" name="language" value="HY">
	<input type="radio" name="language" value="RU">
	<input type="radio" name="language" value="EN">
	<input type="radio" name="language" value="JP">
	<input type="radio" name="language" value="DE">
	<input type="radio" name="language" value="FR">
</div>
```
```javascript
$("#languages").multiPicker({ selector : "radio" });
```
![Multipicker usage with radiobuttons  example](https://cloud.githubusercontent.com/assets/6073745/15859929/1cfc7836-2cd8-11e6-93fe-9c54b9186518.gif)

##### Using checkboxes
With vertical, quadratic and prepopulated options:
```html
<div id="programming-languages">
	<input type="checkbox" name="lang" value="C">
	<input type="checkbox" name="lang" value="JS">
	<input type="checkbox" name="lang" value="Swift">
	<input type="checkbox" name="lang" value="Java">
	<input type="checkbox" name="lag" value="C#">
	<input type="checkbox" name="lang" value="C++">
	<input type="checkbox" name="lang" value="PHP">
</div>
```
```javascript
$("#programming-languages").multiPicker({
	selector	: "checkbox",
	prePopulate : ["C", "C++"],
	cssOptions  : {
		quadratic : true,
		vertical  : true
	}
});
```
![Multipicker usage with checkboxes, `vertical: true`, and `quadratic = true` options example](https://cloud.githubusercontent.com/assets/6073745/15859318/c19e69c4-2cd5-11e6-8838-fa0b1fdcaf03.gif)

##### Design customisation
Plugin allows to use label tags to apply item text and keep input's value hidden from user. To apply custom design to multipicker you should use cssOptions (which is described in options section).

For Example, this picker's code

![Multipicker usage with checkboxes, `vertical : true`, and `quadratic = true` options example](https://cloud.githubusercontent.com/assets/6073745/15861747/660ac798-2cde-11e6-8936-316838bca9d6.gif)

will be:

```html
<div id="clubs">
	<label for="zero">JAN</label>
	<input id="zero" type="checkbox" name="club" value="0">
	<label for="one">FEB</label>
	<input id="one" type="checkbox" name="club" value="1">
	<label for="two">MAR</label>
	<input id="two" type="checkbox" name="club" value="2">
	<label for="three">APR</label>
	<input id="three"type="checkbox" name="club" value="3">
	<label for="four">MAY</label>
	<input id="four" type="checkbox" name="club" value="4">
	<label for="five">JUN</label>
	<input id="five" type="checkbox" name="club" value="5">
	<label for="six">JUL</label>
	<input id="six" type="checkbox" name="club" value="6">
	<label for="seven">AUG</label>
	<input id="seven" type="checkbox" name="club" value="7">
	<label for="eight">SEB</label>
	<input id="eight" type="checkbox" name="club" value="8">
	<label for="nine">OCT</label>
	<input id="nine" type="checkbox" name="club" value="9">
	<label for="ten">NOV</label>
	<input id="ten" type="checkbox" name="club" value="10">
	<label for="eleven">DEC</label>
	<input id="eleven" type="checkbox" name="club" value="11">
</div>
```
```javascript
$("#clubs").multiPicker({
	selector    : "checkbox",
	prePopulate : "1",
	isSingle	: true,
	cssOptions 	: {
		size	  : "large",
		element	  : {
			"font-size"   : "11px",
			"color" 	  : "#3a3a3a",
			"font-weight" : "bold"
		},
		selected: {
			"border-color" : "#ff4c4c",
			"font-size"    : "14px"
		},
		picker: {
			"border-color" : "#ff4c4c",
		}
	}
});
```
