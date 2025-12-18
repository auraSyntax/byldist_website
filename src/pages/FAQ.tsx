import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Mail, MessageCircle, HelpCircle } from "lucide-react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { contactData } from "@/data/appData";

const faqs = [
  {
    question: "What types of projects does Byldist handle?",
    answer: "We handle a wide range of architecture and interior projects including residential, commercial, hospitality, retail, and institutional. Our expertise spans from luxury homes to large-scale commercial developments.",
    category: "Services"
  },
  {
    question: "How does Byldist ensure design intent is preserved during execution?",
    answer: "Our team includes architects and designers who understand design language deeply. We maintain close communication with the design team throughout the project, conduct regular reviews, and document every decision to ensure the original vision is maintained.",
    category: "Process"
  },
  {
    question: "What is the typical project timeline?",
    answer: "Project timelines vary based on scope and complexity. A typical residential interior project might take 4-8 months, while larger commercial projects can span 12-24 months. We provide detailed schedules during the planning phase.",
    category: "Timeline"
  },
  {
    question: "How do you handle project budgets?",
    answer: "We work closely with you to establish realistic budgets during the planning phase. Our transparent approach includes detailed cost breakdowns, regular budget reviews, and proactive communication about any potential variations.",
    category: "Budget"
  },
  {
    question: "Can you work with our existing contractors?",
    answer: "Absolutely. We can either manage your existing contractor relationships or help you source and evaluate new contractors. Our goal is to ensure seamless coordination regardless of the team composition.",
    category: "Collaboration"
  },
  {
    question: "What geographic areas do you cover?",
    answer: "While we're based in Chennai, we work on projects across India. We have successfully executed projects in Delhi, Bangalore, Hyderabad, Goa, and several other cities.",
    category: "Coverage"
  },
  {
    question: "How often do you provide project updates?",
    answer: "We provide weekly progress reports with photos and documentation. For critical phases, updates can be daily. You'll also have direct access to our project management team for any questions.",
    category: "Communication"
  },
  {
    question: "What happens if issues arise during construction?",
    answer: "Our proactive approach means we identify potential issues early. When challenges arise, we immediately communicate with all stakeholders, propose solutions, and document the resolution process.",
    category: "Support"
  },
];

function FAQItem({ question, answer, category, isOpen, onToggle, index }: {
  question: string;
  answer: string;
  category: string;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="group relative"
    >
      <div
        className={cn(
          "relative border border-border bg-background transition-all duration-300",
          isOpen
            ? "border-accent/30 shadow-lg shadow-accent/5"
            : "hover:border-accent/20"
        )}
      >
        {/* Top accent line */}
        <div className={cn(
          "absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-accent via-accent/60 to-transparent origin-left transition-all duration-500",
          isOpen ? "scale-x-100" : "scale-x-0 group-hover:scale-x-50"
        )} />

        {/* Category badge */}
        <div className="absolute -top-3 left-6 px-3 py-1 bg-background border border-border">
          <span className="text-[10px] font-semibold text-accent/70 uppercase tracking-[0.15em] text-shadow-solid">
            {category}
          </span>
        </div>

        <button
          onClick={onToggle}
          className="w-full px-6 sm:px-8 md:px-10 pt-9 sm:pt-10 md:pt-12 pb-6 sm:pb-7 md:pb-8 flex items-start justify-between text-left gap-6"
        >
          <span className="text-lg sm:text-xl font-display font-semibold leading-tight text-foreground group-hover:text-accent transition-colors pr-4">
            {question}
          </span>
          <div className={cn(
            "flex-shrink-0 w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center border transition-all duration-300",
            isOpen
              ? "bg-accent border-accent text-foreground dark:text-background rotate-180"
              : "bg-background border-border group-hover:border-accent/50"
          )}>
            <ChevronDown className="h-5 w-5" />
          </div>
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              className="overflow-hidden"
            >
              <div className="px-6 sm:px-8 md:px-10 pb-8 sm:pb-9 md:pb-10">
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="h-px w-full bg-gradient-to-r from-accent/30 via-accent/50 to-transparent mb-6 sm:mb-7 origin-left"
                />
                <p className="text-base sm:text-lg leading-relaxed text-muted-foreground max-w-3xl">
                  {answer}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-5 h-5 border-l-2 border-t-2 border-transparent group-hover:border-accent/30 transition-colors duration-300" />
        <div className="absolute bottom-0 right-0 w-5 h-5 border-r-2 border-b-2 border-transparent group-hover:border-accent/30 transition-colors duration-300" />
      </div>
    </motion.div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 md:pt-40 pb-20 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 grid-background opacity-40" />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute top-32 right-0 w-[500px] h-[500px] bg-accent/5 blur-[120px] rounded-full"
        />

        <div className="container-wide relative z-10">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-end">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7"
            >
              <div className="flex items-center gap-3 mb-6">
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="w-10 h-px bg-accent origin-left"
                />
                <span className="label-text text-accent tracking-widest text-shadow-solid">Frequently Asked Questions</span>
              </div>

              <h1 className="heading-xl mb-6">
                <span className="block">Questions &</span>
                <span className="block mt-1">
                  <span className="bg-gradient-to-r from-foreground via-foreground/70 to-muted-foreground bg-clip-text text-transparent">
                    Answers
                  </span>
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.6 }}
                    className="inline-block w-3 h-3 bg-accent ml-3 align-baseline rounded-full"
                  />
                </span>
              </h1>

              <p className="body-lg text-muted-foreground max-w-xl">
                Find answers to common questions about our services, process, and approach
                to delivering exceptional architecture and interior projects.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-5"
            >
              <div className="relative p-8 bg-background border border-border">
                <div className="absolute top-0 left-0 w-6 h-6 border-l-2 border-t-2 border-accent -translate-x-1 -translate-y-1" />
                <div className="absolute bottom-0 right-0 w-6 h-6 border-r-2 border-b-2 border-accent translate-x-1 translate-y-1" />

                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-accent flex items-center justify-center">
                    <HelpCircle className="w-7 h-7 text-background" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-foreground text-lg">Quick Help</h3>
                    <p className="text-sm text-muted-foreground">Everything you need to know</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <div className="text-3xl font-display font-bold text-accent mb-1">{faqs.length}</div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wider">Total FAQs</div>
                  </div>
                  <div>
                    <div className="text-3xl font-display font-bold text-foreground mb-1">8</div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wider">Categories</div>
                  </div>
                </div>

                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="absolute bottom-0 left-8 right-8 h-0.5 bg-accent/30 origin-left"
                />
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

      {/* FAQ List */}
      <section className="section-padding bg-secondary relative overflow-hidden">
        <div className="absolute inset-0 grid-background opacity-30" />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.4 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent/10 blur-3xl rounded-full hidden lg:block"
        />

        <div className="container-wide max-w-5xl relative z-10">
          <ScrollReveal>
            <div className="text-center mb-12 md:mb-16">
              <div className="flex items-center justify-center gap-3 mb-4">
                <span className="w-8 h-px bg-accent" />
                <span className="label-text text-accent tracking-widest text-shadow-solid">Browse FAQs</span>
                <span className="w-8 h-px bg-accent" />
              </div>
              <h2 className="heading-lg max-w-2xl mx-auto">
                Common Questions
                <span className="block mt-1">
                  <span className="bg-gradient-to-r from-foreground via-foreground/70 to-muted-foreground bg-clip-text text-transparent">
                    & Detailed Answers
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
          </ScrollReveal>

          <div className="space-y-6 md:space-y-7">
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                category={faq.category}
                isOpen={openIndex === index}
                onToggle={() => setOpenIndex(openIndex === index ? null : index)}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-foreground dark:bg-background text-background dark:text-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 grid-background" />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.1 }}
          viewport={{ once: true }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent dark:bg-accent/0 blur-[200px] rounded-full"
        />

        <div className="container-wide relative z-10">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <div className="lg:col-span-7 text-center lg:text-left">
              <ScrollReveal>
                <div className="flex items-center gap-3 mb-5 justify-center lg:justify-start">
                  <span className="w-8 h-px bg-accent" />
                  <span className="label-text text-accent tracking-widest">Still Need Help?</span>
                </div>
                <h2 className="heading-lg mb-6 text-background dark:text-foreground">
                  Can't Find Your Answer?
                  <motion.span
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                    className="inline-block w-2 h-2 bg-accent ml-3 align-baseline rounded-full"
                  />
                </h2>
                <p className="body-lg text-background/70 dark:text-foreground/70 max-w-xl mx-auto lg:mx-0">
                  Our team is here to help with any specific questions about your project.
                  Get in touch and we'll provide the information you need.
                </p>
              </ScrollReveal>
            </div>

            <div className="lg:col-span-5">
              <ScrollReveal delay={0.2}>
                <div className="flex flex-col gap-4">
                  <Link
                    to={`mailto:${contactData?.email}`}
                    className="group flex items-center justify-center gap-3 px-10 py-5 bg-accent text-black font-display font-semibold text-lg transition-all duration-300 hover:bg-accent/90 hover:shadow-xl hover:shadow-accent/20"
                  >
                    <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    Send us an Email
                  </Link>

                  <a
                    href="/contact"
                    className="group flex items-center justify-center gap-3 px-10 py-5 bg-transparent border border-background/20 dark:border-foreground/20 text-background dark:text-foreground font-display font-semibold text-lg transition-all duration-300 hover:bg-background/10 dark:hover:bg-foreground/10"
                  >
                    <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    Start a Conversation
                  </a>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="flex items-center justify-center gap-2 mt-8"
                >
                  <span className="w-2 h-px bg-background/30" />
                  <span className="text-xs text-background/50 dark:text-foreground/50 uppercase tracking-wider">Quick Response</span>
                  <span className="w-2 h-px bg-background/30" />
                </motion.div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}