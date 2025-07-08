"use client";

import { json } from "@codemirror/lang-json";
import CodeMirror from "@uiw/react-codemirror";
import { oneDark } from "@codemirror/theme-one-dark";

interface JsonEditorProps {
  value: string;
  onChange: (v: string) => void;
  onPrettify: () => void;
  onMinify: () => void;
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  error: string | null;
}

export default function JsonEditor({
  value,
  onChange,
  onPrettify,
  onMinify,
  onUndo,
  onRedo,
  canUndo,
  canRedo,
  error,
}: JsonEditorProps) {
  return (
    <div>
      <div className="flex justify-end gap-2 mb-2">
        <button
          onClick={onUndo}
          disabled={!canUndo}
          className="px-3 py-1 bg-gray-300 hover:bg-gray-400 text-sm rounded disabled:opacity-50"
        >
          Undo
        </button>
        <button
          onClick={onRedo}
          disabled={!canRedo}
          className="px-3 py-1 bg-gray-300 hover:bg-gray-400 text-sm rounded disabled:opacity-50"
        >
          Redo
        </button>
        <button
          onClick={onPrettify}
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-lightblue-600 text-sm"
        >
          Prettify
        </button>
        <button
          onClick={onMinify}
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-lightblue-600 text-sm"
        >
          Minify
        </button>
      </div>


      <CodeMirror
        value={value}
        height="400px"
        theme={oneDark}
        extensions={[json()]}
        onChange={(val) => onChange(val)}
        className="rounded border border-gray-300"
      />

      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}
