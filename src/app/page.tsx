// 📁 src/app/page.tsx
"use client";
import JsonEditor from "./components/JsonEditor";
import FormJson from "./components/FormJson";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { Undo2, ArrowDownToLine, ArrowUpToLine } from "lucide-react";

export default function HomePage() {
  const [jsonText, setJsonText] = useState<string>("{}");
  const [formStructure, setFormStructure] = useState<Record<string, any> | null>(null);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [submittedData, setSubmittedData] = useState<Record<string, any> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [redoStack, setRedoStack] = useState<string[]>([]);
  const [undoStack, setUndoStack] = useState<string[]>([]);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

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
    try {
      const parsed = JSON.parse(jsonText);
      if (typeof parsed !== "object" || Array.isArray(parsed)) {
        throw new Error("JSON harus berupa objek");
      }
      setFormStructure(parsed);
      setFormData(parsed);
      setError(null);
    } catch (err: any) {
      setFormStructure(null);
      if (jsonText.trim() !== "") {
        setError("❌ " + err.message);
      } else {
        setError(null);
      }
    }
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
    setJsonText("{}");
    setFormStructure(null);
    setFormData({});
    setSubmittedData(null);
    setError(null);
    setRedoStack([]);
    setUndoStack([]);
    localStorage.removeItem("jsonEditorData");
  };

  const handleDownload = () => {
    const blob = new Blob([jsonText], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "data.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result;
      if (typeof text === "string") {
        setUndoStack((prev) => [jsonText, ...prev]);
        setJsonText(text);
      }
    };
    reader.readAsText(file);
  };

  return (
    <main className="min-h-screen bg-gray-50 pt-20 px-4 sm:px-6 z-0 relative">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-1/2">
          <div className="rounded-md shadow bg-white p-4 sm:p-6">
            <div className="mb-4 flex flex-wrap gap-2">
              <button
                onClick={handleDownload}
                className="bg-green-500 flex items-center gap-2 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                <ArrowDownToLine className="w-5 h-5" /> Download
              </button>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="bg-green-500 flex items-center gap-2 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                <ArrowUpToLine className="w-5 h-5" /> Upload
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="application/json"
                className="hidden"
                onChange={handleUpload}
              />
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
        <div className="w-full lg:w-1/2 z-0 relative">
          <div className="rounded-md p-4 sm:p-6 bg-gray-100 shadow h-full">
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
