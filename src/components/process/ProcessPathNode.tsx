import { motion } from "framer-motion";
import type { ProcessStep } from "@/data/process";

interface ProcessPathNodeProps {
  step: ProcessStep;
  index: number;
  isLast: boolean;
}

export function ProcessPathNode({ step, index, isLast }: ProcessPathNodeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      viewport={{ once: true }}
      className="relative flex flex-col items-center text-center group"
    >
      {/* Connector Line - Hidden on last item */}
      {!isLast && (
        <div className="hidden md:block absolute top-6 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-px bg-border z-0">
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: index * 0.15 + 0.3 }}
            viewport={{ once: true }}
            className="h-full bg-accent origin-left"
          />
        </div>
      )}

      {/* Order Number Badge */}
      <motion.div
        whileHover={{ scale: 1.1 }}
        className="relative z-10 w-12 h-12 rounded-full bg-accent flex items-center justify-center mb-4 
                   shadow-[0_0_20px_rgba(203,255,0,0.3)] transition-shadow duration-300
                   group-hover:shadow-[0_0_30px_rgba(203,255,0,0.5)]"
      >
        <span className="font-display text-xl font-bold text-accent-foreground">
          {step.order}
        </span>
      </motion.div>

      {/* Title */}
      <h3 className="heading-sm mb-2 group-hover:text-accent transition-colors duration-300">
        {step.title}
      </h3>

      {/* Description */}
      <p className="text-muted-foreground text-sm leading-relaxed max-w-[200px]">
        {step.description.split('.')[0]}.
      </p>

      {/* Decorative Dot */}
      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </motion.div>
  );
}
