import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Target, Eye, Heart, Users, Award, CheckCircle2, Building2, ChevronRight, UserRoundCog } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { CountUpStat } from "@/components/animations/CountUpStat";

const values = [
  {
    icon: <Target className="h-6 w-6" />,
    title: "Precision",
    description: "Every detail matters. We ensure design intent is preserved through meticulous execution.",
    number: "01",
  },
  {
    icon: <Eye className="h-6 w-6" />,
    title: "Transparency",
    description: "Clear communication and honest progress updates keep all stakeholders aligned.",
    number: "02",
  },
  {
    icon: <Heart className="h-6 w-6" />,
    title: "Passion",
    description: "We love what we do. Our passion for architecture drives excellence in every project.",
    number: "03",
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Collaboration",
    description: "We work as an extension of your team, fostering seamless partnerships.",
    number: "04",
  },
];

const milestones = [
  { year: "2019", title: "Founded", description: "Byldist was established by a team of architects and designers." },
  { year: "2022", title: "50 Projects", description: "Reached our first major milestone of completed projects." },
  { year: "2023", title: "Expanded Team", description: "Grew our team to include specialists in all aspects of execution." },
  { year: "2025", title: "100+ Projects", description: "Celebrated delivering over 100 successful projects." },
];

const teamStats = [
  { label: "Team Members", value: "20" },
  { label: "Architects", value: "04" },
  { label: "Project Managers", value: "04" },
  { label: "Site Engineers", value: "12" },
];

export default function About() {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });

  return (
    <>
      {/* Hero Section */}
      <section ref={heroRef} className="relative pt-28 md:pt-32 pb-16 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 grid-background opacity-40" />

        <motion.div
          initial={{ scaleY: 0 }}
          animate={heroInView ? { scaleY: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="absolute left-6 md:left-12 lg:left-20 xl:left-8 2xl:left-20 top-32 w-px h-32 md:h-48 bg-accent origin-top hidden xl:block"
        />

        <motion.div
          initial={{ scale: 0 }}
          animate={heroInView ? { scale: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.8 }}
          className="absolute left-6 md:left-12 lg:left-20 xl:left-8 2xl:left-20 top-32 -translate-y-1 w-2 h-2 bg-accent hidden xl:block"
        />

        <motion.div
          initial={{ opacity: 0 }}
          animate={heroInView ? { opacity: 0.5 } : {}}
          transition={{ duration: 1 }}
          className="absolute top-40 right-0 w-80 h-80 bg-accent/10 blur-3xl rounded-full hidden lg:block"
        />

        <div className="container-wide relative z-10">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-7">
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
                <Link to="/" className="hover:text-accent transition-colors">Home</Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-foreground">About us</span>
              </div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={heroInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-3 mb-5"
              >
                <span className="w-8 h-px bg-accent" />
                <span className="label-text text-accent tracking-widest text-shadow-solid">About Byldist</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="heading-xl mb-6"
              >
                <span className="block">Founded by Architects,</span>
                <span className="block mt-2">
                  <span className="bg-gradient-to-r from-foreground via-foreground/70 to-muted-foreground bg-clip-text text-transparent">
                    Driven by
                  </span>
                  {" "}Excellence
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={heroInView ? { scale: 1 } : {}}
                    transition={{ duration: 0.3, delay: 0.7 }}
                    className="inline-block w-3 h-3 bg-accent ml-2 align-baseline rounded-full"
                  />
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="body-lg text-muted-foreground max-w-xl mb-8"
              >
                We understand the challenges architects and designers face in translating
                their vision into built reality. That's why we exist.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-wrap gap-3 mb-8"
              >
                {["Architects", "Designers", "Studios"].map((item, i) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-secondary border border-border text-sm text-muted-foreground"
                  >
                    <CheckCircle2 className="w-4 h-4 text-accent" />
                    {item}
                  </span>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-wrap gap-4"
              >
                <Button variant="default" size="lg" asChild className="group">
                  <Link to="/contact">
                    Start a Project
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/services">View Our Services</Link>
                </Button>
              </motion.div>
            </div>

            <div className="lg:col-span-5">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="relative"
              >
                <div className="bg-background border border-border p-6 md:p-8 relative">
                  <div className="absolute top-0 left-0 w-6 h-6 border-l-2 border-t-2 border-accent -translate-x-1 -translate-y-1" />
                  <div className="absolute bottom-0 right-0 w-6 h-6 border-r-2 border-b-2 border-accent translate-x-1 translate-y-1" />

                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-accent flex items-center justify-center">
                      <Award className="w-6 h-6 text-accent-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Quick Stats</h3>
                      <p className="text-sm text-muted-foreground">Our journey in numbers</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <CountUpStat end={100} suffix="+" label="Projects Delivered" delay={0.4} />
                    <CountUpStat end={15} suffix="+" label="Studio Partners" delay={0.5} />
                    <CountUpStat end={8} suffix="+" label="Years Experience" delay={0.6} />
                    <CountUpStat end={100} suffix="%" label="Client Satisfaction" delay={0.7} />
                  </div>

                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={heroInView ? { scaleX: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="absolute bottom-0 left-6 right-6 h-0.5 bg-accent/30 origin-left"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-padding bg-secondary relative overflow-hidden">
        <div className="absolute inset-0 grid-background opacity-30" />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.4 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent/10 blur-3xl rounded-full hidden lg:block"
        />

        <div className="container-wide relative z-10">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <div className="lg:col-span-5 order-2 lg:order-1">
              <ScrollReveal>
                <div className="relative">
                  <div className="aspect-[4/5] bg-background border border-border relative overflow-hidden">
                    <div className="absolute inset-0 grid-background-dense" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center p-8">
                        <motion.span
                          initial={{ scale: 0.8, opacity: 0 }}
                          whileInView={{ scale: 1, opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5 }}
                          className="font-antebas text-8xl md:text-9xl font-bold text-foreground block"
                        >
                          B
                          <span className="inline-block w-3 h-3 bg-accent ml-2 align-baseline rounded-full" />
                        </motion.span>
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: 0.2 }}
                          className="flex items-center justify-center gap-2 mt-4"
                        >
                          <span className="w-6 h-px bg-accent" />
                          <span className="label-text">Since 2019</span>
                          <span className="w-6 h-px bg-accent" />
                        </motion.div>
                      </div>
                    </div>

                    <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-accent/40" />
                    <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-accent/40" />
                  </div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="absolute -bottom-6 -right-4 md:-right-6 bg-foreground text-background p-4 md:p-5 max-w-[180px] md:max-w-[200px]"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <Building2 className="w-5 h-5 text-accent" />
                      <span className="font-semibold text-sm">100+ Projects</span>
                    </div>
                    <p className="text-xs text-background/70">Successfully delivered across India</p>
                  </motion.div>
                </div>
              </ScrollReveal>
            </div>

            <div className="lg:col-span-7 order-1 lg:order-2">
              <ScrollReveal>
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-px bg-accent" />
                  <span className="label-text text-accent tracking-widest text-shadow-solid">Our Story</span>
                </div>
                <h2 className="heading-lg mb-6">
                  Building Bridges Between
                  <span className="block mt-1">
                    <span className="bg-gradient-to-r from-foreground via-foreground/70 to-muted-foreground bg-clip-text text-transparent">
                      Design & Reality
                    </span>
                    <motion.span
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.3 }}
                      className="inline-block w-2 h-2 bg-accent ml-2 align-baseline rounded-full"
                    />
                  </span>
                </h2>
              </ScrollReveal>

              <ScrollReveal delay={0.1}>
                <div className="space-y-5 text-muted-foreground mb-8">
                  <p className="body-md leading-relaxed">
                    Byldist was founded by architects and designers who were tired of watching beautiful designs get compromised during execution.
                    We'd seen it too many times — meticulous drawings handed off to contractors who didn't understand them, or worse, didn't care.
                  </p>
                  <p className="body-md leading-relaxed">
                    We built Byldist to be the execution partner we wished existed.
                    A team that speaks the language of design, understands construction realities, and bridges the gap with process, transparency, and genuine care for the outcome.
                  </p>
                  <p className="body-md leading-relaxed">
                    Today, we work alongside some of the most respected architecture firms, interior design studios, and brands in India — helping them deliver projects that match their vision, on time and without the usual stress.
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-border">
                  {teamStats.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                      className="text-center sm:text-left"
                    >
                      <div className="text-2xl font-bold text-accent text-shadow-solid mb-1">{stat.value}</div>
                      <div className="text-xs text-muted-foreground uppercase tracking-wider">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 grid-background opacity-30" />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.5 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="absolute top-20 right-0 w-80 h-80 bg-accent/10 blur-3xl rounded-full hidden lg:block"
        />

        <div className="container-wide relative z-10">
          <ScrollReveal>
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12 lg:mb-16">
              <div className="max-w-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-px bg-accent" />
                  <span className="label-text text-accent tracking-widest text-shadow-solid">Our Values</span>
                </div>
                <h2 className="heading-lg">
                  What Drives Us
                  <span className="block mt-1">
                    <span className="bg-gradient-to-r from-foreground via-foreground/70 to-muted-foreground bg-clip-text text-transparent">
                      Every Day
                    </span>
                    <motion.span
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.3 }}
                      className="inline-block w-2 h-2 bg-accent ml-2 align-baseline rounded-full"
                    />
                  </span>
                </h2>
              </div>
              <p className="body-md text-muted-foreground max-w-md lg:text-right">
                Our core principles guide every decision we make and every project we deliver.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group relative bg-background border border-border p-6 md:p-8 transition-all duration-300 hover:border-accent/40"
              >
                <div className="absolute top-0 left-0 w-5 h-5 border-l-2 border-t-2 border-transparent group-hover:border-accent transition-colors duration-300" />
                <div className="absolute bottom-0 right-0 w-5 h-5 border-r-2 border-b-2 border-transparent group-hover:border-accent transition-colors duration-300" />

                <div className="flex items-start justify-between mb-6">
                  <div className="w-12 h-12 bg-accent/10 flex items-center justify-center group-hover:bg-accent transition-colors duration-300">
                    <div className="text-accent group-hover:text-accent-foreground transition-colors duration-300">
                      {value.icon}
                    </div>
                  </div>
                  <span className="text-3xl font-bold text-accent/20 group-hover:text-accent/40 transition-colors duration-300">
                    {value.number}
                  </span>
                </div>

                <h3 className="heading-sm mb-3 group-hover:text-accent transition-colors duration-300">
                  {value.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {value.description}
                </p>

                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  className="absolute bottom-0 left-6 right-6 md:left-8 md:right-8 h-0.5 bg-accent/30 origin-left"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="section-padding bg-secondary relative overflow-hidden">
        <div className="absolute inset-0 grid-background opacity-30" />

        <div className="container-wide relative z-10">
          <ScrollReveal>
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12 lg:mb-16">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-px bg-accent" />
                  <span className="label-text text-accent tracking-widest text-shadow-solid">Our Journey</span>
                </div>
                <h2 className="heading-lg">
                  Key Milestones
                  <motion.span
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                    className="inline-block w-2 h-2 bg-accent ml-2 align-baseline rounded-full"
                  />
                </h2>
              </div>
              <p className="body-md text-muted-foreground max-w-md lg:text-right">
                From humble beginnings to industry leadership — our path of continuous growth.
              </p>
            </div>
          </ScrollReveal>

          {/* Desktop Timeline - Horizontal */}
          <div className="hidden lg:block">
            <div className="relative">
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2 }}
                className="absolute top-[60px] left-0 right-0 h-px bg-border origin-left"
              />

              <div className="grid grid-cols-4 gap-6">
                {milestones.map((milestone, index) => (
                  <motion.div
                    key={milestone.year}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    className="group relative"
                  >
                    <div className="relative mb-8">
                      <motion.div
                        whileHover={{ scale: 1.03 }}
                        transition={{ duration: 0.2 }}
                        className="w-full aspect-[4/3] bg-background border border-border group-hover:border-accent/40 flex items-center justify-center transition-all duration-300 relative"
                      >
                        <span className="font-display text-3xl xl:text-4xl font-bold text-accent text-shadow-solid">
                          {milestone.year}
                        </span>
                        <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-transparent group-hover:border-accent transition-colors duration-300" />
                        <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-transparent group-hover:border-accent transition-colors duration-300" />
                      </motion.div>

                      <div className="absolute -bottom-[26px] left-1/2 -translate-x-1/2 w-3 h-3 bg-accent border-2 border-background rounded-full" />
                    </div>

                    <div className="pt-8">
                      <h3 className="font-display text-base sm:text-lg font-semibold text-foreground mb-2 group-hover:text-accent transition-colors duration-300 lg:text-center">
                        {milestone.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed lg:text-center">
                        {milestone.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile/Tablet Timeline - Vertical */}
          <div className="lg:hidden">
            <div className="relative">
              <motion.div
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2 }}
                className="absolute top-0 bottom-0 left-10 w-px bg-border origin-top"
              />

              <div className="space-y-6">
                {milestones.map((milestone, index) => (
                  <motion.div
                    key={milestone.year}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                    className="group flex gap-4 sm:gap-6"
                  >
                    <div className="relative shrink-0">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                        className="w-20 h-20 bg-background border border-border group-hover:border-accent/40 flex items-center justify-center transition-all duration-300 relative"
                      >
                        <span className="font-display text-lg font-bold text-accent">
                          {milestone.year}
                        </span>
                        <div className="absolute top-0 left-0 w-3 h-3 border-l-2 border-t-2 border-transparent group-hover:border-accent transition-colors duration-300" />
                      </motion.div>
                    </div>

                    <div className="flex-1 p-4 sm:p-5 bg-background border border-border group-hover:border-accent/30 transition-all duration-300 relative">
                      <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-transparent group-hover:border-accent transition-colors duration-300" />

                      <h3 className="font-display text-base font-semibold text-foreground mb-2 group-hover:text-accent transition-colors duration-300">
                        {milestone.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {milestone.description}
                      </p>

                      <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                        className="absolute bottom-0 left-4 right-4 sm:left-5 sm:right-5 h-0.5 bg-accent/30 origin-left"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex items-center justify-center gap-3 mt-12 lg:mt-16"
          >
            <div className="w-12 h-px bg-border" />
            <div className="w-2 h-2 bg-accent/60 rounded-full" />
            <div className="w-12 h-px bg-border" />
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-foreground dark:bg-background text-background dark:text-foreground relative overflow-hidden">
        <div className="absolute inset-0 grid-background opacity-10" />

        {/* <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.3 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/20 blur-3xl rounded-full"
        /> */}

        <div className="container-wide relative z-10">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-7 text-center lg:text-left">
              <ScrollReveal>
                <div className="flex items-center gap-3 mb-4 justify-center lg:justify-start">
                  <span className="w-8 h-px bg-accent" />
                  <span className="label-text text-accent tracking-widest">Get Started</span>
                </div>
                <h2 className="heading-lg mb-6 text-background dark:text-foreground">
                  Let's Work Together
                  <motion.span
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                    className="inline-block w-2 h-2 bg-accent ml-2 align-baseline rounded-full"
                  />
                </h2>
                <p className="body-lg text-background/70 dark:text-foreground/70 max-w-xl mx-auto lg:mx-0">
                  Partner with a team that understands your vision and has the expertise to execute it flawlessly.
                </p>
              </ScrollReveal>
            </div>

            <div className="lg:col-span-5">
              <ScrollReveal delay={0.2}>
                <div className="flex flex-col sm:flex-row lg:flex-col gap-4 justify-center lg:items-end">
                  <Button variant="accent" size="xl" asChild className="group">
                    <Link to="/contact">
                      Get in Touch
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="xl"
                    asChild
                    className="border-background/30 dark:border-foreground/30 text-background dark:text-foreground hover:bg-background/10 dark:hover:bg-foreground/10 hover:text-background"
                  >
                    <Link to="/services">
                      <UserRoundCog className="h-5 w-5" />
                      View Services
                    </Link>
                  </Button>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
