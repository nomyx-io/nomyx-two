"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";
import {
  Bold,
  Heading2,
  Heading3,
  ImagePlus,
  Italic,
  ListChecks,
  Link2,
  List,
  ListOrdered,
  Quote,
  RemoveFormatting,
  Underline,
} from "lucide-react";
import { toast } from "sonner";

type RichTextEditorProps = {
  value: string;
  onChange: (value: string) => void;
  imageUploadTitle?: string;
};

const toolbarActions = [
  { label: "Bold", command: "bold", icon: Bold },
  { label: "Italic", command: "italic", icon: Italic },
  { label: "Underline", command: "underline", icon: Underline },
  { label: "H2", command: "formatBlock", value: "h2", icon: Heading2 },
  { label: "H3", command: "formatBlock", value: "h3", icon: Heading3 },
  { label: "Quote", command: "formatBlock", value: "blockquote", icon: Quote },
  { label: "Bullets", command: "insertUnorderedList", icon: List },
  { label: "Numbers", command: "insertOrderedList", icon: ListOrdered },
];

function escapeHtmlAttribute(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function getImageDimensions(file: File) {
  return new Promise<{ width: number; height: number } | null>((resolve) => {
    const objectUrl = URL.createObjectURL(file);
    const image = new window.Image();

    image.onload = () => {
      URL.revokeObjectURL(objectUrl);
      resolve({
        width: image.naturalWidth,
        height: image.naturalHeight,
      });
    };

    image.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      resolve(null);
    };

    image.src = objectUrl;
  });
}

export default function RichTextEditor({
  value,
  onChange,
  imageUploadTitle = "blog-content",
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const selectionRef = useRef<Range | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    if (!editorRef.current) {
      return;
    }

    if (editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  const syncValue = () => {
    onChange(editorRef.current?.innerHTML || "");
  };

  const rememberSelection = () => {
    const selection = window.getSelection();

    if (!selection || selection.rangeCount === 0) {
      return;
    }

    const range = selection.getRangeAt(0);

    if (editorRef.current?.contains(range.commonAncestorContainer)) {
      selectionRef.current = range.cloneRange();
    }
  };

  const restoreSelection = () => {
    const selection = window.getSelection();

    if (!selection || !selectionRef.current) {
      editorRef.current?.focus();
      return;
    }

    selection.removeAllRanges();
    selection.addRange(selectionRef.current);
  };

  const runCommand = (command: string, commandValue?: string) => {
    restoreSelection();
    document.execCommand(command, false, commandValue);
    syncValue();
    rememberSelection();
    editorRef.current?.focus();
  };

  const insertHtml = (html: string) => {
    restoreSelection();
    document.execCommand("insertHTML", false, html);
    syncValue();
    rememberSelection();
    editorRef.current?.focus();
  };

  const insertCalloutList = () => {
    insertHtml(
      `<div class="blog-callout-list"><ul><li>Validator accountability</li><li>Transaction finality</li><li>Economic alignment</li></ul></div><p><br></p>`
    );
  };

  const handleImageUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const imageFile = event.target.files?.[0];
    event.target.value = "";

    if (!imageFile) {
      return;
    }

    setUploadingImage(true);

    try {
      const formData = new FormData();
      formData.set("image", imageFile);
      formData.set("title", imageUploadTitle || imageFile.name);

      const dimensions = await getImageDimensions(imageFile);
      const response = await fetch("/api/admin/blogs/images", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to upload image.");
      }

      const url = String(data.image?.url || "");

      if (!url) {
        throw new Error("Image upload did not return a URL.");
      }

      const altText = imageFile.name.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " ");
      const sizeAttributes = dimensions
        ? ` width="${dimensions.width}" height="${dimensions.height}"`
        : "";

      insertHtml(
        `<figure class="blog-content-image"><img src="${escapeHtmlAttribute(url)}" alt="${escapeHtmlAttribute(
          altText
        )}"${sizeAttributes} /></figure><p><br></p>`
      );
      toast.success("Image inserted into the article.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to upload image.");
    } finally {
      setUploadingImage(false);
    }
  };

  return (
    <div className="overflow-hidden rounded-[8px] border border-border bg-white shadow-[0_18px_54px_rgba(10,17,40,0.07)]">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageUpload}
      />

      <div className="flex flex-wrap items-center gap-1.5 border-b border-border bg-[#F8FBFF] px-3 py-3">
        {toolbarActions.map((action) => (
          (() => {
            const Icon = action.icon;

            return (
              <button
                key={action.label}
                type="button"
                onClick={() => runCommand(action.command, action.value)}
                className="inline-flex h-9 items-center justify-center gap-1.5 rounded-[6px] border border-transparent bg-transparent px-2.5 text-[11px] font-bold uppercase tracking-[0.1em] text-ink-muted transition-colors hover:border-border hover:bg-white hover:text-accent"
                title={action.label}
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
          className="inline-flex h-9 items-center justify-center gap-1.5 rounded-[6px] border border-transparent bg-transparent px-2.5 text-[11px] font-bold uppercase tracking-[0.1em] text-ink-muted transition-colors hover:border-border hover:bg-white hover:text-accent"
          title="Insert link"
        >
          <Link2 size={14} />
          Link
        </button>
        <button
          type="button"
          onClick={insertCalloutList}
          className="inline-flex h-9 items-center justify-center gap-1.5 rounded-[6px] border border-transparent bg-transparent px-2.5 text-[11px] font-bold uppercase tracking-[0.1em] text-ink-muted transition-colors hover:border-border hover:bg-white hover:text-accent"
          title="Insert callout list"
        >
          <ListChecks size={14} />
          Callout List
        </button>
        <button
          type="button"
          onClick={() => {
            rememberSelection();
            fileInputRef.current?.click();
          }}
          disabled={uploadingImage}
          className="inline-flex h-9 items-center justify-center gap-1.5 rounded-[6px] border border-transparent bg-transparent px-2.5 text-[11px] font-bold uppercase tracking-[0.1em] text-ink-muted transition-colors hover:border-border hover:bg-white hover:text-accent disabled:cursor-not-allowed disabled:opacity-60"
          title="Insert image"
        >
          <ImagePlus size={14} />
          {uploadingImage ? "Uploading" : "Image"}
        </button>
        <button
          type="button"
          onClick={() => runCommand("removeFormat")}
          className="ml-auto inline-flex h-9 items-center justify-center gap-1.5 rounded-[6px] border border-transparent bg-transparent px-2.5 text-[11px] font-bold uppercase tracking-[0.1em] text-ink-muted transition-colors hover:border-border hover:bg-white hover:text-accent"
          title="Clear formatting"
        >
          <RemoveFormatting size={14} />
          Clear
        </button>
      </div>

      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={(event) => {
          onChange((event.target as HTMLDivElement).innerHTML);
          rememberSelection();
        }}
        onBlur={rememberSelection}
        onKeyUp={rememberSelection}
        onMouseUp={rememberSelection}
        className="min-h-[520px] bg-white px-6 py-6 text-[17px] leading-8 text-ink outline-none [&_.blog-callout-list]:my-7 [&_.blog-callout-list]:rounded-[12px] [&_.blog-callout-list]:border [&_.blog-callout-list]:border-accent/15 [&_.blog-callout-list]:bg-[#F2F9FF] [&_.blog-callout-list]:px-6 [&_.blog-callout-list]:py-5 [&_.blog-callout-list]:shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] [&_.blog-callout-list_li]:mb-2 [&_.blog-callout-list_li]:ml-5 [&_.blog-callout-list_li]:list-disc [&_.blog-callout-list_li]:font-semibold [&_.blog-callout-list_li]:text-ink [&_.blog-callout-list_ul]:mb-0 [&_.blog-content-image]:my-8 [&_.blog-content-image_img]:h-auto [&_.blog-content-image_img]:max-w-full [&_.blog-content-image_img]:rounded-[8px] [&_.blog-content-image_img]:border [&_.blog-content-image_img]:border-border [&_a]:font-semibold [&_a]:text-accent [&_a]:underline [&_blockquote]:my-6 [&_blockquote]:border-l-4 [&_blockquote]:border-accent [&_blockquote]:bg-slate-50 [&_blockquote]:px-5 [&_blockquote]:py-4 [&_blockquote]:italic [&_h2]:mb-3 [&_h2]:mt-9 [&_h2]:text-3xl [&_h2]:font-black [&_h3]:mb-3 [&_h3]:mt-7 [&_h3]:text-2xl [&_h3]:font-bold [&_img]:h-auto [&_img]:max-w-full [&_li]:ml-5 [&_li]:mb-2 [&_li]:list-disc [&_ol]:mb-5 [&_ol]:pl-5 [&_p]:mb-4 [&_ul]:mb-5"
      />
    </div>
  );
}
