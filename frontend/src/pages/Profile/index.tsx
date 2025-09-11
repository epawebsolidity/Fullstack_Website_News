import React, { useState, ChangeEvent, FormEvent } from "react";

const Profile: React.FC = () => {
  const [profileImage, setProfileImage] = useState<string>(
    "https://cdn-icons-png.flaticon.com/512/147/147144.png"
  );
  const [username, setUsername] = useState<string>("JohnDoe");
  const [email, setEmail] = useState<string>("john@example.com");
  const [bio, setBio] = useState<string>("Halo, saya pengguna baru!");
  const [isSaving, setIsSaving] = useState(false);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setProfileImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      alert("Profil berhasil diperbarui!");
      setIsSaving(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12 font-sans bg-gray-100">
      <div className="bg-red-400 max-w-5xl w-full flex flex-col md:flex-row overflow-hidden shadow-lg">
        {/* Kiri: Foto Profil */}
        <div className="flex flex-col items-center justify-center p-10 md:w-1/3 relative">
          <div className="relative w-40 h-40 rounded-full ring-2 ring-black overflow-hidden cursor-pointer hover:brightness-90 transition">
            <img
              src={profileImage}
              alt="Profile"
              className="object-cover w-full h-full"
              onClick={() => {
                document.getElementById("imageUpload")?.click();
              }}
              title="Klik untuk ganti foto"
            />

            {/* Input file disembunyikan */}
            <input
              type="file"
              id="imageUpload"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />

            {/* Icon edit di pojok */}
            <div className="absolute bottom-2 right-3 bg-indigo-600 p-1.5 rounded-full shadow-md text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.232 5.232l3.536 3.536M9 11l6-6 3 3-6 6H9v-3z"
                />
              </svg>
            </div>

            {/* Label untuk input file, tombol ganti foto */}
            <label
              htmlFor="imageUpload"
              className="absolute w-full text-center -bottom-10 left-0 text-indigo-600 cursor-pointer font-semibold hover:underline text-sm"
            >
              Ganti Foto
            </label>
          </div>

          <p className="mt-6 text-white text-center text-xl font-semibold break-words max-w-full">
            {username}
          </p>
        </div>

        {/* Kanan: Form Edit */}
        <div className="flex-1 p-6 sm:p-10 bg-gray-50">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                className="block text-gray-700 font-semibold mb-2"
                htmlFor="username"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full rounded-md border border-gray-300 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label
                className="block text-gray-700 font-semibold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-md border border-gray-300 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label
                className="block text-gray-700 font-semibold mb-2"
                htmlFor="bio"
              >
                Bio
              </label>
              <textarea
                id="bio"
                rows={4}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full rounded-md border border-gray-300 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSaving}
              className={`w-full py-3 rounded-md font-semibold text-white transition ${
                isSaving
                  ? "bg-red-400 cursor-not-allowed"
                  : "bg-red-600 hover:bg-red-700"
              }`}
            >
              {isSaving ? "Menyimpan..." : "Simpan Perubahan"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
