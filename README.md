## Multi Picker

Multi picker is jQuery plugin for days, numbers, or other elements selecting, supports multi selecting (like checkboxes) or single element selection (like radiobuttons).

#### How to use
Load the latest version of jQuery library and plugin's files in the html document.

```
<script src="//code.jquery.com/jquery-latest.min.js"></script>
<script src="multipicker.js"></script>
<link rel="stylesheet" href="multipicker.css"></script>
```
MultiPicker usage basic example.

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
Initialize the picker plugin.
```javascript
$("#days").multiPicker({ selector	: "li" });
```
//// gif here

Specify `isSingle`: true option

```javascript
$("#days-single").multiPicker({
    selector: "li",
    isSingle: true
});
```
//// gif here

Specifying `prePopulate` array and valueSource options

```javascript
$("#days-prepopulated").multiPicker({
    selector : "li",
    prePopulate : ["Tu", "Fr"],
    valueSource : "data-value"
});
```

### Options
* `selector` (required) - element type used inside of picker (html tag like `li` / `span` / `i`, `checkbox` / `radio` - for input type `checkbox` / `radio`)
* `inputName` - name of input where checked values will be stored, plugin will create new if input does not exist on the page (only for non checkbox / radio elements)
* `valueSource` - source from where plugin should get value for element, possible values are: `index`, `text`, `data-*` attribute, default value is `index` (only for non checkbox / radio elements)
* `prePopulate` - string or array of element(s) which should be selected by default (useful for edit mode), could be `index`, `data-*` or `text` of elements', must match to valueSource
* `isSingle` - allow user to select only one option from picker (like input[type="radio"] in pure html forms) default value is false (only for non checkbox / radio elements)
* `cssOptions` - object with options described below:

<center>

|  Option   | Default value  | Description  |
|-----------|----------------|--------------|
| vertical  | false          | picker's horizontal / vertical position |
| quadratic | false          | by default picker is rounded, can specify this option true to make it square |
| size      | "medium"       | picker size, available values are "small", "medium", "large" |
| picker    | empty object   | css styles (key / value js object) will be assigned to the picker |
| element   | empty object   | css styles (key / value js object) will be assigned to the elements inside of picker |
| selected  | empty object   | css styles (key / value js object) will be assigned to the selected elements inside of picker |
| hover     | empty object   | css styles (key / value js object) will be assigned to the hover elements inside of picker |             |  

</center>
