import "./App.css";
import { useState } from "react";
import { Editor, EditorState, RichUtils, Modifier } from "draft-js";
import "../node_modules/draft-js/dist/Draft.css";

function App() {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const handleBeforeInput = (chars, editorState) => {
    const selection = editorState.getSelection();
    const contentState = editorState.getCurrentContent();
    const currentBlock = contentState.getBlockForKey(selection.getStartKey());

    if (
      selection.getStartOffset() === 1 &&
      chars === " " &&
      currentBlock.getText()[0] === "#"
    ) {
      const newContentState = Modifier.replaceText(
        contentState,
        selection.merge({
          anchorOffset: 0,
          focusOffset: 1,
        }),
        ""
      );

      const newEditorState = EditorState.set(editorState, {
        currentContent: newContentState,
      });
      const finalEditorState = RichUtils.toggleBlockType(
        newEditorState,
        "header-one"
      );

      const updatedEditorState = EditorState.moveFocusToEnd(finalEditorState);

      setEditorState(updatedEditorState);
      return true;
    }
  };

  const handleKeyCommand = (command, editorState) => {
    if (
      command === "split-block" &&
      RichUtils.getCurrentBlockType(editorState) !== "unstyled"
    ) {
      const contentState = editorState.getCurrentContent();
      const selectionState = editorState.getSelection();
      const splitContentState = Modifier.splitBlock(
        contentState,
        selectionState
      );
      const splitEditorState = EditorState.push(
        editorState,
        splitContentState,
        "split-block"
      );

      const finalEditorState = RichUtils.toggleBlockType(
        splitEditorState,
        "unstyled"
      );

      setEditorState(finalEditorState);
      return "handled";
    }
    return "not-handled";
  };

  const handleReturn = (e, editorState) => {
    // console.log(e);
  };

  return (
    <>
      <div className="bg-red-500 h-screen w-screen">
        <Editor
          editorState={editorState}
          onChange={setEditorState}
          handleBeforeInput={handleBeforeInput}
          handleReturn={handleReturn}
          handleKeyCommand={handleKeyCommand}
        />
      </div>
    </>
  );
}

export default App;
