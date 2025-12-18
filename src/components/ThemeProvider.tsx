import { useState, useCallback, createContext, useContext, useEffect, useMemo } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

type Theme = "dark" | "light" | "system";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  isTransitioning: boolean;
};

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
  isTransitioning: false,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

// Optimized theme transition overlay with professional animations
function ThemeTransitionOverlay({ 
  isVisible, 
  targetTheme 
}: { 
  isVisible: boolean; 
  targetTheme: Theme;
}) {
  const shouldReduceMotion = useReducedMotion();
  const isDark = targetTheme === "dark";
  
  // Memoized colors for performance
  const colors = useMemo(() => ({
    bg: isDark ? "hsl(0 0% 3%)" : "hsl(0 0% 98%)",
    accent: "hsl(72 100% 50%)",
    border: isDark ? "hsl(0 0% 20%)" : "hsl(0 0% 85%)",
    subtle: isDark ? "hsl(0 0% 15%)" : "hsl(0 0% 92%)",
  }), [isDark]);

  // Container variants with staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: shouldReduceMotion ? 0.1 : 0.2,
        staggerChildren: shouldReduceMotion ? 0 : 0.04,
        delayChildren: 0.05,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: shouldReduceMotion ? 0.1 : 0.25,
        staggerChildren: 0.02,
        staggerDirection: -1,
      },
    },
  };

  // Square animation variants
  const squareVariants = {
    hidden: { scale: 0, rotate: -90, opacity: 0 },
    visible: {
      scale: 1,
      rotate: 0,
      opacity: 1,
      transition: shouldReduceMotion 
        ? { duration: 0.15 }
        : { type: "spring", visualDuration: 0.4, bounce: 0.3 },
    },
    exit: {
      scale: 0,
      rotate: 90,
      opacity: 0,
      transition: { duration: 0.2, ease: "easeIn" },
    },
  };

  // Accent dot variants
  const dotVariants = {
    hidden: { scale: 0 },
    visible: {
      scale: 1,
      transition: shouldReduceMotion 
        ? { duration: 0.1 }
        : { type: "spring", visualDuration: 0.35, bounce: 0.5 },
    },
    exit: { scale: 0, transition: { duration: 0.15 } },
  };

  // Pulse ring variants
  const pulseVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: [0.8, 1.8],
      opacity: [0.6, 0],
      transition: {
        duration: shouldReduceMotion ? 0.3 : 0.6,
        ease: "easeOut",
        repeat: 1,
        repeatDelay: 0.1,
      },
    },
  };

  // Grid line variants
  const lineVariants = {
    hidden: { scaleX: 0, opacity: 0 },
    visible: (i: number) => ({
      scaleX: 1,
      opacity: [0, 0.4, 0.2],
      transition: {
        scaleX: { 
          duration: shouldReduceMotion ? 0.1 : 0.25, 
          delay: i * 0.03,
          ease: [0.32, 0.72, 0, 1],
        },
        opacity: { duration: 0.5, delay: i * 0.03 },
      },
    }),
    exit: {
      scaleX: 0,
      opacity: 0,
      transition: { duration: 0.15 },
    },
  };
  
  if (shouldReduceMotion) {
    return (
      <AnimatePresence mode="wait">
        {isVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[100] pointer-events-none"
            style={{ backgroundColor: colors.bg }}
          />
        )}
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] pointer-events-none flex items-center justify-center overflow-hidden"
          style={{ backgroundColor: colors.bg }}
        >
          {/* Subtle background gradient */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.5, scale: 1.2 }}
            exit={{ opacity: 0, scale: 1.5 }}
            transition={{ duration: 0.5 }}
            className="absolute w-[60vmax] h-[60vmax] rounded-full"
            style={{
              background: `radial-gradient(circle, ${colors.accent}10 0%, transparent 70%)`,
            }}
          />
          
          {/* Main animation container */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative w-28 h-28"
          >
            {/* Pulse rings */}
            <motion.div
              variants={pulseVariants}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div
                className="w-20 h-20 rounded-md border-2"
                style={{ borderColor: colors.accent }}
              />
            </motion.div>

            {/* Outer rotating square */}
            <motion.div
              variants={squareVariants}
              className="absolute inset-0 flex items-center justify-center"
            >
              <motion.div
                animate={{ rotate: 45 }}
                transition={{ 
                  type: "spring", 
                  visualDuration: 0.5, 
                  bounce: 0.2,
                  delay: 0.1 
                }}
                className="w-14 h-14 border-2 rounded-sm"
                style={{ borderColor: colors.accent }}
              />
            </motion.div>

            {/* Inner square */}
            <motion.div
              variants={squareVariants}
              className="absolute inset-0 flex items-center justify-center"
            >
              <motion.div
                animate={{ rotate: -22.5 }}
                transition={{ 
                  type: "spring", 
                  visualDuration: 0.45, 
                  bounce: 0.15,
                  delay: 0.15 
                }}
                className="w-8 h-8 border rounded-sm"
                style={{ borderColor: colors.border }}
              />
            </motion.div>

            {/* Center accent dot */}
            <motion.div
              variants={dotVariants}
              className="absolute inset-0 flex items-center justify-center"
            >
              <motion.div
                animate={{ 
                  scale: [1, 1.15, 1],
                }}
                transition={{ 
                  duration: 0.8, 
                  repeat: Infinity,
                  ease: "easeInOut" 
                }}
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: colors.accent }}
              />
            </motion.div>

            {/* Decorative grid lines */}
            <div className="absolute inset-0 overflow-hidden">
              {[0, 1, 2, 3].map((i) => (
                <motion.div
                  key={`h-${i}`}
                  custom={i}
                  variants={lineVariants}
                  className="absolute h-px left-0 right-0"
                  style={{
                    top: `${(i + 1) * 20}%`,
                    backgroundColor: colors.subtle,
                    transformOrigin: "left center",
                  }}
                />
              ))}
              {[0, 1, 2, 3].map((i) => (
                <motion.div
                  key={`v-${i}`}
                  custom={i}
                  variants={{
                    ...lineVariants,
                    hidden: { scaleY: 0, opacity: 0 },
                    visible: (i: number) => ({
                      scaleY: 1,
                      opacity: [0, 0.4, 0.2],
                      transition: {
                        scaleY: { duration: 0.25, delay: i * 0.03 + 0.1, ease: [0.32, 0.72, 0, 1] },
                        opacity: { duration: 0.5, delay: i * 0.03 + 0.1 },
                      },
                    }),
                    exit: { scaleY: 0, opacity: 0, transition: { duration: 0.15 } },
                  }}
                  className="absolute w-px top-0 bottom-0"
                  style={{
                    left: `${(i + 1) * 20}%`,
                    backgroundColor: colors.subtle,
                    transformOrigin: "center top",
                  }}
                />
              ))}
            </div>

            {/* Corner accents */}
            {[
              { x: 0, y: 0, rotate: 0 },
              { x: '100%', y: 0, rotate: 90 },
              { x: '100%', y: '100%', rotate: 180 },
              { x: 0, y: '100%', rotate: 270 },
            ].map((pos, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: 0.6, 
                  scale: 1,
                  transition: { delay: 0.2 + i * 0.05, duration: 0.2 }
                }}
                exit={{ opacity: 0, scale: 0 }}
                className="absolute w-2 h-2"
                style={{
                  left: pos.x,
                  top: pos.y,
                  transform: `translate(-50%, -50%) rotate(${pos.rotate}deg)`,
                }}
              >
                <div
                  className="w-full h-px"
                  style={{ backgroundColor: colors.accent }}
                />
                <div
                  className="h-full w-px absolute top-0 left-0"
                  style={{ backgroundColor: colors.accent }}
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function ThemeProvider({
  children,
  defaultTheme = "light",
  storageKey = "byldist-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  );
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [targetTheme, setTargetTheme] = useState<Theme>(theme);

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";

      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  const setTheme = useCallback((newTheme: Theme) => {
    if (newTheme === theme) return;
    
    setTargetTheme(newTheme);
    setIsTransitioning(true);
    
    // Apply theme after animation starts
    setTimeout(() => {
      localStorage.setItem(storageKey, newTheme);
      setThemeState(newTheme);
    }, 200);
    
    // Hide overlay after animation completes
    setTimeout(() => {
      setIsTransitioning(false);
    }, 550);
  }, [theme, storageKey]);

  const value = {
    theme,
    setTheme,
    isTransitioning,
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      <ThemeTransitionOverlay isVisible={isTransitioning} targetTheme={targetTheme} />
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};