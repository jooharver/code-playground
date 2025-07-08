// 📁 src/app/about/page.tsx
import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow px-6 py-4 mb-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Playground Team</h1>
          <div className="flex gap-6">
            <Link href="/" className="text-gray-700 text-lg hover:text-blue-600 transition-colors">Playground</Link>
            <Link href="/about" className="text-gray-700 text-lg hover:text-blue-600 transition-colors">About</Link>
            <Link href="/logout" className="text-red-700 text-lg hover:text-red-600 transition-colors">Logout</Link>
          </div>
        </div>
      </nav>

      <div className="py-12 px-6">
        <div className="max-w-3xl mx-auto bg-white p-8 rounded shadow">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Tentang Proyek</h1>
          <p className="text-gray-700 mb-6">
            JSON to Form Playground adalah sebuah proyek yang memungkinkan pengguna untuk mengubah input JSON menjadi form interaktif secara real-time. Aplikasi ini mendukung fitur seperti undo/redo, prettify, minify, penyimpanan lokal otomatis, dan editor bergaya gelap dengan dukungan CodeMirror.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Tim Pengembang</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li><strong>Joo</strong> Race Leader - Strategth</li>
            <li><strong>Rustu</strong> Creanovator</li>
            <li><strong>Kale</strong> Creanovator</li>
            <li><strong>Rasika</strong> Creanovator</li>
          </ul>

          <p className="mt-6 text-gray-600 text-sm">
            Proyek ini dibuat untuk latihan kolaborasi tim dalam membangun aplikasi berbasis Next.js dan React. Terima kasih telah mencoba!
          </p>
        </div>
      </div>
    </main>
  );
}
