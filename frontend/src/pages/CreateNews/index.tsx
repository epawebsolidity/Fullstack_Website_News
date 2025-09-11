import React, { useState, useEffect } from "react";
import "react-quill/dist/quill.snow.css";

const CreateNews: React.FC = () => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [content, setContent] = useState("");

  // Preview gambar
  useEffect(() => {
    if (imageFile) {
      const previewUrl = URL.createObjectURL(imageFile);
      setImagePreview(previewUrl);

      // Clean up preview URL saat komponen unmount atau file berubah
      return () => URL.revokeObjectURL(previewUrl);
    } else {
      setImagePreview("");
    }
  }, [imageFile]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !date || !content) {
      alert("Judul, tanggal, dan isi berita wajib diisi!");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("date", date);
    formData.append("content", content);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    // Simulasi kirim
    console.log("Berita baru dibuat:");
    for (let pair of formData.entries()) {
      console.log(`${pair[0]}:`, pair[1]);
    }

    alert("Berita berhasil dibuat!");

    setTitle("");
    setDate("");
    setContent("");
    setImageFile(null);
    setImagePreview("");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-10 md:p-12 pt-24 font-sans">
      <div className="max-w-3xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-7">
          {/* Judul */}
          <div>
            <label
              htmlFor="title"
              className="block mb-2 font-semibold text-gray-800"
            >
              Judul Berita <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Masukkan judul berita"
              required
              className="w-full rounded-lg border border-gray-300 px-5 py-3 text-lg shadow-sm focus:ring-4 focus:ring-blue-400"
            />
          </div>

          {/* Tanggal */}
          <div>
            <label
              htmlFor="date"
              className="block mb-2 font-semibold text-gray-800"
            >
              Tanggal Berita <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-base shadow-sm focus:ring-4 focus:ring-blue-400"
            />
          </div>

          {/* Upload Gambar */}
          <div>
            <label
              htmlFor="imageUpload"
              className="block mb-2 font-semibold text-gray-800"
            >
              Upload Gambar (opsional)
            </label>
            <input
              type="file"
              id="imageUpload"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setImageFile(file);
                }
              }}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
            {imagePreview && (
              <div className="mt-4 max-w-xs rounded overflow-hidden shadow-md border border-gray-200">
                <img
                  src={imagePreview}
                  alt="Preview Gambar"
                  className="object-cover w-full h-48"
                />
              </div>
            )}
          </div>

          {/* Isi Berita */}
          <div>
            <label
              htmlFor="content"
              className="block mb-2 font-semibold text-gray-800"
            >
              Isi Berita <span className="text-red-500">*</span>
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={8}
              placeholder="Tulis isi berita di sini..."
              required
              className="w-full rounded-lg border border-gray-300 px-5 py-4 resize-y text-lg shadow-sm focus:ring-4 focus:ring-blue-400"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-md transition duration-300 focus:ring-4 focus:ring-blue-400"
          >
            Buat Berita
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateNews;
