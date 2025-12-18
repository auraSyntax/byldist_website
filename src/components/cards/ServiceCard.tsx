import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { memo, useMemo } from "react";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  index: number;
  includes?: string[];
}

export const ServiceCard = memo(function ServiceCard({ title, description, icon, href, index, includes }: ServiceCardProps) {
  const shouldReduceMotion = useReducedMotion();
  
  const defaultIncludes = useMemo(() => [
    "Professional consultation",
    "Quality assurance",
    "Timely delivery"
  ], []);
  
  const serviceIncludes = includes || defaultIncludes;

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: shouldReduceMotion ? 0.2 : 0.4, delay: shouldReduceMotion ? 0 : index * 0.08 }}
      viewport={{ once: true, margin: "-50px" }}
      className="h-full"
    >
      <div className="group relative h-full flex flex-col bg-background border border-border overflow-hidden hover:border-accent/50 transition-colors duration-300">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.02] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-accent via-accent/50 to-transparent scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-400" />
        
        <div className="relative z-10 flex flex-col h-full p-5 sm:p-6 lg:p-7">
          <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-5">
            <div className="shrink-0 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-accent/10 text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-colors duration-300">
              {icon}
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-[9px] sm:text-[10px] font-medium text-accent/60 tracking-[0.2em] uppercase text-shadow-solid">
                Service 0{index + 1}
              </span>
              <h3 className="font-display text-base sm:text-lg font-semibold text-foreground leading-tight mt-0.5 group-hover:text-accent transition-colors duration-300">
                {title}
              </h3>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-4 sm:mb-5 line-clamp-2">
            {description}
          </p>

          <div className="space-y-2 sm:space-y-2.5 mb-5 sm:mb-6 flex-grow">
            <span className="text-[9px] sm:text-[10px] font-semibold text-foreground/50 tracking-[0.15em] uppercase">
              Includes
            </span>
            <ul className="space-y-1.5 sm:space-y-2">
              {serviceIncludes.slice(0, 3).map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 sm:gap-2.5 text-xs sm:text-sm text-muted-foreground"
                >
                  <span className="shrink-0 w-3.5 h-3.5 sm:w-4 sm:h-4 mt-0.5 flex items-center justify-center bg-accent/10 text-accent">
                    <Check className="w-2 h-2 sm:w-2.5 sm:h-2.5" strokeWidth={3} />
                  </span>
                  <span className="leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-3 sm:pt-4 border-t border-border/50">
            <Link
              to={href}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-foreground group-hover:text-accent transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <span>Learn More</span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </div>

        <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 text-[4rem] sm:text-[5rem] font-display font-bold text-foreground/[0.02] leading-none pointer-events-none select-none">
          0{index + 1}
        </div>
      </div>
    </motion.div>
  );
});