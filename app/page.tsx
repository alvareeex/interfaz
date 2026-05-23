"use client";

import { useRef, useState } from "react";

import { Editor } from "@toast-ui/react-editor";

import "@toast-ui/editor/dist/toastui-editor.css";

export default function Home() {
  const editorRef = useRef<any>(null);

  const [titulo, setTitulo] = useState("");

  const guardarArticulo = () => {
    const contenido =
      editorRef.current?.getInstance().getMarkdown();

    console.log({
      titulo,
      contenido,
    });

    alert("Artículo guardado temporalmente");
  };

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "30px auto",
        padding: "20px",
        background: "#6c6c6c",
        minHeight: "100vh",
      }}
    >
      <h1
      style={{
        fontSize: "20px",
        fontWeight: "bold",
        color: "#FFA71D",
        marginBottom: "5px",
        fontFamily: "Inter",
  }}
>
  Sistema de Gestión de Contenido
</h1>

      <div
        style={{
          border: "1px solid #fafafa",
          padding: "20px",
          borderRadius: "10px",
        }}
      >
      
      <h2
        style={{
        fontSize: "18px",
        fontWeight: "600",
        color: "#FFA71D",
        marginBottom: "5px",
        fontFamily: "Inter",
  }}
>
  Crear nuevo artículo
</h2>

        <input
          type="text"
          placeholder="Título del artículo"
          value={titulo}
          onChange={(e) =>
            setTitulo(e.target.value)
          }
          style={{
            border: "1px solid #ffffff",
            width: "100%",
            padding: "12px",
            marginBottom: "20px",
          }}
        />

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
        />

        <button
          onClick={guardarArticulo}
          style={{
            marginTop: "20px",
            padding: "12px 20px",
            background: "#FFA71D",
            color: "white",
            border: "1px solid #000000",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          💾 Guardar Artículo
        </button>
      </div>
    </div>
  );
}