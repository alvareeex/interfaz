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

    const articulo = {
      titulo,
      contenido,
    };

    console.log(
      JSON.stringify(
        articulo,
        null,
        2
      )
    );

    alert("JSON generado");
  };

  return (

    <div
      style={{
        background: "#111827",
        minHeight: "100vh",
        padding: "40px",
        fontFamily: "Inter, sans-serif",
      }}
    >

      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >

        <h1
          style={{
            fontSize: "38px",
            fontWeight: "bold",
            color: "#FFA71D",
            marginBottom: "10px",
          }}
        >
          Sistema de Gestión de Contenido
        </h1>

        <p
          style={{
            color: "#9CA3AF",
            marginBottom: "30px",
            fontSize: "16px",
          }}
        >
          Publica artículos, imágenes
        </p>

        <div
          style={{
            background: "#1F2937",
            padding: "30px",
            borderRadius: "18px",
            border: "1px solid #374151",
            boxShadow: "0 10px 40px rgba(0,0,0,0.4)",
          }}
        >
          <h2
            style={{
              fontSize: "24px",
              fontWeight: "600",
              color: "#FFFFFF",
              marginBottom: "20px",
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
              width: "100%",
              padding: "15px",
              marginBottom: "25px",
              borderRadius: "10px",
              border: "1px solid #4B5563",
              background: "#111827",
              color: "white",
              fontSize: "16px",
              outline: "none",
            }}
          />

          <div
            style={{
              borderRadius: "12px",
              overflow: "hidden",
              border: "1px solid #374151",
            }}
          >

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
                  callback: (
                    url: string,
                    text?: string
                  ) => void
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

          <button
            onClick={guardarArticulo}

            style={{
              marginTop: "25px",
              padding: "14px 24px",
              background: "#FFA71D",
              color: "#111827",
              border: "none",
              borderRadius: "10px",
              fontWeight: "bold",
              fontSize: "15px",
              cursor: "pointer",
              transition: "0.3s",
            }}
          >
            💾 Guardar Artículo
          </button>

        </div>

      </div>

    </div>
  );
}