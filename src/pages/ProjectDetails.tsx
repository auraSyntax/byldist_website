import { useParams, Link, Navigate } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { 
  ArrowLeft, 
  ArrowRight, 
  MapPin, 
  Calendar, 
  Maximize, 
  Tag, 
  CheckCircle,
  Sparkles,
  Building2,
  Clock,
  Award
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { ImageGallery } from "@/components/gallery/ImageGallery";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { getProjectById, getRelatedProjects } from "@/data/projects";

import "swiper/css";
import "swiper/css/navigation";

export default function ProjectDetails() {
  const { id } = useParams<{ id: string }>();
  const project = id ? getProjectById(id) : undefined;
  const relatedProjects = id ? getRelatedProjects(id, 3) : [];
  
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  const metadata = [
    { icon: Maximize, label: "Area", value: project.area },
    { icon: MapPin, label: "Location", value: project.location },
    { icon: Calendar, label: "Year", value: project.year },
    { icon: Tag, label: "Type", value: project.category },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <>
      {/* Hero Section */}
      <section ref={heroRef} className="relative pt-24 pb-16 md:pt-32 md:pb-20 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 grid-background opacity-50" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/3 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
        
        {/* Decorative Lines */}
        <motion.div 
          className="absolute top-32 left-8 w-px h-32 bg-gradient-to-b from-accent/0 via-accent/40 to-accent/0 hidden lg:block"
          initial={{ scaleY: 0 }}
          animate={isHeroInView ? { scaleY: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        />

        <motion.div 
          className="absolute top-40 right-12 w-24 h-px bg-gradient-to-r from-accent/0 via-accent/40 to-accent/0 hidden lg:block"
          initial={{ scaleX: 0 }}
          animate={isHeroInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        />

        <div className="container-wide relative">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isHeroInView ? "visible" : "hidden"}
          >
            {/* Breadcrumb */}
            <motion.div variants={itemVariants} className="mb-8">
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/80 border border-border/50 text-muted-foreground hover:text-accent hover:border-accent/30 transition-all duration-300 group backdrop-blur-sm"
              >
                <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                <span className="text-sm font-medium">Back to Projects</span>
              </Link>
            </motion.div>

            {/* Main Hero Grid */}
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              {/* Left Content */}
              <div className="lg:col-span-7 space-y-6">
                {/* Category & Status */}
                <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20">
                    <Building2 className="h-3.5 w-3.5 text-accent" />
                    <span className="text-sm font-semibold text-accent">{project.category}</span>
                  </span>
                  <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border ${
                    project.status === "Completed"
                      ? "bg-green-500/10 border-green-500/20 text-green-500"
                      : "bg-amber-500/10 border-amber-500/20 text-amber-500"
                  }`}>
                    {project.status === "Completed" ? (
                      <CheckCircle className="h-3.5 w-3.5" />
                    ) : (
                      <Clock className="h-3.5 w-3.5" />
                    )}
                    <span className="text-sm font-semibold">{project.status}</span>
                  </span>
                </motion.div>

                {/* Title */}
                <motion.h1 
                  variants={itemVariants}
                  className="heading-xl"
                >
                  {project.title}
                </motion.h1>

                {/* Tagline */}
                <motion.p 
                  variants={itemVariants}
                  className="body-lg max-w-xl"
                >
                  {project.tagline}
                </motion.p>

                {/* Metadata Grid */}
                <motion.div 
                  variants={itemVariants}
                  className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4"
                >
                  {metadata.map(({ icon: Icon, label, value }) => (
                    <div
                      key={label}
                      className="group relative p-4 rounded-md bg-card border border-border hover:border-accent/30 transition-all duration-300"
                    >
                      <div className="absolute inset-0 rounded-md bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="relative">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="p-1.5 rounded-md bg-accent/10">
                            <Icon className="h-3.5 w-3.5 text-accent" />
                          </div>
                          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{label}</span>
                        </div>
                        <p className="text-sm font-semibold text-foreground truncate">{value}</p>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* Right Stats Card */}
              <motion.div 
                variants={itemVariants}
                className="lg:col-span-5"
              >
                <div className="relative p-6 md:p-8 rounded-md bg-card border border-border overflow-hidden">
                  {/* Corner Accents */}
                  <div className="absolute top-0 left-0 w-12 h-12 border-l-2 border-t-2 border-accent/30 rounded-tl-md" />
                  <div className="absolute bottom-0 right-0 w-12 h-12 border-r-2 border-b-2 border-accent/30 rounded-br-md" />
                  
                  {/* Gradient Glow */}
                  <div className="absolute -top-20 -right-20 w-40 h-40 bg-accent/10 rounded-full blur-3xl" />
                  
                  <div className="relative space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-md bg-accent/10 border border-accent/20">
                        <Award className="h-5 w-5 text-accent" />
                      </div>
                      <div>
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Project Highlights</p>
                        <p className="text-sm font-semibold text-foreground">Key Statistics</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 rounded-md bg-secondary/50 border border-border/50">
                        <p className="text-2xl md:text-3xl font-bold text-foreground">{project.features.length}</p>
                        <p className="text-sm text-muted-foreground mt-1">Key Features</p>
                      </div>
                      <div className="p-4 rounded-md bg-secondary/50 border border-border/50">
                        <p className="text-2xl md:text-3xl font-bold text-foreground">{project.images.length}</p>
                        <p className="text-sm text-muted-foreground mt-1">Gallery Images</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 pt-2">
                      <div className="flex -space-x-2">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="w-8 h-8 rounded-full bg-secondary border-2 border-card flex items-center justify-center">
                            <Sparkles className="h-3 w-3 text-accent" />
                          </div>
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground">Expert craftsmanship</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="py-12 md:py-16">
        <div className="container-wide">
          <ScrollReveal>
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
                <span className="label-text text-accent">Project Gallery</span>
                <div className="h-px flex-1 bg-gradient-to-l from-border to-transparent" />
              </div>
            </div>
            <ImageGallery images={project.images} title={project.title} />
          </ScrollReveal>
        </div>
      </section>

      {/* Overview & Philosophy Section */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Overview Card */}
            <ScrollReveal>
              <div className="group relative h-full p-8 md:p-10 rounded-md bg-card border border-border hover:border-accent/30 transition-all duration-500 overflow-hidden">
                {/* Background Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Number Badge */}
                <div className="absolute -top-2 -right-1 w-16 h-16 flex items-center justify-center">
                  <span className="text-6xl font-bold text-accent/10">01</span>
                </div>

                <div className="relative">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2.5 rounded-md bg-accent/10 border border-accent/20">
                      <Building2 className="h-5 w-5 text-accent" />
                    </div>
                    <span className="label-text text-accent text-shadow-solid">Overview</span>
                  </div>
                  <h2 className="heading-lg mb-6">Project Background</h2>
                  <p className="body-md leading-relaxed">{project.overview}</p>
                </div>

                {/* Bottom Accent */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-accent/50 via-accent to-accent/50 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </div>
            </ScrollReveal>

            {/* Philosophy Card */}
            <ScrollReveal delay={0.2}>
              <div className="group relative h-full p-8 md:p-10 rounded-md bg-secondary/50 border border-border hover:border-accent/30 transition-all duration-500 overflow-hidden">
                {/* Background Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Number Badge */}
                <div className="absolute -top-2 right-1 w-16 h-16 flex items-center justify-center">
                  <span className="text-6xl font-bold text-accent/10">02</span>
                </div>

                <div className="relative">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2.5 rounded-md bg-accent/10 border border-accent/20">
                      <Sparkles className="h-5 w-5 text-accent" />
                    </div>
                    <span className="label-text text-accent text-shadow-solid">Philosophy</span>
                  </div>
                  <h3 className="heading-lg mb-6">Design Intent</h3>
                  
                  {/* Quote Block */}
                  <div className="relative pl-6 border-l-2 border-accent">
                    <div className="absolute -top-2 -left-3 w-6 h-6 rounded-full bg-accent flex items-center justify-center">
                      <span className="text-accent-foreground text-lg font-bold">"</span>
                    </div>
                    <p className="body-md leading-relaxed italic text-foreground/90">
                      {project.philosophy}
                    </p>
                  </div>
                </div>

                {/* Bottom Accent */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-accent/50 via-accent to-accent/50 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-right" />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="relative section-padding overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-secondary/30" />
        <div className="absolute inset-0 grid-background-dense opacity-50" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[150px]" />

        <div className="container-wide relative">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6">
                <CheckCircle className="h-4 w-4 text-accent" />
                <span className="text-sm font-semibold text-accent text-shadow-solid">Highlights</span>
              </div>
              <h2 className="heading-lg mb-4">Key Features</h2>
              <p className="body-md">Discover the distinctive elements that make this project exceptional</p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-6">
            {project.features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative p-6 md:p-8 rounded-md bg-card border border-border hover:border-accent/50 transition-all duration-300 overflow-hidden"
              >
                {/* Hover Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Number */}
                <div className="absolute top-4 right-4 w-10 h-10 rounded-md bg-accent/10 flex items-center justify-center">
                  <span className="text-sm font-bold text-accent">{String(index + 1).padStart(2, '0')}</span>
                </div>

                {/* Content */}
                <div className="relative">
                  {/* Accent Line */}
                  <div className="w-12 h-1 bg-accent rounded-md mb-6" />
                  
                  <h3 className="heading-sm mb-3 group-hover:text-accent transition-colors duration-300 pr-12">
                    {feature.title}
                  </h3>
                  <p className="body-md">{feature.description}</p>
                </div>

                {/* Corner Accents on Hover */}
                <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-accent rounded-tl-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-accent rounded-br-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Projects */}
      <section className="section-padding">
        <div className="container-wide">
          <ScrollReveal>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-md bg-accent/10 border border-accent/20">
                    <Sparkles className="h-4 w-4 text-accent" />
                  </div>
                  <span className="label-text text-accent text-shadow-solid">Explore More</span>
                </div>
                <h2 className="heading-lg">Other Projects You Might Like</h2>
              </div>
              <div className="flex gap-2">
                <button
                  className="related-prev p-3 rounded-xl border border-border bg-card hover:border-accent hover:text-accent transition-all duration-300 disabled:opacity-50"
                  aria-label="Previous projects"
                >
                  <ArrowLeft className="h-5 w-5" />
                </button>
                <button
                  className="related-next p-3 rounded-xl border border-border bg-card hover:border-accent hover:text-accent transition-all duration-300 disabled:opacity-50"
                  aria-label="Next projects"
                >
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </ScrollReveal>

          <Swiper
            modules={[Navigation]}
            navigation={{
              prevEl: ".related-prev",
              nextEl: ".related-next",
            }}
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {relatedProjects.map((proj, index) => (
              <SwiperSlide key={proj.id}>
                <ProjectCard
                  title={proj.title}
                  category={proj.category}
                  location={proj.location}
                  image={proj.image}
                  href={`/projects/${proj.id}`}
                  index={index}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative section-padding overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-foreground dark:bg-secondary" />
        <div className="absolute inset-0 grid-background opacity-10" />
        
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 dark:bg-accent/0 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 dark:bg-accent/0 rounded-full blur-[100px]" />

        <div className="container-wide relative">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <ScrollReveal>
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background/10 dark:bg-foreground/10 border border-background/20 dark:border-foreground/20 mb-6">
                  <Building2 className="h-4 w-4 text-accent" />
                  <span className="text-sm font-semibold text-background/90 dark:text-foreground/90">Start Your Project</span>
                </div>
                <h2 className="heading-lg mb-6 text-background dark:text-foreground">
                  Ready to Transform Your Vision?
                </h2>
                <p className="body-lg text-background/70 dark:text-foreground/70 mb-8">
                  Let's discuss how Byldist can transform your architectural vision into reality with expert craftsmanship and innovative design.
                </p>

                {/* Trust Points */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  {[
                    "Expert Design Team",
                    "Quality Craftsmanship",
                    "Timely Delivery",
                    "Client-Centric Approach"
                  ].map((point, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="p-1.5 rounded-md bg-accent/20">
                        <CheckCircle className="h-4 w-4 text-accent" />
                      </div>
                      <span className="text-sm font-medium text-background/80 dark:text-foreground/80">{point}</span>
                    </div>
                  ))}
                </div>

                {/* CTAs */}
                <div className="flex flex-wrap gap-4">
                  <Button variant="accent" size="xl" asChild>
                    <Link to="/contact">
                      Get in Touch
                      <ArrowRight className="h-5 w-5" />
                    </Link>
                  </Button>

                  <Button
                    variant="outline"
                    size="xl"
                    className="border-background/30 dark:border-foreground/30 text-background dark:text-foreground hover:bg-background/10 dark:hover:bg-foreground/10"
                    asChild
                  >
                    <Link to="/projects">View All Projects</Link>
                  </Button>
                </div>
              </div>
            </ScrollReveal>

            {/* Right Card */}
            <ScrollReveal delay={0.2}>
              <div className="relative p-8 md:p-10 rounded-md bg-background/5 dark:bg-background/50 border border-background/10 backdrop-blur-sm">
                {/* Corner Accents */}
                <div className="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 border-accent/50 rounded-tl-md" />
                <div className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-accent/50 rounded-br-md" />
                
                {/* Glow */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent/20 dark:bg-accent/20 rounded-full blur-3xl" />
                
                <div className="relative text-center">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-md bg-accent/10 border border-accent/20 flex items-center justify-center">
                    <Sparkles className="h-10 w-10 text-accent" />
                  </div>
                  <h3 className="text-2xl font-bold text-background dark:text-foreground mb-4">Let's Build Together</h3>
                  <p className="text-background/60 dark:text-foreground/60 mb-6">
                    Schedule a consultation to discuss your project requirements and explore possibilities.
                  </p>
                  <div className="flex items-center justify-center gap-2 text-accent">
                    <Award className="h-5 w-5" />
                    <span className="text-sm font-semibold">100+ Projects Delivered</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
}
