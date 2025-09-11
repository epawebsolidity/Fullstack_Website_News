export interface NavItem {
  to: string;
  label: string;
}

export const navItems: NavItem[] = [
  { to: "/", label: "Beranda" },
  { to: "/news", label: "Berita" },
  { to: "/dosc", label: "Dokumentasi" },
  { to: "/about", label: "Tentang" },
];
