import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Search, Building2, MapPin, Filter, X, Layers, CheckCircle, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { CountUpStat } from "@/components/animations/CountUpStat";

import { projectsData } from "@/data/projects";

const sectors = ["All", "Residential", "Commercial", "Hospitality", "Interior"];
const statuses = ["All", "Completed", "In Progress"];

export default function Projects() {
  const [selectedSector, setSelectedSector] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const heroRef = useRef(null);
  const isInView = useInView(heroRef, { once: true });

  const filteredProjects = projectsData.filter((project) => {
    const matchesSector = selectedSector === "All" || project.category === selectedSector;
    const matchesStatus = selectedStatus === "All" || project.status === selectedStatus;
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSector && matchesStatus && matchesSearch;
  });

  const activeFiltersCount = (selectedSector !== "All" ? 1 : 0) + (selectedStatus !== "All" ? 1 : 0) + (searchQuery ? 1 : 0);

  const clearFilters = () => {
    setSelectedSector("All");
    setSelectedStatus("All");
    setSearchQuery("");
  };

  return (
    <>
      {/* Hero Section */}
      <section ref={heroRef} className="relative pt-24 pb-12 md:pt-32 md:pb-16 lg:pt-40 lg:pb-20 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 grid-background opacity-50" />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isInView ? 0.4 : 0 }}
          transition={{ duration: 1.5 }}
          className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/10 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/4 hidden lg:block"
        />

        {/* Decorative Lines */}
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: isInView ? 1 : 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="absolute left-6 md:left-12 lg:left-16 xl:left-8 2xl:left-20 top-1/4 w-px h-24 md:h-32 bg-gradient-to-b from-accent to-transparent origin-top hidden xl:block"
        />

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: isInView ? 1 : 0 }}
          transition={{ duration: 0.3, delay: 0.9 }}
          className="absolute left-6 md:left-12 lg:left-16 xl:left-8 2xl:left-20 top-1/4 -translate-y-1 w-2 h-2 bg-accent hidden xl:block"
        />

        <div className="container-wide relative z-10">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Left Content - 7 columns */}
            <div className="lg:col-span-7">
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
                <Link to="/" className="hover:text-accent transition-colors">Home</Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-foreground">Our Projects</span>
              </div>

              {/* Label */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : -20 }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-3 mb-4 md:mb-5"
              >
                <span className="w-8 h-px bg-accent" />
                <span className="label-text text-accent tracking-widest text-shadow-solid">What We’ve Built</span>
              </motion.div>

              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="heading-xl mb-5 md:mb-6"
              >
                <span className="block">Featured</span>
                <span className="block mt-1">
                  <span className="bg-gradient-to-r from-foreground via-foreground/70 to-muted-foreground bg-clip-text text-transparent">
                    Projects
                  </span>
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: isInView ? 1 : 0 }}
                    transition={{ duration: 0.3, delay: 0.7 }}
                    className="inline-block w-2 h-2 md:w-3 md:h-3 bg-accent ml-2 align-baseline rounded-full"
                  />
                </span>
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="body-lg text-muted-foreground max-w-xl mb-6 md:mb-8"
              >
                Explore our portfolio of successfully executed architecture and
                interior design projects across India, from luxury residences to
                commercial landmarks.
              </motion.p>

              {/* Trust Badges */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-wrap items-center gap-3 md:gap-6"
              >
                {[
                  { icon: Building2, text: "Multi-Sector Expertise" },
                  { icon: MapPin, text: "Pan-India Projects" },
                  { icon: Layers, text: "Design to Delivery" }
                ].map((badge, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground">
                    <badge.icon className="w-4 h-4 text-accent flex-shrink-0" />
                    <span>{badge.text}</span>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right Stats Card - 5 columns */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : 30 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="lg:col-span-5"
            >
              <div className="relative bg-card border border-border p-5 md:p-6 lg:p-8">
                {/* Corner Accents */}
                <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-accent" />
                <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-accent" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-accent" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-accent" />

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4 md:gap-6">
                  <CountUpStat end={100} suffix="+" label="Total Projects" delay={0.4} />
                  <CountUpStat end={12} suffix="+" label="Cities Covered" delay={0.5} />
                  <CountUpStat end={15} suffix="+" label="Studio Partners" delay={0.6} />
                  <CountUpStat end={100} suffix="%" label="On-Time Delivery" delay={0.7} />
                </div>

                {/* Divider */}
                <div className="w-full h-px bg-border my-5 md:my-6" />

                {/* Quick Links */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
                  <span className="text-xs md:text-sm text-muted-foreground whitespace-nowrap">Explore by sector</span>
                  <div className="flex flex-wrap items-center gap-1.5 md:gap-2">
                    {sectors.slice(1, 4).map((sector) => (
                      <button
                        key={sector}
                        onClick={() => setSelectedSector(sector)}
                        className="px-2.5 md:px-3 py-1.5 text-xs font-medium bg-secondary hover:bg-accent hover:text-accent-foreground transition-all duration-200"
                      >
                        {sector}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-4 md:py-5 border-y border-border sticky top-[52px] sm:top-[60px] md:top-16 lg:top-[60px] bg-background/95 backdrop-blur-sm z-40">
        <div className="container-wide">
          <div className="flex flex-col gap-4">
            {/* Top Row - Search & Mobile Filter Toggle */}
            <div className="flex items-center gap-3 md:gap-4">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search projects by name or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-10 md:h-11 pl-10 pr-4 bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all text-sm"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    title="Clear search query"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Mobile Filter Toggle */}
              <button
                onClick={() => setShowMobileFilters(!showMobileFilters)}
                className="md:hidden flex items-center gap-2 px-4 h-10 bg-secondary border border-border text-sm font-medium transition-all hover:border-accent"
              >
                <Filter className="w-4 h-4" />
                Filters
                {activeFiltersCount > 0 && (
                  <span className="w-5 h-5 rounded-full bg-accent text-accent-foreground text-xs flex items-center justify-center">
                    {activeFiltersCount}
                  </span>
                )}
              </button>

              {/* Results & Clear - Desktop */}
              <div className="hidden md:flex items-center gap-4 ml-auto">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{filteredProjects.length}</span>
                  <span className="text-sm text-muted-foreground">
                    project{filteredProjects.length !== 1 ? 's' : ''}
                  </span>
                </div>
                {activeFiltersCount > 0 && (
                  <button
                    onClick={clearFilters}
                    className="flex items-center gap-1.5 text-sm text-accent hover:underline underline-offset-4 transition-all"
                  >
                    <X className="w-3.5 h-3.5" />
                    Clear all
                  </button>
                )}
              </div>
            </div>

            {/* Desktop Filters */}
            <div className="hidden md:flex items-center gap-6">
              {/* Sector Filter */}
              <div className="flex items-center gap-3">
                <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Sector
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {sectors.map((sector) => (
                    <button
                      key={sector}
                      onClick={() => setSelectedSector(sector)}
                      className={`px-3 py-1.5 text-xs font-medium transition-all duration-200 ${selectedSector === sector
                        ? "bg-accent text-accent-foreground"
                        : "bg-secondary hover:bg-secondary/80 text-foreground/80 hover:text-foreground border border-transparent hover:border-border"
                        }`}
                    >
                      {sector}
                    </button>
                  ))}
                </div>
              </div>

              {/* Divider */}
              <div className="w-px h-5 bg-border" />

              {/* Status Filter */}
              <div className="flex items-center gap-3">
                <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Status
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {statuses.map((status) => (
                    <button
                      key={status}
                      onClick={() => setSelectedStatus(status)}
                      className={`px-3 py-1.5 text-xs font-medium transition-all duration-200 ${selectedStatus === status
                        ? "bg-accent text-accent-foreground"
                        : "bg-secondary hover:bg-secondary/80 text-foreground/80 hover:text-foreground border border-transparent hover:border-border"
                        }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile Filters */}
            {showMobileFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden flex flex-col gap-4 pt-2 border-t border-border"
              >
                {/* Results Count */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{filteredProjects.length}</span>
                    <span className="text-sm text-muted-foreground">results</span>
                  </div>
                  {activeFiltersCount > 0 && (
                    <button
                      onClick={clearFilters}
                      className="text-sm text-accent hover:underline"
                    >
                      Clear all
                    </button>
                  )}
                </div>

                {/* Sector Filter */}
                <div className="space-y-2">
                  <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Sector
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {sectors.map((sector) => (
                      <button
                        key={sector}
                        onClick={() => setSelectedSector(sector)}
                        className={`px-3 py-2 text-xs font-medium transition-all ${selectedSector === sector
                          ? "bg-accent text-accent-foreground"
                          : "bg-secondary text-foreground/80"
                          }`}
                      >
                        {sector}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Status Filter */}
                <div className="space-y-2">
                  <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Status
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {statuses.map((status) => (
                      <button
                        key={status}
                        onClick={() => setSelectedStatus(status)}
                        className={`px-3 py-2 text-xs font-medium transition-all ${selectedStatus === status
                          ? "bg-accent text-accent-foreground"
                          : "bg-secondary text-foreground/80"
                          }`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container-wide">
          {filteredProjects.length > 0 ? (
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 lg:gap-8"
            >
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
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
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16 md:py-24"
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-secondary flex items-center justify-center">
                <Search className="w-7 h-7 text-muted-foreground" />
              </div>
              <h3 className="heading-sm mb-2">No projects found</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                We couldn't find any projects matching your criteria. Try adjusting your filters or search terms.
              </p>
              <Button variant="outline" onClick={clearFilters}>
                Clear All Filters
              </Button>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-16 md:py-20 lg:py-24 bg-foreground dark:bg-secondary text-background dark:text-foreground overflow-hidden">
        {/* Background Grid */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(hsl(var(--background)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--background)) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }} />
        </div>

        {/* Gradient Glow */}
        {/* <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.3 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-accent/20 blur-[120px] rounded-full"
        /> */}

        <div className="container-wide relative z-10">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Content */}
            <div className="lg:col-span-7">
              <ScrollReveal>
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-px bg-accent" />
                  <span className="label-text text-accent tracking-widest">Start Your Project</span>
                </div>
                <h2 className="heading-lg mb-4 text-background dark:text-foreground">
                  Have a Project in Mind?
                </h2>
                <p className="body-lg text-background/70 dark:text-foreground/70 max-w-xl mb-8">
                  Let's discuss how Byldist can bring your architectural vision to life
                  with precision and excellence. Our team is ready to help you execute
                  your next masterpiece.
                </p>

                {/* Trust Points */}
                <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mb-8">
                  {["Free Consultation", "Transparent Pricing", "Expert Team"].map((point) => (
                    <div key={point} className="flex items-center gap-2 text-background/80 dark:text-foreground/80">
                      <CheckCircle className="w-4 h-4 text-accent" />
                      <span className="text-sm">{point}</span>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </div>

            {/* CTA Buttons */}
            <div className="lg:col-span-5">
              <ScrollReveal delay={0.2}>
                <div className="flex flex-col sm:flex-row lg:flex-col gap-4">
                  <Button variant="accent" size="xl" asChild className="w-full sm:w-auto lg:w-full">
                    <Link to="/contact">
                      Start Your Project
                      <ArrowRight className="h-5 w-5" />
                    </Link>
                  </Button>

                  <Button
                    variant="outline"
                    size="xl"
                    asChild
                    className="w-full sm:w-auto lg:w-full border-background/30 dark:border-foreground/30 text-background dark:text-foreground hover:bg-background/10 dark:hover:bg-foreground/10"
                  >
                    <Link to="/services">
                      Explore Services
                    </Link>
                  </Button>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}