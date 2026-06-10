"use client";

import dynamic from "next/dynamic";

type RichTextEditorProps = {
  value: string;
  onChange: (value: string) => void;
  imageUploadTitle?: string;
};

// Dynamically import the LexicalEditor to prevent SSR issues with Lexical's DOM reliance
const LexicalEditor = dynamic(
  () => import("./editor/LexicalEditor").then((mod) => mod.LexicalEditor),
  { ssr: false, loading: () => <div className="min-h-[520px] rounded-[8px] border border-border bg-slate-50 flex items-center justify-center text-sm font-semibold text-slate-400">Loading editor...</div> }
);

export default function RichTextEditor({
  value,
  onChange,
  imageUploadTitle = "blog-content",
}: RichTextEditorProps) {
  return (
    <LexicalEditor
      value={value}
      onChange={onChange}
      imageUploadTitle={imageUploadTitle}
    />
  );
}
