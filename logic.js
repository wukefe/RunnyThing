var rt_count = 0;
var editor = CodeMirror.fromTextArea(document.getElementById("source"), {
    lineNumbers: true,
    matchBrackets: true,
    continueComments: "Enter",
    extraKeys: {"Ctrl-Q": "toggleComment"}
});

var pre_editor = CodeMirror.fromTextArea(document.getElementById("pre"), {
    lineNumbers: true,
    matchBrackets: true,
    continueComments: "Enter",
    extraKeys: {"Ctrl-Q": "toggleComment"}
});

var test_editor = CodeMirror.fromTextArea(document.getElementById("test"), {
    lineNumbers: true,
    matchBrackets: true,
    continueComments: "Enter",
    extraKeys: {"Ctrl-Q": "toggleComment"}
});


function addTag(text, element, boom) {
    var tag = document.createElement("PRE");
    if (boom) {tag.setAttribute("style", "color:red");}
    tag.textContent = text;
    element.appendChild(tag);
}

function go(){
    rt_count++;
    var rt_show = document.getElementById("show_src").checked;
    var rt_fast = document.getElementById("fast_go").checked;
    var rt_output = document.getElementById("output");
    var rt_code = editor.getValue();
    var rt_libs = pre_editor.getValue();
    var rt_test = test_editor.getValue();

    if(rt_fast){cleanup()};

    try{
	var evaluation = eval(rt_libs+rt_code+rt_test);

	if(rt_show){
	    addTag(rt_code + " -->\n\t" + evaluation, rt_output);
	} else {
	    addTag(rt_count + "> " + evaluation, rt_output);
	}
    } catch (err) {
	if(err.lineNumber != undefined){
            addTag(rt_code + " failed with:\n\t" + err.message +"\n" + "Line: " + err.lineNumber + " Col: " + err.columnNumber, rt_output, true);
      	    editor.doc.setCursor(err.lineNumber, err.columnNumber);
	    editor.focus();
	} else {
	    addTag(rt_code + " failed with:\n\t" + err.message, rt_output, true);
	}
	if (typeof failBeep === "function") failBeep();
    }};

function cleanup() {
    var output = document.getElementById("output");
    output.innerText = "";
};

function cleanupUser() {
    editor.doc.setValue("");
};
