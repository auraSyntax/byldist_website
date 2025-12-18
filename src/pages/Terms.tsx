import { memo, useMemo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import {
  FileText,
  Scale,
  Briefcase,
  Shield,
  CreditCard,
  AlertTriangle,
  Gavel,
  RefreshCw,
  Mail,
  MapPin,
  Clock,
  ChevronRight,
  Database,
  Building2,
  BookOpen,
  AlertCircle,
} from "lucide-react";
import { contactData } from "@/data/appData";

interface TermsSectionProps {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  id: string;
}

const TermsSection = memo(function TermsSection({
  icon,
  title,
  children,
  id,
}: TermsSectionProps) {
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

export default function Terms() {
  const sections = useMemo(
    () => [
      { id: "agreement", icon: <FileText className="w-4 h-4 sm:w-5 sm:h-5" />, title: "Agreement to Terms" },
      { id: "services", icon: <Briefcase className="w-4 h-4 sm:w-5 sm:h-5" />, title: "Our Services" },
      { id: "intellectual", icon: <Shield className="w-4 h-4 sm:w-5 sm:h-5" />, title: "Intellectual Property" },
      { id: "payment", icon: <CreditCard className="w-4 h-4 sm:w-5 sm:h-5" />, title: "Payment Terms" },
      { id: "liability", icon: <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5" />, title: "Limitation of Liability" },
      { id: "governing", icon: <Gavel className="w-4 h-4 sm:w-5 sm:h-5" />, title: "Governing Law" },
      { id: "changes", icon: <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5" />, title: "Changes to Terms" },
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
                <Scale className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />
              </div>
              <span className="label-text text-accent">Legal</span>
            </div>
            <h1 className="heading-xl mb-4 sm:mb-6">Terms of Service</h1>
            <p className="body-lg max-w-2xl">
              Please read these terms carefully before using our services. By accessing or using
              Byldist's services, you agree to be bound by these terms.
            </p>
            <div className="flex flex-wrap items-center gap-4 mt-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>Last updated: December 2024</span>
              </div>
              <div className="hidden sm:block w-1 h-1 rounded-full bg-muted-foreground/50" />
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                <span>~6 min read</span>
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
                      icon={<Building2 className="w-4 h-4" />}
                      title="Effective"
                      content="These terms apply immediately"
                    />
                    <InfoCard
                      icon={<AlertCircle className="w-4 h-4" />}
                      title="Questions?"
                      content="Contact our legal team"
                    />
                  </div>

                  <div className="mt-6 p-4 rounded-xl bg-secondary/30 border border-border/50">
                    <h4 className="font-medium text-sm mb-3">Related Policies</h4>
                    <div className="space-y-2">
                      <Link
                        to="/privacy"
                        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors"
                      >
                        <Shield className="w-4 h-4" />
                        Privacy Policy
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
                <TermsSection
                  id="agreement"
                  icon={<FileText className="w-5 h-5" />}
                  title="Agreement to Terms"
                >
                  <div className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed">
                      By accessing or using our website and services, you agree to be bound by these
                      Terms of Service and all applicable laws and regulations. If you disagree with
                      any part of these terms, you may not access our services.
                    </p>
                    <div className="p-5 rounded-xl bg-accent/5 border border-accent/20">
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-accent" />
                        Important Notice
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        These terms constitute a legally binding agreement between you and Byldist.
                        We recommend that you read them carefully and keep a copy for your records.
                      </p>
                    </div>
                  </div>
                </TermsSection>
              </ScrollReveal>

              <ScrollReveal>
                <TermsSection
                  id="services"
                  icon={<Briefcase className="w-5 h-5" />}
                  title="Our Services"
                >
                  <div className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed">
                      Byldist provides architectural execution and project management services. The
                      specific scope of services for each project will be defined in separate
                      agreements between Byldist and the client.
                    </p>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {[
                        {
                          title: "Project Planning",
                          desc: "Comprehensive planning and feasibility studies for construction projects",
                        },
                        {
                          title: "Design Execution",
                          desc: "Translating architectural designs into actionable construction plans",
                        },
                        {
                          title: "Project Management",
                          desc: "End-to-end oversight of construction timelines and deliverables",
                        },
                        {
                          title: "Quality Assurance",
                          desc: "Ensuring all work meets industry standards and specifications",
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
                    <p className="text-sm text-muted-foreground">
                      Additional services may be available upon request. All services are subject to
                      availability and separate contractual agreements.
                    </p>
                  </div>
                </TermsSection>
              </ScrollReveal>

              <ScrollReveal>
                <TermsSection
                  id="intellectual"
                  icon={<Shield className="w-5 h-5" />}
                  title="Intellectual Property"
                >
                  <div className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed">
                      The content on this website, including but not limited to text, graphics,
                      logos, images, and software, is owned by Byldist and is protected by
                      intellectual property laws.
                    </p>
                    <div className="space-y-3">
                      <h3 className="font-semibold text-lg">You May Not:</h3>
                      <ul className="grid gap-3">
                        {[
                          "Reproduce, distribute, or create derivative works without express written permission",
                          "Use our trademarks, logos, or branding without prior authorization",
                          "Copy or scrape content from our website for commercial purposes",
                          "Modify, reverse engineer, or create derivative works from our services",
                        ].map((item, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-3 p-3 rounded-lg bg-secondary/30 text-sm"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-destructive mt-1.5 shrink-0" />
                            <span className="text-muted-foreground">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      For permissions or licensing inquiries, please contact{" "}
                      <Link to={`mailto:${contactData?.email}`} className="text-accent hover:underline">
                        {contactData?.email}
                      </Link>
                    </p>
                  </div>
                </TermsSection>
              </ScrollReveal>

              <ScrollReveal>
                <TermsSection
                  id="payment"
                  icon={<CreditCard className="w-5 h-5" />}
                  title="Payment Terms"
                >
                  <div className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed">
                      Payment terms for our services are established in individual project contracts.
                      The following general terms apply:
                    </p>
                    <div className="grid gap-4">
                      {[
                        {
                          title: "Project Deposits",
                          desc: "A deposit may be required before work commences, as specified in your contract",
                        },
                        {
                          title: "Payment Schedule",
                          desc: "Payments are typically structured around project milestones",
                        },
                        {
                          title: "Late Payments",
                          desc: "Interest may be charged on overdue invoices as specified in your agreement",
                        },
                        {
                          title: "Refunds",
                          desc: "Refund policies vary by project and are detailed in individual contracts",
                        },
                      ].map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-3 p-4 rounded-xl bg-secondary/20 border border-border/50"
                        >
                          <span className="w-2 h-2 rounded-full bg-accent mt-1.5 shrink-0" />
                          <div>
                            <span className="font-semibold">{item.title}:</span>
                            <span className="text-muted-foreground ml-1">{item.desc}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TermsSection>
              </ScrollReveal>

              <ScrollReveal>
                <TermsSection
                  id="liability"
                  icon={<AlertTriangle className="w-5 h-5" />}
                  title="Limitation of Liability"
                >
                  <div className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed">
                      To the maximum extent permitted by applicable law, Byldist shall not be liable
                      for any indirect, incidental, special, consequential, or punitive damages
                      resulting from your use of our website or services.
                    </p>
                    <div className="p-5 rounded-xl bg-amber-500/5 border border-amber-500/20">
                      <h4 className="font-semibold mb-3 flex items-center gap-2 text-amber-600 dark:text-amber-400">
                        <AlertTriangle className="w-4 h-4" />
                        Disclaimer
                      </h4>
                      <ul className="space-y-2">
                        {[
                          "Our liability is limited to the amount paid for the specific service",
                          "We are not responsible for delays caused by factors beyond our control",
                          "Third-party services integrated with our platform have their own terms",
                          "Project estimates are non-binding unless specified in writing",
                        ].map((item, idx) => (
                          <li
                            key={idx}
                            className="flex items-center gap-2 text-sm text-muted-foreground"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </TermsSection>
              </ScrollReveal>

              <ScrollReveal>
                <TermsSection
                  id="governing"
                  icon={<Gavel className="w-5 h-5" />}
                  title="Governing Law"
                >
                  <div className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed">
                      These Terms shall be governed by and construed in accordance with the laws of
                      India, without regard to its conflict of law provisions. Any disputes arising
                      under these terms shall be subject to the exclusive jurisdiction of the courts
                      in {contactData?.address}.
                    </p>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="p-4 rounded-xl bg-secondary/20 border border-border/50">
                        <h4 className="font-semibold mb-1 flex items-center gap-2">
                          <Gavel className="w-4 h-4 text-accent" />
                          Jurisdiction
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {contactData?.address}
                        </p>
                      </div>
                      <div className="p-4 rounded-xl bg-secondary/20 border border-border/50">
                        <h4 className="font-semibold mb-1 flex items-center gap-2">
                          <Scale className="w-4 h-4 text-accent" />
                          Applicable Law
                        </h4>
                        <p className="text-sm text-muted-foreground">Laws of India</p>
                      </div>
                    </div>
                  </div>
                </TermsSection>
              </ScrollReveal>

              <ScrollReveal>
                <TermsSection
                  id="changes"
                  icon={<RefreshCw className="w-5 h-5" />}
                  title="Changes to Terms"
                >
                  <div className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed">
                      We reserve the right to modify these terms at any time. We will notify users
                      of any material changes by updating the "Last updated" date at the top of this
                      page. Your continued use of our services after changes constitutes acceptance
                      of the new terms.
                    </p>
                    <div className="p-5 rounded-xl bg-accent/5 border border-accent/20">
                      <h4 className="font-semibold mb-2">How We Notify You</h4>
                      <ul className="space-y-2">
                        {[
                          "Updating the effective date on this page",
                          "Email notification for significant changes (if subscribed)",
                          "In-app notifications for active clients",
                          "Announcement on our website homepage",
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
                </TermsSection>
              </ScrollReveal>

              <ScrollReveal>
                <TermsSection
                  id="contact"
                  icon={<Mail className="w-5 h-5" />}
                  title="Contact Us"
                >
                  <div className="p-6 rounded-2xl bg-secondary/20 border border-border/50">
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      If you have questions about these Terms of Service or need clarification on
                      any provisions, please contact our legal team:
                    </p>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="flex items-start gap-3">
                        <div className="shrink-0 w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                          <Mail className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm mb-1">Email</h4>
                          <Link
                            to={`mailto:${contactData?.email}`}
                            className="text-sm text-muted-foreground hover:text-accent transition-colors"
                          >
                            {contactData?.email}
                          </Link>
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
                </TermsSection>
              </ScrollReveal>

              <ScrollReveal>
                <div className="lg:hidden mt-12 space-y-4">
                  <h3 className="font-display font-semibold text-lg">Related Policies</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Link
                      to="/privacy"
                      className="flex items-center gap-3 p-4 rounded-xl bg-secondary/30 border border-border/50 hover:border-accent/30 transition-colors group"
                    >
                      <div className="shrink-0 w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                        <Shield className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm">Privacy Policy</h4>
                        <p className="text-xs text-muted-foreground">Your data protection</p>
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
