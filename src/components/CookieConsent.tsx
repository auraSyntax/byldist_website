import { useState, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Cookie, X, Settings2, Check, Shield, BarChart3, Megaphone, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCookieConsent, CookiePreferences } from "@/hooks/useCookieConsent";
import { cn } from "@/lib/utils";

interface CookieToggleProps {
  id: keyof CookiePreferences;
  label: string;
  description: string;
  icon: React.ReactNode;
  enabled: boolean;
  disabled?: boolean;
  onToggle: (id: keyof CookiePreferences) => void;
}

const CookieToggle = memo(function CookieToggle({
  id,
  label,
  description,
  icon,
  enabled,
  disabled = false,
  onToggle,
}: CookieToggleProps) {
  return (
    <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-secondary/30 border border-border/50 hover:border-border transition-colors">
      <div className="shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <h4 className="font-medium text-sm sm:text-base">{label}</h4>
          <button
            type="button"
            onClick={() => !disabled && onToggle(id)}
            disabled={disabled}
            className={cn(
              "relative shrink-0 w-10 h-5 sm:w-11 sm:h-6 rounded-full transition-colors duration-200",
              enabled ? "bg-accent" : "bg-muted-foreground/30",
              disabled && "opacity-60 cursor-not-allowed"
            )}
            aria-checked={enabled}
            role="switch"
          >
            <span
              className={cn(
                "absolute top-0.5 left-0.5 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-white shadow-sm transition-transform duration-200",
                enabled && "translate-x-5"
              )}
            />
          </button>
        </div>
        <p className="text-xs sm:text-sm text-muted-foreground mt-1 leading-relaxed">
          {description}
        </p>
        {disabled && (
          <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs text-accent mt-1.5">
            <Check className="w-3 h-3" /> Always active
          </span>
        )}
      </div>
    </div>
  );
});

export function CookieConsentBanner() {
  const { showBanner, acceptAll, rejectAll, savePreferences, preferences, closeBanner } =
    useCookieConsent();
  const [showSettings, setShowSettings] = useState(false);
  const [localPrefs, setLocalPrefs] = useState<CookiePreferences>(preferences);

  const handleToggle = (id: keyof CookiePreferences) => {
    if (id === "necessary") return;
    setLocalPrefs((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSave = () => {
    savePreferences(localPrefs);
  };

  const cookieTypes = [
    {
      id: "necessary" as const,
      label: "Essential Cookies",
      description:
        "Required for the website to function properly. These cannot be disabled as they are necessary for basic features like security, session management, and accessibility.",
      icon: <Shield className="w-4 h-4 sm:w-5 sm:h-5" />,
      disabled: true,
    },
    {
      id: "analytics" as const,
      label: "Analytics Cookies",
      description:
        "Help us understand how visitors interact with our website by collecting anonymous information. This helps us improve user experience and site performance.",
      icon: <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5" />,
    },
    {
      id: "marketing" as const,
      label: "Marketing Cookies",
      description:
        "Used to track visitors across websites to display relevant advertisements. These cookies may share information with other organizations or advertisers.",
      icon: <Megaphone className="w-4 h-4 sm:w-5 sm:h-5" />,
    },
    {
      id: "functional" as const,
      label: "Functional Cookies",
      description:
        "Enable enhanced functionality and personalization, such as remembering your preferences, language settings, and providing personalized features.",
      icon: <Zap className="w-4 h-4 sm:w-5 sm:h-5" />,
    },
  ];

  return (
    <AnimatePresence>
      {showBanner && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-background/60 backdrop-blur-sm z-[90]"
            onClick={closeBanner}
          />
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.95 }}
            transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
            className="fixed bottom-0 left-0 right-0 z-[91] p-3 sm:p-4 md:p-6"
          >
            <div className="max-w-2xl mx-auto bg-background border border-border rounded-2xl shadow-2xl overflow-hidden">
              <div className="p-4 sm:p-5 md:p-6">
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-2.5 sm:gap-3">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                      <Cookie className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-base sm:text-lg">
                        Cookie Preferences
                      </h3>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        Manage your privacy settings
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={closeBanner}
                    className="p-1.5 sm:p-2 rounded-full hover:bg-secondary transition-colors"
                    aria-label="Close"
                  >
                    <X className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
                  </button>
                </div>

                <AnimatePresence mode="wait">
                  {!showSettings ? (
                    <motion.div
                      key="simple"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-5">
                        We use cookies to enhance your browsing experience, analyze site traffic,
                        and personalize content. By clicking "Accept All", you consent to our use
                        of cookies. You can customize your preferences or learn more in our{" "}
                        <Link
                          to="/cookies"
                          className="text-accent hover:underline font-medium"
                          onClick={closeBanner}
                        >
                          Cookie Policy
                        </Link>
                        .
                      </p>

                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3">
                        <Button
                          variant="accent"
                          size="default"
                          onClick={acceptAll}
                          className="flex-1 sm:flex-none h-10 sm:h-11"
                        >
                          Accept All
                        </Button>
                        <Button
                          variant="outline"
                          size="default"
                          onClick={rejectAll}
                          className="flex-1 sm:flex-none h-10 sm:h-11"
                        >
                          Reject All
                        </Button>
                        <Button
                          variant="ghost"
                          size="default"
                          onClick={() => setShowSettings(true)}
                          className="flex-1 sm:flex-none h-10 sm:h-11 gap-2"
                        >
                          <Settings2 className="w-4 h-4" />
                          Customize
                        </Button>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="settings"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="space-y-2.5 sm:space-y-3 mb-5 max-h-[45vh] overflow-y-auto pr-1">
                        {cookieTypes.map((cookie) => (
                          <CookieToggle
                            key={cookie.id}
                            id={cookie.id}
                            label={cookie.label}
                            description={cookie.description}
                            icon={cookie.icon}
                            enabled={localPrefs[cookie.id]}
                            disabled={cookie.disabled}
                            onToggle={handleToggle}
                          />
                        ))}
                      </div>

                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 pt-3 border-t border-border">
                        <Button
                          variant="accent"
                          size="default"
                          onClick={handleSave}
                          className="flex-1 sm:flex-none h-10 sm:h-11"
                        >
                          Save Preferences
                        </Button>
                        <Button
                          variant="ghost"
                          size="default"
                          onClick={() => setShowSettings(false)}
                          className="flex-1 sm:flex-none h-10 sm:h-11"
                        >
                          Back
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
