import { useState, useEffect, memo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { Button } from "@/components/ui/button";
import { useCookieConsent, CookiePreferences } from "@/hooks/useCookieConsent";
import { cn } from "@/lib/utils";
import {
  Cookie,
  Shield,
  BarChart3,
  Megaphone,
  Zap,
  Check,
  Settings2,
  Clock,
  Globe,
  Database,
  AlertCircle,
} from "lucide-react";
import { contactData } from "@/data/appData";

interface CookieToggleCardProps {
  id: keyof CookiePreferences;
  label: string;
  description: string;
  details: string[];
  icon: React.ReactNode;
  enabled: boolean;
  disabled?: boolean;
  onToggle: (id: keyof CookiePreferences) => void;
}

const CookieToggleCard = memo(function CookieToggleCard({
  id,
  label,
  description,
  details,
  icon,
  enabled,
  disabled = false,
  onToggle,
}: CookieToggleCardProps) {
  return (
    <div className="p-5 sm:p-6 rounded-2xl bg-secondary/20 border border-border/50 hover:border-border transition-all duration-300">
      <div className="flex items-start gap-4">
        <div className="shrink-0 w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-3 mb-2">
            <h3 className="font-display font-semibold text-lg">{label}</h3>
            <button
              type="button"
              onClick={() => !disabled && onToggle(id)}
              disabled={disabled}
              className={cn(
                "relative shrink-0 w-12 h-6 rounded-full transition-colors duration-200",
                enabled ? "bg-accent" : "bg-muted-foreground/30",
                disabled && "opacity-60 cursor-not-allowed"
              )}
              aria-checked={enabled ? "true" : "false"}
              role="switch"
            >
              <span
                className={cn(
                  "absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-200",
                  enabled && "translate-x-6"
                )}
              />
            </button>
          </div>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-3">
            {description}
          </p>
          {disabled && (
            <span className="inline-flex items-center gap-1.5 text-xs text-accent font-medium mb-3">
              <Check className="w-3.5 h-3.5" /> Always active - Required for website functionality
            </span>
          )}
          <ul className="space-y-1.5">
            {details.map((detail, idx) => (
              <li key={idx} className="text-xs sm:text-sm text-muted-foreground/80 flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-accent mt-2 shrink-0" />
                {detail}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
});

const InfoCard = memo(function InfoCard({
  icon,
  title,
  content,
}: {
  icon: React.ReactNode;
  title: string;
  content: string;
}) {
  return (
    <div className="p-4 sm:p-5 rounded-xl bg-secondary/30 border border-border/50">
      <div className="flex items-start gap-3">
        <div className="shrink-0 w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
          {icon}
        </div>
        <div>
          <h4 className="font-medium text-sm sm:text-base mb-1">{title}</h4>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{content}</p>
        </div>
      </div>
    </div>
  );
});

export default function Cookies() {
  const { preferences, savePreferences, hasConsented, openPreferences } = useCookieConsent();
  const [localPrefs, setLocalPrefs] = useState<CookiePreferences>(preferences);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setLocalPrefs(preferences);
  }, [preferences]);

  const handleToggle = (id: keyof CookiePreferences) => {
    if (id === "necessary") return;
    setLocalPrefs((prev) => ({ ...prev, [id]: !prev[id] }));
    setSaved(false);
  };

  const handleSave = () => {
    savePreferences(localPrefs);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleAcceptAll = () => {
    const allAccepted: CookiePreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true,
    };
    setLocalPrefs(allAccepted);
    savePreferences(allAccepted);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleRejectAll = () => {
    const onlyNecessary: CookiePreferences = {
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false,
    };
    setLocalPrefs(onlyNecessary);
    savePreferences(onlyNecessary);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const cookieTypes = [
    {
      id: "necessary" as const,
      label: "Essential Cookies",
      description:
        "These cookies are strictly necessary for the website to function and cannot be switched off. They are usually only set in response to actions made by you, such as setting your privacy preferences, logging in, or filling in forms.",
      details: [
        "Session management and authentication",
        "Security features and fraud prevention",
        "Load balancing and performance optimization",
        "Accessibility preferences",
      ],
      icon: <Shield className="w-5 h-5" />,
      disabled: true,
    },
    {
      id: "analytics" as const,
      label: "Analytics Cookies",
      description:
        "These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site. They help us understand which pages are the most popular and how visitors move around the site.",
      details: [
        "Page view and visitor statistics",
        "User behavior and interaction tracking",
        "Performance metrics and load times",
        "Conversion tracking and goal completions",
      ],
      icon: <BarChart3 className="w-5 h-5" />,
    },
    {
      id: "marketing" as const,
      label: "Marketing Cookies",
      description:
        "These cookies may be set through our site by our advertising partners. They may be used by those companies to build a profile of your interests and show you relevant advertisements on other sites.",
      details: [
        "Targeted advertising based on interests",
        "Cross-site visitor tracking",
        "Ad campaign effectiveness measurement",
        "Social media integration and sharing",
      ],
      icon: <Megaphone className="w-5 h-5" />,
    },
    {
      id: "functional" as const,
      label: "Functional Cookies",
      description:
        "These cookies enable the website to provide enhanced functionality and personalization. They may be set by us or by third-party providers whose services we have added to our pages.",
      details: [
        "Language and region preferences",
        "Personalized content recommendations",
        "Chat and support features",
        "Video playback preferences",
      ],
      icon: <Zap className="w-5 h-5" />,
    },
  ];

  return (
    <>
      <section className="pt-32 pb-20 grid-background">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                <Cookie className="w-5 h-5 text-accent" />
              </div>
              <span className="label-text text-accent">Privacy</span>
            </div>
            <h1 className="heading-xl mb-6">Cookie Policy</h1>
            <p className="body-lg">
              Learn how we use cookies and similar technologies to improve your experience, and
              manage your preferences at any time.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-wide">
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            <div className="lg:col-span-2 space-y-8">
              <ScrollReveal>
                <div className="p-5 sm:p-6 rounded-2xl bg-accent/5 border border-accent/20">
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                      <Settings2 className="w-5 h-5 text-accent" />
                    </div>
                    <div className="flex-1">
                      <h2 className="font-display font-semibold text-lg mb-2">
                        Manage Your Cookie Preferences
                      </h2>
                      <p className="text-sm text-muted-foreground mb-4">
                        {hasConsented
                          ? "You can update your cookie preferences at any time using the controls below."
                          : "You haven't set your cookie preferences yet. Please choose your preferences below."}
                      </p>
                      <div className="flex flex-wrap gap-2.5">
                        <Button variant="accent" size="sm" onClick={handleAcceptAll}>
                          Accept All
                        </Button>
                        <Button variant="outline" size="sm" onClick={handleRejectAll}>
                          Reject Optional
                        </Button>
                        <Button variant="ghost" size="sm" onClick={openPreferences}>
                          Open Cookie Banner
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal>
                <h2 className="heading-md mb-6">Cookie Categories</h2>
                <div className="space-y-4">
                  {cookieTypes.map((cookie) => (
                    <CookieToggleCard
                      key={cookie.id}
                      id={cookie.id}
                      label={cookie.label}
                      description={cookie.description}
                      details={cookie.details}
                      icon={cookie.icon}
                      enabled={localPrefs[cookie.id]}
                      disabled={cookie.disabled}
                      onToggle={handleToggle}
                    />
                  ))}
                </div>
              </ScrollReveal>

              <ScrollReveal>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 p-4 rounded-xl bg-secondary/30 border border-border">
                  <Button
                    variant="accent"
                    size="lg"
                    onClick={handleSave}
                    className="flex-1 sm:flex-none"
                  >
                    {saved ? (
                      <>
                        <Check className="w-4 h-4 mr-2" />
                        Preferences Saved
                      </>
                    ) : (
                      "Save My Preferences"
                    )}
                  </Button>
                  <p className="text-xs sm:text-sm text-muted-foreground text-center sm:text-left">
                    Your preferences will be stored locally and respected across all pages.
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal>
                <div className="prose prose-lg max-w-none">
                  <div className="space-y-8">
                    <div>
                      <h2 className="heading-md mb-4">What Are Cookies?</h2>
                      <p className="text-muted-foreground leading-relaxed">
                        Cookies are small text files that are placed on your device when you visit a
                        website. They are widely used to make websites work more efficiently, as
                        well as to provide information to the website owners. Cookies can be
                        "persistent" or "session" cookies. Persistent cookies remain on your device
                        after you close your browser, while session cookies are deleted when you
                        close your browser.
                      </p>
                    </div>

                    <div>
                      <h2 className="heading-md mb-4">How We Use Cookies</h2>
                      <p className="text-muted-foreground leading-relaxed mb-4">
                        Byldist uses cookies and similar technologies for several purposes:
                      </p>
                      <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                        <li>To ensure the website functions properly and securely</li>
                        <li>To remember your preferences and settings</li>
                        <li>To analyze how visitors use our website</li>
                        <li>To personalize content and provide relevant recommendations</li>
                        <li>To measure the effectiveness of our marketing campaigns</li>
                      </ul>
                    </div>

                    <div>
                      <h2 className="heading-md mb-4">Third-Party Cookies</h2>
                      <p className="text-muted-foreground leading-relaxed">
                        Some cookies on our website are set by third parties. These may include
                        analytics providers (like Google Analytics), social media platforms, and
                        advertising networks. These third parties may use cookies to track your
                        activities across different websites to build a profile of your interests.
                        Please refer to the privacy policies of these third parties for more
                        information about how they use your data.
                      </p>
                    </div>

                    <div>
                      <h2 className="heading-md mb-4">Managing Cookies</h2>
                      <p className="text-muted-foreground leading-relaxed mb-4">
                        You can control and manage cookies in several ways:
                      </p>
                      <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                        <li>
                          <strong className="text-foreground">Through this page:</strong> Use the
                          preference controls above to enable or disable different cookie categories
                        </li>
                        <li>
                          <strong className="text-foreground">Browser settings:</strong> Most
                          browsers allow you to refuse cookies or delete existing cookies through
                          their settings
                        </li>
                        <li>
                          <strong className="text-foreground">Third-party opt-outs:</strong> Many
                          advertising networks offer opt-out mechanisms through industry programs
                          like the Digital Advertising Alliance
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h2 className="heading-md mb-4">Updates to This Policy</h2>
                      <p className="text-muted-foreground leading-relaxed">
                        We may update this Cookie Policy from time to time to reflect changes in
                        our practices or for other operational, legal, or regulatory reasons. We
                        encourage you to review this page periodically for the latest information
                        about our cookie practices.
                      </p>
                    </div>

                    <div>
                      <h2 className="heading-md mb-4">Contact Us</h2>
                      <p className="text-muted-foreground leading-relaxed">
                        If you have any questions about our use of cookies or this policy, please
                        contact us at:
                        <br /><br />
                        <strong className="text-foreground">Byldist</strong>
                        <br />
                        Email: {contactData?.email}
                        <br />
                        Address: {contactData?.email}
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            <div className="space-y-6">
              <ScrollReveal>
                <div className="sticky top-28">
                  <h3 className="font-display font-semibold text-lg mb-4">Quick Info</h3>
                  <div className="space-y-3">
                    <InfoCard
                      icon={<Clock className="w-4 h-4" />}
                      title="Last Updated"
                      content="December 2024"
                    />
                    <InfoCard
                      icon={<Globe className="w-4 h-4" />}
                      title="Applies To"
                      content="All Byldist websites and services"
                    />
                    <InfoCard
                      icon={<Database className="w-4 h-4" />}
                      title="Data Storage"
                      content="Preferences stored locally in your browser"
                    />
                    <InfoCard
                      icon={<AlertCircle className="w-4 h-4" />}
                      title="Your Rights"
                      content="You can change your preferences at any time"
                    />
                  </div>

                  <div className="mt-6 p-4 rounded-xl bg-secondary/30 border border-border/50">
                    <h4 className="font-medium text-sm mb-2">Related Policies</h4>
                    <div className="space-y-2">
                      <Link
                        to="/privacy"
                        className="block text-sm text-muted-foreground hover:text-accent transition-colors"
                      >
                        Privacy Policy
                      </Link>
                      <Link
                        to="/terms"
                        className="block text-sm text-muted-foreground hover:text-accent transition-colors"
                      >
                        Terms of Service
                      </Link>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
