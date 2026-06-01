import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { Page, display, mono } from "../types";

interface FooterProps {
  setPage: (p: Page) => void;
  onSelectService: (serviceName: string) => void;
}

export function Footer({ setPage, onSelectService }: FooterProps) {
  return (
    <footer className="bg-[#080F1E] text-blue-200/60">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="h-10 flex items-center bg-white border border-gray-100 rounded-xl px-2.5 py-1 shadow-sm overflow-hidden flex-shrink-0">
                <img
                  src="/logo.jpg"
                  className="h-8 w-auto object-contain"
                  alt="DTR Logo"
                />
              </div>
              <span className="font-extrabold text-white text-lg" style={display}>D Tax Rail</span>
            </div>
            <p className="text-sm leading-relaxed mb-4">
              India's modern digital tax filing platform — secure, expert-assisted, and built for everyone.
            </p>
            <p className="text-xs text-blue-300 mb-3 font-semibold tracking-wide" style={mono}>
              Simple · Smart · Secure Tax Solutions
            </p>
            <div className="flex gap-2">
              <span className="bg-white/8 text-xs px-2 py-1 rounded" style={mono}>256-bit SSL</span>
              <span className="bg-white/8 text-xs px-2 py-1 rounded" style={mono}>CA Assisted</span>
            </div>
          </div>

          <div>
            {/* Hiding Platform header by commenting it out for now
            <button
              onClick={() => onSelectService("Platform")}
              className="font-semibold text-white mb-4 text-sm hover:text-blue-300 text-left transition-colors cursor-pointer block"
            >
              Platform
            </button>
            */}
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => onSelectService("ITR Filing")}
                  className="hover:text-white text-left transition-colors cursor-pointer"
                >
                  ITR Filing
                </button>
              </li>
              {/* Hiding Refund Tracking by commenting it out for now
              <li>
                <button
                  onClick={() => onSelectService("Refund Tracking")}
                  className="hover:text-white text-left transition-colors cursor-pointer"
                >
                  Refund Tracking
                </button>
              </li>
              */}
              {/* Hiding Document Management by commenting it out for now
              <li>
                <button
                  onClick={() => onSelectService("Document Management")}
                  className="hover:text-white text-left transition-colors cursor-pointer"
                >
                  Document Management
                </button>
              </li>
              */}
              <li>
                <button
                  onClick={() => {
                    setPage("home");
                    setTimeout(() => {
                      const el = document.getElementById("hero-estimator-section");
                      if (el) {
                        el.scrollIntoView({ behavior: "smooth" });
                      }
                    }, 300);
                  }}
                  className="hover:text-white text-left transition-colors cursor-pointer"
                >
                  Tax Calculator
                </button>
              </li>
              {/* Hiding Compliance Alerts by commenting it out for now
              <li>
                <button
                  onClick={() => onSelectService("Compliance Alerts")}
                  className="hover:text-white text-left transition-colors cursor-pointer"
                >
                  Compliance Alerts
                </button>
              </li>
              */}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4 text-sm">Company</h4>
            <ul className="space-y-2.5 text-sm">
              {([
                { id: "about", label: "About" },
                { id: "services", label: "Services" },
                { id: "future", label: "Future Services" },
                { id: "contact", label: "Contact Us" },
              ] as { id: Page; label: string }[]).map(({ id, label }) => (
                <li key={id}>
                  <button onClick={() => setPage(id)} className="hover:text-white text-left transition-colors">
                    {label}
                  </button>
                </li>
              ))}
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4 text-sm">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 text-green-400">
                <svg className="w-3.5 h-3.5 fill-current flex-shrink-0" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.5-5.739-1.453L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.863-9.864.002-2.637-1.023-5.116-2.887-6.98C16.584 1.895 14.11 1.87 11.83 1.872 6.394 1.875 1.968 6.29 1.965 11.737c-.001 1.706.46 3.376 1.332 4.836l-.991 3.618 3.751-.983zm11.566-6.175c-.247-.123-1.464-.722-1.692-.805-.226-.083-.393-.123-.559.123-.166.247-.643.805-.788.97-.145.166-.29.186-.537.063-.247-.123-1.042-.384-1.986-1.227-.735-.656-1.231-1.465-1.375-1.712-.145-.247-.015-.38.109-.502.112-.11.247-.29.37-.435.123-.145.166-.247.247-.413.083-.166.042-.31-.021-.435-.063-.123-.559-1.348-.766-1.848-.201-.484-.406-.418-.559-.426-.145-.008-.31-.01-.476-.01-.166 0-.435.063-.663.31-.228.247-.87.85-.87 2.07 0 1.22.885 2.4 1.01 2.565.125.165 1.74 2.657 4.215 3.727.59.254 1.05.405 1.41.519.59.188 1.13.16 1.55.097.47-.07 1.46-.597 1.67-1.175.207-.577.207-1.074.145-1.175-.062-.1-.227-.165-.474-.29z" />
                </svg>
                <a href="https://wa.me/918187882772" target="_blank" rel="noopener noreferrer" className="text-green-400 hover:text-green-300 font-bold transition-colors">WhatsApp: 8187882772 (Primary)</a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 flex-shrink-0 text-blue-400" />
                <a href="tel:8187882772" className="hover:text-white transition-colors">Phone: 8187882772</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 flex-shrink-0 text-amber-400" />
                <a href="mailto:dtaxrail@gmail.com" className="hover:text-white transition-colors">dtaxrail@gmail.com</a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                <span>49-107, Manda Street, Bobbili,<br />Vizianagaram, AP — 535558</span>
              </li>
              <li className="flex items-center gap-2"><Clock className="w-3.5 h-3.5 flex-shrink-0 text-violet-400" />24/7 Support (Always Available)</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs" style={mono}>© 2026 D Tax Rail · Simple, Smart, Secure Tax Solutions · All rights reserved.</p>
          <p className="text-xs">Not a tax authority. For official matters, visit{" "}
            <a
              href="https://www.incometax.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 underline underline-offset-2 transition-all font-semibold"
            >
              incometax.gov.in
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
