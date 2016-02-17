## Multi Picker

Multi picker is jQuery plugin for days, numbers, or other elements selecting, supports multi selecting (like checkboxes) or single element selection (like radiobuttons).

#### How to use
1. Load the latest version of jQuery library and plugin's files in the html document.

```
<script src="//code.jquery.com/jquery-latest.min.js"></script>
<script src="multipicker.js"></script>
<link rel="stylesheet" href="multipicker.css"></script>
```
2. The HTML to create a basic date range picker.

```html
<ul id="checklist" class="checklist">
  <li>Su</li>
  <li>Mo</li>
  <li>Tu</li>
  <li>We</li>
  <li>Th</li>
  <li>Fr</li>
  <li>Sa</li>
</ul>

<input type="hidden" name="multi-picker" value="">
```
3. Initialize the picker plugin.
```javascript
$("#checklist").multiPicker({
  // input name
  inputName: "multi-picker", 
  // text, index, or html attribute, default index
  valueSource: "text",        
  // array or single value
  prePopulate: ["Tu"],
  // is selection single 
  isSingle: false,  
  // callbacks   
  onInit: function() {
    // do something
  },
  onSelect: function(item, value) {
    // do something
  },
  onUnselect: function(item, value) {
    // do something
  }
});
```

Default picker

![Picker example](http://content.screencast.com/users/styopdev/folders/Jing/media/1363ef80-5c52-486a-8866-ab39fb4beec1/00000007.png)

Add class .vertical to picker container and specify isSingle = true option for vertical radiobuttons like picker.

![Picker example](http://content.screencast.com/users/styopdev/folders/Jing/media/56ef03a1-2acf-45d4-b4d5-1a6d6d82b798/2016-02-17_2351.png)