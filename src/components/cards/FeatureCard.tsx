import { motion } from "framer-motion";

interface FeatureCardProps {
  title: string;
  description: string;
  index?: number;
}

export function FeatureCard({ title, description, index = 0 }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group relative p-6 md:p-8 rounded-2xl bg-card border border-border hover:border-accent/50 transition-all duration-300"
    >
      {/* Accent line */}
      <div className="absolute top-0 left-6 md:left-8 w-12 h-1 bg-accent rounded-full" />
      
      <div className="mt-4">
        <h3 className="heading-sm mb-3 group-hover:text-accent transition-colors duration-300">
          {title}
        </h3>
        <p className="body-md">
          {description}
        </p>
      </div>
    </motion.div>
  );
}
