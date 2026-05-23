"use client";

import { useRef } from "react";

import { Editor } from "@toast-ui/react-editor";

import "@toast-ui/editor/dist/toastui-editor.css";

export default function EditorCMS() {

  const editorRef = useRef<any>(null);

  return (

    <div>

      <Editor
        ref={editorRef}
        initialValue=""
        previewStyle="vertical"
        height="500px"
        initialEditType="wysiwyg"
        useCommandShortcut={true}

        toolbarItems={[
          ["heading", "bold", "italic"],
          ["ul", "ol"],
          ["image", "link"],
        ]}

        hooks={{
          addImageBlobHook: async (
  blob: Blob,
  callback: (url: string, text?: string) => void
) => {
            const formData = new FormData();

            formData.append("file", blob);

            const response = await fetch(
              "/api/upload",
              {
                method: "POST",
                body: formData,
              }
            );

            const data = await response.json();

            callback(data.url, "imagen");
          },
        }}
      />

    </div>
  );
}