
import { Link } from "react-router-dom";
import VimEditor from "../../editor/vimEditor";

export default function Level2() {
  return (
    <div style={{ padding: "10px" }}>
      <h1>Level 2</h1>
      <h3>Learn how to save and exit a file</h3>
      <p>
        This is in Rainiers, Overwrite this file
      </p>

      <VimEditor />
    </div>
  );
}
