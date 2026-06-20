import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Page, display } from "../types";

interface NavbarProps {
  page: Page;
  setPage: (p: Page) => void;
}

export function Navbar({ page, setPage }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links: { label: string; id: Page }[] = [
    { label: "Home", id: "home" },
    { label: "About", id: "about" },
    { label: "Services", id: "services" },
    { label: "Future", id: "future" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled ? "bg-white/96 backdrop-blur-md shadow-sm" : "bg-white"
      } border-b border-border`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <button
            onClick={() => setPage("home")}
            className="flex items-center gap-2.5"
          >
            <div className="h-10 w-10 flex items-center justify-center bg-white border border-gray-100 rounded-xl p-1 shadow-sm overflow-hidden flex-shrink-0">
              <img
                src="/logo.png"
                className="h-8 w-8 object-contain"
                alt="DTR Logo"
              />
            </div>
            <span className="font-extrabold text-lg text-foreground" style={display}>
              D Tax Rail
            </span>
          </button>

          <div className="hidden md:flex items-center gap-0.5">
            {links.map((l) => (
              <button
                key={l.id}
                onClick={() => setPage(l.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  page === l.id
                    ? "bg-secondary text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <a
              href="https://wa.me/918187882772"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-green-500 transition-all shadow-sm flex items-center gap-2 hover:scale-105 active:scale-95"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.5-5.739-1.453L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.863-9.864.002-2.637-1.023-5.116-2.887-6.98C16.584 1.895 14.11 1.87 11.83 1.872 6.394 1.875 1.968 6.29 1.965 11.737c-.001 1.706.46 3.376 1.332 4.836l-.991 3.618 3.751-.983zm11.566-6.175c-.247-.123-1.464-.722-1.692-.805-.226-.083-.393-.123-.559.123-.166.247-.643.805-.788.97-.145.166-.29.186-.537.063-.247-.123-1.042-.384-1.986-1.227-.735-.656-1.231-1.465-1.375-1.712-.145-.247-.015-.38.109-.502.112-.11.247-.29.37-.435.123-.145.166-.247.247-.413.083-.166.042-.31-.021-.435-.063-.123-.559-1.348-.766-1.848-.201-.484-.406-.418-.559-.426-.145-.008-.31-.01-.476-.01-.166 0-.435.063-.663.31-.228.247-.87.85-.87 2.07 0 1.22.885 2.4 1.01 2.565.125.165 1.74 2.657 4.215 3.727.59.254 1.05.405 1.41.519.59.188 1.13.16 1.55.097.47-.07 1.46-.597 1.67-1.175.207-.577.207-1.074.145-1.175-.062-.1-.227-.165-.474-.29z" />
              </svg>
              WhatsApp
            </a>
          </div>

          <button
            className="md:hidden p-2 text-muted-foreground rounded-lg hover:bg-muted"
            onClick={() => setOpen(!open)}
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t border-border px-4 pb-4 pt-2 space-y-1">
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => { setPage(l.id); setOpen(false); }}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                page === l.id ? "bg-secondary text-primary" : "text-foreground hover:bg-muted"
              }`}
            >
              {l.label}
            </button>
          ))}
          <a
            href="https://wa.me/918187882772"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-green-600 hover:bg-green-500 text-white text-sm font-semibold px-4 py-3 rounded-xl mt-2 flex items-center justify-center gap-2 hover:scale-105 active:scale-95"
            onClick={() => setOpen(false)}
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.5-5.739-1.453L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.863-9.864.002-2.637-1.023-5.116-2.887-6.98C16.584 1.895 14.11 1.87 11.83 1.872 6.394 1.875 1.968 6.29 1.965 11.737c-.001 1.706.46 3.376 1.332 4.836l-.991 3.618 3.751-.983zm11.566-6.175c-.247-.123-1.464-.722-1.692-.805-.226-.083-.393-.123-.559.123-.166.247-.643.805-.788.97-.145.166-.29.186-.537.063-.247-.123-1.042-.384-1.986-1.227-.735-.656-1.231-1.465-1.375-1.712-.145-.247-.015-.38.109-.502.112-.11.247-.29.37-.435.123-.145.166-.247.247-.413.083-.166.042-.31-.021-.435-.063-.123-.559-1.348-.766-1.848-.201-.484-.406-.418-.559-.426-.145-.008-.31-.01-.476-.01-.166 0-.435.063-.663.31-.228.247-.87.85-.87 2.07 0 1.22.885 2.4 1.01 2.565.125.165 1.74 2.657 4.215 3.727.59.254 1.05.405 1.41.519.59.188 1.13.16 1.55.097.47-.07 1.46-.597 1.67-1.175.207-.577.207-1.074.145-1.175-.062-.1-.227-.165-.474-.29z" />
            </svg>
            WhatsApp
          </a>
        </div>
      )}
    </nav>
  );
}
