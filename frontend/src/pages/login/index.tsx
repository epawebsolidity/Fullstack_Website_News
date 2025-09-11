import React, { useState, useContext, useEffect } from "react";
import { User, Lock } from "lucide-react";
import LogoNewsApp from "@/assets/news.png";
import { useNavigate } from "react-router-dom";
import AuthContext from "@/context/AuthContext";

interface AuthContextType {
  login: (username: string, password: string) => Promise<boolean>;
  isAuthorization: any; // sesuaikan tipe dengan state context kamu
}

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { login, isAuthorization } = useContext(AuthContext) as AuthContextType;
  const navigate = useNavigate();

  // Monitor isAuthorization, kalau token sudah ada, redirect ke home
  useEffect(() => {
    if (isAuthorization && isAuthorization.AccessToken) {
      navigate("/");
    }
  }, [isAuthorization, navigate]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const result = await login(username, password);
    setLoading(false);

    if (!result) {
      setError("Login gagal, cek username dan password");
    }
    // jangan panggil navigate disini, karena redirect sudah di-handle di useEffect
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-400 to-red-800 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-gray-200">
        <div className="flex justify-center mb-6">
          <img src={LogoNewsApp} alt="News App Logo" className="h-18" />
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
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
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Masukkan username"
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan password"
                className="w-full outline-none"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="ml-2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-500 text-white py-2 rounded-lg font-semibold shadow-md hover:bg-red-600 hover:shadow-lg transition duration-200"
          >
            {loading ? "Loading..." : "LOGIN"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
