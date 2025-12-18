import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import axios from "axios";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  User,
  Building2,
  Briefcase,
  MapPinned,
  Layers,
  Clock,
  FileText,
  ArrowRight,
  MessageSquare,
  CheckCircle2,
  LoaderCircle,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { contactData } from "@/data/appData";

const roleOptions = [
  { label: "Architect", value: "architect" },
  { label: "Interior Designer", value: "interior_designer" },
  { label: "Brand / Marketing", value: "brand_marketing" },
  { label: "Developer", value: "developer" },
  { label: "Other", value: "other" },
];

const projectTypeOptions = [
  { label: "Retail Fit-out", value: "retail_fit_out" },
  { label: "F&B / Restaurant", value: "fnb_restaurant" },
  { label: "Office Interior", value: "office_interior" },
  { label: "Residential", value: "residential" },
  { label: "Hospitality", value: "hospitality" },
  { label: "Other", value: "other" },
];

const timelineOptions = [
  { label: "Immediately", value: "immediately" },
  { label: "Within 1 month", value: "within_1_month" },
  { label: "1-3 months", value: "one_to_three_months" },
  { label: "3-6 months", value: "three_to_six_months" },
  { label: "6+ months", value: "six_plus_months" },
  { label: "Just exploring", value: "just_exploring" },
];

const quickStats = [
  { value: "24h", label: "Response Time" },
  { value: "100+", label: "Projects Completed" },
  { value: "100%", label: "Client Satisfaction" },
];

const whyReachOut = [
  "Dedicated project manager for every inquiry",
  "Transparent pricing with no hidden costs",
  "Flexible engagement models",
  "NDA protection available",
];

export default function Contact() {
  const { toast } = useToast();
  const heroRef = useRef(null);
  const formRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });
  const isFormInView = useInView(formRef, { once: true, margin: "-100px" });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    role: "",
    projectLocation: "",
    projectType: "",
    timeline: "",
    projectBrief: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const normalize = (value: string) =>
    value
      .toLowerCase()
      .trim()
      .replace(/[^\w\s]/g, "")
      .replace(/\s+/g, "_");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isSubmitting) return;
    setIsSubmitting(true);

    const controller = new AbortController();

    try {
      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        company: formData.company.trim(),
        role: normalize(formData.role),
        project_location: formData.projectLocation.trim(),
        project_type: normalize(formData.projectType),
        start_timeline: normalize(formData.timeline),
        project_brief: formData.projectBrief.trim(),
      };

      await axios.post(
        "https://byldist-contact-submission.onrender.com/api/contact-submissions/",
        payload,
        {
          headers: { "Content-Type": "application/json" },
          signal: controller.signal,
          timeout: 15000,
        }
      );

      toast({
        title: "Message Sent Successfully!",
        description: "We'll get back to you within 24 hours.",
      });

      setFormData({
        name: "",
        email: "",
        company: "",
        role: "",
        projectLocation: "",
        projectType: "",
        timeline: "",
        projectBrief: "",
      });
    } catch (error) {
      console.error("Form submission error:", error);

      let errorMessage = "Failed to send message. Please try again.";

      if (axios.isAxiosError(error)) {
        if (error.code === "ECONNABORTED") {
          errorMessage = "Request timed out. Please try again.";
        } else if (error.response?.data) {
          errorMessage =
            error.response.data.message ||
            error.response.data.error ||
            errorMessage;
        } else if (error.request) {
          errorMessage = "Network error. Please check your connection.";
        }
      }

      toast({
        title: "Submission Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section ref={heroRef} className="relative pt-28 pb-16 md:pt-32 md:pb-20 lg:pt-36 lg:pb-24 overflow-hidden bg-secondary">
        <div className="absolute inset-0 grid-background opacity-40" />

        <motion.div
          initial={{ opacity: 0 }}
          animate={isHeroInView ? { opacity: 1 } : {}}
          transition={{ duration: 1 }}
          className="absolute top-20 right-10 w-80 h-80 bg-accent/10 blur-[100px] rounded-full hidden lg:block"
        />

        <motion.div
          initial={{ opacity: 0 }}
          animate={isHeroInView ? { opacity: 0.5 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
          className="absolute bottom-10 left-10 w-60 h-60 bg-accent/5 blur-[80px] rounded-full hidden lg:block"
        />

        <motion.div
          initial={{ scaleY: 0 }}
          animate={isHeroInView ? { scaleY: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="absolute left-6 md:left-12 lg:left-14 xl:left-10 2xl:left-16 top-36 w-px h-24 bg-accent origin-top hidden xl:block"
        />

        <motion.div
          initial={{ scale: 0 }}
          animate={isHeroInView ? { scale: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.8 }}
          className="absolute left-6 md:left-12 lg:left-14 xl:left-10 2xl:left-16 top-36 -translate-y-1 w-2 h-2 bg-accent hidden xl:block"
        />

        <div className="container-wide relative z-10">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-7">
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
                <Link to="/" className="hover:text-accent transition-colors">Home</Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-foreground">Contact Us</span>
              </div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={isHeroInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-3 mb-5"
              >
                <span className="w-8 h-px bg-accent" />
                <span className="label-text text-accent tracking-widest text-shadow-solid">Get in Touch</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="heading-xl mb-5"
              >
                <span className="block">Let's Build</span>
                <span className="block mt-1">
                  <span className="bg-gradient-to-r from-foreground via-foreground/70 to-muted-foreground bg-clip-text text-transparent">
                    Something Great
                  </span>
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={isHeroInView ? { scale: 1 } : {}}
                    transition={{ duration: 0.3, delay: 0.7 }}
                    className="inline-block w-3 h-3 bg-accent ml-2 align-baseline rounded-full"
                  />
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="body-lg max-w-xl mb-8"
              >
                Have a project in mind? We'd love to hear about it.
                Reach out and let's discuss how we can help execute your vision.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-wrap gap-3"
              >
                {["Quick Response", "Trusted Partner", "Expert Team"].map((tag, i) => (
                  <motion.span
                    key={tag}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isHeroInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.3, delay: 0.4 + i * 0.1 }}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-background border border-border text-sm text-muted-foreground hover:border-accent/50 transition-colors"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-accent" />
                    {tag}
                  </motion.span>
                ))}
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="lg:col-span-5"
            >
              <div className="relative p-6 md:p-8 bg-background border border-border">
                <div className="absolute top-0 left-0 w-12 h-12 border-l-2 border-t-2 border-accent -translate-x-px -translate-y-px" />
                <div className="absolute bottom-0 right-0 w-12 h-12 border-r-2 border-b-2 border-accent translate-x-px translate-y-px" />

                <div className="grid grid-cols-3 gap-4 mb-6">
                  {quickStats.map((stat, i) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 10 }}
                      animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                      className="text-center"
                    >
                      <div className="text-2xl md:text-3xl font-bold text-accent mb-1 text-shadow-solid">{stat.value}</div>
                      <div className="text-xs text-muted-foreground">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>

                <div className="h-px bg-border mb-6" />

                <div className="space-y-3">
                  {whyReachOut.map((item, i) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, x: -10 }}
                      animate={isHeroInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.3, delay: 0.7 + i * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <div className="w-1.5 h-1.5 bg-accent mt-2 shrink-0" />
                      <span className="text-sm text-muted-foreground">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section ref={formRef} className="section-padding bg-background relative">
        <div className="absolute inset-0 grid-background opacity-20" />

        <div className="container-wide relative z-10">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isFormInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 xl:col-span-8"
            >
              <div className="relative p-6 sm:p-8 md:p-10 bg-secondary border border-border">
                <div className="absolute top-0 right-0 w-16 h-16 border-r-2 border-t-2 border-accent/30 translate-x-px -translate-y-px" />
                <div className="absolute bottom-0 left-0 w-16 h-16 border-l-2 border-b-2 border-accent/30 -translate-x-px translate-y-px" />

                <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-accent flex items-center justify-center shrink-0">
                    <MessageSquare className="w-6 h-6 text-accent-foreground" />
                  </div>
                  <div>
                    <h2 className="heading-md mb-1">Start a Conversation</h2>
                    <p className="text-muted-foreground text-sm">Tell us about your project and we'll get back to you shortly.</p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="flex items-center gap-2 text-sm font-medium">
                        <User className="h-4 w-4 text-accent" />
                        Name <span className="text-accent">*</span>
                      </Label>
                      <Input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Your full name"
                        className="h-12 bg-background border-border focus:border-accent transition-colors"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="flex items-center gap-2 text-sm font-medium">
                        <Mail className="h-4 w-4 text-accent" />
                        Email <span className="text-accent">*</span>
                      </Label>
                      <Input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="you@company.com"
                        className="h-12 bg-background border-border focus:border-accent transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="company" className="flex items-center gap-2 text-sm font-medium">
                        <Building2 className="h-4 w-4 text-accent" />
                        Company / Studio
                      </Label>
                      <Input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Your company or studio name"
                        className="h-12 bg-background border-border focus:border-accent transition-colors"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="flex items-center gap-2 text-sm font-medium">
                        <Briefcase className="h-4 w-4 text-accent" />
                        Your Role
                      </Label>
                      <Select
                        value={formData.role}
                        onValueChange={(value) => handleSelectChange("role", value)}
                      >
                        <SelectTrigger className="h-12 bg-background border-border focus:border-accent transition-colors">
                          <SelectValue placeholder="Select your role" />
                        </SelectTrigger>
                        <SelectContent>
                          {roleOptions.map((role, index) => (
                            <SelectItem key={`role_${index}`} value={role?.value}>
                              {role?.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="projectLocation" className="flex items-center gap-2 text-sm font-medium">
                        <MapPinned className="h-4 w-4 text-accent" />
                        Project Location
                      </Label>
                      <Input
                        type="text"
                        id="projectLocation"
                        name="projectLocation"
                        value={formData.projectLocation}
                        onChange={handleChange}
                        placeholder="City, Country"
                        className="h-12 bg-background border-border focus:border-accent transition-colors"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="flex items-center gap-2 text-sm font-medium">
                        <Layers className="h-4 w-4 text-accent" />
                        Project Type
                      </Label>
                      <Select
                        value={formData.projectType}
                        onValueChange={(value) => handleSelectChange("projectType", value)}
                      >
                        <SelectTrigger className="h-12 bg-background border-border focus:border-accent transition-colors">
                          <SelectValue placeholder="Select project type" />
                        </SelectTrigger>
                        <SelectContent>
                          {projectTypeOptions.map((type, index) => (
                            <SelectItem key={`type_${index}`} value={type?.value}>
                              {type?.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="flex items-center gap-2 text-sm font-medium">
                      <Clock className="h-4 w-4 text-accent" />
                      Approximate Start Timeline
                    </Label>
                    <Select
                      value={formData.timeline}
                      onValueChange={(value) => handleSelectChange("timeline", value)}
                    >
                      <SelectTrigger className="h-12 bg-background border-border focus:border-accent transition-colors">
                        <SelectValue placeholder="When do you plan to start?" />
                      </SelectTrigger>
                      <SelectContent>
                        {timelineOptions.map((timeline, index) => (
                          <SelectItem key={`timeline_${index}`} value={timeline?.value}>
                            {timeline?.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="projectBrief" className="flex items-center gap-2 text-sm font-medium">
                      <FileText className="h-4 w-4 text-accent" />
                      Project Brief <span className="text-accent">*</span>
                    </Label>
                    <Textarea
                      id="projectBrief"
                      name="projectBrief"
                      value={formData.projectBrief}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder="Tell us about your project, goals, and any specific requirements..."
                      className="bg-background resize-none border-border focus:border-accent transition-colors"
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="accent"
                    size="lg"
                    className="w-full group rounded-md"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <LoaderCircle className="animate-spin" />
                        Sending...
                      </span>
                    ) : (
                      <>
                        Send Message
                        <Send className="h-5 w-5 group-hover:rotate-45 transition-transform" />
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </motion.div>

            {/* Contact Info Sidebar */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isFormInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-5 xl:col-span-4"
            >
              <div className="lg:sticky lg:top-28 space-y-6">
                <div className="p-6 bg-secondary border border-border">
                  <h2 className="heading-sm mb-2">Contact Information</h2>
                  <p className="body-sm mb-6">
                    We typically respond within 24 hours. For urgent matters,
                    feel free to call us directly.
                  </p>

                  <div className="space-y-4">
                    <Link
                      to={`mailto:${contactData?.email}`}
                      className="group flex items-start gap-4 p-4 border border-border bg-background hover:border-accent transition-all duration-300 relative overflow-hidden"
                    >
                      <motion.div
                        className="absolute inset-0 bg-accent/5"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: 0 }}
                        transition={{ duration: 0.3 }}
                      />
                      <div className="relative p-2.5 bg-accent text-accent-foreground shrink-0">
                        <Mail className="h-4 w-4" />
                      </div>
                      <div className="relative">
                        <h3 className="font-semibold mb-0.5 group-hover:text-accent transition-colors">
                          Email Us
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {contactData?.email}
                        </p>
                      </div>
                      <ArrowRight className="w-4 h-4 ml-auto mt-1 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-accent" />
                    </Link>

                    <Link
                      to={`tel:${contactData?.contactNo.replace(/\s+/g, "")}`}
                      className="group flex items-start gap-4 p-4 border border-border bg-background hover:border-accent transition-all duration-300 relative overflow-hidden"
                    >
                      <motion.div
                        className="absolute inset-0 bg-accent/5"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: 0 }}
                        transition={{ duration: 0.3 }}
                      />
                      <div className="relative p-2.5 bg-accent text-accent-foreground shrink-0">
                        <Phone className="h-4 w-4" />
                      </div>
                      <div className="relative">
                        <h3 className="font-semibold mb-0.5 group-hover:text-accent transition-colors">
                          Call Us
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {contactData?.contactNo}
                        </p>
                      </div>
                      <ArrowRight className="w-4 h-4 ml-auto mt-1 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-accent" />
                    </Link>

                    <div className="flex items-start gap-4 p-4 border border-border bg-background">
                      <div className="p-2.5 bg-accent text-accent-foreground shrink-0">
                        <MapPin className="h-4 w-4" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-0.5">Visit Us</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {contactData?.address}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative p-6 border border-accent bg-accent/5 overflow-hidden">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-accent/10 blur-2xl rounded-full" />
                  <div className="relative">
                    <div className="flex items-center gap-2 mb-3">
                      <Clock className="w-4 h-4 text-accent" />
                      <h3 className="font-semibold">Office Hours</h3>
                    </div>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex justify-between">
                        <span>Monday - Friday</span>
                        <span className="text-foreground">9:00 AM - 6:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Saturday</span>
                        <span className="text-foreground">10:00 AM - 2:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Sunday</span>
                        <span className="text-muted-foreground/60">Closed</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 border border-black dark:border-accent bg-foreground dark:bg-accent/5 text-background dark:text-foreground relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 blur-3xl rounded-full" />
                  <div className="relative">
                    <h3 className="font-semibold mb-2">Prefer a scheduled call?</h3>
                    <p className="text-sm text-background/70 dark:text-foreground/70 mb-4">
                      Book a 30-minute consultation with our team.
                    </p>
                    <Button variant="accent" size="default" className="w-full group">
                      Schedule a Call
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="relative py-16 sm:py-20 md:py-24 lg:py-32 overflow-hidden bg-secondary">
        {/* Grid background */}
        <div
          className="absolute inset-0 opacity-[0.02] dark:opacity-[0.01]"
          style={{
            backgroundImage: `
              linear-gradient(to right, currentColor 1px, transparent 1px),
              linear-gradient(to bottom, currentColor 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}
        />

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background opacity-60" />
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.3 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/10 blur-[120px] rounded-full"
        />

        <div className="container-wide relative z-10">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 sm:mb-16 md:mb-20"
          >
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="h-px w-8 sm:w-12 bg-gradient-to-r from-transparent via-accent/50 to-accent" />
              <MapPin className="w-5 h-5 text-accent" />
              <div className="h-px w-8 sm:w-12 bg-gradient-to-l from-transparent via-accent/50 to-accent" />
            </div>

            <h2 className="heading-lg font-display font-bold mb-4 sm:mb-5">
              Find Us
              <span className="block mt-1">
                <span className="text-accent text-shadow-solid">
                  On The Map
                </span>
              </span>
            </h2>

            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Visit our studio in the heart of Chennai. We're always excited to meet
              potential clients and discuss your project over coffee.
            </p>
          </motion.div>

          {/* Map Container with Creative Design */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="relative max-w-6xl mx-auto"
          >
            {/* Decorative corner accents */}
            <div className="absolute -top-4 -left-4 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 border-l-2 border-t-2 border-accent opacity-50 z-10" />
            <div className="absolute -bottom-4 -right-4 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 border-r-2 border-b-2 border-accent opacity-50 z-10" />

            {/* Animated dots */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="absolute -top-2 -left-2 w-3 h-3 bg-accent rounded-full z-10"
            />
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="absolute -bottom-2 -right-2 w-3 h-3 bg-accent rounded-full z-10"
            />

            {/* Map wrapper with gradient border effect */}
            <div className="relative group">
              {/* Gradient border effect */}
              <div className="absolute -inset-[1px] bg-gradient-to-br from-accent/30 via-accent/10 to-accent/30 rounded-2xl sm:rounded-3xl group-hover:from-accent/50 group-hover:to-accent/50 transition-all duration-500" />

              {/* Inner container */}
              <div className="relative bg-background rounded-2xl sm:rounded-3xl overflow-hidden">
                {/* Map iframe */}
                <div className="relative aspect-[16/10] sm:aspect-[16/9] md:aspect-video">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115149.35610199424!2d80.2038792190727!3d13.06710386024699!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5265ea4f7d3361%3A0x6e61a70b6863d433!2sChennai%2C%20Tamil%20Nadu%2C%20India!5e0!3m2!1sen!2slk!4v1765727930020!5m2!1sen!2slk"
                    className="absolute inset-0 w-full h-full border-0 grayscale-[0.3] contrast-[1.1] hover:grayscale-0 transition-all duration-700"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`Byldist Location - ${contactData?.address}`}
                    allowFullScreen
                  />

                  {/* Overlay gradient on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </div>

                {/* Info overlay card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-auto sm:max-w-xs"
                >
                  <div className="relative backdrop-blur-xl bg-background/95 dark:bg-background/90 border border-border/50 rounded-xl p-4 sm:p-5 shadow-2xl">
                    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-accent/50 via-accent to-accent/50" />

                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-5 h-5 text-black" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-display font-bold text-foreground text-base sm:text-lg mb-1">
                          Byldist
                        </h3>
                        <p className="text-xs sm:text-sm text-muted-foreground leading-snug">
                          {contactData?.address}
                        </p>
                      </div>
                    </div>

                    <Link
                      to="https://maps.app.goo.gl/EoHmVavJWt8wCEwEA"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-accent text-black font-medium text-sm rounded-lg hover:bg-accent/90 transition-colors group/btn"
                    >
                      Get Directions
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Decorative floating elements */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="hidden lg:block absolute -left-12 top-1/4 w-24 h-px bg-gradient-to-r from-accent to-transparent"
            />
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="hidden lg:block absolute -right-12 bottom-1/4 w-24 h-px bg-gradient-to-l from-accent to-transparent"
            />
          </motion.div>

          {/* Additional Info Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 max-w-5xl mx-auto mt-10 sm:mt-12 md:mt-16"
          >
            {[
              { icon: Phone, label: "Quick Call", value: contactData?.contactNo, href: `tel:${contactData?.contactNo.replace(/\s+/g, "")}` },
              { icon: Mail, label: "Email Us", value: contactData?.email, href: `mailto:${contactData?.email}` },
              { icon: Clock, label: "Office Hours", value: "Mon-Fri: 9AM-6PM", href: null }
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.6 + i * 0.1 }}
                className={item.href ? "group" : ""}
              >
                {item.href ? (
                  <a
                    href={item.href}
                    className="flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4 p-5 sm:p-6 bg-background border border-border rounded-lg hover:border-accent/50 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300 h-full"
                  >
                    <div className="w-12 h-12 rounded-md bg-accent flex items-center justify-center flex-shrink-0 transition-colors">
                      <item.icon className="w-5 h-5 text-black" />
                    </div>
                    <div className="text-center sm:text-left">
                      <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
                        {item.label}
                      </div>
                      <div className="text-sm sm:text-base font-semibold text-foreground group-hover:text-accent transition-colors">
                        {item.value}
                      </div>
                    </div>
                  </a>
                ) : (
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4 p-5 sm:p-6 bg-background border border-border rounded-lg h-full">
                    <div className="w-12 h-12 rounded-md bg-accent flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-black" />
                    </div>
                    <div className="text-center sm:text-left">
                      <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
                        {item.label}
                      </div>
                      <div className="text-sm sm:text-base font-semibold text-foreground">
                        {item.value}
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
