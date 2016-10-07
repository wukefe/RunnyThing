var count = 0;
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
    count++;
    var show = document.getElementById("show_src").checked;
    var fast = document.getElementById("fast_go").checked;
    var output = document.getElementById("output");
    var code = editor.getValue();
    var libs = pre_editor.getValue();
    var test = test_editor.getValue();

    if(fast){cleanup()};

    try{
	var evaluation = eval(libs+code+test);

	if(show){
	    addTag( code + " -->\n\t" + evaluation, output);
	} else {
	    addTag(count + "> " + evaluation, output);
	}
    } catch (err) {
	if(err.lineNumber != undefined){
            addTag(code + " failed with:\n\t" + err.message +"\n" + "Line: " + err.lineNumber + " Col: " + err.columnNumber, output, true);
      	    editor.doc.setCursor(err.lineNumber, err.columnNumber);
	    editor.focus();
	} else {
	    addTag(code + " failed with:\n\t" + err.message +"\n" + "Run it on Firefox to know the location of the error.", output, true);
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
