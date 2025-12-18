import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useState, memo } from "react";

interface ProjectCardProps {
  title: string;
  category: string;
  location: string;
  image: string;
  href: string;
  index?: number;
  sector?: string;
  status?: "Completed" | "In Progress";
}

export const ProjectCard = memo(function ProjectCard({
  title,
  category,
  location,
  image,
  href,
  index = 0,
  sector,
  status,
}: ProjectCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: shouldReduceMotion ? 0.2 : 0.4, delay: shouldReduceMotion ? 0 : index * 0.08 }}
      viewport={{ once: true, margin: "-50px" }}
      className="group"
    >
      <Link to={href} className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm">
        <div className="relative aspect-[4/3] overflow-hidden rounded-sm mb-3 sm:mb-4 bg-secondary">
          {!imageLoaded && (
            <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-secondary via-muted to-secondary" />
          )}
          <img
            src={image}
            alt={title}
            loading="lazy"
            decoding="async"
            onLoad={() => setImageLoaded(true)}
            className={`w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
          />
          <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-300" />
          
          <div className="absolute top-3 left-3 sm:top-4 sm:left-4 flex flex-wrap gap-1.5 sm:gap-2">
            {sector && (
              <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 text-[9px] sm:text-[10px] font-medium uppercase tracking-wider bg-background/90 backdrop-blur-sm text-foreground rounded-sm">
                {sector}
              </span>
            )}
            {status && (
              <span className={`px-2 py-0.5 sm:px-2.5 sm:py-1 text-[9px] sm:text-[10px] font-medium uppercase tracking-wider backdrop-blur-sm rounded-sm ${
                status === "Completed" 
                  ? "bg-accent text-accent-foreground" 
                  : "bg-foreground/90 text-background"
              }`}>
                {status}
              </span>
            )}
          </div>

          <div className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 sm:p-2.5 rounded-full bg-background/90 backdrop-blur-sm opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
            <ArrowUpRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </div>
        </div>
        <div className="space-y-0.5 sm:space-y-1">
          <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
            <span className="label-text text-[10px] sm:text-xs">{category}</span>
            <span className="text-muted-foreground text-[10px] sm:text-xs">•</span>
            <span className="label-text text-[10px] sm:text-xs truncate">{location}</span>
          </div>
          <h3 className="heading-sm text-base sm:text-lg md:text-xl group-hover:text-accent transition-colors duration-300 line-clamp-2">
            {title}
          </h3>
        </div>
      </Link>
    </motion.div>
  );
});