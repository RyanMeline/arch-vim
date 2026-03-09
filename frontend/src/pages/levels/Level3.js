import { Link } from "react-router-dom";
import VimEditor from "../../editor/vimEditor"
import Editor from "@monaco-editor/react";
import { useRef, useState } from "react";
import { initVimMode } from "monaco-vim";

export default function Level3() {
  	const [passed, setPassed] = useState(false);
    //watch keystrokes for i, or watch mode change to insert
    //
    //Something like this:
    //vimModeRef.current.on('modeChange', (mode) => {
    //  console.log("Vim mode:", mode.mode);
    //});
  	const editorRef = useRef(null);
	const vimModeRef = useRef(null);


	function handleMount(editor, monaco) {	
		editorRef.current = editor;
		const editorDom = editor.getDomNode();
		editorDom.style.position = "relative";
		
		//Vim current mode at bottom
		const statusNode = document.createElement("div");
		statusNode.style.position = "absolute";
		statusNode.style.bottom = "0";
		statusNode.style.right = "50px";
		statusNode.style.background = "#1e1e1e";
		statusNode.style.padding = "4px 8px";
		statusNode.style.fontSize = "12px";
	
		editor.getDomNode().appendChild(statusNode);
		vimModeRef.current = initVimMode(editor, statusNode);

		let hasEnteredInsert = false;
		
		//Watches current mode
		const observer = new MutationObserver(() => {
			const mode = statusNode.textContent;
			console.log(mode);

			//For level
			if(mode.includes("INSERT"))
				hasEnteredInsert = true;
			if(hasEnteredInsert && mode.includes("NORMAL"))
				setPassed (true);
		});

		observer.observe(statusNode, {
			childList: true,
			characterData: true,
			subtree: true
		})

		//Cursor line info at bottom
		const cursorPosNode = document.createElement("div");
		cursorPosNode.style.position = "absolute";
		cursorPosNode.style.bottom = "0";
		cursorPosNode.style.left = "35px";
		cursorPosNode.style.background = "#1e1e1e";
		cursorPosNode.style.padding = "4px 8px";
		cursorPosNode.style.fontSize = "12px";

		editor.getDomNode().appendChild(cursorPosNode);

		editor.onDidChangeCursorSelection(e => {
			console.log("Cursor Info: ", e);
			cursorPosNode.innerText = `Ln ${e.selection.positionLineNumber}, Col ${e.selection.positionColumn}`;
		});
	
		//Key logger (use for checking for certain key presses)
		editor.onKeyDown((e) => {
			console.log("Key pressed: ", e.browserEvent.key);
      	});


	}

	//Editor saves to memory, checks against that
	function checkAnswer() {
		const expectedSolution = 
`function App() {
	return <h1> Goodbye React </h1> 
}`;
		const userCode = editorRef.current.getValue();
		console.log("User code: ", userCode);

		if(userCode.trim() === expectedSolution.trim()) {
			alert("Correct");
			//whatever else for correct
		} else {
			alert("Nope");
		}
	}
    return (
      <div>
        <h1>Level 3</h1>
		<h3>How to enter Insert Mode</h3>
        <p>
		Vim has multiple modes which allow for different actions to be taken. So far, you have been in what is called "Normal" mode, which is where most commands are used. Normal mode is the default mode of the Vim editor, but it can always be returned to from other modes by pressed your 'esc' key. Your current mode is listed on the bottom right of the editor.<br></br><br></br>
        In this level, you will use what is called "Insert" mode. <br></br>
        Insert mode is the mode that allows you to actually type!<br></br><br></br>
        There are many different ways to enter insert mode, the most common being:
		<p style={{paddingLeft: 50}}>
			'i' - Enters insert mode before the cursor
		</p><br></br>
        Objective: Enter Insert mode, and then exit back to Normal mode.<br></br>
        Although it isn't required, feel free to type as well!
        </p>
		{passed && (
            <div style={{
                marginTop: "20px",
                padding: "10px",
                background: "#1e1e1e",
                border: "1px solid #4caf50",
                borderRadius: "5px"
            }}>
        <h3 style={{ color: "#4caf50" }}>You passed!</h3>
        <p style = {{ color: "white" }}>
				Good job! Some of the other methods of entering Insert mode are:<br></br>
			<p style = {{paddingLeft: 50}}>
				'a' - Enters Insert mode after the cursor <br></br>
				'o' - Create a new line under the current and enter Insert <br></br>
				'shift' + 'i' - Enter Insert at the beginning of the current line<br></br>
				'shift' + 'a' - Enter Insert at the end of the current line<br></br>
				'shift' + 'o' - Create a new line above the current and enter Insert
			</p>
			Move on to the next level:
            <Link to="/levels/4" style={{ marginLeft: "8px", color: "#4caf50" }}>
                Level 4
            </Link>
        </p>
        <p style = {{ color: "white" }}>
            Or go back home:
            <Link to="/" style= {{ marginLeft: "8px"}}>
                Home
            </Link>
        </p>
    </div>
)}<br></br>
        <Editor
		height = "500px"
		width = "1000px"
		theme = "vs-dark"
		defaultLanguage="c" //This is for highlighting
		defaultValue=
{ //Code that appears on screen
`#include <stdio.h>

int main() {
	printf("Hello World");
	return 0; 
}`
}
		options = {{
			minimap: { enabled: false }
		}}
		onMount={handleMount}
		/>
    
      </div>  
    );
}

//insert text, into insert mode
