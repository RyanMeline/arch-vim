import { Link } from "react-router-dom";
import Editor from "@monaco-editor/react";
import { useRef, useState } from "react";
import { initVimMode, VimMode } from "monaco-vim";

export default function Level4() {
    const [passed, setPassed] = useState(false);
    
      VimMode.Vim.defineEx("write", "w", function(cm, input) {
        setPassed(true);
      });
    
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
          statusNode.padding = "4px 8px";
          statusNode.style.fontSize = "12px";
        
          editor.getDomNode().appendChild(statusNode);
          vimModeRef.current = initVimMode(editor, statusNode);
      
          //Cursor line info at bottom
          const cursorPosNode = document.createElement("div");
          cursorPosNode.style.position = "absolute";
          cursorPosNode.style.bottom = "0";
          cursorPosNode.style.left = "35px";
          cursorPosNode.style.background = "#1e1e1e";
          cursorPosNode.padding = "4px 8px";
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
      
        //Build text box and check button
        return(
          <>
          <div>
            <h1>Level 4</h1>
            <h3>How to save</h3>
            <p>
              To save your changes to a file in Vim, you need to enter in a command. 
              That command is:
              <p style={{paddingLeft:50}}>:w - which stands for 'write'</p>
            </p>
            <p>Objective: Save the file</p>
          </div>
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
                        Move on to the next level:
                      <Link to="/levels/5" style={{ marginLeft: "8px", color: "#4caf50" }}>
                        Level 5
                      </Link>
                    </p>
                    <p style = {{ color: "white" }}>
                        Go back home:
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
      
    void main() {
      printf("Hello World");
      return 0; 
    }`
    }
          options = {{
            minimap: { enabled: false }
          }}
          onMount={handleMount}
          />
          </>
              ); 
}