# 🧩 Code Playground


![Zustand](https://img.shields.io/badge/State-Zustand-olive)

> ✨ A modern playground to build, validate, and preview dynamic JSON-based forms in real-time. Built for Xtrous Portal.

---

## 📌 Features

- 📝 JSON editor with syntax highlighting (Monaco)
- 🧪 Real-time validation & error messages
- 🎨 Visual preview of form structure (live sync)
- 🎯 Prettify & Minify JSON support
- 🔁 Undo / Redo for editing
- ✅ Simulate form submission & see form data
- 📤 Ready for integration with Xtrous API / BPMN tasks

---

## 📷 Preview

> 🔧 Live form editing and instant preview

<!-- ![UI Preview](https://raw.githubusercontent.com/yourname/json-form-playground/main/public/preview-screenshot.png) -->

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

> Make sure Node.js 18+ is installed.

---

## 🛠️ Tech Stack

| Layer         | Tech                         |
|---------------|------------------------------|
| Frontend      | React + TypeScript + Vite    |
| Editor        | Monaco Editor   |
| State Mgmt    | Zustand                      |
| Styling       | CSS, Tailwind CSS                 |
| Backend API   | .NET (Xtrous Portal API)  |

---

## 🧪 Sample JSON

```json
{
  "schema": {
    "name": { "type": "string", "title": "Nama" },
    "age": { "type": "number", "title": "Usia" }
  },
  "form": [
    "name",
    "age",
    { "type": "submit", "title": "Kirim" }
  ]
}
```

---

## 🤝 Contributing

Pull requests are welcome! If you're working in a team, please open issues for significant changes first.

---

## 📄 License

Team Sarastya Technology Integrata © 2025
