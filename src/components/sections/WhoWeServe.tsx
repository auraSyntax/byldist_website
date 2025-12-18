import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef, memo } from "react";
import { 
  Building, 
  Palette, 
  Store, 
  Briefcase, 
  Home
} from "lucide-react";

const clientGroups = [
  {
    id: 1,
    title: "Architects",
    description: "Turning blueprints into reality with technical precision",
    icon: Building,
  },
  {
    id: 2,
    title: "Interior Design Studios",
    description: "Executing sophisticated interiors that inspire",
    icon: Palette,
  },
  {
    id: 3,
    title: "Retail & F&B Brands",
    description: "Creating immersive brand experiences through space",
    icon: Store,
  },
  {
    id: 4,
    title: "Corporate Offices",
    description: "Building workspaces that drive productivity",
    icon: Briefcase,
  },
  {
    id: 5,
    title: "Boutique Developers",
    description: "Delivering premium residential experiences",
    icon: Home,
  },
];

const ClientCard = memo(({ group, index, isInView, shouldReduceMotion }: { 
  group: typeof clientGroups[0]; 
  index: number; 
  isInView: boolean;
  shouldReduceMotion: boolean | null;
}) => {
  const Icon = group.icon;
  
  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 25 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: shouldReduceMotion ? 0.2 : 0.4, delay: shouldReduceMotion ? 0 : 0.1 + index * 0.06 }}
      className={`group relative ${index === 4 ? 'sm:col-span-2 lg:col-span-1' : ''}`}
    >
      <div className="relative h-full p-4 sm:p-5 md:p-6 bg-muted/30 dark:bg-muted/30 border border-border rounded-lg overflow-hidden transition-colors duration-300 hover:bg-black dark:hover:bg-muted/50 hover:border-accent/40">
        <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-accent via-accent/50 to-transparent scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-400 rounded-t-lg" />

        <div className="relative z-10">
          <div className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 flex items-center justify-center bg-black/5 group-hover:bg-accent dark:group-hover:bg-accent/20 dark:bg-accent/10 rounded-lg transition-colors duration-300 mb-3 sm:mb-4">
            <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-black dark:text-accent" strokeWidth={1.5} />
          </div>

          <h3 className="font-display text-sm sm:text-base md:text-lg font-semibold text-foreground mb-1.5 sm:mb-2 group-hover:text-accent transition-colors duration-300">
            {group.title}
          </h3>

          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-2 group-hover:text-gray-300 dark:group-hover:text-muted-foreground transition-colors duration-300">
            {group.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
});

ClientCard.displayName = "ClientCard";

export function WhoWeServe() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const shouldReduceMotion = useReducedMotion();

  return (
    <section ref={sectionRef} className="relative bg-background py-16 md:py-24 lg:py-28 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(90deg, currentColor 1px, transparent 1px), linear-gradient(currentColor 1px, transparent 1px)`,
          backgroundSize: "60px 60px"
        }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-start">
          <div className="lg:col-span-5 xl:col-span-4 relative z-10">
            <motion.div
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: -25 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: shouldReduceMotion ? 0.2 : 0.5 }}
            >
              <div className="flex items-center gap-3 mb-4 sm:mb-6">
                <div className="w-8 sm:w-10 h-px bg-accent" />
                <span className="text-[10px] sm:text-xs font-medium text-accent tracking-[0.2em] uppercase text-shadow-solid">
                  Our Clients
                </span>
              </div>

              <h2 className="font-display heading-lg font-bold leading-[1.1] mb-4 sm:mb-6 text-foreground">
                Who We
                <span className="block text-accent mt-1 text-shadow-solid">Serve</span>
              </h2>

              <p className="text-muted-foreground text-sm sm:text-base md:text-lg leading-relaxed mb-6 sm:mb-8 max-w-md">
                We partner with visionary creators who demand excellence in execution.
              </p>

              <motion.div
                initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: shouldReduceMotion ? 0.2 : 0.4, delay: shouldReduceMotion ? 0 : 0.2 }}
                className="relative"
              >
                <blockquote className="text-base sm:text-lg md:text-xl lg:text-2xl font-display italic text-foreground/80 leading-snug pl-4 sm:pl-6 border-l-2 border-accent">
                  "You design it,{" "}<br className="hidden sm:block" />we build it."
                </blockquote>
              </motion.div>
            </motion.div>
          </div>

          <div className="lg:col-span-7 xl:col-span-8 relative">
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5">
              {clientGroups.map((group, index) => (
                <ClientCard
                  key={group.id}
                  group={group}
                  index={index}
                  isInView={isInView}
                  shouldReduceMotion={shouldReduceMotion}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: shouldReduceMotion ? 0.3 : 0.8, delay: shouldReduceMotion ? 0 : 0.2 }}
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent"
      />
    </section>
  );
}
