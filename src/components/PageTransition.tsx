import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { useState, useEffect, useRef, useCallback } from "react";

interface PageTransitionProps {
  children: React.ReactNode;
}

const PageLoader = ({ progress, shouldReduceMotion }: { progress: number; shouldReduceMotion: boolean | null }) => {
  if (shouldReduceMotion) {
    return (
      <motion.div 
        className="fixed inset-0 z-[100] bg-background"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15 }}
      >
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-accent" style={{ width: `${progress}%` }} />
      </motion.div>
    );
  }

  return (
    <motion.div
      className="fixed inset-0 z-[100] overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
    >
      <motion.div
        className="absolute inset-0 bg-background"
        initial={{ y: 0 }}
        exit={{ y: "-100%" }}
        transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
      />

      <motion.div
        className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent via-accent to-transparent origin-left"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: progress / 100 }}
        transition={{ duration: 0.05, ease: "linear" }}
      />

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative flex flex-col items-center gap-6">
          <div className="relative w-16 h-16">
            <motion.div
              className="absolute inset-0 border-2 border-foreground/10 rounded-sm"
              initial={{ scale: 0.8, opacity: 0, rotate: -10 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            />
            
            <motion.div
              className="absolute top-0 left-0 w-full h-[2px] bg-foreground"
              initial={{ scaleX: 0, originX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.15, delay: 0.05, ease: [0.4, 0, 0.2, 1] }}
            />
            <motion.div
              className="absolute top-0 right-0 w-[2px] h-full bg-foreground"
              initial={{ scaleY: 0, originY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.15, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
            />
            <motion.div
              className="absolute bottom-0 left-0 w-full h-[2px] bg-foreground"
              initial={{ scaleX: 0, originX: 1 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.15, delay: 0.15, ease: [0.4, 0, 0.2, 1] }}
            />
            <motion.div
              className="absolute top-0 left-0 w-[2px] h-full bg-foreground"
              initial={{ scaleY: 0, originY: 1 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.15, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
            />
            
            <motion.div
              className="absolute inset-[6px] flex items-center justify-center"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.15, delay: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <div className="w-2 h-2 bg-accent rounded-full" />
            </motion.div>
          </div>

          <motion.div
            className="flex items-center gap-1"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: 0.15 }}
          >
            <span className="text-xs font-medium tracking-widest text-muted-foreground uppercase">
              Loading
            </span>
            <motion.span
              className="inline-flex"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="text-xs text-muted-foreground">...</span>
            </motion.span>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2, delay: 0.2 }}
      >
        <div className="w-32 h-[3px] bg-secondary rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-accent rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1, ease: "easeOut" }}
          />
        </div>
        <span className="text-[10px] font-mono text-muted-foreground/60">
          {Math.round(progress)}%
        </span>
      </motion.div>
    </motion.div>
  );
};

export function PageTransition({ children }: PageTransitionProps) {
  const location = useLocation();
  const shouldReduceMotion = useReducedMotion();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [displayChildren, setDisplayChildren] = useState(children);
  const [displayKey, setDisplayKey] = useState(location.key);
  const [isReady, setIsReady] = useState(false);
  const prevPathRef = useRef(location.pathname);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const isInitialMount = useRef(true);

  const startProgress = useCallback(() => {
    setProgress(0);
    let currentProgress = 0;
    
    progressIntervalRef.current = setInterval(() => {
      currentProgress += Math.random() * 25 + 15;
      if (currentProgress >= 90) {
        currentProgress = 90;
        if (progressIntervalRef.current) {
          clearInterval(progressIntervalRef.current);
        }
      }
      setProgress(currentProgress);
    }, 30);
  }, []);

  const completeProgress = useCallback(() => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }
    setProgress(100);
  }, []);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      setIsReady(true);
      return;
    }

    if (location.pathname !== prevPathRef.current) {
      setIsTransitioning(true);
      setIsReady(false);
      startProgress();
      
      window.scrollTo({ top: 0, behavior: "instant" });

      const transitionDuration = shouldReduceMotion ? 150 : 400;
      
      const timer = setTimeout(() => {
        completeProgress();
        
        setTimeout(() => {
          setDisplayChildren(children);
          setDisplayKey(location.key);
          prevPathRef.current = location.pathname;
          
          setTimeout(() => {
            setIsTransitioning(false);
            setIsReady(true);
            setProgress(0);
          }, shouldReduceMotion ? 50 : 100);
        }, shouldReduceMotion ? 50 : 100);
      }, transitionDuration);

      return () => {
        clearTimeout(timer);
        if (progressIntervalRef.current) {
          clearInterval(progressIntervalRef.current);
        }
      };
    } else {
      setDisplayChildren(children);
    }
  }, [location.pathname, location.key, children, shouldReduceMotion, startProgress, completeProgress]);

  useEffect(() => {
    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, []);

  const pageVariants = shouldReduceMotion
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
      }
    : {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -5 },
      };

  const pageTransition = {
    duration: shouldReduceMotion ? 0.15 : 0.3,
    ease: [0.25, 0.1, 0.25, 1],
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {isTransitioning && (
          <PageLoader 
            key="page-loader" 
            progress={progress}
            shouldReduceMotion={shouldReduceMotion} 
          />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={displayKey}
          initial={pageVariants.initial}
          animate={isReady ? pageVariants.animate : pageVariants.initial}
          exit={pageVariants.exit}
          transition={pageTransition}
          className="will-change-transform"
        >
          {displayChildren}
        </motion.div>
      </AnimatePresence>
    </>
  );
}