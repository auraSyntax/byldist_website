import { createContext, useContext, useState, useCallback, useEffect, useMemo } from "react";

export interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
}

interface CookieConsentState {
  preferences: CookiePreferences;
  hasConsented: boolean;
  showBanner: boolean;
  updatePreferences: (preferences: Partial<CookiePreferences>) => void;
  acceptAll: () => void;
  rejectAll: () => void;
  savePreferences: (preferences: CookiePreferences) => void;
  openPreferences: () => void;
  closeBanner: () => void;
}

const STORAGE_KEY = "byldist-cookie-consent";

const defaultPreferences: CookiePreferences = {
  necessary: true,
  analytics: false,
  marketing: false,
  functional: false,
};

const CookieConsentContext = createContext<CookieConsentState | undefined>(undefined);

function getStoredConsent(): { preferences: CookiePreferences; hasConsented: boolean } | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return {
        preferences: { ...defaultPreferences, ...parsed.preferences },
        hasConsented: parsed.hasConsented ?? false,
      };
    }
  } catch {
    // Ignore parsing errors
  }
  return null;
}

function saveToStorage(preferences: CookiePreferences, hasConsented: boolean): void {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ preferences, hasConsented, timestamp: Date.now() })
    );
  } catch {
    // Ignore storage errors
  }
}

export function CookieConsentProvider({ children }: { children: React.ReactNode }) {
  const [preferences, setPreferences] = useState<CookiePreferences>(defaultPreferences);
  const [hasConsented, setHasConsented] = useState(false);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const stored = getStoredConsent();
    if (stored) {
      setPreferences(stored.preferences);
      setHasConsented(stored.hasConsented);
      setShowBanner(false);
    } else {
      const timer = setTimeout(() => setShowBanner(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const updatePreferences = useCallback((newPrefs: Partial<CookiePreferences>) => {
    setPreferences((prev) => ({
      ...prev,
      ...newPrefs,
      necessary: true,
    }));
  }, []);

  const acceptAll = useCallback(() => {
    const allAccepted: CookiePreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true,
    };
    setPreferences(allAccepted);
    setHasConsented(true);
    setShowBanner(false);
    saveToStorage(allAccepted, true);
  }, []);

  const rejectAll = useCallback(() => {
    const onlyNecessary: CookiePreferences = {
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false,
    };
    setPreferences(onlyNecessary);
    setHasConsented(true);
    setShowBanner(false);
    saveToStorage(onlyNecessary, true);
  }, []);

  const savePreferences = useCallback((newPrefs: CookiePreferences) => {
    const finalPrefs = { ...newPrefs, necessary: true };
    setPreferences(finalPrefs);
    setHasConsented(true);
    setShowBanner(false);
    saveToStorage(finalPrefs, true);
  }, []);

  const openPreferences = useCallback(() => {
    setShowBanner(true);
  }, []);

  const closeBanner = useCallback(() => {
    setShowBanner(false);
  }, []);

  const value = useMemo(
    () => ({
      preferences,
      hasConsented,
      showBanner,
      updatePreferences,
      acceptAll,
      rejectAll,
      savePreferences,
      openPreferences,
      closeBanner,
    }),
    [preferences, hasConsented, showBanner, updatePreferences, acceptAll, rejectAll, savePreferences, openPreferences, closeBanner]
  );

  return (
    <CookieConsentContext.Provider value={value}>
      {children}
    </CookieConsentContext.Provider>
  );
}

export function useCookieConsent() {
  const context = useContext(CookieConsentContext);
  if (!context) {
    throw new Error("useCookieConsent must be used within a CookieConsentProvider");
  }
  return context;
}
