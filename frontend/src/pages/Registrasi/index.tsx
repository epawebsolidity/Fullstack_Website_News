import React from "react";
import { User, Mail, Lock, IdCard } from "lucide-react";
import { useRegister } from "../../hook/useRegisterHooks"; // sesuaikan path
import LogoNewsApp from "@/assets/news.png";
const Registrasi: React.FC = () => {
  const {
    formData,
    handleChange,
    handleSubmit,
    showPassword,
    showConfirmPassword,
    togglePassword,
    toggleConfirmPassword,
    loading,
  } = useRegister();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-400 to-red-800 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-gray-200">
        <div className="flex justify-center mb-6">
          <img src={LogoNewsApp} alt="News App Logo" className="h-18" />
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* No KTP */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              No. KTP
            </label>
            <div className="flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-400">
              <IdCard className="text-gray-400 mr-2" size={20} />
              <input
                type="number"
                name="no_ktp"
                value={formData.no_ktp}
                onChange={handleChange}
                placeholder="Masukkan nomor KTP"
                className="w-full outline-none"
                required
              />
            </div>
          </div>

          {/* Username */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Username
            </label>
            <div className="flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-400">
              <User className="text-gray-400 mr-2" size={20} />
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Masukkan username"
                className="w-full outline-none"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Email
            </label>
            <div className="flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-400">
              <Mail className="text-gray-400 mr-2" size={20} />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Masukkan email"
                className="w-full outline-none"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <div className="flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-400">
              <Lock className="text-gray-400 mr-2" size={20} />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Masukkan password"
                className="w-full outline-none"
                required
              />
              <button
                type="button"
                onClick={togglePassword}
                className="ml-2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          {/* Konfirmasi Password */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Konfirmasi Password
            </label>
            <div className="flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-400">
              <Lock className="text-gray-400 mr-2" size={20} />
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Ulangi password"
                className="w-full outline-none"
                required
              />
              <button
                type="button"
                onClick={toggleConfirmPassword}
                className="ml-2 text-gray-500 hover:text-gray-700"
              >
                {showConfirmPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          {/* Tombol Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-500 text-white py-2 rounded-lg font-semibold shadow-md hover:bg-blue-600 hover:shadow-lg transition duration-200 disabled:opacity-50"
          >
            {loading ? "Loading..." : "Registrasi"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Registrasi;
