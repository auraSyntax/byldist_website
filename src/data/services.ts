import {
  LucideIcon,
  ClipboardList,
  Hammer,
  ShieldCheck,
  LifeBuoy
} from "lucide-react";

export interface ServiceInclude {
  title: string;
}

export interface ServiceHelp {
  title: string;
  description: string;
}

export interface ServiceData {
  id: string;
  title: string;
  tagline: string;
  icon: LucideIcon;
  description: string;
  includes: ServiceInclude[];
  helps: ServiceHelp[];
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
}

export const servicesData: ServiceData[] = [
  {
    id: "pre-execution-planning",
    title: "Pre-Execution Planning",
    tagline: "Strategic groundwork that turns drawings into actionable execution plans.",
    icon: ClipboardList,
    description:
      "Our Pre-Execution Planning service bridges the gap between design intent and on-site reality. We translate drawings into precise execution strategies by validating costs, assessing site conditions, and establishing robust sourcing plans. This phase ensures clarity, feasibility, and financial control before construction begins, minimizing surprises during execution.",
    includes: [
      { title: "Bill of Quantities (BOQ) preparation and validation" },
      { title: "Detailed cost estimation and budget alignment" },
      { title: "Site study and technical feasibility assessment" },
      { title: "Construction methodology planning" },
      { title: "Vendor shortlisting and material sourcing strategy" },
      { title: "Risk anticipation and execution readiness checks" },
    ],
    helps: [
      {
        title: "Cost-Sensitive Projects",
        description:
          "When early cost clarity is essential to avoid overruns during execution."
      },
      {
        title: "Complex Design Conversions",
        description:
          "For projects where drawings must be translated into highly detailed execution plans."
      },
      {
        title: "Vendor-Driven Builds",
        description:
          "When material availability and vendor capability directly affect timelines."
      },
    ],
  },
  {
    id: "execution-civil-interior-mep",
    title: "Execution — Civil, Interior & MEP",
    tagline: "End-to-end execution from structural work to the final finish.",
    icon: Hammer,
    description:
      "We deliver comprehensive on-ground execution covering civil works, interior fit-outs, and MEP services. Our team manages trades, sequencing, and coordination to ensure smooth progress from shell construction to final handover. With a focus on precision, safety, and craftsmanship, we bring designs to life exactly as envisioned.",
    includes: [
      { title: "Civil construction and structural execution" },
      { title: "Interior fit-outs, finishes, and millwork installation" },
      { title: "Retail and commercial build execution" },
      { title: "MEP coordination and implementation" },
      { title: "Turnkey execution support" },
      { title: "On-site supervision and trade management" },
    ],
    helps: [
      {
        title: "Turnkey Projects",
        description:
          "When a single execution partner is needed from start to finish."
      },
      {
        title: "Multi-Disciplinary Builds",
        description:
          "For projects requiring tight coordination between civil, interior, and MEP works."
      },
      {
        title: "Fast-Track Developments",
        description:
          "When timelines demand parallel execution without compromising quality."
      },
    ],
  },
  {
    id: "quality-delivery-control",
    title: "Quality & Delivery Control",
    tagline: "Rigorous oversight ensuring every milestone meets the standard.",
    icon: ShieldCheck,
    description:
      "Our Quality & Delivery Control service ensures that execution aligns with approved standards, specifications, and timelines. Through structured inspections, data-driven progress tracking, and transparent reporting, we safeguard quality while maintaining delivery momentum across every project phase.",
    includes: [
      { title: "Routine site audits and quality inspections" },
      { title: "Compliance checks against drawings and specifications" },
      { title: "Progress dashboards and real-time status tracking" },
      { title: "Milestone-based quality reviews" },
      { title: "Issue tracking and corrective action monitoring" },
      { title: "Comprehensive reporting and documentation" },
    ],
    helps: [
      {
        title: "Quality-Critical Builds",
        description:
          "When execution quality directly impacts brand, safety, or long-term performance."
      },
      {
        title: "Stakeholder-Heavy Projects",
        description:
          "For projects requiring transparent, data-backed progress visibility."
      },
      {
        title: "Risk-Managed Deliveries",
        description:
          "When proactive issue detection is essential to avoid delays and rework."
      },
    ],
  },
  {
    id: "post-completion-support",
    title: "Post-Completion Support",
    tagline: "Continued partnership beyond handover for lasting results.",
    icon: LifeBuoy,
    description:
      "Our involvement doesn’t end at handover. Post-Completion Support ensures smooth occupancy, operational continuity, and long-term asset performance. We assist with warranties, defect resolution, and future-ready planning so your project continues to deliver value well beyond completion.",
    includes: [
      { title: "Warranty coordination and defect liability management" },
      { title: "Post-handover inspections and snag resolution" },
      { title: "Maintenance planning and recommendations" },
      { title: "As-built documentation support" },
      { title: "Expansion and scalability readiness planning" },
    ],
    helps: [
      {
        title: "Operational Facilities",
        description:
          "When uninterrupted operations are critical after project handover."
      },
      {
        title: "Long-Term Asset Owners",
        description:
          "For clients focused on durability, maintenance efficiency, and lifecycle value."
      },
      {
        title: "Future Expansion Plans",
        description:
          "When projects are designed with growth and scalability in mind."
      },
    ],
  }
];

export function getServiceById(id: string): ServiceData | undefined {
  return servicesData.find(service => service.id === id);
}

export function getRelatedServices(currentId: string, limit: number = 3): ServiceData[] {
  return servicesData
    .filter(service => service.id !== currentId)
    .slice(0, limit);
}
