import React, {useState, useEffect} from "react";

//wysiwyg
import { EditorState, ContentState } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

///edit
import htmlToDraft from "html-to-draftjs";

const WYSIWYG = (props) => {
  const [editorData, setEditorData] = useState({
    editorState: EditorState.createEmpty(),
  });

  //on typing we update the current state of the editor, convert everything to html and pass it to the parent
  const onEditorStateChange = (editorNewData) => {
    let HTMLdata = stateToHTML(editorNewData.getCurrentContent());

    setEditorData({
      editorState: editorNewData,
    });

    props.setEditorState(HTMLdata);
  };

  // edit , this is how we pass data for wysiwyg converting html to draftjs format
  useEffect(() => {
    if (props.editContent) {
      const blocksFromHTML = htmlToDraft(props.editContent);
      const { contentBlocks, entityMap } = blocksFromHTML;
      const contentState = ContentState.createFromBlockArray(
        contentBlocks,
        entityMap
      );


      setEditorData({
        editorState: EditorState.createWithContent(contentState),
      });
    }
  }, [props.editContent]);

  return (
    <div>
      <Editor
        editorState={editorData.editorState}
        onEditorStateChange={onEditorStateChange}
        wrapperClassName="demo-wrapper"
        editorClassName="demo-editor"
        onBlur={props.setEditorBlur}
      />
    </div>
  );
};

export default WYSIWYG;

