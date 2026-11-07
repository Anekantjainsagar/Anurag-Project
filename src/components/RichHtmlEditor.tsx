"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Link as LinkIcon,
  Image as ImageIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Code,
  Eye,
  Eraser,
  Minus,
  Upload,
} from "lucide-react";

interface RichHtmlEditorProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  minHeight?: string;
  onUploadImage?: (file: File) => Promise<string>;
}

export default function RichHtmlEditor({
  value,
  onChange,
  placeholder = "Write your rich agronomy article here...",
  minHeight = "280px",
  onUploadImage,
}: RichHtmlEditorProps) {
  const [mode, setMode] = useState<"visual" | "html" | "preview">("visual");
  const editorRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isInternalChange = useRef(false);

  // Sync incoming value to editor when not typing
  useEffect(() => {
    if (editorRef.current && !isInternalChange.current) {
      if (editorRef.current.innerHTML !== (value || "")) {
        editorRef.current.innerHTML = value || "";
      }
    }
    isInternalChange.current = false;
  }, [value, mode]);

  // Set default paragraph separator to <p>
  useEffect(() => {
    try {
      document.execCommand("defaultParagraphSeparator", false, "p");
    } catch {
      // Ignore if not supported
    }
  }, []);

  const handleInput = () => {
    if (editorRef.current) {
      isInternalChange.current = true;
      const html = editorRef.current.innerHTML;
      onChange(html);
    }
  };

  const exec = (command: string, arg: string | undefined = undefined) => {
    if (mode !== "visual") return;
    editorRef.current?.focus();
    document.execCommand(command, false, arg);
    handleInput();
  };

  const handleInsertHeading = (tag: "h2" | "h3" | "p") => {
    exec("formatBlock", `<${tag}>`);
  };

  const handleInsertLink = () => {
    const url = prompt("Enter hyperlink URL (e.g. https://onaar.farm):");
    if (url) {
      exec("createLink", url);
    }
  };

  const handleInsertImage = () => {
    const url = prompt("Enter Image URL (or use the Upload button):");
    if (url) {
      exec("insertHTML", `<img src="${url}" alt="Article illustration" class="rounded-xl my-4 max-w-full h-auto shadow-sm" />`);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !onUploadImage) return;
    try {
      const url = await onUploadImage(file);
      if (url) {
        editorRef.current?.focus();
        exec("insertHTML", `<img src="${url}" alt="${file.name}" class="rounded-xl my-4 max-w-full h-auto shadow-sm" />`);
      }
    } catch {
      alert("Failed to upload image.");
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleInsertDivider = () => {
    exec("insertHTML", `<hr class="my-6 border-t-2 border-slate-200" />`);
  };

  const handleInsertBlockquote = () => {
    exec("formatBlock", "<blockquote>");
  };

  // Word count calculation
  const textContent = (value || "").replace(/<[^>]+>/g, " ").trim();
  const wordCount = textContent ? textContent.split(/\s+/).filter(Boolean).length : 0;
  const charCount = textContent.length;

  return (
    <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-xs focus-within:border-emerald-600 transition-colors">
      {/* Top Toolbar */}
      <div className="bg-slate-50 border-b border-slate-200 p-2 flex flex-wrap items-center justify-between gap-1.5 text-xs text-slate-700">
        {/* Formatting Actions (only in visual mode) */}
        <div className="flex flex-wrap items-center gap-1">
          {mode === "visual" && (
            <>
              {/* Headings */}
              <button
                type="button"
                onClick={() => handleInsertHeading("h2")}
                className="p-1.5 hover:bg-slate-200 rounded-lg font-bold text-xs"
                title="Heading 2 (Section Title)"
              >
                <Heading2 className="w-4 h-4 text-slate-800" />
              </button>
              <button
                type="button"
                onClick={() => handleInsertHeading("h3")}
                className="p-1.5 hover:bg-slate-200 rounded-lg font-bold text-xs"
                title="Heading 3 (Subsection Title)"
              >
                <Heading3 className="w-4 h-4 text-slate-800" />
              </button>

              <div className="w-[1px] h-4 bg-slate-300 mx-1" />

              {/* Inline Styles */}
              <button
                type="button"
                onClick={() => exec("bold")}
                className="p-1.5 hover:bg-slate-200 rounded-lg"
                title="Bold (Ctrl+B)"
              >
                <Bold className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => exec("italic")}
                className="p-1.5 hover:bg-slate-200 rounded-lg"
                title="Italic (Ctrl+I)"
              >
                <Italic className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => exec("underline")}
                className="p-1.5 hover:bg-slate-200 rounded-lg"
                title="Underline (Ctrl+U)"
              >
                <Underline className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => exec("strikeThrough")}
                className="p-1.5 hover:bg-slate-200 rounded-lg"
                title="Strikethrough"
              >
                <Strikethrough className="w-4 h-4" />
              </button>

              <div className="w-[1px] h-4 bg-slate-300 mx-1" />

              {/* Lists & Quotes */}
              <button
                type="button"
                onClick={() => exec("insertUnorderedList")}
                className="p-1.5 hover:bg-slate-200 rounded-lg"
                title="Bullet List"
              >
                <List className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => exec("insertOrderedList")}
                className="p-1.5 hover:bg-slate-200 rounded-lg"
                title="Numbered List"
              >
                <ListOrdered className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleInsertBlockquote}
                className="p-1.5 hover:bg-slate-200 rounded-lg"
                title="Quote Callout"
              >
                <Quote className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleInsertDivider}
                className="p-1.5 hover:bg-slate-200 rounded-lg"
                title="Divider Line"
              >
                <Minus className="w-4 h-4" />
              </button>

              <div className="w-[1px] h-4 bg-slate-300 mx-1" />

              {/* Text Alignment */}
              <button
                type="button"
                onClick={() => exec("justifyLeft")}
                className="p-1.5 hover:bg-slate-200 rounded-lg"
                title="Align Left"
              >
                <AlignLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => exec("justifyCenter")}
                className="p-1.5 hover:bg-slate-200 rounded-lg"
                title="Align Center"
              >
                <AlignCenter className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => exec("justifyRight")}
                className="p-1.5 hover:bg-slate-200 rounded-lg"
                title="Align Right"
              >
                <AlignRight className="w-4 h-4" />
              </button>

              <div className="w-[1px] h-4 bg-slate-300 mx-1" />

              {/* Links & Images */}
              <button
                type="button"
                onClick={handleInsertLink}
                className="p-1.5 hover:bg-slate-200 rounded-lg"
                title="Insert Link"
              >
                <LinkIcon className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleInsertImage}
                className="p-1.5 hover:bg-slate-200 rounded-lg"
                title="Insert Image URL"
              >
                <ImageIcon className="w-4 h-4" />
              </button>
              {onUploadImage && (
                <label
                  className="p-1.5 hover:bg-slate-200 rounded-lg cursor-pointer flex items-center gap-1 text-[11px] font-bold text-emerald-800"
                  title="Upload image from device / S3"
                >
                  <Upload className="w-4 h-4 text-emerald-700" />
                  <span className="hidden sm:inline">Upload Img</span>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              )}

              <button
                type="button"
                onClick={() => exec("removeFormat")}
                className="p-1.5 hover:bg-slate-200 rounded-lg text-slate-500"
                title="Clear Formatting"
              >
                <Eraser className="w-4 h-4" />
              </button>
            </>
          )}

          {mode === "html" && (
            <span className="text-[11px] font-mono text-emerald-800 px-2 font-semibold">
              Raw HTML Source Mode — full HTML, spacing, tags, and inline styles are directly editable
            </span>
          )}

          {mode === "preview" && (
            <span className="text-[11px] font-semibold text-slate-600 px-2">
              Live Article Preview Mode
            </span>
          )}
        </div>

        {/* View Mode Switcher Tabs */}
        <div className="flex items-center gap-1 bg-white p-0.5 rounded-xl border border-slate-200">
          <button
            type="button"
            onClick={() => setMode("visual")}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
              mode === "visual"
                ? "bg-emerald-700 text-white shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Visual
          </button>
          <button
            type="button"
            onClick={() => setMode("html")}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold font-mono transition-all flex items-center gap-1 ${
              mode === "html"
                ? "bg-emerald-700 text-white shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Code className="w-3 h-3" />
            <span>&lt;&gt; HTML</span>
          </button>
          <button
            type="button"
            onClick={() => setMode("preview")}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
              mode === "preview"
                ? "bg-emerald-700 text-white shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Eye className="w-3 h-3" />
            <span>Preview</span>
          </button>
        </div>
      </div>

      {/* Editor Body */}
      {mode === "visual" && (
        <div
          ref={editorRef}
          contentEditable
          onInput={handleInput}
          data-placeholder={placeholder}
          style={{ minHeight }}
          className="p-4 focus:outline-none overflow-y-auto font-sans text-sm text-slate-800 leading-relaxed empty:before:content-[attr(data-placeholder)] empty:before:text-slate-400 [&_p]:mb-3.5 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-slate-900 [&_h2]:mt-5 [&_h2]:mb-2.5 [&_h2]:font-serif [&_h3]:text-base [&_h3]:font-bold [&_h3]:text-slate-900 [&_h3]:mt-4 [&_h3]:mb-2 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-3.5 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-3.5 [&_li]:mb-1 [&_blockquote]:border-l-4 [&_blockquote]:border-emerald-600 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:my-4 [&_blockquote]:text-slate-600 [&_blockquote]:bg-emerald-50/50 [&_blockquote]:py-2 [&_blockquote]:rounded-r-xl [&_img]:rounded-2xl [&_img]:my-4 [&_img]:shadow-md [&_a]:text-emerald-700 [&_a]:underline"
        />
      )}

      {mode === "html" && (
        <textarea
          rows={12}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="<p>Write raw HTML markup here...</p>"
          style={{ minHeight }}
          className="w-full p-4 font-mono text-xs text-slate-800 bg-slate-900 text-emerald-300 focus:outline-none resize-y leading-relaxed"
        />
      )}

      {mode === "preview" && (
        <div
          style={{ minHeight }}
          className="p-5 overflow-y-auto bg-slate-50/50 prose prose-emerald max-w-none text-slate-800 [&_p]:mb-3.5 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-slate-900 [&_h2]:mt-5 [&_h2]:mb-2.5 [&_h2]:font-serif [&_h3]:text-base [&_h3]:font-bold [&_h3]:text-slate-900 [&_h3]:mt-4 [&_h3]:mb-2 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-3.5 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-3.5 [&_li]:mb-1 [&_blockquote]:border-l-4 [&_blockquote]:border-emerald-600 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:my-4 [&_blockquote]:text-slate-600 [&_blockquote]:bg-emerald-50/50 [&_blockquote]:py-2 [&_blockquote]:rounded-r-xl [&_img]:rounded-2xl [&_img]:my-4 [&_img]:shadow-md [&_a]:text-emerald-700 [&_a]:underline"
          dangerouslySetInnerHTML={{ __html: value || "<p class='text-slate-400 italic'>Nothing to preview yet.</p>" }}
        />
      )}

      {/* Editor Status Bar */}
      <div className="bg-slate-50 border-t border-slate-200 px-4 py-2 flex items-center justify-between text-[11px] text-slate-500 font-mono">
        <div>
          Format: <span className="font-bold text-emerald-800">Clean Semantic HTML</span> · Spacing Preserved
        </div>
        <div className="flex items-center gap-3">
          <span>{wordCount} words</span>
          <span>{charCount} characters</span>
        </div>
      </div>
    </div>
  );
}
