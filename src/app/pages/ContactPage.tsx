import { useState } from "react";
import { Phone, MapPin, Instagram, Mail, Clock, ChevronDown, Shield, UserCheck, Zap, Award } from "lucide-react";
import { display, mono } from "../types";
import { SectionParticles } from "../components/SectionParticles";

export function ContactPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "How do I start my filing?",
      a: "Install and login to our app and start filing.",
    },
    {
      q: "How long does e-verification take?",
      a: "E-verification via Aadhaar OTP, net banking, or DSC is instant. Once verified, the IT Department typically processes ITR-1 and ITR-4 returns within 15–45 days for refunds.",
    },
    {
      q: "How can I track my income tax refund?",
      a: "Log in to your D Tax Rail dashboard and navigate to 'Refund Tracker'. You'll see live status pulled from the CPC portal, along with expected credit date and bank validation status.",
    },
    {
      q: "Is my personal and financial data secure?",
      a: "Absolutely. We use 256-bit SSL encryption for all transmissions, ISO-certified cloud storage with access controls, and comply fully with IT Act 2000 and DPDP Act 2023. Your data is never shared or sold.",
    },
  ];

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="bg-[#0C1B33] py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-transparent to-indigo-900/20 opacity-60 animate-pulse" style={{ animationDuration: "10s" }} />
        <SectionParticles />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <div className="inline-block bg-white/10 text-blue-300 text-xs font-semibold px-4 py-1.5 rounded-full mb-6" style={mono}>
            CONTACT US
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4" style={display}>
            We're Here to Help
          </h1>
          <p className="text-blue-100/75 text-lg mb-4">
            Get assistance with filing, refunds, compliance, or account support
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-blue-300/80" style={mono}>
            <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" />8187882772</span>
            <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" />Bobbili, Vizianagaram, AP</span>
            <span className="flex items-center gap-1.5"><Instagram className="w-3.5 h-3.5" />@dtaxrail</span>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Main contact card */}
              <div className="bg-card border border-border rounded-3xl p-8">
                <h2 className="text-2xl font-bold text-foreground mb-6" style={display}>Get in Touch</h2>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  We're here to help you with all your tax filing needs. Reach out to us through any of the channels below, and our team will respond as soon as possible.
                </p>

                <div className="space-y-6">
                  {/* WhatsApp Primary */}
                  <div className="flex items-start gap-4 p-5 bg-green-50 border border-green-150 rounded-2xl hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center flex-shrink-0 text-white">
                      <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.5-5.739-1.453L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.863-9.864.002-2.637-1.023-5.116-2.887-6.98C16.584 1.895 14.11 1.87 11.83 1.872 6.394 1.875 1.968 6.29 1.965 11.737c-.001 1.706.46 3.376 1.332 4.836l-.991 3.618 3.751-.983zm11.566-6.175c-.247-.123-1.464-.722-1.692-.805-.226-.083-.393-.123-.559.123-.166.247-.643.805-.788.97-.145.166-.29.186-.537.063-.247-.123-1.042-.384-1.986-1.227-.735-.656-1.231-1.465-1.375-1.712-.145-.247-.015-.38.109-.502.112-.11.247-.29.37-.435.123-.145.166-.247.247-.413.083-.166.042-.31-.021-.435-.063-.123-.559-1.348-.766-1.848-.201-.484-.406-.418-.559-.426-.145-.008-.31-.01-.476-.01-.166 0-.435.063-.663.31-.228.247-.87.85-.87 2.07 0 1.22.885 2.4 1.01 2.565.125.165 1.74 2.657 4.215 3.727.59.254 1.05.405 1.41.519.59.188 1.13.16 1.55.097.47-.07 1.46-.597 1.67-1.175.207-.577.207-1.074.145-1.175-.062-.1-.227-.165-.474-.29z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-green-900 mb-1">WhatsApp (Primary Support)</h3>
                      <p className="text-sm text-green-800/80 mb-3">Instant chat for ITR filing help, document upload queries, or refund status updates.</p>
                      <a
                        href="https://wa.me/918187882772?text=Hello%20D%20Tax%20Rail%2C%20I%20need%20assistance%20with%20my%20tax%20filing."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-green-600 text-white px-5 py-2.5 rounded-xl hover:bg-green-500 transition-colors text-sm font-medium shadow-sm active:scale-98"
                      >
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.5-5.739-1.453L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.863-9.864.002-2.637-1.023-5.116-2.887-6.98C16.584 1.895 14.11 1.87 11.83 1.872 6.394 1.875 1.968 6.29 1.965 11.737c-.001 1.706.46 3.376 1.332 4.836l-.991 3.618 3.751-.983zm11.566-6.175c-.247-.123-1.464-.722-1.692-.805-.226-.083-.393-.123-.559.123-.166.247-.643.805-.788.97-.145.166-.29.186-.537.063-.247-.123-1.042-.384-1.986-1.227-.735-.656-1.231-1.465-1.375-1.712-.145-.247-.015-.38.109-.502.112-.11.247-.29.37-.435.123-.145.166-.247.247-.413.083-.166.042-.31-.021-.435-.063-.123-.559-1.348-.766-1.848-.201-.484-.406-.418-.559-.426-.145-.008-.31-.01-.476-.01-.166 0-.435.063-.663.31-.228.247-.87.85-.87 2.07 0 1.22.885 2.4 1.01 2.565.125.165 1.74 2.657 4.215 3.727.59.254 1.05.405 1.41.519.59.188 1.13.16 1.55.097.47-.07 1.46-.597 1.67-1.175.207-.577.207-1.074.145-1.175-.062-.1-.227-.165-.474-.29z" />
                        </svg>
                        Chat on WhatsApp
                      </a>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="flex items-start gap-4 p-5 bg-pink-50 border border-pink-100 rounded-2xl">
                      <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Instagram className="w-6 h-6 text-pink-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1 text-sm">Instagram</h3>
                        <a
                          href="https://www.instagram.com/dtaxrail?igsh=Z2p4aGVhcHYxYnd5"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-pink-700 font-semibold hover:underline"
                        >
                          @dtaxrail
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-5 bg-blue-50 border border-blue-100 rounded-2xl">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Mail className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1 text-sm">Email</h3>
                        <a
                          href="mailto:support@dtaxrail.in"
                          className="text-sm text-primary hover:underline"
                        >
                          support@dtaxrail.in
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="flex items-start gap-4 p-5 bg-[#0C1B33]/5 border border-border rounded-2xl">
                      <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Phone className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1 text-sm">Phone</h3>
                        <a href="tel:8187882772" className="text-sm text-green-700 font-semibold hover:underline">
                          8187882772
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-5 bg-violet-50 border border-violet-100 rounded-2xl">
                      <div className="w-12 h-12 bg-violet-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-6 h-6 text-violet-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1 text-sm">Office Address</h3>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          49-107, Manda Street, Bobbili<br />
                          Vizianagaram, AP — 535558
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-5 bg-amber-50 border border-amber-100 rounded-2xl">
                    <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Office Hours</h3>
                      <p className="text-sm text-muted-foreground">Monday – Saturday, 9:00 AM – 8:00 PM IST</p>
                      <p className="text-xs text-amber-700 mt-1">
                        WhatsApp support is monitored 24/7 for urgent queries
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Info sidebar */}
            <div className="space-y-5">
              <div className="bg-card border border-border rounded-3xl p-6">
                <h3 className="font-bold text-foreground mb-5" style={display}>Support Information</h3>
                <div className="space-y-4">
                  {[
                    { icon: Mail, label: "Email", value: "support@dtaxrail.in", link: "mailto:support@dtaxrail.in" },
                    { icon: Phone, label: "Phone", value: "8187882772", link: "tel:8187882772" },
                    { icon: MapPin, label: "Address", value: "49-107, Manda St, Bobbili, AP", link: null },
                    { icon: Clock, label: "Office Hours", value: "Mon–Sat, 9AM–8PM IST", link: null },
                    { icon: Instagram, label: "Instagram", value: "@dtaxrail", link: "https://www.instagram.com/dtaxrail?igsh=Z2p4aGVhcHYxYnd5" },
                  ].map(({ icon: Icon, label, value, link }) => (
                    <div key={label} className="flex items-start gap-3">
                      <div className="w-9 h-9 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="w-4 h-4 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs text-muted-foreground" style={mono}>{label}</div>
                        {link ? (
                          <a
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-medium text-primary hover:underline"
                          >
                            {value}
                          </a>
                        ) : (
                          <div className="text-sm font-medium text-foreground">{value}</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-[#0C1B33] rounded-3xl p-6 text-center">
                <Instagram className="w-10 h-10 text-blue-400 mx-auto mb-3" />
                <h3 className="font-bold text-white mb-2" style={display}>Connect on Instagram</h3>
                <p className="text-blue-100/65 text-sm mb-4 leading-relaxed">
                  Follow us for tax tips, filing updates, and quick support via DM.
                </p>
                <a
                  href="https://www.instagram.com/dtaxrail?igsh=Z2p4aGVhcHYxYnd5"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#1A56DB] text-white font-semibold py-3 rounded-xl hover:bg-blue-500 transition-colors text-sm inline-block"
                >
                  Follow @dtaxrail →
                </a>
              </div>

              <div className="bg-green-50 border border-green-100 rounded-3xl p-5">
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-sm font-semibold text-green-700">Available on Instagram</span>
                </div>
                <p className="text-sm text-green-800">
                  Send us a DM for <strong>quick responses</strong>
                </p>
              </div>

              <div className="bg-card border border-border rounded-3xl p-5">
                <h4 className="font-semibold text-foreground text-sm mb-3">Why Choose D Tax Rail?</h4>
                <div className="space-y-3">
                  {[
                    { icon: Shield, label: "Secure & Trusted" },
                    { icon: UserCheck, label: "CA Assisted" },
                    { icon: Zap, label: "Fast Processing" },
                    { icon: Award, label: "Expert Guidance" },
                  ].map(({ icon: Icon, label }) => (
                    <div
                      key={label}
                      className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-foreground"
                    >
                      <Icon className="w-4 h-4 text-primary flex-shrink-0" />
                      {label}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-3" style={display}>Frequently Asked Questions</h2>
            <p className="text-muted-foreground">Everything you need to know about filing with D Tax Rail</p>
          </div>

          <div className="space-y-3">
            {faqs.map(({ q, a }, idx) => (
              <div key={idx} className="border border-border rounded-2xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-muted/50 transition-colors"
                >
                  <span className="font-medium text-foreground text-sm">{q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-muted-foreground flex-shrink-0 ml-4 transition-transform duration-200 ${openFaq === idx ? "rotate-180" : ""}`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-6 pb-5 pt-4 text-sm text-muted-foreground leading-relaxed border-t border-border">
                    {a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
