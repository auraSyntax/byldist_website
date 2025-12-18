import { useParams, Link, Navigate } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getServiceById, getRelatedServices } from "@/data/services";
import { useRef } from "react";

export default function ServiceDetails() {
  const { id } = useParams<{ id: string }>();
  const service = id ? getServiceById(id) : undefined;
  const relatedServices = id ? getRelatedServices(id, 3) : [];
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  const Icon = service.icon;

  return (
    <>
      {/* Hero Section - Modern Split Layout */}
      <section ref={heroRef} className="relative min-h-[85vh] lg:min-h-screen flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-secondary via-background to-background" />
        <div className="absolute inset-0 grid-background opacity-40" />

        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-[50%] h-full bg-gradient-to-l from-accent/5 to-transparent hidden lg:block" />
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={isHeroInView ? { scale: 1, opacity: 0.1 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
          className="absolute top-20 right-20 w-[400px] h-[400px] rounded-full bg-accent blur-[100px] hidden lg:block"
        />

        <motion.div
          initial={{ scaleY: 0 }}
          animate={isHeroInView ? { scaleY: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="absolute left-8 lg:left-16 top-1/3 w-px h-24 bg-accent origin-top hidden xl:block"
        />

        <motion.div
          initial={{ scale: 0 }}
          animate={isHeroInView ? { scale: 1 } : {}}
          transition={{ duration: 0.3, delay: 1 }}
          className="absolute left-8 lg:left-16 top-1/3 -translate-y-1 w-2 h-2 bg-accent hidden xl:block"
        />

        <div className="container-wide relative z-10 pt-24 pb-16 lg:pt-32 lg:pb-24">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7">
              {/* Breadcrumb */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={isHeroInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4 }}
                className="mb-8"
              >
                <Link
                  to="/services"
                  className="inline-flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors group"
                >
                  <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                  <span className="label-text">Back to Services</span>
                </Link>
              </motion.div>

              {/* Icon Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isHeroInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="inline-flex items-center justify-center w-16 h-16 lg:w-20 lg:h-20 bg-accent text-accent-foreground mb-6 lg:mb-8"
              >
                <Icon className="h-8 w-8 lg:h-10 lg:w-10" />
              </motion.div>

              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="heading-xl mb-6"
              >
                {service.title}
                <motion.span
                  initial={{ scale: 0 }}
                  animate={isHeroInView ? { scale: 1 } : {}}
                  transition={{ duration: 0.3, delay: 0.7 }}
                  className="inline-block w-3 h-3 bg-accent ml-3 align-baseline rounded-full"
                />
              </motion.h1>

              {/* Tagline */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-xl lg:text-2xl text-foreground/80 max-w-xl mb-8 leading-relaxed"
              >
                {service.tagline}
              </motion.p>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-wrap gap-4"
              >
                <Button variant="default" size="lg" asChild className="group">
                  <Link to="/contact">
                    Start a Project
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/services">View All Services</Link>
                </Button>
              </motion.div>
            </div>

            {/* Right - Service Stats Card */}
            <div className="lg:col-span-5">
              <motion.div
                initial={{ opacity: 0, x: 40, rotateY: -10 }}
                animate={isHeroInView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent blur-2xl -z-10" />
                <div className="bg-card border border-border p-6 lg:p-8 relative overflow-hidden">
                  {/* Corner Accent */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-accent/10" />
                  <div className="absolute top-0 right-0 w-1 h-12 bg-accent" />
                  <div className="absolute top-0 right-0 w-12 h-1 bg-accent" />

                  <h3 className="heading-sm mb-6 relative z-10">Quick Overview</h3>

                  <div className="space-y-4 relative z-10">
                    <div className="flex items-center justify-between py-3 border-b border-border">
                      <span className="text-muted-foreground">Deliverables</span>
                      <span className="font-semibold text-foreground">{service.includes.length} Items</span>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-border">
                      <span className="text-muted-foreground">Use Cases</span>
                      <span className="font-semibold text-foreground">{service.helps.length} Scenarios</span>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-border">
                      <span className="text-muted-foreground">Client Rating</span>
                      <span className="font-semibold text-accent">★★★★★</span>
                    </div>
                    <div className="flex items-center justify-between py-3">
                      <span className="text-muted-foreground">Support</span>
                      <span className="font-semibold text-foreground">Dedicated Team</span>
                    </div>
                  </div>

                  {/* Bottom accent line */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={isHeroInView ? { scaleX: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="absolute bottom-0 left-0 right-0 h-1 bg-accent origin-left"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Description Section */}
      <section className="section-padding bg-background relative">
        <div className="absolute inset-0 grid-background opacity-30" />

        <div className="container-wide relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="w-8 h-px bg-accent" />
                <span className="label-text text-accent text-shadow-solid">Overview</span>
              </div>
              <h2 className="heading-lg mb-8">
                What We
                <span className="bg-gradient-to-r from-foreground via-foreground/70 to-muted-foreground bg-clip-text text-transparent"> Deliver</span>
              </h2>
              <p className="body-lg text-foreground/80 leading-relaxed">
                {service.description}
              </p>
            </motion.div>

            {/* Sidebar CTA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-4"
            >
              <div className="sticky top-32">
                <div className="p-6 lg:p-8 bg-secondary border border-border relative overflow-hidden group hover:border-accent/30 transition-colors duration-300">
                  <div className="absolute top-0 left-0 w-1 h-full bg-accent" />
                  <h3 className="heading-sm mb-4">Ready to Start?</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    Let's discuss how our {service.title.toLowerCase()} service can support your project.
                  </p>
                  <Button variant="default" size="lg" className="w-full group" asChild>
                    <Link to="/contact">
                      Get in Touch
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What's Included Section - Modern Grid */}
      <section className="section-padding bg-secondary relative overflow-hidden">
        <div className="absolute inset-0 grid-background opacity-30" />

        {/* Decorative */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.1 }}
          viewport={{ once: true }}
          className="absolute -bottom-32 -right-32 w-96 h-96 bg-accent blur-[120px]"
        />

        <div className="container-wide relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mb-12"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-px bg-accent" />
              <span className="label-text text-accent text-shadow-solid">Deliverables</span>
            </div>
            <h2 className="heading-lg">
              What's
              <span className="bg-gradient-to-r from-foreground via-foreground/70 to-muted-foreground bg-clip-text text-transparent"> Included</span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
            {service.includes.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                viewport={{ once: true }}
                className="group relative"
              >
                <div className="flex items-start gap-4 p-5 lg:p-6 bg-background border border-border hover:border-accent/50 transition-all duration-300 h-full">
                  <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-accent/10 group-hover:bg-accent transition-colors duration-300">
                    <Check className="h-4 w-4 text-accent group-hover:text-accent-foreground transition-colors duration-300" />
                  </div>
                  <span className="text-foreground font-medium leading-relaxed">{item.title}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Where This Helps Section */}
      <section className="section-padding bg-background relative overflow-hidden">
        <div className="absolute inset-0 grid-background opacity-30" />

        <div className="container-wide relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-2xl mx-auto mb-12 lg:mb-16"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="w-8 h-px bg-accent" />
              <span className="label-text text-accent text-shadow-solid">Use Cases</span>
              <span className="w-8 h-px bg-accent" />
            </div>
            <h2 className="heading-lg">
              Where This
              <span className="bg-gradient-to-r from-foreground via-foreground/70 to-muted-foreground bg-clip-text text-transparent"> Helps</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {service.helps.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                viewport={{ once: true }}
                className="group relative"
              >
                <div className="relative p-6 lg:p-8 bg-card border border-border hover:border-accent/50 transition-all duration-300 h-full">
                  {/* Number Badge */}
                  <div className="absolute -top-4 left-6 lg:left-8 px-3 py-1 bg-accent text-accent-foreground text-sm font-bold">
                    {String(index + 1).padStart(2, '0')}
                  </div>

                  {/* Top right accent */}
                  <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-accent/0 group-hover:border-accent transition-colors duration-300" />

                  <h3 className="heading-sm mb-4 mt-2 group-hover:text-accent transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="body-md leading-relaxed">
                    {item.description}
                  </p>

                  {/* Bottom accent line */}
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-500" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      {/* {service.testimonial && (
        <section className="section-padding bg-secondary relative overflow-hidden">
          <div className="absolute inset-0 grid-background opacity-30" />

          <div className="container-wide max-w-4xl relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative p-8 lg:p-12 bg-background border border-border">
                <div className="absolute top-0 left-0 w-1 h-16 bg-accent" />
                <div className="absolute top-0 left-0 w-16 h-1 bg-accent" />
                <div className="absolute bottom-0 right-0 w-1 h-16 bg-accent" />
                <div className="absolute bottom-0 right-0 w-16 h-1 bg-accent" />

                <div className="absolute -top-6 left-8 lg:left-12 w-12 h-12 bg-accent flex items-center justify-center">
                  <Quote className="h-6 w-6 text-accent-foreground" />
                </div>

                <blockquote className="pt-4">
                  <p className="text-xl lg:text-2xl font-medium leading-relaxed mb-8">
                    "{service.testimonial.quote}"
                  </p>
                  <footer className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-accent/10 flex items-center justify-center">
                      <span className="font-bold text-accent text-lg">
                        {service.testimonial.author.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <cite className="not-italic font-semibold block text-foreground">
                        {service.testimonial.author}
                      </cite>
                      <span className="text-sm text-muted-foreground">
                        {service.testimonial.role}
                      </span>
                    </div>
                  </footer>
                </blockquote>
              </div>
            </motion.div>
          </div>
        </section>
      )} */}

      {/* Related Services Section */}
      <section className="section-padding bg-secondary relative overflow-hidden">
        <div className="absolute inset-0 grid-background opacity-30" />

        <div className="container-wide relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-12"
          >
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="w-8 h-px bg-accent" />
                <span className="label-text text-accent text-shadow-solid">Explore More</span>
              </div>
              <h2 className="heading-lg">
                Other
                <span className="bg-gradient-to-r from-foreground via-foreground/70 to-muted-foreground bg-clip-text text-transparent"> Services</span>
              </h2>
            </div>
            <Button variant="outline" size="lg" asChild className="group">
              <Link to="/services">
                View All Services
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {relatedServices.map((relatedService, index) => {
              const RelatedIcon = relatedService.icon;
              return (
                <motion.div
                  key={relatedService.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link
                    to={`/services/${relatedService.id}`}
                    className="group block p-6 lg:p-8 border border-border bg-card hover:border-accent/50 transition-all duration-300 h-full relative overflow-hidden"
                  >
                    {/* Top accent line */}
                    <div className="absolute top-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-500" />

                    <div className="flex items-start justify-between mb-6">
                      <div className="p-3 bg-secondary text-foreground group-hover:bg-accent group-hover:text-accent-foreground transition-colors duration-300">
                        <RelatedIcon className="h-6 w-6" />
                      </div>
                      <ArrowUpRight className="h-5 w-5 text-muted-foreground opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300" />
                    </div>

                    <h3 className="heading-sm mb-3 group-hover:text-accent transition-colors duration-300">
                      {relatedService.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed line-clamp-2">
                      {relatedService.tagline}
                    </p>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-foreground dark:bg-background text-background dark:text-foreground relative overflow-hidden">
        {/* Decorative */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-accent blur-[150px]" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-accent blur-[100px]" />
        </div>

        <div className="container-wide text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="w-16 h-16 mx-auto mb-8 bg-accent flex items-center justify-center"
            >
              <Icon className="h-8 w-8 text-accent-foreground" />
            </motion.div>

            <h2 className="heading-lg mb-6 text-background dark:text-foreground">
              Ready to Get Started?
            </h2>
            <p className="body-lg text-background/70 dark:text-foreground/70 max-w-2xl mx-auto mb-10">
              Let's discuss how our {service.title.toLowerCase()} expertise can bring your vision to life with precision and excellence.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="accent" size="xl" asChild className="group">
                <Link to="/contact">
                  Start a Conversation
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>

              <Button
                variant="outline"
                size="xl"
                className="border-background/30 dark:border-foreground/30 text-background dark:text-foreground hover:bg-background/10 dark:hover:bg-foreground/10"
                asChild
              >
                <Link to="/services">View Our Services</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
