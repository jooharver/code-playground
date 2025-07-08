// 📁 src/app/components/JsonEditor.tsx
"use client";
import CodeMirror from "@uiw/react-codemirror";
import { json } from "@codemirror/lang-json";
import { oneDark } from "@codemirror/theme-one-dark";
import { linter, Diagnostic } from "@codemirror/lint";
import { EditorView } from "@codemirror/view";
import { Undo2,Redo2,ArrowDownToLine } from "lucide-react";

// JSON Linter untuk highlight error
const jsonLinter = () =>
  linter((view) => {
    const diagnostics: Diagnostic[] = [];
    const text = view.state.doc.toString();
    try {
      JSON.parse(text);
    } catch (err: any) {
      const message = err.message;
      const match = message.match(/at position (\d+)/);
      const pos = match ? parseInt(match[1], 10) : 0;
      diagnostics.push({
        from: pos,
        to: pos + 1,
        severity: "error",
        message: "JSON tidak valid",
      });
    }
    return diagnostics;
  });

type Props = {
  value: string;
  onChange: (val: string) => void;
  onPrettify: () => void;
  onMinify: () => void;
  onUndo: () => void;
  onRedo: () => void;
  onClear: () => void;
  canUndo: boolean;
  canRedo: boolean;
  error?: string | null;
};

export default function JsonEditor({
  value,
  onChange,
  onPrettify,
  onMinify,
  onUndo,
  onRedo,
  onClear,
  canUndo,
  canRedo,
  error,
}: Props) {
  return (
    <div className="space-y-3">
      {/* Tombol kontrol */}
      <div className="flex flex-wrap gap-2 mb-2">
        <button
          onClick={onUndo}
          disabled={!canUndo}
          className="bg-gray-300 text-black px-3 py-1 rounded disabled:opacity-40"
        >
                  <Undo2 />
        </button>
        <button
          onClick={onRedo}
          disabled={!canRedo}
          className="bg-gray-300 text-black px-3 py-1 rounded disabled:opacity-40"
        >
          <Redo2 />
        </button>
        <button
          onClick={onPrettify}
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
        >
          Prettify
        </button>
        <button
          onClick={onMinify}
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
        >
          Minify
        </button>
        <button
          onClick={onClear}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
          Clear
        </button>
      </div>

      {/* Editor JSON */}
      <div className="rounded overflow-hidden border border-gray-300 shadow">
        <CodeMirror
          value={value}
          height="400px"
          theme={oneDark}
          extensions={[json(), jsonLinter(), EditorView.lineWrapping]}
          onChange={(val) => onChange(val)}
        />
      </div>

      {/* Error message */}
      {error && (
        <div className="text-red-600 text-sm font-medium mt-1">
          {error}
        </div>
      )}
    </div>
  );
}
