import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { ArrowRight, ChevronRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { processSteps } from "@/data/process";
import { useRef } from "react";
import { WhyProcessWorks } from "@/components/sections/WhyProcessWorks";

export default function Process() {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-28 pb-16 md:pt-32 md:pb-20 lg:pt-36 lg:pb-24 relative overflow-hidden bg-secondary">
        {/* Grid Background */}
        <div className="absolute inset-0 grid-background opacity-40" />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-accent/5" />

        {/* Decorative Elements */}
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="absolute right-16 xl:right-10 2xl:right-16 top-40 w-px h-48 bg-gradient-to-b from-accent to-transparent origin-top hidden xl:block"
        />

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4, delay: 0.8 }}
          className="absolute right-[60px] xl:right-[36px] 2xl:right-[60px] top-40 w-2.5 h-2.5 rounded-full bg-accent hidden xl:block"
        />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute -bottom-32 -left-32 w-96 h-96 bg-accent/5 rounded-full blur-3xl"
        />

        <div className="container-wide relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
                  <Link to="/" className="hover:text-accent transition-colors">Home</Link>
                  <ChevronRight className="h-4 w-4" />
                  <span className="text-foreground">Our Process</span>
                </div>

                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-px bg-accent" />
                  <span className="label-text text-accent tracking-widest text-shadow-solid">How We Work</span>
                </div>

                <h1 className="heading-xl mb-6">
                  From Vision to
                  <span className="block mt-1">
                    <span className="bg-gradient-to-r from-foreground via-foreground/70 to-muted-foreground bg-clip-text text-transparent">
                      Built Reality
                    </span>
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.6 }}
                      className="inline-block w-2.5 h-2.5 bg-accent ml-3 align-baseline rounded-full"
                    />
                  </span>
                </h1>

                <p className="body-lg max-w-xl mb-8">
                  Our execution model ensures transparency and delivers excellence,
                  one structured phase at a time.
                </p>

                {/* Quick Navigation Pills */}
                <div className="flex flex-wrap gap-3">
                  {processSteps.map((step, index) => (
                    <motion.a
                      key={step.processId}
                      href={`#step-${step.order}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                      className="group px-4 py-2.5 bg-background border border-border hover:border-accent/50 
                                transition-all duration-300 text-sm font-medium flex items-center gap-2.5"
                    >
                      <span className="w-6 h-6 rounded bg-accent/10 group-hover:bg-accent flex items-center justify-center 
                                      text-xs font-bold text-accent group-hover:text-accent-foreground transition-all duration-300">
                        {step.order}
                      </span>
                      {step.title}
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right Stats Card */}
            <div className="lg:col-span-5">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="relative bg-background border border-border p-8"
              >
                {/* Corner Accents */}
                <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-accent" />
                <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-accent" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-accent" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-accent" />

                <h3 className="heading-sm mb-6">Our Proven Approach</h3>

                <div className="space-y-5">
                  {[
                    { value: "4", label: "Structured Phases" },
                    { value: "100+", label: "Projects Delivered" },
                    { value: "100%", label: "On-Time Completion" },
                  ].map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                      className="flex items-center justify-between pb-4 border-b border-border last:border-0 last:pb-0"
                    >
                      <span className="text-muted-foreground text-sm">{stat.label}</span>
                      <span className="text-2xl font-bold text-foreground">{stat.value}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Decorative Line */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="absolute -bottom-3 left-8 right-8 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent origin-center"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Steps Timeline */}
      <section className="section-padding relative overflow-hidden">
        {/* Subtle Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/30 via-transparent to-secondary/30" />

        <div className="container-wide relative z-10">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-2xl mx-auto mb-20"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="w-8 h-px bg-accent" />
              <span className="label-text text-accent tracking-widest text-shadow-solid">Methodology</span>
              <span className="w-8 h-px bg-accent" />
            </div>
            <h2 className="heading-lg mb-4">
              Four Phases to
              <span className="bg-gradient-to-r from-foreground via-foreground/70 to-muted-foreground bg-clip-text text-transparent"> Excellence</span>
            </h2>
            <p className="body-md text-muted-foreground">
              Each phase is designed to ensure seamless execution while maintaining design integrity
            </p>
          </motion.div>

          {/* Process Steps */}
          <div className="space-y-24 lg:space-y-32">
            {processSteps.map((step, index) => (
              <ProcessStepCard key={step.processId} step={step} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Why This Process Works */}
      <WhyProcessWorks />

      {/* CTA Section */}
      <section className="section-padding bg-foreground dark:bg-background text-background dark:text-foreground relative overflow-hidden">
        {/* Subtle Grid */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute inset-0 grid-background" style={{
            backgroundImage: 'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
            backgroundSize: '60px 60px'
          }} />
        </div>

        {/* Glow Effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-accent/10 dark:bg-accent/5 rounded-full blur-3xl" />

        <div className="container-wide relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-7"
            >
              {/* Icon Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-background/10 dark:bg-foreground/10 border border-background/20 dark:border-foreground/20 mb-6">
                <span className="w-2 h-2 bg-accent rounded-full" />
                <span className="text-sm text-background/70 dark:text-foreground/70">Start Your Journey</span>
              </div>

              <h2 className="heading-lg mb-6 text-background dark:text-foreground">
                Ready to Execute
                <span className="block text-background/60 dark:text-foreground/60">Your Vision?</span>
              </h2>
              <p className="body-lg text-background/70 dark:text-foreground/70 max-w-xl">
                Let's discuss how our proven process can ensure the successful
                execution of your next project. From planning to delivery,
                we're with you every step of the way.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-5"
            >
              <div className="flex flex-col sm:flex-row lg:flex-col gap-4">
                <Button variant="accent" size="xl" asChild className="w-full sm:w-auto lg:w-full">
                  <Link to="/contact">
                    Begin Your Project
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>

                <Button
                  variant="outline"
                  size="xl"
                  className="border-background/30 dark:border-foreground/30 text-background dark:text-foreground hover:bg-background/10 dark:hover:bg-foreground/10 w-full sm:w-auto lg:w-full"
                  asChild
                >
                  <Link to="/services">
                    Explore Our Services
                  </Link>
                </Button>
              </div>

              {/* Decorative */}
              <div className="hidden lg:flex items-center gap-2 mt-8 justify-end">
                <div className="w-8 h-px bg-background/30 dark:bg-foreground/30" />
                <div className="w-1.5 h-1.5 bg-accent rounded-full" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}

// Process Step Card Component
interface ProcessStepCardProps {
  step: typeof processSteps[0];
  index: number;
}

function ProcessStepCard({ step, index }: ProcessStepCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const isReversed = index % 2 !== 0;

  return (
    <div ref={ref} id={`step-${step.order}`} className="scroll-mt-32">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className={`grid lg:grid-cols-12 gap-8 lg:gap-12 items-center`}
      >
        {/* Image Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={`lg:col-span-6 ${isReversed ? "lg:order-2" : ""}`}
        >
          <div className="relative group">
            {/* Main Image */}
            <div className="relative aspect-[4/3] sm:aspect-[3/2] lg:aspect-[1/1.1] xl:aspect-[4/3.7] overflow-hidden bg-secondary">
              <img
                src={step.image}
                alt={step.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 via-transparent to-transparent" />
            </div>

            {/* Decorative Frame */}
            <div className={`absolute -z-10 top-4 ${isReversed ? '-left-4' : '-right-4'} w-full h-full border border-accent/20`} />

            {/* Step Number Badge */}
            <div className={`absolute -top-2 sm:-top-5 ${isReversed ? '-right-2 sm:-right-5' : '-left-2 sm:-left-5'} z-10`}>
              <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-accent flex items-center justify-center shadow-xl">
                <span className="text-3xl sm:text-4xl lg:text-5xl font-bold text-accent-foreground">
                  {step.order}
                </span>
              </div>
            </div>

            {/* Corner Accents */}
            <div className={`absolute bottom-0 ${isReversed ? 'left-0' : 'right-0'} w-16 h-16 border-b-2 ${isReversed ? 'border-l-2' : 'border-r-2'} border-accent/50`} />
          </div>
        </motion.div>

        {/* Content Section */}
        <div className={`lg:col-span-6 ${isReversed ? "lg:order-1" : ""}`}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {/* Phase Label */}
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-px bg-accent" />
              <span className="label-text text-accent tracking-widest text-shadow-solid">
                Phase {step.order.toString().padStart(2, '0')}
              </span>
            </div>

            {/* Title */}
            <h2 className="heading-lg mb-4">
              {step.title}
            </h2>

            {/* Description */}
            <p className="body-lg text-muted-foreground mb-2 leading-relaxed">
              {step.description}
            </p>

            {/* Subject */}
            <p className="text-sm md:text-base text-muted-foreground mb-6 leading-relaxed">
              {step.subject}
            </p>

            {/* Objectives Card */}
            <div className="bg-secondary/50 border border-border p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1.5 h-1.5 bg-accent rounded-full" />
                <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground">
                  {step.keyObjective.title}
                </h4>
              </div>

              <ul className="space-y-3">
                {step.keyObjective.objectives.map((objective, objIndex) => (
                  <motion.li
                    key={objIndex}
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.4 + objIndex * 0.1 }}
                    className="flex items-start gap-3 group text-sm"
                  >
                    <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5 
                                            group-hover:scale-110 transition-transform duration-200" />
                    <span className="text-muted-foreground group-hover:text-foreground transition-colors duration-200">
                      {objective}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Connector Line (not for last item) */}
      {index < processSteps.length - 1 && (
        <div className="hidden lg:flex justify-center mt-16">
          <motion.div
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="w-px h-16 bg-gradient-to-b from-accent/50 to-transparent origin-top"
          />
        </div>
      )}
    </div>
  );
}