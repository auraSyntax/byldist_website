export interface ProcessStep {
  processId: number;
  order: number;
  title: string;
  image: string;
  description: string;
  subject: string;
  keyObjective: {
    title: string;
    objectives: string[];
  };
}

export const processSteps: ProcessStep[] = [
  {
    processId: 1,
    order: 1,
    title: "Plan",
    image: "/images/process/plan.avif",
    description: "Review drawings, site conditions, materials, and timelines.",
    subject: "Convert into an actionable execution plan.",
    keyObjective: {
      title: "Key Objectives",
      objectives: [
        "Comprehensive drawing review and clarification",
        "Bill of Quantities preparation",
        "Vendor pre-qualification and selection",
        "Risk identification and mitigation planning",
        "Site survey and condition assessment",
        "Material specification and sourcing strategy",
        "Master schedule development",
        "Budget finalization and approval",
      ],
    },
  },
  {
    processId: 2,
    order: 2,
    title: "Mobilise",
    image: "/images/process/mobilise.avif",
    description: "Site teams, vendor coordination, material tracking, and safety setup.",
    subject: "Everything in place before work begins.",
    keyObjective: {
      title: "Key Objectives",
      objectives: [
        "Site team deployment and orientation",
        "Material procurement initiation",
        "Communication channels establishment",
        "Progress tracking systems setup",
        "Vendor contracts and PO processing",
        "Safety protocols and equipment setup",
        "Quality checkpoints definition",
        "Stakeholder kick-off meeting",
      ],
    },
  },
  {
    processId: 3,
    order: 3,
    title: "Execute",
    image: "/images/process/execute.avif",
    description: "Daily supervision, quality checks, communication with design team.",
    subject: "Precision execution with constant oversight.",
    keyObjective: {
      title: "Key Objectives",
      objectives: [
        "Daily site supervision and management",
        "Progress documentation and reporting",
        "Vendor performance monitoring",
        "Issue resolution and escalation",
        "Quality inspections at critical stages",
        "Design team coordination and clarifications",
        "Schedule adherence tracking",
        "Client update meetings",
      ],
    },
  },
  {
    processId: 4,
    order: 4,
    title: "Deliver",
    image: "/images/process/deliver.avif",
    description: "Snag rectification, testing, documentation, formal handover & support.",
    subject: "Complete handover with everything documented.",
    keyObjective: {
      title: "Key Objectives",
      objectives: [
        "Comprehensive snag identification",
        "Systems testing and commissioning",
        "Documentation package preparation",
        "Formal handover ceremony",
        "Systematic defect rectification",
        "Final quality audit",
        "Warranty information compilation",
        "Post-handover support initiation",
      ],
    },
  },
];

export interface WorkStep {
  workStepId: number;
  order: number;
  title: string;
  description: string;
}

export const workSteps: WorkStep[] = [
  {
    workStepId: 1,
    order: 1,
    title: "Discovery",
    description: "We review your project requirements, drawings, and timeline to understand scope and fit."
  },
  {
    workStepId: 2,
    order: 2,
    title: "Proposal",
    description: "We provide a detailed proposal covering scope, timeline, budget, and execution approach."
  },
  {
    workStepId: 3,
    order: 3,
    title: "Execution",
    description: "Upon approval, we mobilize and execute with continuous communication and quality control."
  }
]
