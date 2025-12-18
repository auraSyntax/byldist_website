import { motion, useReducedMotion } from "framer-motion";
import { useRef, memo, useState, useEffect, useMemo, useCallback } from "react";
import {
  Layers,
  Shield,
  Clock,
  HardHat,
  BarChart3,
  ArrowRight
} from "lucide-react";

const features = [
  {
    id: 1,
    title: "Execution-as-a-Service model",
    description: "A dedicated execution arm that integrates seamlessly with your design process.",
    icon: Layers,
    highlight: "Seamless Integration",
  },
  {
    id: 2,
    title: "Protects design intent",
    description: "We understand drawings and ensure your vision is realized without compromise.",
    icon: Shield,
    highlight: "Vision Preserved",
  },
  {
    id: 3,
    title: "Predictable timelines",
    description: "Process-driven execution means fewer surprises and reliable delivery dates.",
    icon: Clock,
    highlight: "On-Time Delivery",
  },
  {
    id: 4,
    title: "Builder-first team",
    description: "Our team comes from construction, not sales. We speak the language of sites.",
    icon: HardHat,
    highlight: "Site Expertise",
  },
  {
    id: 5,
    title: "Transparent, measurable delivery",
    description: "Real-time dashboards and regular reporting keep everyone aligned.",
    icon: BarChart3,
    highlight: "Full Visibility",
  },
];

const FeatureCard = memo(function FeatureCard({
  feature,
  index,
  isInView,
  shouldReduceMotion,
  animationDuration,
  delay
}: {
  feature: typeof features[0];
  index: number;
  isInView: boolean;
  shouldReduceMotion: boolean | null;
  animationDuration: number;
  delay: number;
}) {
  const variants = useMemo(() => ({
    hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  }), [shouldReduceMotion]);

  // Large card (01)
  if (index === 0) {
    return (
      <motion.div
        variants={variants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{ duration: animationDuration, delay }}
        className="lg:col-span-7 group"
      >
        <div className="relative h-full min-h-[240px] sm:min-h-[260px] md:min-h-[280px] p-5 sm:p-6 lg:p-8 bg-secondary overflow-hidden hover:border-accent/50 transition-colors duration-300 border border-transparent">
          <span className="absolute -bottom-6 -right-2 sm:-bottom-8 sm:-right-4 text-[8rem] sm:text-[10rem] md:text-[12rem] font-display font-bold text-foreground/[0.03] leading-none pointer-events-none select-none">
            01
          </span>

          <div className="relative z-10 flex flex-col h-full">
            <div className="flex items-start justify-between mb-4 sm:mb-6">
              <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center bg-accent text-accent-foreground">
                <Layers className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1.5} />
              </div>
              <span className="text-[10px] sm:text-xs font-medium text-accent text-shadow-solid tracking-wider uppercase bg-accent/10 px-2 py-1 sm:px-3 sm:py-1.5">
                {feature.highlight}
              </span>
            </div>

            <h3 className="font-display text-lg sm:text-xl lg:text-2xl font-medium text-foreground mb-2 sm:mb-3">
              {feature.title}
            </h3>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed max-w-md">
              {feature.description}
            </p>
          </div>
        </div>
      </motion.div>
    );
  }

  // Shield card (02)
  if (index === 1) {
    return (
      <motion.div
        variants={variants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{ duration: animationDuration, delay }}
        className="lg:col-span-5 group"
      >
        <div className="relative h-full min-h-[240px] sm:min-h-[260px] md:min-h-[280px] p-5 sm:p-6 lg:p-8 border border-transparent bg-secondary overflow-hidden hover:border-accent/50 transition-colors duration-300">
          <span className="absolute -bottom-4 -right-2 sm:-bottom-6 sm:-right-2 text-[7rem] sm:text-[9rem] md:text-[10rem] font-display font-bold text-foreground/[0.03] leading-none pointer-events-none select-none">
            02
          </span>

          <div className="relative z-10 flex flex-col h-full">
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center border border-accent bg-accent">
                <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-black" strokeWidth={1.5} />
              </div>
              <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
            </div>

            <span className="text-[10px] sm:text-xs font-medium text-accent text-shadow-solid tracking-wider uppercase mb-1 sm:mb-2">
              {feature.highlight}
            </span>
            <h3 className="font-display text-base sm:text-lg font-medium text-foreground mb-2 sm:mb-3">
              {feature.title}
            </h3>
            <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
              {feature.description}
            </p>
          </div>
        </div>
      </motion.div>
    );
  }

  // Clock card (03)
  if (index === 2) {
    return (
      <motion.div
        variants={variants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{ duration: animationDuration, delay }}
        className="lg:col-span-5 group"
      >
        <div className="relative h-full min-h-[160px] sm:min-h-[180px] lg:min-h-[200px] p-5 sm:p-6 bg-secondary text-foreground overflow-hidden hover:border-accent/50 transition-colors duration-300 border border-transparent">
          <span className="absolute -bottom-3 -right-1 sm:-bottom-4 sm:-right-2 text-[6rem] sm:text-[7rem] md:text-[8rem] font-display font-bold text-foreground/[0.03] leading-none pointer-events-none select-none">
            03
          </span>

          <div className="relative z-10 flex flex-col h-full">
            <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
              <div className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center border border-accent bg-accent">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-black" strokeWidth={1.5} />
              </div>
              <span className="text-[10px] sm:text-xs font-medium tracking-wider uppercase text-accent text-shadow-solid">
                {feature.highlight}
              </span>
            </div>

            <h3 className="font-display text-base sm:text-lg font-medium mb-1.5 sm:mb-2">
              {feature.title}
            </h3>
            <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
              {feature.description}
            </p>
          </div>
        </div>
      </motion.div>
    );
  }

  // HardHat card (04)
  if (index === 3) {
    return (
      <motion.div
        variants={variants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{ duration: animationDuration, delay }}
        className="lg:col-span-4 group"
      >
        <div className="relative h-full min-h-[160px] sm:min-h-[180px] lg:min-h-[200px] p-5 sm:p-6 border border-transparent bg-secondary overflow-hidden hover:border-accent/50 transition-colors duration-300">
          <span className="absolute -bottom-3 -right-1 sm:-bottom-4 sm:-right-1 text-[6rem] sm:text-[7rem] md:text-[8rem] font-display font-bold text-foreground/[0.03] leading-none pointer-events-none select-none">
            04
          </span>

          <div className="relative z-10 flex flex-col h-full">
            <div className="flex items-start justify-between mb-3 sm:mb-4">
              <div className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center border border-accent bg-accent">
                <HardHat className="w-4 h-4 sm:w-5 sm:h-5 text-black" strokeWidth={1.5} />
              </div>
            </div>

            <h3 className="font-display text-sm sm:text-base font-medium text-foreground mb-1.5 sm:mb-2">
              {feature.title}
            </h3>
            <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
              {feature.description}
            </p>
          </div>
        </div>
      </motion.div>
    );
  }

  // BarChart card (05)
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{ duration: animationDuration, delay }}
      className="lg:col-span-3 group"
    >
      <div className="relative h-full min-h-[160px] sm:min-h-[180px] lg:min-h-[200px] p-5 sm:p-6 bg-secondary text-accent-foreground overflow-hidden border border-transparent hover:border-accent/50 transition-colors duration-300">
        <span className="absolute -bottom-3 -right-1 sm:-bottom-4 sm:-right-1 text-[6rem] sm:text-[7rem] md:text-[8rem] font-display font-bold text-foreground/[0.03] leading-none pointer-events-none select-none">
          05
        </span>

        <div className="relative z-10 flex flex-col h-full">
          <div className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center border border-accent bg-accent mb-3 sm:mb-4">
            <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 text-black" strokeWidth={1.5} />
          </div>

          <span className="text-[10px] sm:text-xs font-medium tracking-wider uppercase mb-1.5 sm:mb-2 opacity-80 text-accent text-shadow-solid">
            {feature.highlight}
          </span>
          <h3 className="font-display text-sm sm:text-base font-medium mb-1.5 sm:mb-2 text-foreground">
            {feature.title}
          </h3>
          <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
            {feature.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
});

export function WhyByldist() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const hasAnimated = useRef(false);

  const animationDuration = shouldReduceMotion ? 0.2 : 0.4;
  const getDelay = useCallback((index: number) => shouldReduceMotion ? 0 : 0.1 + index * 0.08, [shouldReduceMotion]);

  useEffect(() => {
    if (!sectionRef.current || hasAnimated.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          setIsInView(true);
          hasAnimated.current = true;
        }
      },
      { threshold: 0.1, rootMargin: "-80px" }
    );

    observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  const headerVariants = useMemo(() => ({
    hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0 }
  }), [shouldReduceMotion]);

  const subtextVariants = useMemo(() => ({
    hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0 }
  }), [shouldReduceMotion]);

  return (
    <section ref={sectionRef} className="section-padding bg-background relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.03 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute -top-1/2 -right-1/2 w-full h-full"
          style={{
            background: "radial-gradient(circle, currentColor 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, x: -80 }}
        animate={isInView ? { opacity: 0.02, x: 0 } : { opacity: 0, x: -80 }}
        transition={{ duration: shouldReduceMotion ? 0.4 : 1 }}
        className="absolute top-1/2 -translate-y-1/2 left-0 pointer-events-none select-none hidden xl:block will-change-transform"
      >
        <span className="text-[18rem] font-display font-bold text-foreground leading-none tracking-tighter">
          WHY
        </span>
      </motion.div>

      <div className="container-wide relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 sm:gap-6 mb-10 md:mb-16 lg:mb-20">
          <motion.div
            variants={headerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ duration: animationDuration }}
            className="max-w-xl"
          >
            <div className="flex items-center gap-3 mb-3 sm:mb-4">
              <div className="w-10 sm:w-12 h-px bg-accent" />
              <span className="label-text text-accent uppercase tracking-widest text-[10px] sm:text-xs text-shadow-solid">The Difference</span>
            </div>
            <h2 className="heading-lg">
              Why <span className="text-accent text-shadow-solid">Byldist</span>
            </h2>
          </motion.div>

          <motion.p
            variants={subtextVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ duration: animationDuration, delay: getDelay(1) }}
            className="text-muted-foreground max-w-md text-sm sm:text-base lg:text-right"
          >
            What makes us different from traditional contractors—built by builders, for builders.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-3 sm:gap-4 lg:gap-5">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.id}
              feature={feature}
              index={index}
              isInView={isInView}
              shouldReduceMotion={shouldReduceMotion}
              animationDuration={animationDuration}
              delay={getDelay(index)}
            />
          ))}
        </div>

        <motion.div
          variants={subtextVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{ duration: animationDuration, delay: getDelay(5) }}
          className="mt-10 sm:mt-12 lg:mt-16 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 pt-6 sm:pt-8 border-t border-border"
        >
          <p className="text-muted-foreground text-xs sm:text-sm max-w-md text-center sm:text-left">
            Ready to experience the Byldist difference? Let's build something exceptional together.
          </p>
          <motion.a
            href="/contact"
            whileHover={shouldReduceMotion ? {} : { x: 4 }}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-foreground hover:text-accent transition-colors duration-300"
          >
            <span>Start a conversation</span>
            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
