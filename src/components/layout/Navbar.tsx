import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "../ui/Button";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Beranda", path: "/" },
    { name: "Keunggulan", path: "/#keunggulan" },
    { name: "Testimoni", path: "/#testimoni" },
    { name: "Artikel", path: "/blog" },
  ];

  const handleNavClick = (path: string) => {
    setIsMobileMenuOpen(false);
    navigate(path);
  };

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          isScrolled || isMobileMenuOpen
            ? "bg-white/80 backdrop-blur-xl border-b border-black/5 py-4 shadow-sm"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 z-50">
              <span className="font-serif font-bold text-2xl tracking-tight">Gipang <span className="text-accent">Premium.</span></span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.path)}
                  className="text-sm font-semibold text-foreground/80 hover:text-accent transition-colors"
                >
                  {item.name}
                </button>
              ))}
              <Button size="default" className="gap-2" onClick={() => window.open('https://wa.me/6281234567890', '_blank')}>
                Pesan Sekarang
                <ArrowRight className="w-4 h-4" />
              </Button>
            </nav>

            {/* Mobile Nav Toggle */}
            <button
              className="md:hidden z-50 p-2 text-foreground"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white/95 backdrop-blur-xl flex flex-col items-center justify-center pt-20 px-6 h-screen"
          >
            <div className="flex flex-col gap-6 w-full max-w-sm text-center">
              {navLinks.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.path)}
                  className="font-serif text-3xl font-medium text-foreground hover:text-accent transition-colors py-2"
                >
                  {item.name}
                </button>
              ))}
              <div className="w-full h-px bg-black/5 my-4" />
              <Button size="lg" className="w-full text-lg" onClick={() => {
                setIsMobileMenuOpen(false);
                window.open('https://wa.me/6281234567890', '_blank');
              }}>
                Pesan Lewat WhatsApp
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
