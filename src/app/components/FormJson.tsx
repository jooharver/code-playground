import { useEffect, useState } from "react";

type Props = {
  dataStructure: Record<string, any> | null;
  formData?: Record<string, any>;
  onSubmit?: (data: Record<string, any>) => void;
};

export default function FormJson({ dataStructure, formData = {}, onSubmit }: Props) {
  const [values, setValues] = useState<Record<string, any>>(formData);

  useEffect(() => {
    setValues(formData);
  }, [formData]);

  if (!dataStructure) {
    return <p className="text-gray-500">Form belum tersedia</p>;
  }

  const handleChange = (key: string, value: any) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(values);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {Object.entries(dataStructure).map(([key, value]) => {
        const currentValue = values[key] ?? "";

        // Checkbox
        if (typeof value === "boolean") {
          return (
            <div key={key} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={!!currentValue}
                onChange={(e) => handleChange(key, e.target.checked)}
              />
              <label>{key}</label>
            </div>
          );
        }

        // Dropdown (array of strings)
        if (Array.isArray(value) && value.every((v) => typeof v === "string")) {
          return (
            <div key={key}>
              <label className="block text-sm font-medium mb-1">{key}</label>
              <select
                value={currentValue}
                onChange={(e) => handleChange(key, e.target.value)}
                className="w-full rounded border px-3 py-2"
              >
                <option value="">-- Pilih --</option>
                {value.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          );
        }

        // Radio button (array with type 'radio:')
        if (
          typeof value === "string" &&
          value.startsWith("radio:") &&
          value.includes("|")
        ) {
          const options = value.replace("radio:", "").split("|");
          return (
            <div key={key}>
              <p className="mb-1 font-medium">{key}</p>
              {options.map((opt) => (
                <label key={opt} className="mr-4">
                  <input
                    type="radio"
                    name={key}
                    value={opt}
                    checked={currentValue === opt}
                    onChange={(e) => handleChange(key, e.target.value)}
                  />{" "}
                  {opt}
                </label>
              ))}
            </div>
          );
        }

        // Array input (e.g. list of tags)
        if (Array.isArray(value)) {
          return (
            <div key={key}>
              <label className="block text-sm font-medium mb-1">{key}</label>
              <input
                type="text"
                value={currentValue.join?.(", ") ?? ""}
                onChange={(e) =>
                  handleChange(key, e.target.value.split(",").map((v) => v.trim()))
                }
                className="w-full rounded border px-3 py-2"
              />
              <small className="text-gray-500">Pisahkan dengan koma</small>
            </div>
          );
        }

        // Default: Text or number input
        return (
          <div key={key}>
            <label className="block text-sm font-medium mb-1">{key}</label>
            <input
              type={typeof value === "number" ? "number" : "text"}
              value={currentValue}
              onChange={(e) =>
                handleChange(key, typeof value === "number" ? Number(e.target.value) : e.target.value)
              }
              className="w-full rounded border px-3 py-2"
            />
          </div>
        );
      })}

      <button
        type="submit"
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Submit
      </button>
    </form>
  );
}
