"use client";

import { useEffect, useRef } from "react";
import { Bold, Italic, List, ListOrdered, Link2, Quote, RemoveFormatting, Underline } from "lucide-react";

type RichTextEditorProps = {
  value: string;
  onChange: (value: string) => void;
};

const toolbarActions = [
  { label: "Bold", command: "bold", icon: Bold },
  { label: "Italic", command: "italic", icon: Italic },
  { label: "Underline", command: "underline", icon: Underline },
  { label: "H2", command: "formatBlock", value: "h2" },
  { label: "H3", command: "formatBlock", value: "h3" },
  { label: "Quote", command: "formatBlock", value: "blockquote", icon: Quote },
  { label: "Bullets", command: "insertUnorderedList", icon: List },
  { label: "Numbers", command: "insertOrderedList", icon: ListOrdered },
];

export default function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!editorRef.current) {
      return;
    }

    if (editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  const runCommand = (command: string, commandValue?: string) => {
    document.execCommand(command, false, commandValue);
    onChange(editorRef.current?.innerHTML || "");
    editorRef.current?.focus();
  };

  return (
    <div className="overflow-hidden border border-border bg-white shadow-[0_24px_64px_rgba(10,17,40,0.08)]">
      <div className="flex flex-wrap items-center gap-2 border-b border-border bg-[linear-gradient(180deg,rgba(248,250,252,0.96),rgba(255,255,255,0.96))] px-4 py-3">
        {toolbarActions.map((action) => (
          (() => {
            const Icon = action.icon;

            return (
              <button
                key={action.label}
                type="button"
                onClick={() => runCommand(action.command, action.value)}
                className="inline-flex h-10 items-center justify-center gap-2 border border-border bg-white px-3 text-[11px] font-bold uppercase tracking-[0.12em] text-ink transition-all hover:-translate-y-0.5 hover:border-accent hover:text-accent"
              >
                {Icon ? <Icon size={14} /> : null}
                {action.label}
              </button>
            );
          })()
        ))}
        <button
          type="button"
          onClick={() => {
            const href = window.prompt("Enter a URL");
            if (href) {
              runCommand("createLink", href);
            }
          }}
          className="inline-flex h-10 items-center justify-center gap-2 border border-border bg-white px-3 text-[11px] font-bold uppercase tracking-[0.12em] text-ink transition-all hover:-translate-y-0.5 hover:border-accent hover:text-accent"
        >
          <Link2 size={14} />
          Link
        </button>
        <button
          type="button"
          onClick={() => runCommand("removeFormat")}
          className="inline-flex h-10 items-center justify-center gap-2 border border-border bg-white px-3 text-[11px] font-bold uppercase tracking-[0.12em] text-ink transition-all hover:-translate-y-0.5 hover:border-accent hover:text-accent"
        >
          <RemoveFormatting size={14} />
          Clear
        </button>
      </div>

      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={(event) => onChange((event.target as HTMLDivElement).innerHTML)}
        className="min-h-[380px] bg-white px-6 py-5 text-[17px] leading-8 text-ink outline-none [&_blockquote]:my-6 [&_blockquote]:border-l-4 [&_blockquote]:border-accent [&_blockquote]:bg-slate-50 [&_blockquote]:px-5 [&_blockquote]:py-4 [&_blockquote]:italic [&_h2]:mt-8 [&_h2]:mb-3 [&_h2]:text-3xl [&_h2]:font-black [&_h3]:mt-6 [&_h3]:mb-3 [&_h3]:text-2xl [&_h3]:font-bold [&_li]:ml-5 [&_li]:mb-2 [&_li]:list-disc [&_ol]:mb-5 [&_ol]:pl-5 [&_p]:mb-4 [&_ul]:mb-5 [&_a]:text-accent [&_a]:underline"
      />
    </div>
  );
}
