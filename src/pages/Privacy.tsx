import { memo, useMemo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import {
  Shield,
  Lock,
  Eye,
  UserCheck,
  Database,
  Globe,
  Mail,
  MapPin,
  FileText,
  ChevronRight,
  Clock,
  Scale,
  AlertCircle,
} from "lucide-react";
import { contactData } from "@/data/appData";

interface PolicySectionProps {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  id: string;
}

const PolicySection = memo(function PolicySection({
  icon,
  title,
  children,
  id,
}: PolicySectionProps) {
  return (
    <div id={id} className="scroll-mt-28">
      <div className="flex items-start gap-4 mb-4">
        <div className="shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
          {icon}
        </div>
        <h2 className="heading-md pt-1.5 sm:pt-2">{title}</h2>
      </div>
      <div className="pl-0 sm:pl-16">{children}</div>
    </div>
  );
});

interface QuickLinkProps {
  icon: React.ReactNode;
  title: string;
  href: string;
}

const QuickLink = memo(function QuickLink({ icon, title, href }: QuickLinkProps) {
  return (
    <a
      href={href}
      className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary/50 transition-colors group"
    >
      <div className="shrink-0 w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
        {icon}
      </div>
      <span className="text-sm font-medium group-hover:text-accent transition-colors">
        {title}
      </span>
      <ChevronRight className="w-4 h-4 ml-auto text-muted-foreground group-hover:text-accent group-hover:translate-x-0.5 transition-all" />
    </a>
  );
});

interface InfoCardProps {
  icon: React.ReactNode;
  title: string;
  content: string;
}

const InfoCard = memo(function InfoCard({ icon, title, content }: InfoCardProps) {
  return (
    <div className="p-4 rounded-xl bg-secondary/30 border border-border/50">
      <div className="flex items-start gap-3">
        <div className="shrink-0 w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
          {icon}
        </div>
        <div>
          <h4 className="font-medium text-sm mb-0.5">{title}</h4>
          <p className="text-xs text-muted-foreground">{content}</p>
        </div>
      </div>
    </div>
  );
});

export default function Privacy() {
  const sections = useMemo(
    () => [
      { id: "introduction", icon: <Shield className="w-4 h-4 sm:w-5 sm:h-5" />, title: "Introduction" },
      { id: "collection", icon: <Database className="w-4 h-4 sm:w-5 sm:h-5" />, title: "Information We Collect" },
      { id: "usage", icon: <Eye className="w-4 h-4 sm:w-5 sm:h-5" />, title: "How We Use Information" },
      { id: "sharing", icon: <Globe className="w-4 h-4 sm:w-5 sm:h-5" />, title: "Information Sharing" },
      { id: "security", icon: <Lock className="w-4 h-4 sm:w-5 sm:h-5" />, title: "Data Security" },
      { id: "rights", icon: <UserCheck className="w-4 h-4 sm:w-5 sm:h-5" />, title: "Your Rights" },
      { id: "contact", icon: <Mail className="w-4 h-4 sm:w-5 sm:h-5" />, title: "Contact Us" },
    ],
    []
  );

  return (
    <>
      <section className="pt-28 sm:pt-32 pb-16 sm:pb-20 grid-background relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-transparent pointer-events-none" />
        <div className="container-wide relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />
              </div>
              <span className="label-text text-accent">Legal</span>
            </div>
            <h1 className="heading-xl mb-4 sm:mb-6">Privacy Policy</h1>
            <p className="body-lg max-w-2xl">
              Your privacy matters to us. This policy explains how Byldist collects, uses, and
              protects your personal information when you use our services.
            </p>
            <div className="flex flex-wrap items-center gap-4 mt-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>Last updated: December 2024</span>
              </div>
              <div className="hidden sm:block w-1 h-1 rounded-full bg-muted-foreground/50" />
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                <span>~5 min read</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-wide">
          <div className="grid lg:grid-cols-4 gap-8 lg:gap-12">
            <div className="hidden lg:block">
              <ScrollReveal>
                <div className="sticky top-28">
                  <h3 className="font-display font-semibold text-sm mb-4 text-muted-foreground uppercase tracking-wider">
                    On This Page
                  </h3>
                  <nav className="space-y-1">
                    {sections.map((section) => (
                      <QuickLink
                        key={section.id}
                        icon={section.icon}
                        title={section.title}
                        href={`#${section.id}`}
                      />
                    ))}
                  </nav>

                  <div className="mt-8 space-y-3">
                    <InfoCard
                      icon={<Scale className="w-4 h-4" />}
                      title="Jurisdiction"
                      content="Laws of India apply"
                    />
                    <InfoCard
                      icon={<AlertCircle className="w-4 h-4" />}
                      title="Questions?"
                      content="Contact our privacy team"
                    />
                  </div>

                  <div className="mt-6 p-4 rounded-xl bg-secondary/30 border border-border/50">
                    <h4 className="font-medium text-sm mb-3">Related Policies</h4>
                    <div className="space-y-2">
                      <Link
                        to="/terms"
                        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors"
                      >
                        <FileText className="w-4 h-4" />
                        Terms of Service
                      </Link>
                      <Link
                        to="/cookies"
                        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors"
                      >
                        <Database className="w-4 h-4" />
                        Cookie Policy
                      </Link>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            <div className="lg:col-span-3 space-y-12 sm:space-y-16">
              <ScrollReveal>
                <PolicySection
                  id="introduction"
                  icon={<Shield className="w-5 h-5" />}
                  title="Introduction"
                >
                  <p className="text-muted-foreground leading-relaxed">
                    Byldist ("we," "our," or "us") is committed to protecting your privacy. This
                    Privacy Policy explains how we collect, use, disclose, and safeguard your
                    information when you visit our website or use our architectural execution and
                    project management services. Please read this policy carefully. By accessing or
                    using our services, you agree to the terms of this Privacy Policy.
                  </p>
                </PolicySection>
              </ScrollReveal>

              <ScrollReveal>
                <PolicySection
                  id="collection"
                  icon={<Database className="w-5 h-5" />}
                  title="Information We Collect"
                >
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold text-lg mb-3">Personal Information</h3>
                      <p className="text-muted-foreground leading-relaxed mb-4">
                        We may collect personal information that you voluntarily provide to us,
                        including:
                      </p>
                      <ul className="grid sm:grid-cols-2 gap-3">
                        {[
                          "Name and contact details",
                          "Email address and phone number",
                          "Business information",
                          "Project requirements and preferences",
                          "Communication history",
                          "Payment and billing information",
                        ].map((item, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-3 p-3 rounded-lg bg-secondary/30 text-sm"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                            <span className="text-muted-foreground">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-semibold text-lg mb-3">Automatically Collected Data</h3>
                      <p className="text-muted-foreground leading-relaxed mb-4">
                        When you visit our website, we automatically collect certain information:
                      </p>
                      <ul className="grid sm:grid-cols-2 gap-3">
                        {[
                          "IP address and browser type",
                          "Device information and identifiers",
                          "Pages viewed and time spent",
                          "Referring website URLs",
                          "Geographic location data",
                          "Interaction and click patterns",
                        ].map((item, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-3 p-3 rounded-lg bg-secondary/30 text-sm"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                            <span className="text-muted-foreground">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </PolicySection>
              </ScrollReveal>

              <ScrollReveal>
                <PolicySection
                  id="usage"
                  icon={<Eye className="w-5 h-5" />}
                  title="How We Use Your Information"
                >
                  <div className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed">
                      We use the information we collect for various business purposes:
                    </p>
                    <div className="grid gap-4">
                      {[
                        {
                          title: "Service Delivery",
                          desc: "To provide, operate, and maintain our architectural services and respond to your inquiries",
                        },
                        {
                          title: "Communication",
                          desc: "To send project updates, newsletters, and marketing communications (with your consent)",
                        },
                        {
                          title: "Improvement",
                          desc: "To analyze usage patterns and improve our website, services, and user experience",
                        },
                        {
                          title: "Legal Compliance",
                          desc: "To comply with legal obligations, resolve disputes, and enforce our agreements",
                        },
                      ].map((item, idx) => (
                        <div
                          key={idx}
                          className="p-4 rounded-xl bg-secondary/20 border border-border/50"
                        >
                          <h4 className="font-semibold mb-1">{item.title}</h4>
                          <p className="text-sm text-muted-foreground">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </PolicySection>
              </ScrollReveal>

              <ScrollReveal>
                <PolicySection
                  id="sharing"
                  icon={<Globe className="w-5 h-5" />}
                  title="Information Sharing"
                >
                  <div className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed">
                      We do not sell your personal information. We may share your information in
                      limited circumstances:
                    </p>
                    <ul className="space-y-3">
                      {[
                        {
                          label: "Service Providers",
                          text: "Third-party vendors who assist with our operations (hosting, analytics, payment processing)",
                        },
                        {
                          label: "Business Partners",
                          text: "Architects, contractors, and consultants involved in your project (with your consent)",
                        },
                        {
                          label: "Legal Requirements",
                          text: "When required by law, court order, or to protect our rights and safety",
                        },
                        {
                          label: "Business Transfers",
                          text: "In connection with mergers, acquisitions, or asset sales",
                        },
                      ].map((item, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-3 p-4 rounded-xl bg-secondary/20 border border-border/50"
                        >
                          <span className="w-2 h-2 rounded-full bg-accent mt-1.5 shrink-0" />
                          <div>
                            <span className="font-semibold">{item.label}:</span>
                            <span className="text-muted-foreground ml-1">{item.text}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </PolicySection>
              </ScrollReveal>

              <ScrollReveal>
                <PolicySection
                  id="security"
                  icon={<Lock className="w-5 h-5" />}
                  title="Data Security"
                >
                  <div className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed">
                      We implement appropriate technical and organizational security measures to
                      protect your personal information against unauthorized access, alteration,
                      disclosure, or destruction.
                    </p>
                    <div className="p-5 rounded-xl bg-accent/5 border border-accent/20">
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <Lock className="w-4 h-4 text-accent" />
                        Our Security Measures Include:
                      </h4>
                      <ul className="grid sm:grid-cols-2 gap-2">
                        {[
                          "SSL/TLS encryption for data transmission",
                          "Secure server infrastructure",
                          "Regular security audits and assessments",
                          "Access controls and authentication",
                          "Employee training on data protection",
                          "Incident response procedures",
                        ].map((item, idx) => (
                          <li
                            key={idx}
                            className="flex items-center gap-2 text-sm text-muted-foreground"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </PolicySection>
              </ScrollReveal>

              <ScrollReveal>
                <PolicySection
                  id="rights"
                  icon={<UserCheck className="w-5 h-5" />}
                  title="Your Rights"
                >
                  <div className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed">
                      Depending on your location, you may have certain rights regarding your
                      personal information:
                    </p>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {[
                        { title: "Access", desc: "Request a copy of your personal data" },
                        { title: "Correction", desc: "Update or correct inaccurate information" },
                        { title: "Deletion", desc: "Request deletion of your personal data" },
                        { title: "Portability", desc: "Receive your data in a portable format" },
                        { title: "Objection", desc: "Object to certain processing activities" },
                        { title: "Restriction", desc: "Limit how we process your data" },
                      ].map((item, idx) => (
                        <div
                          key={idx}
                          className="p-4 rounded-xl bg-secondary/20 border border-border/50 hover:border-accent/30 transition-colors"
                        >
                          <h4 className="font-semibold text-accent mb-1">{item.title}</h4>
                          <p className="text-sm text-muted-foreground">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      To exercise these rights, please contact us at{" "}
                      <a href="mailto:privacy@byldist.com" className="text-accent hover:underline">
                        privacy@byldist.com
                      </a>
                    </p>
                  </div>
                </PolicySection>
              </ScrollReveal>

              <ScrollReveal>
                <PolicySection
                  id="contact"
                  icon={<Mail className="w-5 h-5" />}
                  title="Contact Us"
                >
                  <div className="p-6 rounded-2xl bg-secondary/20 border border-border/50">
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      If you have questions about this Privacy Policy or our data practices, please
                      contact us:
                    </p>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="flex items-start gap-3">
                        <div className="shrink-0 w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                          <Mail className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm mb-1">Email</h4>
                          <a
                            href="mailto:privacy@byldist.com"
                            className="text-sm text-muted-foreground hover:text-accent transition-colors"
                          >
                            privacy@byldist.com
                          </a>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="shrink-0 w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                          <MapPin className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm mb-1">Address</h4>
                          <p className="text-sm text-muted-foreground">
                            {contactData?.address}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </PolicySection>
              </ScrollReveal>

              <ScrollReveal>
                <div className="lg:hidden mt-12 space-y-4">
                  <h3 className="font-display font-semibold text-lg">Related Policies</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Link
                      to="/terms"
                      className="flex items-center gap-3 p-4 rounded-xl bg-secondary/30 border border-border/50 hover:border-accent/30 transition-colors group"
                    >
                      <div className="shrink-0 w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm">Terms of Service</h4>
                        <p className="text-xs text-muted-foreground">Read our terms</p>
                      </div>
                      <ChevronRight className="w-4 h-4 ml-auto text-muted-foreground group-hover:text-accent transition-colors" />
                    </Link>
                    <Link
                      to="/cookies"
                      className="flex items-center gap-3 p-4 rounded-xl bg-secondary/30 border border-border/50 hover:border-accent/30 transition-colors group"
                    >
                      <div className="shrink-0 w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                        <Database className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm">Cookie Policy</h4>
                        <p className="text-xs text-muted-foreground">Manage cookies</p>
                      </div>
                      <ChevronRight className="w-4 h-4 ml-auto text-muted-foreground group-hover:text-accent transition-colors" />
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
