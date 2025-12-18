import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

interface ObjectivesListProps {
  title: string;
  objectives: string[];
  delay?: number;
}

export function ObjectivesList({ title, objectives, delay = 0 }: ObjectivesListProps) {
  return (
    <div className="mt-6">
      <motion.h4
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay }}
        viewport={{ once: true }}
        className="text-sm font-medium text-accent uppercase tracking-wider mb-4"
      >
        {title}
      </motion.h4>
      <ul className="space-y-3">
        {objectives.map((objective, index) => (
          <motion.li
            key={index}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: delay + (index + 1) * 0.1 }}
            viewport={{ once: true }}
            className="flex items-start gap-3 group"
          >
            <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-200" />
            <span className="text-muted-foreground group-hover:text-foreground transition-colors duration-200">
              {objective}
            </span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
