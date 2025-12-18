import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { ArrowRight, ArrowUpRight, Check, ChevronRight } from "lucide-react";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { servicesData } from "@/data/services";
import { HowWeWork } from "@/components/process/HowWeWork";

export default function Services() {
  const gridRef = useRef<HTMLDivElement>(null);
  const isGridInView = useInView(gridRef, { once: true, margin: "-50px" });

  return (
    <>
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 grid-background opacity-40" />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute top-32 right-0 w-[500px] h-[500px] bg-accent/5 blur-[120px] rounded-full"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/3 blur-[100px] rounded-full"
        />

        <div className="container-wide relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-end">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
                <Link to="/" className="hover:text-accent transition-colors">Home</Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-foreground">Our Services</span>
              </div>

              <div className="flex items-center gap-3 mb-6">
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="w-10 h-px bg-accent origin-left"
                />
                <span className="label-text text-accent tracking-widest text-shadow-solid">What We Do</span>
              </div>

              <h1 className="heading-xl mb-6">
                <span className="block">End-to-End</span>
                <span className="block mt-1">
                  <span className="bg-gradient-to-r from-foreground via-foreground/70 to-muted-foreground bg-clip-text text-transparent md:whitespace-nowrap">
                    Execution Excellence
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.6 }}
                      className="inline-block w-3 h-3 bg-accent rounded-full ml-2 align-baseline"
                    />
                  </span>
                </span>
              </h1>

              <p className="body-lg max-w-xl">
                From initial design development to final handover, we provide comprehensive
                support for architecture and interior projects of all scales.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:text-right"
            >
              <div className="inline-flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8">
                <div className="text-left sm:text-right">
                  <span className="font-display text-4xl md:text-5xl font-bold text-accent text-shadow-solid">{servicesData.length}</span>
                  <p className="text-sm text-muted-foreground mt-1">Core Services</p>
                </div>
                <div className="w-px h-12 bg-border hidden sm:block" />
                <div className="text-left sm:text-right">
                  <span className="font-display text-4xl md:text-5xl font-bold text-foreground">100+</span>
                  <p className="text-sm text-muted-foreground mt-1">Projects Delivered</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent"
        />
      </section>

      <section className="section-padding relative overflow-hidden bg-secondary">
        {/* <div className="absolute inset-0 bg-gradient-to-b from-secondary/50 via-background to-background" /> */}

        <div className="container-wide relative z-10">
          <div ref={gridRef} className="grid md:grid-cols-2 gap-5 lg:gap-6">
            {servicesData.map((service, index) => {
              const Icon = service.icon;

              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={isGridInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="md:row-span-2"
                >
                  <Link
                    to={`/services/${service.id}`}
                    className={`group relative flex flex-col h-full overflow-hidden border border-border bg-background transition-all duration-500 hover:border-accent/50 hover:shadow-xl hover:shadow-accent/5 min-h-[400px] md:min-h-full`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.02] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent via-accent/60 to-transparent scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />

                    <div className="relative z-10 flex flex-col h-full p-6 lg:p-8">
                      <div className="flex items-start justify-between mb-6">
                        <div className="w-14 h-14 flex items-center justify-center bg-accent text-black transition-all duration-300 group-hover:scale-110">
                          <Icon className="h-6 w-6" strokeWidth={1.5} />
                        </div>
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          whileHover={{ opacity: 1, x: 0 }}
                          className="w-10 h-10 flex items-center justify-center border border-border rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-black"
                        >
                          <ArrowUpRight className="h-4 w-4" />
                        </motion.div>
                      </div>

                      <div className="flex-grow">
                        <span className="text-[10px] font-semibold text-accent text-shadow-solid tracking-[0.2em] uppercase mb-2 block">
                          0{index + 1}
                        </span>
                        <h3 className="font-display text-xl lg:text-2xl font-semibold text-foreground mb-3 group-hover:text-accent transition-colors duration-300">
                          {service.title}
                        </h3>
                        <p className={`text-sm text-muted-foreground leading-relaxed mb-6`}>
                          {service.tagline}
                        </p>

                        <div className="mt-auto pt-6 border-t border-border/50">
                          <ul className="space-y-2.5">
                            {service.includes.slice(0, 4).map((item, i) => (
                              <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                                <span className="shrink-0 w-4 h-4 mt-0.5 flex items-center justify-center bg-accent/10 text-accent">
                                  <Check className="w-2.5 h-2.5" strokeWidth={3} />
                                </span>
                                <span className="leading-snug">{item.title}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className={`flex items-center gap-2 text-sm font-medium text-foreground group-hover:text-accent transition-colors duration-300 mt-6`}>
                        <span>Explore Service</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </div>

                    <div className="absolute bottom-4 right-4 text-[6rem] font-display font-bold text-foreground/[0.02] leading-none pointer-events-none select-none">
                      0{index + 1}
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <HowWeWork />

      {/* How we deliver section */}
      {/* <section className="section-padding bg-secondary relative overflow-hidden">
        <div className="absolute inset-0 grid-background opacity-30" />

        <div className="container-wide relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-px bg-accent" />
                <span className="label-text text-accent tracking-widest text-shadow-solid">Our Approach</span>
              </div>
              <h2 className="heading-lg mb-6">
                How We
                <span className="block mt-1">
                  <span className="bg-gradient-to-r from-foreground via-foreground/70 to-muted-foreground bg-clip-text text-transparent">
                    Deliver
                  </span>
                  <motion.span
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.5 }}
                    className="inline-block w-2 h-2 bg-accent ml-2 align-baseline rounded-full"
                  />
                </span>
              </h2>
              <p className="body-md mb-6">
                Our structured approach ensures clear communication, predictable
                outcomes, and design integrity at every stage of your project.
              </p>
              <p className="body-md mb-8 text-muted-foreground">
                From the first meeting to final handover, we maintain transparency
                and keep you informed of progress, challenges, and solutions.
              </p>
              <Button variant="default" size="lg" asChild className="group">
                <Link to="/process">
                  View Our Process
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { num: "01", title: "Understand", desc: "Deep dive into design intent and requirements" },
                  { num: "02", title: "Plan", desc: "Detailed execution strategy and resource allocation" },
                  { num: "03", title: "Execute", desc: "Meticulous on-site supervision and quality control" },
                  { num: "04", title: "Deliver", desc: "Comprehensive handover and documentation" }
                ].map((step, i) => (
                  <motion.div
                    key={step.num}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    className="group p-6 bg-background border border-border hover:border-accent/40 transition-all duration-300"
                  >
                    <span className="font-display text-3xl font-bold text-accent text-shadow-solid">{step.num}</span>
                    <h3 className="font-display font-semibold mt-3 mb-2 group-hover:text-accent transition-colors duration-300">{step.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                  </motion.div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section> */}
      {/*  */}

      <section className="py-20 md:py-28 bg-foreground dark:bg-secondary text-background dark:text-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 grid-background" style={{ '--grid-color': '0 0% 100%' } as React.CSSProperties} />
        </div>

        {/* <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.1 }}
          viewport={{ once: true }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent blur-[200px] rounded-full"
        /> */}

        <div className="container-wide text-center relative z-10">
          <ScrollReveal>
            <h2 className="heading-lg mb-6 text-background dark:text-foreground">
              Need a Specific Service?
            </h2>
            <p className="body-lg text-background/60 dark:text-foreground/60 max-w-2xl mx-auto mb-10">
              We tailor our services to match your project requirements.
              Let's discuss how we can support your next project.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="accent" size="xl" asChild>
                <Link to="/contact">
                  Start a Conversation
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="xl"
                asChild
                className="border-background/20 dark:border-foreground/20 text-background dark:text-foreground hover:bg-background/10 dark:hover:bg-foreground/10 hover:text-background dark:hover:text-foreground"
              >
                <Link to="/services">
                  View Our Services
                </Link>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
