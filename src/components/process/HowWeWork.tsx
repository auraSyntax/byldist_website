import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WorkPathNode } from "./WorkPathNode";
import { workSteps } from "@/data/process";

export function HowWeWork() {
  return (
    <section className="section-padding relative overflow-hidden bg-background">
      {/* Grid Background */}
      <div className="absolute inset-0 grid-background opacity-50" />

      <div className="container-wide relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="label-text text-accent mb-4 block text-shadow-solid">Our Approach</span>
          <h2 className="heading-lg mb-4">
            How We{" "}
            <span className="text-accent text-shadow-solid">Work</span>
          </h2>
          <p className="text-muted-foreground">
            Our engagement model is designed to integrate seamlessly with your design process.
          </p>
        </motion.div>

        {/* Desktop: Horizontal Timeline */}
        <div className="hidden md:grid md:grid-cols-3 gap-8 mb-12">
          {workSteps?.map((step, index) => (
            <WorkPathNode
              key={step.workStepId}
              step={step}
              index={index}
              isLast={index === workSteps?.length - 1}
            />
          ))}
        </div>

        {/* Mobile: Vertical Timeline */}
        <div className="md:hidden space-y-8 mb-12">
          {workSteps?.map((step, index) => (
            <motion.div
              key={step.workStepId}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative flex items-start gap-4"
            >
              {/* Vertical Line */}
              {index !== workSteps?.length - 1 && (
                <div className="absolute left-6 top-14 w-px h-[calc(100%-2rem)] bg-border">
                  <motion.div
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
                    viewport={{ once: true }}
                    className="h-full w-full bg-accent origin-top"
                  />
                </div>
              )}

              {/* Number Badge */}
              <div className="relative z-10 flex-shrink-0 w-12 h-12 rounded-full bg-accent flex items-center justify-center shadow-[0_0_20px_rgba(203,255,0,0.3)]">
                <span className="font-display text-xl font-bold text-accent-foreground">
                  {step.order}
                </span>
              </div>

              {/* Content */}
              <div className="pt-2">
                <h3 className="heading-sm mb-1">{step.title}</h3>
                <p className="text-muted-foreground text-sm">
                  {step.description.split('.')[0]}.
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Button variant="outline" size="lg" asChild>
            <Link to="/process">
              View Full Process
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
