import { motion } from "framer-motion";
import { Quote } from "lucide-react";

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  company: string;
}

export function TestimonialCard({ quote, author, role, company }: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="relative p-10 md:p-14 rounded bg-secondary border border-border/50 text-center"
    >
      {/* Accent Corner Markers */}
      <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-accent rounded-tl" />
      <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-accent rounded-br" />
      
      {/* Quote Icon */}
      <div className="flex justify-center mb-8">
        <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center">
          <Quote className="h-8 w-8 text-accent" />
        </div>
      </div>
      
      {/* Quote Text */}
      <blockquote className="text-xl md:text-2xl lg:text-3xl font-display font-medium leading-relaxed mb-10 text-foreground/90">
        "{quote}"
      </blockquote>
      
      {/* Divider */}
      <div className="w-16 h-px bg-accent mx-auto mb-8" />
      
      {/* Author Info */}
      <div className="flex flex-col items-center gap-3">
        <div className="w-14 h-14 rounded-full bg-accent flex items-center justify-center">
          <span className="font-display font-bold text-lg text-accent-foreground">
            {author.charAt(0)}
          </span>
        </div>
        <div>
          <p className="font-display font-semibold text-lg">{author}</p>
          <p className="text-muted-foreground">
            {role} <span className="text-accent">•</span> {company}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
