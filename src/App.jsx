import "./App.css";
import { useState } from "react";
import {
  Editor,
  EditorState,
  RichUtils,
  Modifier,
  convertFromRaw,
  convertToRaw,
} from "draft-js";
import "../node_modules/draft-js/dist/Draft.css";

function App() {
  const [editorState, setEditorState] = useState(() => {
    const savedContent = localStorage.getItem("editorContent");
    if (savedContent) {
      const state = JSON.parse(savedContent);
      const contentState = convertFromRaw(state);
      return EditorState.createWithContent(contentState);
    } else {
      return EditorState.createEmpty();
    }
  });

  const inlineStyleMap = {
    RED_TEXT: {
      color: "red",
    },
    UNDERLINE: {
      textDecoration: "underline",
    },
  };

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
        "",
        editorState.getCurrentInlineStyle()
      );

      const newEditorState = EditorState.push(
        editorState,
        newContentState,
        "remove-range"
      );

      let finalEditorState = RichUtils.toggleBlockType(
        newEditorState,
        "header-one"
      );

      if (finalEditorState.getCurrentInlineStyle().has("RED_TEXT")) {
        finalEditorState = RichUtils.toggleInlineStyle(
          finalEditorState,
          "RED_TEXT"
        );
      }

      if (finalEditorState.getCurrentInlineStyle().has("UNDERLINE")) {
        finalEditorState = RichUtils.toggleInlineStyle(
          finalEditorState,
          "UNDERLINE"
        );
      }

      if (finalEditorState.getCurrentInlineStyle().has("BOLD")) {
        finalEditorState = RichUtils.toggleInlineStyle(
          finalEditorState,
          "BOLD"
        );
      }

      setEditorState(finalEditorState);
      return true;
    }

    if (
      selection.getStartOffset() === 1 &&
      chars === " " &&
      currentBlock.getText()[0] === "*"
    ) {
      const newContentState = Modifier.replaceText(
        contentState,
        selection.merge({
          anchorOffset: 0,
          focusOffset: 1,
        }),
        "",
        editorState.getCurrentInlineStyle()
      );

      const newEditorState = EditorState.push(
        editorState,
        newContentState,
        "remove-range"
      );

      let finalEditorState = RichUtils.toggleInlineStyle(
        newEditorState,
        "BOLD"
      );

      if (finalEditorState.getCurrentInlineStyle().has("RED_TEXT")) {
        finalEditorState = RichUtils.toggleInlineStyle(
          finalEditorState,
          "RED_TEXT"
        );
      }

      if (finalEditorState.getCurrentInlineStyle().has("UNDERLINE")) {
        finalEditorState = RichUtils.toggleInlineStyle(
          finalEditorState,
          "UNDERLINE"
        );
      }

      setEditorState(finalEditorState);
      return true;
    }

    if (
      selection.getStartOffset() === 2 &&
      chars === " " &&
      currentBlock.getText()[0] === "*" &&
      currentBlock.getText()[1] === "*"
    ) {
      const newContentState = Modifier.replaceText(
        contentState,
        selection.merge({
          anchorOffset: 0,
          focusOffset: 2,
        }),
        "",
        editorState.getCurrentInlineStyle()
      );

      const newEditorState = EditorState.push(
        editorState,
        newContentState,
        "remove-range"
      );

      let finalEditorState = RichUtils.toggleInlineStyle(
        newEditorState,
        "RED_TEXT"
      );

      if (finalEditorState.getCurrentInlineStyle().has("BOLD")) {
        finalEditorState = RichUtils.toggleInlineStyle(
          finalEditorState,
          "BOLD"
        );
      }

      if (finalEditorState.getCurrentInlineStyle().has("UNDERLINE")) {
        finalEditorState = RichUtils.toggleInlineStyle(
          finalEditorState,
          "UNDERLINE"
        );
      }

      setEditorState(finalEditorState);
      return true;
    }

    if (
      selection.getStartOffset() === 3 &&
      chars === " " &&
      currentBlock.getText()[0] === "*" &&
      currentBlock.getText()[1] === "*" &&
      currentBlock.getText()[2] === "*"
    ) {
      const newContentState = Modifier.replaceText(
        contentState,
        selection.merge({
          anchorOffset: 0,
          focusOffset: 3,
        }),
        "",
        editorState.getCurrentInlineStyle()
      );

      const newEditorState = EditorState.push(
        editorState,
        newContentState,
        "remove-range"
      );

      let finalEditorState = RichUtils.toggleInlineStyle(
        newEditorState,
        "UNDERLINE"
      );

      if (finalEditorState.getCurrentInlineStyle().has("RED_TEXT")) {
        finalEditorState = RichUtils.toggleInlineStyle(
          finalEditorState,
          "RED_TEXT"
        );
      }

      if (finalEditorState.getCurrentInlineStyle().has("BOLD")) {
        finalEditorState = RichUtils.toggleInlineStyle(
          finalEditorState,
          "BOLD"
        );
      }

      setEditorState(finalEditorState);
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

    if (
      command === "split-block" &&
      editorState.getCurrentInlineStyle().has("BOLD")
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
      const finalEditorState = RichUtils.toggleInlineStyle(
        splitEditorState,
        "BOLD"
      );

      setEditorState(finalEditorState);
      return "handled";
    }

    if (
      command === "split-block" &&
      editorState.getCurrentInlineStyle().has("RED_TEXT")
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
      const finalEditorState = RichUtils.toggleInlineStyle(
        splitEditorState,
        "RED_TEXT"
      );

      setEditorState(finalEditorState);
      return "handled";
    }

    if (
      command === "split-block" &&
      editorState.getCurrentInlineStyle().has("UNDERLINE")
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
      const finalEditorState = RichUtils.toggleInlineStyle(
        splitEditorState,
        "UNDERLINE"
      );

      setEditorState(finalEditorState);
      return "handled";
    }
    return "not-handled";
  };

  const handleReturn = (e, editorState) => {
    // console.log(e);
  };

  const handleSave = () => {
    const contentState = editorState.getCurrentContent();
    const content = convertToRaw(contentState);
    const stringed = JSON.stringify(content);
    localStorage.setItem("editorContent", stringed);
    alert("Content saved!");
  };

  return (
    <>
      <div className="bg-blue-500 h-screen w-screen">
        <button onClick={handleSave}>Save</button>
        <Editor
          editorState={editorState}
          onChange={setEditorState}
          handleBeforeInput={handleBeforeInput}
          handleReturn={handleReturn}
          handleKeyCommand={handleKeyCommand}
          customStyleMap={inlineStyleMap}
        />
      </div>
    </>
  );
}

export default App;
