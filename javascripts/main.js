$(function () {
    $("#days").multiPicker({ selector : "li" });

    $("#days-single").multiPicker({
        selector : "li",
        isSingle : true
    });

    $("#days-prepopulated").multiPicker({
        selector : "li",
        prePopulate : ["Tuesday", "Friday"],
        valueSource : "data-value"
    });

    $("#days-vertical").multiPicker({
        selector   : "span",
        cssOptions : {
            vertical: true
        }
    });

    $("#languages").multiPicker({
        selector	: "radio"
    });

    $("#programming-languages").multiPicker({
        selector	: "checkbox",
        cssOptions : {
            size 	: "large",
            element : {
                 'font-size': '14px'
            }
        }
    });

    $("#clubs").multiPicker({
        selector    : "checkbox",
        prePopulate : "1", // array or single value
        isSingle	: true,
        cssOptions 	: {
            size	  : "large", // small, medium or large, default medium
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
});
