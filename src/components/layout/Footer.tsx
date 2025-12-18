import { Link } from "react-router-dom";
import { ArrowUpRight, Mail, Phone, MapPin, Linkedin, Instagram, ArrowUp } from "lucide-react";
import { useState, useEffect, useCallback, memo } from "react";
import { contactData } from "@/data/appData";

const footerLinks = {
  company: [
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Process", href: "/process" },
  ],
  resources: [
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
  ],
};

const socialLinks = [
  { label: "LinkedIn", href: "https://linkedin.com", icon: Linkedin },
  { label: "Instagram", href: "https://instagram.com", icon: Instagram },
];

const FooterLink = memo(({ href, label }: { href: string; label: string }) => (
  <li>
    <Link
      to={href}
      className="text-white/60 hover:text-accent transition-colors duration-200 text-sm flex items-center gap-1.5 group"
    >
      {label}
      <ArrowUpRight className="h-3 w-3 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300" />
    </Link>
  </li>
));

FooterLink.displayName = "FooterLink";

export function Footer() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setShowBackToTop(window.scrollY > 400);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <footer className="bg-[#0a0a0a] dark:bg-[#111113] text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255,255,255,0.2) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.2) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px'
          }}
        />
      </div>

      <div className="relative z-10">
        <div className="relative pt-16 pb-14 sm:pt-24 sm:pb-20 md:pt-24 md:pb-20 lg:pt-24 lg:pb-20 border-b border-white/10 overflow-hidden">
          {/* Grid background for light theme */}
          <div
            className="absolute inset-0 opacity-[0.04] dark:opacity-0"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgb(0,0,0) 1px, transparent 1px),
                linear-gradient(to bottom, rgb(0,0,0) 1px, transparent 1px)
              `,
              backgroundSize: '48px 48px'
            }}
          />

          {/* Grid background for dark theme */}
          {/* <div
            className="absolute inset-0 opacity-0 dark:opacity-[0.045]"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(199,255,0,0.15) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(199,255,0,0.15) 1px, transparent 1px)
              `,
              backgroundSize: '48px 48px'
            }}
          /> */}

          {/* Radial gradient overlay for depth */}
          <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-[#0a0a0a]/60 dark:to-[#111113]/60" />

          <div className="container-wide relative z-10">
            {/* Decorative top accent */}
            <div className="flex items-center justify-center gap-2 mb-4 2xl:mb-0 opacity-0 animate-[fadeInUp_0.8s_ease-out_0.2s_forwards]">
              <div className="h-px w-8 sm:w-12 md:w-16 bg-gradient-to-r from-transparent to-accent/40" />
              <div className="w-1 h-1 rounded-full bg-accent/50 animate-pulse"
                style={{ animationDuration: '3s' }} />
              <div className="h-px w-8 sm:w-12 md:w-16 bg-gradient-to-l from-transparent to-accent/40" />
            </div>

            <h2
              className="text-[20vw] sm:text-[14vw] md:text-[12vw] lg:text-[10vw] xl:text-[8.5vw] font-antebas font-extrabold leading-[1.4] tracking-[-0.04em] text-center select-none relative opacity-0 animate-[fadeInUp_1s_ease-out_0.4s_forwards]"
              style={{
                background: 'linear-gradient(145deg, rgba(255,255,255,0.2) 0%, rgba(199,255,0,0.12) 35%, rgba(255,255,255,0.08) 70%, rgba(199,255,0,0.15) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(0 0 60px rgba(199,255,0,0.08)) drop-shadow(0 0 120px rgba(199,255,0,0.04))',
              }}
            >
              Byldist
              <span className="inline-block w-3 h-3 sm:w-4 sm:h-4 2xl:w-5 2xl:h-5 bg-accent/10 ml-3 sm:ml-4 2xl:ml-5 align-baseline rounded-full" />
            </h2>

            {/* Decorative bottom accent with animation */}
            <div className="flex items-center justify-center gap-3 sm:gap-4 mt-6 opacity-0 animate-[fadeInUp_0.8s_ease-out_0.6s_forwards]">
              <div className="h-[1.5px] w-16 sm:w-20 md:w-24 lg:w-32 bg-gradient-to-r from-transparent via-accent/40 to-accent/20" />
              <div className="w-2 h-2 rounded-full bg-accent/50 animate-pulse"
                style={{ animationDuration: '2.5s' }} />
              <div className="h-[1.5px] w-16 sm:w-20 md:w-24 lg:w-32 bg-gradient-to-l from-transparent via-accent/40 to-accent/20" />
            </div>

            {/* Subtitle tagline */}
            <p className="text-center mt-6 sm:mt-8 text-white/40 dark:text-white/35 text-xs sm:text-sm md:text-base tracking-wide uppercase font-medium opacity-0 animate-[fadeInUp_0.8s_ease-out_0.8s_forwards]">
              Design Meets Precision
            </p>
          </div>
        </div>

        <div className="container-wide py-8 sm:py-10 md:py-12 lg:py-16">
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-10 lg:gap-8">
            <div className="col-span-2 sm:col-span-2 lg:col-span-1 order-1">
              <Link to="/" className="font-antebas text-lg sm:text-xl md:text-2xl font-bold tracking-tight inline-flex items-baseline gap-1">
                Byldist
                <span className="w-1.5 h-1.5 bg-accent rounded-full" />
              </Link>
              <p className="mt-3 sm:mt-4 md:mt-5 text-white/50 text-xs sm:text-sm leading-relaxed max-w-xs">
                Bridging the execution gap between design and construction. Founded by architects and designers.
              </p>

              <div className="flex items-center gap-2 sm:gap-3 mt-4 sm:mt-5 md:mt-6">
                {socialLinks.map((social) => (
                  <Link
                    key={social.label}
                    to={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full border border-white/15 flex items-center justify-center text-white/50 hover:text-accent hover:border-accent transition-colors duration-200"
                    aria-label={social.label}
                  >
                    <social.icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </Link>
                ))}
              </div>
            </div>

            <div className="order-2 lg:order-2">
              <h4 className="font-display font-semibold text-[10px] sm:text-xs uppercase tracking-widest mb-3 sm:mb-4 md:mb-5 text-white/35">
                Company
              </h4>
              <ul className="space-y-2 sm:space-y-2.5 md:space-y-3">
                {footerLinks.company.map((link) => (
                  <FooterLink key={link.href} {...link} />
                ))}
              </ul>
            </div>

            <div className="order-3 lg:order-3">
              <h4 className="font-display font-semibold text-[10px] sm:text-xs uppercase tracking-widest mb-3 sm:mb-4 md:mb-5 text-white/35">
                Resources
              </h4>
              <ul className="space-y-2 sm:space-y-2.5 md:space-y-3">
                {footerLinks.resources.map((link) => (
                  <FooterLink key={link.href} {...link} />
                ))}
              </ul>
            </div>

            <div className="col-span-2 sm:col-span-2 lg:col-span-1 order-4">
              <h4 className="font-display font-semibold text-[10px] sm:text-xs uppercase tracking-widest mb-3 sm:mb-4 md:mb-5 text-white/35">
                Contact
              </h4>
              <ul className="space-y-2.5 sm:space-y-3 md:space-y-4">
                <li>
                  <Link
                    to={`mailto:${contactData?.email}`}
                    className="text-white/60 hover:text-accent transition-colors duration-200 text-xs sm:text-sm flex items-center gap-2 sm:gap-3 group"
                  >
                    <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-white/15 flex items-center justify-center group-hover:border-accent transition-colors duration-200">
                      <Mail className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                    </span>
                    {contactData?.email}
                  </Link>
                </li>
                <li>
                  <Link
                    to={`tel:${contactData?.contactNo.replace(/\s+/g, "")}`}
                    className="text-white/60 hover:text-accent transition-colors duration-200 text-xs sm:text-sm flex items-center gap-2 sm:gap-3 group"
                  >
                    <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-white/15 flex items-center justify-center group-hover:border-accent transition-colors duration-200">
                      <Phone className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                    </span>
                    {contactData?.contactNo}
                  </Link>
                </li>
                <li>
                  <span className="text-white/60 text-xs sm:text-sm flex items-center gap-2 sm:gap-3">
                    <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-white/15 flex items-center justify-center">
                      <MapPin className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                    </span>
                    {contactData?.address}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="container-wide py-4 sm:py-5 md:py-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-3 md:gap-4">
          <p className="text-white/35 text-[10px] sm:text-xs">
            © {new Date().getFullYear()} All rights reserved | Designed By 
            <Link to={'https://grours.com/'} target="_blank" className="hover:text-accent transition-colors duration-200"> Grours</Link>. 
          </p>
          <div className="flex items-center gap-3 sm:gap-4 md:gap-6">
            <Link
              to="/privacy"
              className="text-white/35 hover:text-accent transition-colors duration-200 text-[10px] sm:text-xs"
            >
              Privacy
            </Link>
            <Link
              to="/terms"
              className="text-white/35 hover:text-accent transition-colors duration-200 text-[10px] sm:text-xs"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>

      <button
        onClick={scrollToTop}
        className={`fixed bottom-3 right-3 sm:bottom-4 sm:right-4 md:bottom-6 md:right-6 z-50 w-10 h-10 md:w-12 md:h-12 rounded-full bg-accent text-black flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${showBackToTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
          }`}
        aria-label="Back to top"
      >
        <ArrowUp className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5" />
      </button>
    </footer>
  );
}