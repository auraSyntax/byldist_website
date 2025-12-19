/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, useMemo, memo, useCallback } from "react";
import { ArrowRight, Compass, Ruler, Building2, Palette, ClipboardCheck, Wrench, Award, Users, CheckCircle2, CircleCheckBig, Star, ClipboardList, Hammer, ShieldCheck, LifeBuoy } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { CountUpStat } from "@/components/animations/CountUpStat";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { TestimonialCard } from "@/components/cards/TestimonialCard";
import { ProcessTimeline } from "@/components/process/ProcessTimeline";
import { WhoWeServe } from "@/components/sections/WhoWeServe";
import { WhyByldist } from "@/components/sections/WhyByldist";
import { useIsMobile, useReducedMotion } from "@/hooks/useMediaQuery";

import heroImage from "@/assets/hero-architecture.avif";
import { projectsData } from "@/data/projects";

const services = [
  {
    title: "Pre-Execution Planning",
    description:
      "Strategic groundwork that converts drawings into clear, executable plans.",
    icon: <ClipboardList className="h-6 w-6" />,
    href: "/services/pre-execution-planning",
    includes: [
      "BOQ & detailed costing",
      "Site & technical assessment",
      "Vendor & material sourcing"
    ]
  },
  {
    title: "Execution — Civil, Interior & MEP",
    description:
      "End-to-end execution from structural work to final finishes.",
    icon: <Hammer className="h-6 w-6" />,
    href: "/services/execution-civil-interior-mep",
    includes: [
      "Interior fit-outs & finishes",
      "Retail & commercial execution",
      "Turnkey delivery support"
    ]
  },
  {
    title: "Quality & Delivery Control",
    description:
      "Rigorous oversight ensuring quality, compliance, and timely delivery.",
    icon: <ShieldCheck className="h-6 w-6" />,
    href: "/services/quality-delivery-control",
    includes: [
      "Site audits & inspections",
      "Progress dashboards",
      "Milestone reporting"
    ]
  },
  {
    title: "Post-Completion Support",
    description:
      "Ongoing support beyond handover for long-term performance.",
    icon: <LifeBuoy className="h-6 w-6" />,
    href: "/services/post-completion-support",
    includes: [
      "Warranty & defect management",
      "Maintenance guidance",
      "Expansion readiness"
    ]
  }
];

const featuredProjects = projectsData.slice(0, 4);

const testimonials = [
  {
    quote: "Byldist transformed our vision into reality with exceptional precision. Their understanding of architectural intent and commitment to execution excellence is unmatched.",
    author: "Priya Sharma",
    role: "Principal Architect",
    company: "Studio Forma",
  },
  {
    quote: "Working with Byldist has been a game-changer for our studio. They bridge the gap between design and execution seamlessly, allowing us to focus on what we do best.",
    author: "Arjun Mehta",
    role: "Design Director",
    company: "Space Craft Studios",
  },
  {
    quote: "The attention to detail and commitment to quality is remarkable. Byldist delivers projects that exceed expectations every single time.",
    author: "Neha Kapoor",
    role: "Founder",
    company: "NK Interiors",
  },
  {
    quote: "Their technical expertise and project management skills have made them an invaluable partner for our most complex hospitality projects.",
    author: "Vikram Singh",
    role: "CEO",
    company: "Luxury Hotels Group",
  },
];

const heroStats = [
  { value: 100, suffix: "+", label: "Projects" },
  { value: 15, suffix: "+", label: "Partners" },
  { value: 8, suffix: "+", label: "Years" },
];

const trustBadges = [
  { icon: Award, label: "Award Winning" },
  { icon: Users, label: "50+ Partners" },
  { icon: CheckCircle2, label: "100% Delivered" },
];

const values = [
  {
    title: "Integrity in execution",
    description:
      "We do what we say. Our word is our commitment, and every promise is delivered.",
  },
  {
    title: "Respect for design intent",
    description:
      "Your design vision is sacred. We build to preserve and enhance your creative intent.",
  },
  {
    title: "Process over guesswork",
    description:
      "Systematic approaches eliminate surprises. Every step is planned, documented, and verified.",
  },
  {
    title: "Transparent communication",
    description:
      "No hidden agendas. Real-time updates, honest assessments, and open dialogue at all times.",
  },
  {
    title: "Long-term partnerships",
    description:
      "We invest in relationships, not transactions. Your success is our success.",
  },
];

const HeroBackground = memo(function HeroBackground({
  imageScale,
  imageOpacity,
  isMobile,
  reducedMotion
}: {
  imageScale: any;
  imageOpacity: any;
  isMobile: boolean;
  reducedMotion: boolean;
}) {
  if (isMobile || reducedMotion) {
    return (
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Modern architectural interior"
          className="w-full h-full object-cover"
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/20 md:from-background/95 md:via-background/60 md:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/30" />
      </div>
    );
  }

  return (
    <motion.div
      style={{
        scale: imageScale,
        opacity: imageOpacity,
      }}
      className="absolute inset-0 will-change-[transform,opacity]"
    >
      <img
        src={heroImage}
        alt="Modern architectural interior"
        className="w-full h-full object-cover"
        loading="eager"
        decoding="async"
        fetchPriority="high"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/20 md:from-background/95 md:via-background/60 md:to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/30" />
    </motion.div>
  );
});

const DecorativeLines = memo(function DecorativeLines({ reducedMotion }: { reducedMotion: boolean }) {
  const lineVariants = useMemo(() => ({
    hidden: { scaleY: 0 },
    visible: { scaleY: 1 }
  }), []);

  const diamondVariants = useMemo(() => ({
    hidden: { scale: 0, rotate: 45 },
    visible: { scale: 1, rotate: 45 }
  }), []);

  if (reducedMotion) {
    return (
      <>
        <div className="absolute left-4 sm:left-8 lg:left-16 xl:left-8 2xl:left-16 top-1/4 hidden xl:flex flex-col items-center gap-4">
          <div className="w-px h-24 lg:h-40 bg-gradient-to-b from-accent via-accent/50 to-transparent" />
          <div className="w-2 h-2 bg-accent rotate-45" />
        </div>

        <div className="absolute right-4 sm:right-8 lg:right-16 bottom-1/4 hidden xl:flex flex-col items-center gap-4">
          <div className="w-2 h-2 border border-accent/50 rotate-45" />
          <div className="w-px h-32 bg-gradient-to-t from-accent/30 via-border to-transparent" />
        </div>
      </>
    );
  }

  return (
    <>
      <div className="absolute left-4 sm:left-8 lg:left-16 xl:left-8 2xl:left-16 top-1/4 hidden xl:flex flex-col items-center gap-4">
        <motion.div
          variants={lineVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="w-px h-24 lg:h-40 bg-gradient-to-b from-accent via-accent/50 to-transparent origin-top"
        />
        <motion.div
          variants={diamondVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.3, delay: 1.2 }}
          className="w-2 h-2 bg-accent rounded-full"
        />
      </div>
      <div className="absolute right-4 sm:right-8 lg:right-16 bottom-1/4 hidden xl:flex flex-col items-center gap-4">
        <motion.div
          variants={diamondVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.3, delay: 1.4 }}
          className="w-2 h-2 border border-accent/50 rounded-full"
        />
        <motion.div
          variants={lineVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
          className="w-px h-32 bg-gradient-to-t from-accent/30 via-border to-transparent origin-bottom"
        />
      </div>
    </>
  );
});

const TrustBadgesMobile = memo(function TrustBadgesMobile({ reducedMotion }: { reducedMotion: boolean }) {
  if (reducedMotion) {
    return (
      <div className="flex flex-wrap gap-2 mb-6 lg:hidden">
        {trustBadges.map((badge) => (
          <div
            key={badge.label}
            className="flex items-center gap-1.5 px-2.5 py-1 bg-background/60 backdrop-blur-sm border border-border/50 text-xs"
          >
            <badge.icon className="w-3 h-3 text-accent" />
            <span className="text-muted-foreground">{badge.label}</span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="flex flex-wrap gap-2 mb-6 lg:hidden"
    >
      {trustBadges.map((badge) => (
        <div
          key={badge.label}
          className="flex items-center gap-1.5 px-2.5 py-1 bg-background/60 backdrop-blur-sm border border-border/50 text-xs"
        >
          <badge.icon className="w-3 h-3 text-accent" />
          <span className="text-muted-foreground">{badge.label}</span>
        </div>
      ))}
    </motion.div>
  );
});

const HeroContent = memo(function HeroContent({
  contentY,
  isMobile,
  reducedMotion
}: {
  contentY: any;
  isMobile: boolean;
  reducedMotion: boolean;
}) {
  const containerStyle = useMemo(() =>
    isMobile || reducedMotion ? {} : { y: contentY },
    [isMobile, reducedMotion, contentY]
  );

  const fadeInUp = useMemo(() => ({
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }), []);

  return (
    <motion.div
      style={containerStyle}
      className={`relative w-full ${isMobile || reducedMotion ? '' : 'will-change-transform'}`}
    >
      <div className="container-wide pt-28 sm:pt-32 lg:pt-36 pb-24 lg:pb-32">
        <div className="flex flex-col max-w-max mx-auto">
          <div className="w-full">
            {reducedMotion ? (
              <>
                <div className="flex items-center gap-3 mb-4 sm:mb-6">
                  <span className="w-8 sm:w-12 h-px bg-accent" />
                  <span className="label-text text-accent tracking-[0.2em] text-shadow-solid">
                    Execution Excellence
                  </span>
                </div>

                <h1 className="heading-xl mb-6 sm:mb-8">
                  <span className="block">Your Vision.</span>
                  <span className="block mt-1 sm:mt-2">
                    <span className="relative inline-block bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                      Precisely
                    </span>
                    {" "}Executed
                    <span className="inline-block w-2 h-2 sm:w-3 sm:h-3 bg-accent ml-1 sm:ml-2 align-baseline rounded-full" />
                  </span>
                </h1>

                <p className="text-lg sm:text-xl lg:text-2xl font-medium text-foreground/90 w-full mb-3 sm:mb-4">
                  A builder-first execution partner for architects and design studios.
                </p>

                <p className="body-lg text-muted-foreground w-full mb-8 sm:mb-10 relative">
                  We convert drawings into flawless sites — on time, with total transparency.
                  <span className="absolute -bottom-2 left-0 w-20 sm:w-28 h-0.5 bg-accent/40" />
                </p>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-10 lg:mb-0">
                  <Button variant="accent" size="lg" asChild className="group rounded-sm">
                    <Link to="/contact">
                      <span>Start your project</span>
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild className="group rounded-sm border-foreground text-foreground hover:bg-foreground hover:text-background">
                    <Link to="/services">
                      <span>View services</span>
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </Button>
                </div>

                <div className="flex items-center gap-6 lg:hidden pt-6">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-accent fill-accent" />
                    <span className="text-sm text-muted-foreground">
                      <span className="font-semibold text-foreground">4.9</span> rating
                    </span>
                  </div>
                  <div className="w-px h-4 bg-border" />
                  <div className="text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground">100+</span> projects
                  </div>
                  <div className="w-px h-4 bg-border" />
                  <div className="text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground">15+</span> partners
                  </div>
                </div>
              </>
            ) : (
              <>
                <motion.div
                  variants={fadeInUp}
                  initial="hidden"
                  animate="visible"
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="flex items-center gap-3 mb-4 sm:mb-6"
                >
                  <motion.span
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="w-8 sm:w-12 h-px bg-accent origin-left"
                  />
                  <span className="label-text text-accent tracking-[0.2em] text-shadow-solid">
                    Execution Excellence
                  </span>
                </motion.div>

                <motion.h1
                  variants={fadeInUp}
                  initial="hidden"
                  animate="visible"
                  transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                  className="heading-xl mb-6 sm:mb-8"
                >
                  <span className="block">Your Vision.</span>
                  <span className="block mt-1 sm:mt-2">
                    <span className="relative inline-block bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                      Precisely
                    </span>
                    {" "}Executed
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.7, type: "spring", stiffness: 300, damping: 20 }}
                      className="inline-block w-2 h-2 sm:w-3 sm:h-3 bg-accent ml-1 sm:ml-2 align-baseline rounded-full"
                    />
                  </span>
                </motion.h1>

                <motion.p
                  variants={fadeInUp}
                  initial="hidden"
                  animate="visible"
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-lg sm:text-xl lg:text-2xl font-medium text-foreground/90 w-full mb-3 sm:mb-4"
                >
                  A builder-first execution partner for architects and design studios.
                </motion.p>

                <motion.p
                  variants={fadeInUp}
                  initial="hidden"
                  animate="visible"
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="body-lg text-muted-foreground w-full mb-8 sm:mb-10 relative"
                >
                  We convert drawings into flawless sites — on time, with total transparency.
                  <motion.span
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="absolute -bottom-2 left-0 w-20 sm:w-28 h-0.5 bg-accent/40 origin-left"
                  />
                </motion.p>

                <motion.div
                  variants={fadeInUp}
                  initial="hidden"
                  animate="visible"
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-10 lg:mb-0"
                >
                  <Button variant="accent" size="lg" asChild className="group rounded-sm">
                    <Link to="/contact">
                      <span>Start your project</span>
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild className="group rounded-sm border-foreground text-foreground hover:bg-foreground hover:text-background">
                    <Link to="/services">
                      <span>View services</span>
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </Button>
                </motion.div>

                <motion.div
                  variants={fadeInUp}
                  initial="hidden"
                  animate="visible"
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="items-center gap-6 hidden pt-6" // if need, use flex instead of hidden
                >
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-accent fill-accent" />
                    <span className="text-sm text-muted-foreground">
                      <span className="font-semibold text-foreground">4.9</span> rating
                    </span>
                  </div>
                  <div className="w-px h-4 bg-border" />
                  <div className="text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground">100+</span> projects
                  </div>
                  <div className="w-px h-4 bg-border" />
                  <div className="text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground">15+</span> partners
                  </div>
                </motion.div>
              </>
            )}
          </div>
        </div>
      </div>

    </motion.div>
  );
});

const DesktopFeatureCards = memo(function DesktopFeatureCards({ reducedMotion }: { reducedMotion: boolean }) {
  if (reducedMotion) {
    return (
      <div className="lg:col-span-5 xl:col-span-5 hidden lg:block">
        <div className="relative">
          <div className="absolute -inset-8 bg-gradient-to-br from-accent/5 via-transparent to-transparent rounded-3xl blur-2xl" />
          <div className="relative space-y-4">
            <div className="bg-background/60 backdrop-blur-xl border border-border/50 p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-accent/10 flex items-center justify-center">
                  <Star className="w-5 h-5 text-accent fill-accent" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Client Rating</div>
                  <div className="text-xl font-bold text-foreground">4.9/5.0</div>
                </div>
              </div>
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-accent fill-accent" />
                ))}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {heroStats.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-background/60 backdrop-blur-xl border border-border/50 p-4 text-center group hover:border-accent/50 transition-colors duration-300"
                >
                  <div className="text-2xl font-bold text-foreground group-hover:text-accent transition-colors duration-300">
                    {stat.value}{stat.suffix}
                  </div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-background/60 backdrop-blur-xl border border-border/50 p-5">
              <div className="text-xs text-muted-foreground uppercase tracking-wider mb-3">Trusted By</div>
              <div className="flex items-center justify-between">
                {trustBadges.map((badge) => (
                  <div key={badge.label} className="flex items-center gap-2">
                    <badge.icon className="w-4 h-4 text-accent" />
                    <span className="text-sm text-foreground/80">{badge.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="lg:col-span-5 xl:col-span-5 hidden lg:block">
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
        className="relative"
      >
        <div className="absolute -inset-8 bg-gradient-to-br from-accent/5 via-transparent to-transparent rounded-3xl blur-2xl" />

        <div className="relative space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            className="bg-background/60 backdrop-blur-xl border border-border/50 p-5 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-accent/10 flex items-center justify-center">
                <Star className="w-5 h-5 text-accent fill-accent" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Client Rating</div>
                <div className="text-xl font-bold text-foreground">4.9/5.0</div>
              </div>
            </div>
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-accent fill-accent" />
              ))}
            </div>
          </motion.div>

          <div className="grid grid-cols-3 gap-3">
            {heroStats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.6 + i * 0.08 }}
                className="bg-background/60 backdrop-blur-xl border border-border/50 p-4 text-center group hover:border-accent/50 transition-colors duration-300"
              >
                <div className="text-2xl font-bold text-foreground group-hover:text-accent transition-colors duration-300">
                  {stat.value}{stat.suffix}
                </div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.9 }}
            className="bg-background/60 backdrop-blur-xl border border-border/50 p-5"
          >
            <div className="text-xs text-muted-foreground uppercase tracking-wider mb-3">Trusted By</div>
            <div className="flex items-center justify-between">
              {trustBadges.map((badge) => (
                <div key={badge.label} className="flex items-center gap-2">
                  <badge.icon className="w-4 h-4 text-accent" />
                  <span className="text-sm text-foreground/80">{badge.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
});

const ScrollIndicator = memo(function ScrollIndicator({ reducedMotion }: { reducedMotion: boolean }) {
  if (reducedMotion) {
    return (
      <div className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2">
        <div className="flex flex-col items-center gap-2">
          <span className="label-text text-muted-foreground text-[10px] sm:text-xs">Scroll</span>
          <div className="w-px h-6 sm:h-8 bg-gradient-to-b from-foreground/40 to-transparent" />
          <div className="w-1.5 h-1.5 bg-accent rounded-full" />
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.2, duration: 0.6 }}
      className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2"
    >
      <div className="flex flex-col items-center gap-2">
        <span className="label-text text-muted-foreground text-[10px] sm:text-xs">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-6 sm:h-8 bg-gradient-to-b from-foreground/40 to-transparent"
        />
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.5 }}
          className="w-1.5 h-1.5 bg-accent rounded-full"
        />
      </div>
    </motion.div>
  );
});

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();
  const reducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.3]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  return (
    <>
      {/* Hero section */}
      <section ref={heroRef} className="relative min-h-[100svh] flex items-center overflow-hidden">
        <HeroBackground
          imageScale={imageScale}
          imageOpacity={imageOpacity}
          isMobile={isMobile}
          reducedMotion={reducedMotion}
        />

        <div className="absolute inset-0 grid-background opacity-40" />

        <DecorativeLines reducedMotion={reducedMotion} />

        {!isMobile && !reducedMotion && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="absolute top-20 right-1/4 w-64 h-64 bg-accent/10 rounded-full blur-[100px] pointer-events-none hidden lg:block"
          />
        )}

        <HeroContent contentY={contentY} isMobile={isMobile} reducedMotion={reducedMotion} />

        <ScrollIndicator reducedMotion={reducedMotion} />

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
      </section>

      {/* Our Values section */}
      <section className="section-padding bg-background relative overflow-hidden">
        <div className="absolute inset-0 grid-background opacity-30" />

        <div className="container-wide relative z-10">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            <div className="lg:col-span-4 xl:col-span-4">
              <ScrollReveal>
                <div className="max-w-xl">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-8 h-px bg-accent" />
                    <h2 className="heading-lg">Our Values</h2>
                  </div>
                  <p className="body-md text-muted-foreground">
                    The principles that guide everything we do.
                  </p>
                </div>
              </ScrollReveal>
            </div>

            <div className="lg:col-span-8 xl:col-span-8">
              <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-5">
                {values.map((item, index) => (
                  <ScrollReveal key={item.title} delay={0.1 + index * 0.05}>
                    <div
                      className={`group relative h-full p-5 sm:p-6 bg-muted/30 dark:bg-muted/30 border border-border rounded-lg overflow-hidden transition-colors duration-300 hover:bg-black dark:hover:bg-muted/50 hover:border-accent/40 ${index === values.length - 1 ? "sm:col-span-2" : ""
                        }`}
                    >
                      <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-accent via-accent/50 to-transparent scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-400" />

                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 flex items-center justify-center bg-accent rounded-lg transition-colors duration-300 flex-shrink-0">
                          <CircleCheckBig className="w-5 h-5 text-black" strokeWidth={1.5} />
                        </div>

                        <div className="min-w-0">
                          <div className="flex items-start justify-between gap-4">
                            <h3 className="text-base sm:text-lg font-semibold text-foreground leading-snug group-hover:text-accent transition-colors duration-300">
                              {item.title}
                            </h3>
                            <span className="text-xs font-medium text-muted-foreground/60 tabular-nums pt-1">
                              {String(index + 1).padStart(2, "0")}
                            </span>
                          </div>
                          <p className="mt-2 text-sm sm:text-base text-muted-foreground leading-relaxed group-hover:text-gray-300 dark:group-hover:text-muted-foreground transition-colors duration-300">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About section */}
      <section className="section-padding bg-secondary relative overflow-hidden">
        <div className="absolute inset-0 grid-background opacity-30" />

        <div className="container-wide relative z-10">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-px bg-accent" />
              <span className="label-text text-accent tracking-widest text-shadow-solid">About Us</span>
            </div>
          </ScrollReveal>

          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-start">
            <div className="lg:col-span-7">
              <ScrollReveal>
                <h2 className="heading-lg mb-8">
                  Where Vision Meets
                  <span className="block mt-1">
                    <span className="bg-gradient-to-r from-foreground via-foreground/70 to-muted-foreground bg-clip-text text-transparent">
                      Execution
                    </span>
                    <span className="inline-block w-2 h-2 bg-accent ml-2 align-baseline rounded-full" />
                  </span>
                </h2>
              </ScrollReveal>

              <ScrollReveal delay={0.1}>
                <div className="space-y-5 mb-10">
                  <p className="body-lg text-foreground/90 leading-relaxed">
                    At Byldist, we understand that great design deserves great execution.
                    Our team of architects and designers work closely with leading studios
                    to ensure every detail of their vision is realized on site.
                  </p>
                  <p className="body-md text-muted-foreground leading-relaxed">
                    We bridge the critical gap between design intent and construction reality,
                    bringing transparency, communication, and technical excellence to every project.
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <div className="flex flex-wrap gap-3 mb-10">
                  {["Transparency", "Execution Excellence", "Communication"].map((value) => (
                    <span
                      key={value}
                      className="px-4 py-2 border border-border bg-background/50 text-sm text-muted-foreground hover:border-accent/40 hover:text-foreground transition-colors duration-300"
                    >
                      {value}
                    </span>
                  ))}
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.3}>
                <Button variant="default" size="lg" asChild className="group">
                  <Link to="/about">
                    Discover Our Story
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </ScrollReveal>
            </div>

            <div className="lg:col-span-5">
              <ScrollReveal delay={0.2}>
                <div className="grid grid-cols-2 gap-5">
                  <CountUpStat end={100} suffix="+" label="Projects Delivered" delay={0.4} />
                  <CountUpStat end={15} suffix="+" label="Studio Partners" delay={0.5} />
                  <CountUpStat end={8} suffix="+" label="Years Experience" delay={0.6} />
                  <CountUpStat end={100} suffix="%" label="Client Satisfaction" delay={0.7} />
                </div>
              </ScrollReveal>

              <div className="flex items-center gap-2 mt-8 justify-end">
                <div className="w-8 h-px bg-border" />
                <div className="w-1.5 h-1.5 bg-accent rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*  */}

      {/* Who we serve section */}
      <WhoWeServe />
      {/*  */}

      {/* Why byldist section */}
      <WhyByldist />
      {/*  */}

      {/* Services section */}
      <section className="section-padding bg-secondary relative overflow-hidden">
        <div className="absolute inset-0 grid-background opacity-30" />

        <div className="container-wide relative z-10">
          <ScrollReveal>
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
              <div className="max-w-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-px bg-accent" />
                  <span className="label-text text-accent tracking-widest text-shadow-solid">Our Services</span>
                </div>
                <h2 className="heading-lg mb-4">
                  Comprehensive Execution
                  <span className="block mt-1">
                    <span className="bg-gradient-to-r from-foreground via-foreground/70 to-muted-foreground bg-clip-text text-transparent">
                      Services
                    </span>
                    <motion.span
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.5 }}
                      className="inline-block w-2 h-2 bg-accent ml-2 align-baseline rounded-full"
                    />
                  </span>
                </h2>
                <p className="body-md text-muted-foreground">
                  From design development to final handover, we provide end-to-end
                  support for architecture and interior projects.
                </p>
              </div>
              <Button variant="outline" size="lg" asChild className="group shrink-0 hover:bg-background">
                <Link to="/services">
                  View All Services
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 gap-5">
            {services.map((service, index) => (
              <ServiceCard key={service.title} {...service} index={index} />
            ))}
          </div>
        </div>
      </section>
      {/*  */}

      {/* Process section */}
      <ProcessTimeline />
      {/*  */}

      {/* Projects section */}
      {/* <section className="section-padding bg-secondary grid-background">
        <div className="container-wide">
          <ScrollReveal>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-12">
              <div>
                <span className="label-text text-accent mb-4 block text-shadow-solid">Our Work</span>
                <h2 className="heading-lg">Featured Projects</h2>
              </div>
              <Button variant="outline" asChild className="hover:bg-background">
                <Link to="/projects">
                  View All
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          </ScrollReveal>

          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{
              768: {
                slidesPerView: 2,
                spaceBetween: 32,
              },
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={{
              clickable: true,
              bulletClass: "swiper-pagination-bullet !bg-muted-foreground/90 !w-2 !h-2 !mx-1.5 transition-all duration-300",
              bulletActiveClass: "!bg-accent !w-8 !rounded-full",
            }}
            loop={true}
            className="projects-swiper !pb-12"
          >
            {featuredProjects.map((project, index) => (
              <SwiperSlide key={project.id}>
                <ProjectCard
                  title={project.title}
                  category={project.category}
                  location={project.location}
                  image={project.image}
                  href={`/projects/${project.id}`}
                  index={index}
                  sector={project.category}
                  status={project.status}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section> */}
      {/*  */}

      {/* Testimonial section */}
      {/* <section className="section-padding bg-background overflow-hidden relative">
        <div className="absolute inset-0 grid-background opacity-30" />

        <div className="container-wide relative">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="label-text text-accent mb-4 block text-shadow-solid">Testimonials</span>
              <h2 className="heading-lg mb-4">
                What Our Partners Say
              </h2>
              <p className="body-md text-muted-foreground">
                Trusted by leading architects and design studios across the industry.
              </p>
            </div>
          </ScrollReveal>

          <div className="max-w-4xl mx-auto">
            <Swiper
              modules={[Autoplay, Pagination, Navigation]}
              spaceBetween={32}
              slidesPerView={1}
              centeredSlides={true}
              autoplay={{
                delay: 6000,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
                bulletClass: "swiper-pagination-bullet !bg-muted-foreground/90 !w-2 !h-2 !mx-1.5 transition-all duration-300",
                bulletActiveClass: "!bg-accent !w-8 !rounded-full",
              }}
              navigation={{
                prevEl: ".testimonial-prev",
                nextEl: ".testimonial-next",
              }}
              loop={true}
              className="testimonial-swiper !pb-16"
            >
              {testimonials.map((testimonial, index) => (
                <SwiperSlide key={index}>
                  <TestimonialCard {...testimonial} />
                </SwiperSlide>
              ))}
            </Swiper>

            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                className="testimonial-prev w-12 h-12 rounded-full border border-border flex items-center justify-center hover:bg-accent hover:border-accent hover:text-accent-foreground transition-all duration-300 group"
                aria-label="Previous testimonial"
              >
                <ArrowRight className="h-5 w-5 rotate-180 group-hover:scale-110 transition-transform" />
              </button>
              <button
                className="testimonial-next w-12 h-12 rounded-full border border-border flex items-center justify-center hover:bg-accent hover:border-accent hover:text-accent-foreground transition-all duration-300 group"
                aria-label="Next testimonial"
              >
                <ArrowRight className="h-5 w-5 group-hover:scale-110 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section> */}
      {/*  */}

      {/* Home CTA section */}
      <section className="section-padding bg-foreground dark:bg-secondary text-background dark:text-foreground">
        <div className="container-wide text-center">
          <ScrollReveal>
            <h2 className="heading-lg mb-6 text-background dark:text-foreground">
              Ready to Execute Your Vision?
            </h2>
            <p className="body-lg text-background/70 dark:text-foreground/70 max-w-2xl mx-auto mb-10">
              Let's discuss how Byldist can bring your architectural
              and interior design projects to life with precision.
            </p>
            <Button variant="accent" size="xl" asChild>
              <Link to="/contact">
                Start a Conversation
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </ScrollReveal>
        </div>
      </section>
      {/*  */}
    </>
  );
}
