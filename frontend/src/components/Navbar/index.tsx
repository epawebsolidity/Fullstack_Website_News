import React, { useState, useContext, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import NewsLogo from "@/assets/news.png";
import AuthContext from "@/context/AuthContext";
import "./style.css";

export interface NavItem {
  to: string;
  label: string;
}

const guestNavItems: NavItem[] = [
  { to: "/", label: "Beranda" },
  { to: "/news", label: "Berita" },
  { to: "/dosc", label: "Dokumentasi" },
  { to: "/about", label: "Tentang" },
];

const userNavItems: NavItem[] = [
  { to: "/", label: "Home" },
  { to: "/news", label: "Berita" },
  { to: "/createnews", label: "Ajukan Berita" },
  { to: "/profile", label: "Profile" },
  { to: "/notice", label: "Pemberitahuan" },
];

const adminNavItems: NavItem[] = [
  { to: "/", label: "Beranda" },
  { to: "/news", label: "Berita" },
  { to: "/createnews", label: "Buat Berita" },
  { to: "/konfirmasiberita", label: "Konfirmasi Berita" },
  { to: "/pengguna", label: "Pengguna" },
  { to: "/profile", label: "Profile" },
];

const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const { isAuthorization, usersCheck, setAuth, UsersCheckHome } =
    useContext(AuthContext)!;

  useEffect(() => {
    if (isAuthorization?.AccessToken && UsersCheckHome) {
      UsersCheckHome(isAuthorization.AccessToken);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthorization?.AccessToken]);

  // Ambil role dan ubah ke lowercase agar konsisten
  const role = usersCheck?.data?.Role?.Role?.toLowerCase();

  const itemsToRender = (() => {
    if (!isAuthorization?.AccessToken) return guestNavItems;
    if (role === "admin") return adminNavItems;
    return userNavItems;
  })();

  const isHome = location.pathname === "/";

  const handleLogout = () => {
    localStorage.removeItem("Token");
    setAuth(null);
    navigate("/signin");
    setIsOpen(false);
  };

  return (
    <nav
      className={`bg-red-400 text-white fixed w-full top-0 left-0 z-50 ${
        isHome ? "" : "shadow-md"
      }`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <NavLink to="/" className="flex items-center space-x-3 cursor-pointer">
          <img
            src={NewsLogo}
            alt="News Logo"
            className="h-15 w-15 object-contain"
          />
          <span className="text-xl font-bold exo-2-500 select-none">
            NewsApp
          </span>
        </NavLink>

        {/* Desktop Menu */}
        <div className="hidden sm:flex items-center space-x-8">
          {itemsToRender.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `exo-2-400 text-lg transition-colors duration-300 ${
                  isActive
                    ? "text-yellow-200 font-bold"
                    : "text-white hover:text-blue-400"
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              {label}
            </NavLink>
          ))}

          {!isAuthorization?.AccessToken && (
            <>
              <NavLink
                to="/signin"
                className="rounded-full exo-2-400 text-black bg-yellow-200 px-4 py-1 text-sm font-medium text-blue-900 hover:bg-white transition"
              >
                Login
              </NavLink>
              <NavLink
                to="/signup"
                className="rounded-full exo-2-400 text-white bg-blue-950 px-4 py-1 text-sm font-medium hover:text-black hover:bg-white transition"
              >
                Daftar
              </NavLink>
            </>
          )}

          {isAuthorization?.AccessToken && (
            <button
              onClick={handleLogout}
              className="rounded-full exo-2-400 bg-red-500 px-4 py-1 text-sm font-medium text-white hover:bg-red-700 transition"
            >
              Logout
            </button>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="sm:hidden focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="sm:hidden bg-red-400 px-6 py-4 flex flex-col space-y-3">
          {itemsToRender.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `exo-2-400 text-lg transition-colors duration-300 ${
                  isActive
                    ? "text-yellow-200 font-bold"
                    : "text-white hover:text-blue-400"
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              {label}
            </NavLink>
          ))}

          {!isAuthorization?.AccessToken && (
            <>
              <NavLink
                to="/signin"
                className={({ isActive }) =>
                  `rounded-full border border-white px-4 py-2 text-center transition-colors duration-300 ${
                    isActive
                      ? "bg-white text-blue-900 font-bold"
                      : "bg-yellow-200 text-black hover:bg-white hover:text-black"
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                Login
              </NavLink>

              <NavLink
                to="/signup"
                className={({ isActive }) =>
                  `rounded-full px-4 py-2 text-center transition-colors duration-300 ${
                    isActive
                      ? "bg-blue-500 text-black font-bold"
                      : "bg-blue-950 text-white hover:bg-blue-500 hover:text-black"
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                Daftar
              </NavLink>
            </>
          )}

          {isAuthorization?.AccessToken && (
            <button
              onClick={() => {
                handleLogout();
                setIsOpen(false);
              }}
              className="rounded-full bg-red-500 px-4 py-2 text-white hover:bg-red-700 transition"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
