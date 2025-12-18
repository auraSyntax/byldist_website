import { motion } from "framer-motion";
import { ObjectivesList } from "./ObjectivesList";
import type { ProcessStep } from "@/data/process";

interface ProcessStepDetailProps {
  step: ProcessStep;
  isReversed: boolean;
}

export function ProcessStepDetail({ step, isReversed }: ProcessStepDetailProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, margin: "-100px" }}
      className={`grid lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
        isReversed ? "lg:flex-row-reverse" : ""
      }`}
    >
      {/* Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
        className={`relative ${isReversed ? "lg:order-2" : ""}`}
      >
        <div className="relative aspect-[4/3] overflow-hidden rounded bg-secondary">
          <img
            src={step.image}
            alt={step.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
        </div>
        
        {/* Decorative Frame */}
        <div className={`absolute -z-10 top-4 ${isReversed ? '-left-4' : '-right-4'} w-full h-full border border-accent/30 rounded`} />
        
        {/* Step Number Overlay */}
        <div className="absolute -top-4 -left-4 lg:-top-6 lg:-left-6">
          <div className="w-16 h-16 lg:w-20 lg:h-20 rounded bg-accent flex items-center justify-center shadow-lg">
            <span className="font-display text-3xl lg:text-4xl font-bold text-accent-foreground">
              {step.order}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Content */}
      <div className={isReversed ? "lg:order-1" : ""}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {/* Order Label */}
          <span className="text-sm text-accent font-medium uppercase tracking-wider">
            Step {step.order.toString().padStart(2, '0')}
          </span>
          
          {/* Title */}
          <h2 className="heading-lg mt-2 mb-4">
            {step.title}
          </h2>
          
          {/* Decorative Accent Line */}
          <div className="w-16 h-1 bg-accent mb-6" />
          
          {/* Description */}
          <p className="text-muted-foreground leading-relaxed text-lg">
            {step.description}
          </p>

          {/* Objectives */}
          <ObjectivesList
            title={step.keyObjective.title}
            objectives={step.keyObjective.objectives}
            delay={0.4}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
