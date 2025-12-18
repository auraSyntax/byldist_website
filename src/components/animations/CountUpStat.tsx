import { useCountUp } from "@/hooks/useCountUp";
import { motion } from "framer-motion";

interface CountUpStatProps {
  end: number;
  suffix?: string;
  label: string;
  delay?: number;
  duration?: number;
}

export function CountUpStat({
  end,
  suffix = "",
  label,
  delay = 0,
  duration = 2000,
}: CountUpStatProps) {
  const { count, ref } = useCountUp({
    end,
    suffix,
    delay: delay * 1000,
    duration,
  });

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="group relative p-6 bg-background border border-border hover:border-accent/40 transition-all duration-300"
    >
      <div className="absolute top-0 left-0 w-5 h-5 border-l-2 border-t-2 border-accent/50 group-hover:border-accent transition-colors duration-300" />

      <span
        ref={ref}
        className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground block mb-2"
      >
        {count}
      </span>

      <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
        {label}
      </p>

      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay }}
        className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent/30 group-hover:bg-accent/60 origin-left transition-colors duration-300"
      />
    </motion.div>
  );
}
