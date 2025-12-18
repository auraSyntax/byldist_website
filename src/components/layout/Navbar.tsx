import { useState, useEffect, useCallback, memo, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Menu, X, Sun, Moon, ArrowRight, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/ThemeProvider";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/process", label: "Process" },
  { href: "/contact", label: "Contact" },
];

const NavLinkItem = memo(({ href, label, isActive }: { href: string; label: string; isActive: boolean }) => (
  <Link
    to={href}
    className={cn(
      "accent-underline text-sm font-medium tracking-wide transition-colors duration-200 hover:text-foreground py-1",
      isActive ? "text-foreground" : "text-muted-foreground"
    )}
  >
    {label}
  </Link>
));

NavLinkItem.displayName = "NavLinkItem";

const MobileNavLink = memo(({ 
  href, 
  label, 
  isActive, 
  index, 
  onClick,
  shouldReduceMotion 
}: { 
  href: string; 
  label: string; 
  isActive: boolean; 
  index: number;
  onClick: () => void;
  shouldReduceMotion: boolean | null;
}) => (
  <motion.div
    initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ 
      duration: shouldReduceMotion ? 0.15 : 0.3, 
      delay: shouldReduceMotion ? 0 : 0.1 + index * 0.05,
      ease: [0.25, 0.1, 0.25, 1]
    }}
    className="w-full"
  >
    <Link
      to={href}
      onClick={onClick}
      className={cn(
        "flex items-center justify-between w-full py-3.5 md:py-4 px-2 border-b border-border/30 group transition-all duration-200 active:bg-accent/5",
        isActive ? "text-accent" : "text-foreground"
      )}
    >
      <span className="text-xl md:text-2xl font-display font-medium tracking-tight">
        {label}
      </span>
      <ChevronRight 
        className={cn(
          "w-5 h-5 transition-all duration-200 group-hover:translate-x-1",
          isActive ? "text-accent" : "text-muted-foreground group-hover:text-accent"
        )} 
      />
    </Link>
  </motion.div>
));

MobileNavLink.displayName = "MobileNavLink";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const location = useLocation();
  const shouldReduceMotion = useReducedMotion();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
      document.body.style.top = `-${window.scrollY}px`;
    } else {
      const scrollY = document.body.style.top;
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.top = "";
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || "0") * -1);
      }
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.top = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  const toggleTheme = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [theme, setTheme]);

  const toggleMenu = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
  }, []);

  const menuOverlayVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  };

  const menuPanelVariants = shouldReduceMotion
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : { 
        initial: { x: "100%", opacity: 0.5 }, 
        animate: { x: 0, opacity: 1 }, 
        exit: { x: "100%", opacity: 0 } 
      };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "glass-effect py-2 sm:py-2.5 md:py-3"
            : "bg-transparent py-3 sm:py-4 md:py-5"
        )}
      >
        <nav className="container-wide flex items-center justify-between">
          <Link
            to="/"
            className="relative z-[60] font-antebas text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight flex items-baseline gap-1"
          >
            Byldist
            <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-accent rounded-full" />
          </Link>

          <div className="hidden lg:flex items-center gap-5 xl:gap-8">
            {navLinks.map((link) => (
              <NavLinkItem
                key={link.href}
                href={link.href}
                label={link.label}
                isActive={location.pathname === link.href}
              />
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full relative overflow-hidden group"
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              <motion.div
                key={theme}
                initial={shouldReduceMotion ? {} : { y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                {theme === "dark" ? (
                  <Sun className="h-5 w-5 transition-transform duration-200 group-hover:rotate-45" />
                ) : (
                  <Moon className="h-5 w-5 transition-transform duration-200 group-hover:-rotate-12" />
                )}
              </motion.div>
            </Button>
            <Button variant="hero" size="default" asChild className="rounded-md">
              <Link to="/contact">Get in Touch</Link>
            </Button>
          </div>

          <div className="flex lg:hidden items-center gap-1 sm:gap-1.5 md:gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full relative overflow-hidden h-9 w-9 sm:h-10 sm:w-10 md:h-11 md:w-11"
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4 sm:h-5 sm:w-5" />
              ) : (
                <Moon className="h-4 w-4 sm:h-5 sm:w-5" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              className="relative z-[60] h-9 w-9 sm:h-10 sm:w-10 md:h-11 md:w-11"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <X className="h-5 w-5 sm:h-6 sm:w-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={menuOverlayVariants.initial}
              animate={menuOverlayVariants.animate}
              exit={menuOverlayVariants.exit}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-background/60 backdrop-blur-sm z-[55] lg:hidden"
              onClick={closeMenu}
              aria-hidden="true"
            />
            
            <motion.div
              ref={menuRef}
              id="mobile-menu"
              initial={menuPanelVariants.initial}
              animate={menuPanelVariants.animate}
              exit={menuPanelVariants.exit}
              transition={{ 
                duration: shouldReduceMotion ? 0.15 : 0.35, 
                ease: [0.32, 0.72, 0, 1] 
              }}
              className="fixed inset-y-0 right-0 w-full sm:w-[85vw] md:w-[70vw] max-w-md bg-background border-l border-border/50 z-[55] lg:hidden shadow-2xl"
            >
              <button
                onClick={closeMenu}
                className="absolute top-4 right-4 sm:top-5 sm:right-5 md:top-6 md:right-6 p-2 rounded-full bg-secondary/50 hover:bg-secondary text-foreground transition-all duration-200 hover:scale-105 active:scale-95"
                aria-label="Close menu"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
              
              <div className="flex flex-col h-full pt-20 sm:pt-24 md:pt-28 pb-6 sm:pb-8 px-5 sm:px-6 md:px-8 safe-area-inset-bottom">
                <div className="flex-1 overflow-y-auto no-scrollbar">
                  <nav className="space-y-0">
                    {navLinks.map((link, index) => (
                      <MobileNavLink
                        key={link.href}
                        href={link.href}
                        label={link.label}
                        isActive={location.pathname === link.href}
                        index={index}
                        onClick={closeMenu}
                        shouldReduceMotion={shouldReduceMotion}
                      />
                    ))}
                  </nav>

                  <motion.div
                    initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      duration: shouldReduceMotion ? 0.15 : 0.4, 
                      delay: shouldReduceMotion ? 0 : 0.4 
                    }}
                    className="mt-8 md:mt-10"
                  >
                    <Button 
                      variant="accent" 
                      size="lg" 
                      asChild 
                      className="w-full justify-center gap-2 h-12 md:h-14 text-base md:text-lg"
                    >
                      <Link to="/contact" onClick={closeMenu}>
                        <span>Start Your Project</span>
                        <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                      </Link>
                    </Button>
                  </motion.div>
                </div>

                <motion.div
                  initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: shouldReduceMotion ? 0.15 : 0.3, 
                    delay: shouldReduceMotion ? 0 : 0.5 
                  }}
                  className="pt-6 md:pt-8 border-t border-border/30 mt-auto"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs md:text-sm text-muted-foreground">
                      Theme
                    </span>
                    <div className="flex items-center gap-2 bg-secondary/50 p-1 rounded-full">
                      <button
                        onClick={() => setTheme("light")}
                        className={cn(
                          "p-2 rounded-full transition-all duration-200",
                          theme === "light" 
                            ? "bg-background text-foreground shadow-sm" 
                            : "text-muted-foreground hover:text-foreground"
                        )}
                        aria-label="Light mode"
                      >
                        <Sun className="w-4 h-4 md:w-5 md:h-5" />
                      </button>
                      <button
                        onClick={() => setTheme("dark")}
                        className={cn(
                          "p-2 rounded-full transition-all duration-200",
                          theme === "dark" 
                            ? "bg-background text-foreground shadow-sm" 
                            : "text-muted-foreground hover:text-foreground"
                        )}
                        aria-label="Dark mode"
                      >
                        <Moon className="w-4 h-4 md:w-5 md:h-5" />
                      </button>
                    </div>
                  </div>
                  <p className="text-[10px] md:text-xs text-muted-foreground/60 mt-4 text-center">
                    © {new Date().getFullYear()} Byldist. All rights reserved.
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}