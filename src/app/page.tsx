// 📁 src/app/page.tsx
"use client";
import JsonEditor from "@/components/JsonEditor";
import FormJson from "@/components/FormJson";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [jsonText, setJsonText] = useState<string>("");
  const [formStructure, setFormStructure] = useState<Record<string, any> | null>(null);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [submittedData, setSubmittedData] = useState<Record<string, any> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [redoStack, setRedoStack] = useState<string[]>([]);
  const [undoStack, setUndoStack] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("jsonEditorData");
    if (saved) {
      setJsonText(saved);
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      localStorage.setItem("jsonEditorData", jsonText);
    }, 2000);
    return () => clearInterval(interval);
  }, [jsonText]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      try {
        const parsed = JSON.parse(jsonText);
        if (typeof parsed !== "object" || Array.isArray(parsed)) {
          throw new Error("JSON harus berupa objek");
        }
        setFormStructure(parsed);
        setFormData(parsed);
        setError(null);
      } catch {
        setFormStructure(null);
        if (jsonText.trim() !== "") {
          setError("❌ JSON tidak valid atau bukan objek.");
        } else {
          setError(null);
        }
      }
    }, 300);
    return () => clearTimeout(timeout);
  }, [jsonText]);

  const handlePrettify = () => {
    try {
      const pretty = JSON.stringify(JSON.parse(jsonText), null, 2);
      setUndoStack((prev) => [jsonText, ...prev]);
      setRedoStack([]);
      setJsonText(pretty);
    } catch {
      setError("❌ JSON tidak valid, tidak bisa diprettify.");
    }
  };

  const handleMinify = () => {
    try {
      const minified = JSON.stringify(JSON.parse(jsonText));
      setUndoStack((prev) => [jsonText, ...prev]);
      setRedoStack([]);
      setJsonText(minified);
    } catch {
      setError("❌ JSON tidak valid, tidak bisa diminify.");
    }
  };

  const handleUndo = () => {
    if (undoStack.length === 0) return;
    const previous = undoStack[0];
    setRedoStack((r) => [jsonText, ...r]);
    setJsonText(previous);
    setUndoStack((u) => u.slice(1));
  };

  const handleRedoJson = () => {
    if (redoStack.length === 0) return;
    const next = redoStack[0];
    setUndoStack((u) => [jsonText, ...u]);
    setJsonText(next);
    setRedoStack((r) => r.slice(1));
  };

  const handleSubmit = (data: Record<string, any>) => {
    setSubmittedData(data);
    console.log("Submitted:", data);
  };

  const handleClear = () => {
    setJsonText("");
    setFormStructure(null);
    setFormData({});
    setSubmittedData(null);
    setError(null);
    setRedoStack([]);
    setUndoStack([]);
    localStorage.removeItem("jsonEditorData");
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow px-6 py-4 mb-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-800">JSON to Form Playground</h1>
        </div>
      </nav>

      <div className="flex flex-col lg:flex-row p-6 gap-6">
        <div className="w-full lg:w-1/2">
          <div className="rounded-md shadow bg-white p-6">
            <div className="mb-4 flex gap-2">
              <button onClick={handleUndo} disabled={undoStack.length === 0} className="bg-gray-300 text-black px-3 py-1 rounded disabled:opacity-40">
                Undo
              </button>
              <button onClick={handleRedoJson} disabled={redoStack.length === 0} className="bg-gray-300 text-black px-3 py-1 rounded disabled:opacity-40">
                Redo
              </button>
            </div>
            <JsonEditor
              value={jsonText}
              onChange={(val) => {
                setUndoStack((prev) => [jsonText, ...prev]);
                setRedoStack([]);
                setJsonText(val);
              }}
              onPrettify={handlePrettify}
              onMinify={handleMinify}
              onUndo={handleUndo}
              onRedo={handleRedoJson}
              onClear={handleClear}
              canUndo={undoStack.length > 0}
              canRedo={redoStack.length > 0}
              error={error}
            />
          </div>
        </div>
        <div className="w-full lg:w-1/2">
          <div className="rounded-md p-6 bg-gray-100 shadow h-full">
            <FormJson
              dataStructure={formStructure}
              formData={formData}
              onSubmit={handleSubmit}
            />
            {submittedData && (
              <pre className="mt-4 text-sm bg-white p-4 rounded border overflow-auto">
                {JSON.stringify(submittedData, null, 2)}
              </pre>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
