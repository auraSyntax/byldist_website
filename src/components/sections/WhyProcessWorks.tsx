import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { TrendingUp, Target, Clock, Users } from "lucide-react";

const stats = [
  {
    id: 1,
    value: 90,
    suffix: "%",
    label: "Fewer Surprises",
    description: "Systematic planning eliminates unexpected issues",
    icon: Target,
  },
  {
    id: 2,
    value: 95,
    suffix: "%",
    label: "On-Time Delivery",
    description: "Process-driven execution ensures deadlines",
    icon: Clock,
  },
  {
    id: 3,
    value: 5,
    prefix: "±",
    suffix: "%",
    label: "Budget Accuracy",
    description: "Detailed planning keeps costs predictable",
    icon: TrendingUp,
  },
  {
    id: 4,
    value: 85,
    suffix: "%",
    label: "Client Retention",
    description: "Quality results build lasting relationships",
    icon: Users,
  },
];

function useCountAnimation(
  targetValue: number,
  isInView: boolean,
  duration: number = 2000
) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    let animationFrameId: number;

    const animate = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function for smooth animation
      const easeOutExpo = 1 - Math.pow(2, -10 * progress);
      const currentCount = Math.floor(easeOutExpo * targetValue);

      setCount(currentCount);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setCount(targetValue);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [targetValue, isInView, duration]);

  return count;
}

function StatCard({ stat, index, isInView }: {
  stat: typeof stats[0];
  index: number;
  isInView: boolean;
}) {
  const count = useCountAnimation(stat.value, isInView, 2000);
  const shouldReduceMotion = useReducedMotion();
  const Icon = stat.icon;

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: shouldReduceMotion ? 0.2 : 0.6,
        delay: shouldReduceMotion ? 0 : index * 0.1,
        ease: [0.22, 1, 0.36, 1]
      }}
      className="group relative bg-background border border-border p-6 sm:p-8 
                hover:border-accent/30 transition-all duration-500"
    >
      {/* Top Accent Line */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-0.5 bg-accent origin-left"
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{
          duration: shouldReduceMotion ? 0.3 : 0.8,
          delay: shouldReduceMotion ? 0 : 0.3 + index * 0.1,
          ease: "easeOut"
        }}
      />

      {/* Corner Number */}
      <div className="absolute -top-3 -right-3 w-8 h-8 sm:w-10 sm:h-10 bg-secondary border border-border 
                      flex items-center justify-center text-xs sm:text-sm font-bold text-muted-foreground
                      group-hover:border-accent/30 group-hover:text-accent transition-all duration-300">
        0{index + 1}
      </div>

      {/* Icon */}
      <div className="flex items-start justify-between mb-6">
        <div className="w-12 h-12 sm:w-14 sm:h-14 bg-accent/10 flex items-center justify-center
                        group-hover:bg-accent transition-all duration-300">
          <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-accent group-hover:text-accent-foreground 
                          transition-colors duration-300" strokeWidth={1.5} />
        </div>
      </div>

      {/* Animated Number */}
      <div className="mb-4">
        <div className="flex items-baseline gap-1">
          {stat.prefix && (
            <span className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-accent">
              {stat.prefix}
            </span>
          )}
          <motion.span
            className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-foreground
                      tabular-nums"
          >
            {count}
          </motion.span>
          {stat.suffix && (
            <span className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-accent">
              {stat.suffix}
            </span>
          )}
        </div>
      </div>

      {/* Label & Description */}
      <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2 leading-tight">
        {stat.label}
      </h3>
      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
        {stat.description}
      </p>

      {/* Bottom Corner Accent */}
      <div className="absolute bottom-4 right-4 w-6 h-6 border-r border-b border-border 
                      group-hover:border-accent/50 transition-colors duration-300" />
    </motion.div>
  );
}

export function WhyProcessWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const isStatsInView = useInView(statsRef, { once: true, margin: "-150px" });
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      ref={sectionRef}
      className="section-padding bg-secondary relative overflow-hidden"
    >
      {/* Grid Background */}
      <div className="absolute inset-0 grid-background opacity-30" />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-accent/5" />

      {/* Decorative Glow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isHeaderInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1 }}
        className="absolute top-20 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl"
      />

      <div className="container-wide relative z-10">
        {/* Section Header */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: shouldReduceMotion ? 0.3 : 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 lg:mb-20"
        >
          {/* Label */}
          <div className="flex items-center justify-center gap-3 mb-4 sm:mb-6">
            <span className="w-8 sm:w-10 h-px bg-accent" />
            <span className="label-text text-accent tracking-widest text-[10px] sm:text-xs">
              Why It Works
            </span>
            <span className="w-8 sm:w-10 h-px bg-accent" />
          </div>

          {/* Title */}
          <h2 className="heading-lg mb-4 sm:mb-6">
            Why This Process
            <span className="block mt-1 sm:mt-2">
              <span className="bg-gradient-to-r from-foreground via-foreground/70 to-muted-foreground 
                              bg-clip-text text-transparent">
                Works
              </span>
              <motion.span
                initial={{ scale: 0 }}
                animate={isHeaderInView ? { scale: 1 } : { scale: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
                className="inline-block w-2 h-2 sm:w-2.5 sm:h-2.5 bg-accent ml-2 sm:ml-3 align-baseline rounded-full"
              />
            </span>
          </h2>

          {/* Description */}
          <motion.p
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 15 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: shouldReduceMotion ? 0.3 : 0.5,
              delay: shouldReduceMotion ? 0 : 0.2
            }}
            className="body-md text-muted-foreground leading-relaxed px-4"
          >
            Our systematic approach eliminates the common pitfalls of construction projects:
            missed details, budget surprises, timeline slippage, and compromised quality.
            By following a proven framework, we deliver predictable results every time.
          </motion.p>
        </motion.div>

        {/* Stats Grid */}
        <div
          ref={statsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6"
        >
          {stats.map((stat, index) => (
            <StatCard
              key={stat.id}
              stat={stat}
              index={index}
              isInView={isStatsInView}
            />
          ))}
        </div>

        {/* Bottom Decorative Line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isStatsInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{
            duration: shouldReduceMotion ? 0.4 : 0.8,
            delay: shouldReduceMotion ? 0 : 0.6
          }}
          className="mt-12 sm:mt-16 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent origin-center"
        />
      </div>
    </section>
  );
}
