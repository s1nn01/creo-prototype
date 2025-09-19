"use client";
import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Briefcase,
  Users,
  Rocket,
  Globe,
  PhoneCall,
  ChevronRight,
  Building2,
  Layers,
  CheckCircle2,
  ArrowRight,
  MapPin,
  Mail,
  Phone,
  Upload,
  Bell,
  Paperclip,
} from "lucide-react";

// Simple in-file router for a clickable multi-page prototype
function useRouter() {
  const [route, setRoute] = useState("/");
  const navigate = (path: string) => setRoute(path);
  return { route, navigate } as const;
}

function NavBar({ navigate, route }: { navigate: (p: string) => void; route: string }) {
  const links = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Services", path: "/services" },
    { label: "Technologies", path: "/technologies" },
    { label: "Case Studies", path: "/cases" },
    { label: "Careers", path: "/careers" },
    { label: "Talent Network", path: "/talent" },
    { label: "Blog", path: "/blog" },
    { label: "Contact", path: "/contact" },
  ];
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
      <div className="flex items-center gap-3">
      <Image
        src="/logo.png"
        alt="Creo Invent Tech"
        width={240}   // larger intrinsic size
        height={240}
        priority
        className="h-20 md:h-24 w-auto"   // 48px tall on mobile, 56px on desktop
      />
      </div>
        <nav className="hidden md:flex gap-6">
          {links.map((l) => (
            <button
              key={l.path}
              onClick={() => navigate(l.path)}
              className={`text-sm hover:text-blue-700 transition ${route === l.path ? "text-blue-700 font-semibold" : "text-gray-700"}`}
            >
              {l.label}
            </button>
          ))}
        </nav>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => navigate("/talent")}>
            <Bell className="mr-2 w-4 h-4"/> Job Alerts
          </Button>
          <Button onClick={() => navigate("/contact")}>Hire Talent</Button>
        </div>
      </div>
    </header>
  );
}

function Hero({ navigate }: { navigate: (p: string) => void }) {
  return (
    <section className="relative bg-gradient-to-r from-pink-600 via-indigo-600 to-amber-500 text-white py-24 px-6 text-center">
      {/* Company name first, big and bold */}
      <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-3">
        CREO INVENT
      </h1>

      {/* Headline goes UNDER the company name */}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-3xl md:text-5xl font-bold mb-6"
      >
        Powering Global Talent & Technology Solutions
      </motion.h2>

      <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8">
        We connect enterprises with top talent and deliver outcome-driven consulting across Salesforce, SAP, Microsoft, and more.
      </p>

      <div className="flex items-center justify-center gap-3">
        <Button size="lg" className="rounded-2xl shadow-lg" onClick={() => navigate("/services")}>
          Explore Services <ChevronRight className="ml-2 w-4 h-4" />
        </Button>
        <Button size="lg" variant="secondary" className="rounded-2xl shadow-lg" onClick={() => navigate("/talent")}>
          Join Talent Network
        </Button>
      </div>
    </section>
  );
}


function Stats() {
  const stats = [
    { number: "10+", label: "Years of Expertise" },
    { number: "15+", label: "Global Clients" },
    { number: "100+", label: "Professionals Placed" },
    { number: "4", label: "Continents Served" },
  ];
  return (
    <section className="bg-white py-16 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-6 text-center">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl bg-gray-100 p-6">
            <h3 className="text-4xl font-bold text-blue-600">{s.number}</h3>
            <p className="mt-1 text-gray-700">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function ServicesGrid({ navigate }: { navigate: (p: string) => void }) {
  const items = [
    {
      icon: <Briefcase className="w-10 h-10 text-blue-600" />,
      title: "Enterprise Consulting",
      desc: "Tailored solutions and delivery for Salesforce, SAP, Microsoft & more.",
    },
    {
      icon: <Users className="w-10 h-10 text-blue-600" />,
      title: "Talent Solutions",
      desc: "Global staffing with rigorous vetting to match skills, budget, and timeline.",
    },
    {
      icon: <Rocket className="w-10 h-10 text-blue-600" />,
      title: "Digital Transformation",
      desc: "From strategy to execution, we accelerate innovation and time‑to‑value.",
    },
  ];
  return (
    <section className="py-16 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">Our Core Services</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {items.map((s) => (
            <Card key={s.title} className="rounded-2xl shadow-md hover:shadow-xl transition">
              <CardContent className="p-6 text-center">
                {s.icon}
                <h3 className="mt-4 text-xl font-semibold">{s.title}</h3>
                <p className="mt-2 text-gray-600">{s.desc}</p>
                <Button variant="outline" className="mt-4" onClick={() => navigate("/services")}>Learn more</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA({ navigate }: { navigate: (p: string) => void }) {
  return (
    <section className="bg-gradient-to-r from-pink-600 via-indigo-600 to-amber-500 text-white py-16 px-6 text-center">
      <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Business?</h2>
      <p className="max-w-xl mx-auto mb-6 text-lg">
        Whether you need enterprise solutions or top‑tier talent, we’re here to help you succeed.
      </p>
      <div className="flex items-center justify-center gap-3">
        <Button size="lg" variant="secondary" className="rounded-2xl shadow-xl" onClick={() => navigate("/contact")}>Contact Us Now</Button>
        <Button size="lg" className="rounded-2xl shadow-xl" onClick={() => navigate("/talent")}>
          Get Job Alerts
        </Button>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-6">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Globe className="w-5 h-5 text-blue-400" />
            <span className="font-semibold">Creo Invent Tech</span>
          </div>
          <p className="text-gray-400 text-sm">© {new Date().getFullYear()} Creo Invent Tech. All rights reserved.</p>
        </div>
        <div>
          <p className="font-medium mb-2">Global Offices</p>
          <p className="text-sm text-gray-400 flex items-start gap-2"><MapPin className="w-4 h-4"/>UK • India • South Africa • USA</p>
        </div>
        <div>
          <p className="font-medium mb-2">Contact</p>
          <p className="text-sm text-gray-400 flex items-center gap-2"><Mail className="w-4 h-4"/> chandras@creoinvent-tech.com</p>
          <p className="text-sm text-gray-400 flex items-center gap-2"><Phone className="w-4 h-4"/> +44 7930624958</p>
          <p className="text-sm text-gray-400 flex items-center gap-2"><Phone className="w-4 h-4"/> +44 7425392138</p>
          <p className="text-sm text-gray-400 flex items-center gap-2"><Phone className="w-4 h-4"/> +27 718755180</p>
        </div>
      </div>
    </footer>
  );
}

// ----- Pages -----
function Home({ navigate }: { navigate: (p: string) => void }) {
  return (
    <>
      <Hero navigate={navigate} />
      <Stats />
      <ServicesGrid navigate={navigate} />
      <TalentTeaser navigate={navigate} />
      <CTA navigate={navigate} />
    </>
  );
}

function About() {
  const focus = [
    "Salesforce",
    "SAP",
    "Microsoft",
    "Oracle",
    "BI & Analytics",
    "Big Data",
    "Infrastructure",
    "Cloud",
    "Development",
    "Cyber Security",
    "Pega",
  ];

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-r from-pink-600 via-fuchsia-600 to-amber-500 text-white py-16 px-6 text-center rounded-b-3xl shadow-md">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4">About Creo Invent</h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto">
          Global enterprise technology consultants and recruitment experts —
          connecting talent and innovation across the UK, Europe, India, South Africa, and beyond.
        </p>
      </section>

      {/* Mission */}
      <section className="py-16 px-6 max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
          <p className="text-gray-700 mb-4">
            We are an enterprise technology consulting and recruitment partner helping organizations modernize platforms and build high-performing teams.
          </p>
          <p className="text-gray-700 mb-4">
        Our specialist areas include Microsoft, CRM, BI &amp; Big Data, Development, Infrastructure &amp; Cloud, and Cyber Security.
      </p>
      <p className="text-gray-700 mb-4">
        We have developed an unrivaled network and reputation, working with leading experts and companies across the globe. This is thanks to our teams of
        multi-lingual consultants who understand the culture of each market we operate in. We have headquarters in London.
      </p>
      <p className="text-gray-700 mb-4">
        Whether you are a candidate seeking the best roles in Europe or a client looking for the best enterprise technology professionals, you can expect a
        market-leading service delivered by passionate, open, and entrepreneurial people. Specialism, quality, and compliance are at the heart of everything
        we do to establish and nurture long-term relationships with our clients and candidates.
      </p>

      <h3 className="text-xl font-semibold mt-8 mb-2">Staffing Services</h3>
      <p className="text-gray-700 mb-4">
        At Creo, we provide the best staffing services on the planet. Our expert knowledge, coupled with our open, transparent, and entrepreneurial approach
        has ensured our continuing success in building long-term partnerships with multinational blue-chips, SMEs, and global or specialist IT consultancies.
        Our highly-experienced recruitment consultants are proficient in their individual technology market, and work with a network of global IT
        professionals to ensure we always meet our clients’ needs.
      </p>

      <h3 className="text-xl font-semibold mt-8 mb-2">Pega Services</h3>
      <p className="text-gray-700">
        At Creo, we provide the best Pega services and resources. Creo Invent builds innovative, modern, and mobile-enabled apps quickly with Pega’s low-code
        platform. Our solutions integrate with external systems and provide enterprise-grade security and scalability. Our teams bring deep knowledge of Pega
        Program Management, Business Analysis, Agile Development, and Data Management.
      </p>
        </div>
      </section>

      {/* Focus Areas */}
      <section className="py-16 px-6 bg-gray-50">
        <h2 className="text-3xl font-bold text-center mb-8">Our Focus Areas</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {focus.map((f) => (
            <span
              key={f}
              className="bg-white border rounded-xl px-4 py-3 text-center font-medium shadow hover:shadow-md transition"
            >
              {f}
            </span>
          ))}
        </div>
      </section>

      {/* Quote highlight */}
      <section className="py-16 px-6 text-center bg-gradient-to-r from-indigo-700 to-blue-600 text-white">
        <p className="text-2xl md:text-3xl font-semibold max-w-3xl mx-auto italic">
          “Specialism, quality, and compliance are at the heart of everything we do to establish and nurture long-term relationships with our clients and candidates.”
        </p>
      </section>

      {/* Global Presence */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Global Presence</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="border rounded-xl p-6 bg-white shadow">
            <h3 className="font-semibold mb-2">United Kingdom (HQ)</h3>
            <p className="text-gray-700">306 E Harrow View, Harrow, Middlesex, London, HA2 6QQ</p>
            <p className="text-gray-700 mt-1">78 Queens Road, Watford, Hertfordshire, WD17 2LA</p>
          </div>
          <div className="border rounded-xl p-6 bg-white shadow">
            <h3 className="font-semibold mb-2">India</h3>
            <p className="text-gray-700">102, 6th Main, Sir M V Nagar, Bangalore, Karnataka, 560016</p>
          </div>
          <div className="border rounded-xl p-6 bg-white shadow">
            <h3 className="font-semibold mb-2">South Africa</h3>
            <p className="text-gray-700">209 Ben Even, Elizabeth Street, Parkmore, Sandton 2195</p>
            <p className="text-gray-700 mt-1">55 Bangalore Mews, Naivasha Road, Sunninghill, Sandton 2191</p>
          </div>
          <div className="border rounded-xl p-6 bg-white shadow">
            <h3 className="font-semibold mb-2">United States</h3>
            <p className="text-gray-700">Creo Invent LLC, 30N Gould St STE R, Sheridan, WY 82801</p>
          </div>
        </div>
      </section>
    </div>
  );
}


function Services() {
  const services = [
    { title: "Salesforce Consulting", text: "Implementation, integration, and managed services." },
    { title: "SAP Services", text: "ECC to S/4HANA migration, modules, and support." },
    { title: "Microsoft & Azure", text: "Dynamics 365, Power Platform, M365, Azure cloud." },
    { title: "Oracle", text: "Applications and middleware expertise, integration and support." },
    { title: "BI & Big Data", text: "Data engineering, analytics, dashboards, governance." },
    { title: "Infrastructure & Cloud", text: "Architecture, migration, DevOps, security." },
    { title: "Custom Development", text: "Modern web, mobile, and integration engineering." },
    { title: "Cyber Security", text: "Advisory, controls, and secure delivery." },
    { title: "Pega Low-Code", text: "Design, build, and run on Pega’s low-code platform." },
    { title: "Talent & Recruitment", text: "Specialist staffing across our technology focus." },
  ];
  
  return (
    <div className="py-16 px-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Services</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {services.map((s) => (
          <Card key={s.title} className="rounded-2xl hover:shadow-lg transition">
            <CardContent className="p-6">
              <h3 className="font-semibold text-lg">{s.title}</h3>
              <p className="text-gray-600 text-sm mt-2">{s.text}</p>
              <Button className="mt-4" variant="outline">
                Request proposal <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function Cases() {
  const items = [
    { client: "FinServ Co.", outcome: "+38% lead conversion", blurb: "Migrated CRM to Salesforce with custom CPQ." },
    { client: "Retail Group", outcome: "-27% time‑to‑hire", blurb: "Built talent pipeline with analytics." },
    { client: "Manufacturing", outcome: "S/4HANA go‑live", blurb: "Greenfield implementation in 6 months." },
  ];
  return (
    <div className="py-16 px-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Case Studies</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {items.map((c) => (
          <Card key={c.client} className="rounded-2xl">
            <CardContent className="p-6">
              <p className="text-sm text-blue-700 font-semibold">{c.outcome}</p>
              <h3 className="text-lg font-semibold mt-1">{c.client}</h3>
              <p className="text-gray-600 text-sm mt-2">{c.blurb}</p>
              <Button className="mt-4" variant="outline">Read more</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function Careers({ navigate }: { navigate: (p: string) => void }) {
  const jobs = [
    { title: "Salesforce Developer", loc: "London, UK", type: "Hybrid" },
    { title: "SAP FI/CO Consultant", loc: "Mumbai, IN", type: "Onsite" },
    { title: "Azure DevOps Engineer", loc: "Remote", type: "Remote" },
  ];
  return (
    <div className="py-16 px-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">Careers</h1>
      <p className="text-gray-600 mb-6">Join our global network of experts and accelerate your growth.</p>
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {jobs.map((j) => (
          <Card key={j.title} className="rounded-2xl">
            <CardContent className="p-6">
              <h3 className="font-semibold">{j.title}</h3>
              <p className="text-gray-600 text-sm">{j.loc} • {j.type}</p>
              <Button className="mt-4" variant="outline">Apply</Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Talent Network teaser */}
      <TalentTeaser navigate={navigate} />
    </div>
  );
}

function TalentTeaser({ navigate }: { navigate: (p: string) => void }) {
  return (
    <section className="rounded-xl bg-gradient-to-r from-pink-600 via-indigo-600 to-amber-500 text-white p-6 md:p-8 flex flex-col md:flex-row items-center justify-between mb-12">
      <div className="mb-4 md:mb-0">
        <h3 className="text-2xl font-bold">Get matched to roles that fit your CV</h3>
        <p className="text-white/90">Join our Talent Network to receive job alerts tailored to your skills and location.</p>
      </div>
      <div className="flex gap-3">
        <Button variant="secondary" onClick={() => navigate("/talent")}>
          <Upload className="mr-2 w-4 h-4"/> Upload CV
        </Button>
        <Button onClick={() => navigate("/talent")}>
          <Bell className="mr-2 w-4 h-4"/> Get Job Alerts
        </Button>
      </div>
    </section>
  );
}

function TalentNetwork() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState<string>("");
  const [error, setError] = useState<string>("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const form = e.currentTarget;
      const fd = new FormData(form);

      // Basic client-side checks for file
      const file = fd.get("cv") as File | null;
      if (!file) throw new Error("Please attach your CV (PDF/DOC up to 5MB).");
      const okTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      if (!okTypes.includes(file.type)) throw new Error("Unsupported file type. Upload PDF or Word.");
      if (file.size > 5 * 1024 * 1024) throw new Error("File too large. Max 5MB.");

      const res = await fetch("/api/talent", {
        method: "POST",
        body: fd,
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.message || "Submission failed. Please try again.");
      }

      setSubmitted(true);
    } catch (err: unknown) {
      const msg =
        err instanceof Error
          ? err.message
          : typeof err === "string"
          ? err
          : "Something went wrong.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="py-16 px-6 max-w-xl mx-auto text-center">
        <div className="mx-auto w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mb-4">
          <CheckCircle2 className="w-7 h-7 text-green-600" />
        </div>
        <h1 className="text-2xl font-bold mb-2">You’re in! 🎉</h1>
        <p className="text-gray-600">We’ll notify you when roles match your skills and preferences. You can update your alerts anytime.</p>
      </div>
    );
  }

  return (
    <div className="py-16 px-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">Join the Talent Network</h1>
      <p className="text-gray-600 mb-8">Upload your CV and tell us what you’re looking for. We’ll send curated job alerts that match your profile.</p>

      <Card className="rounded-2xl">
        <CardContent className="p-6">
          <form className="grid gap-4" onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-4">
              <Input name="firstName" placeholder="First name" required />
              <Input name="lastName" placeholder="Last name" required />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <Input name="email" type="email" placeholder="Work or personal email" required />
              <Input name="location" placeholder="Location (city, country)" />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <Input name="role" placeholder="Primary role (e.g., Salesforce Developer)" />
              <Input name="experience" placeholder="Experience (e.g., 5 years)" />
            </div>

            {/* Skills / interests */}
            <Textarea name="skills" placeholder="Key skills (comma separated) — e.g., Apex, Lightning, SAP FI/CO, Azure DevOps" />

            {/* Preferences */}
            <div className="grid md:grid-cols-3 gap-4">
              <select name="employmentType" className="border rounded-md px-3 py-2 text-sm">
                <option>Employment type</option>
                <option>Permanent</option>
                <option>Contract</option>
                <option>Either</option>
              </select>
              <select name="workMode" className="border rounded-md px-3 py-2 text-sm">
                <option>Work mode</option>
                <option>Onsite</option>
                <option>Hybrid</option>
                <option>Remote</option>
              </select>
              <select name="seniority" className="border rounded-md px-3 py-2 text-sm">
                <option>Seniority</option>
                <option>Junior</option>
                <option>Mid</option>
                <option>Senior</option>
                <option>Lead/Architect</option>
              </select>
            </div>

            {/* CV upload */}
            <label className="border-2 border-dashed rounded-xl p-4 text-sm text-gray-600 flex items-center justify-between cursor-pointer">
              <div className="flex items-center gap-3">
                <Paperclip className="w-5 h-5"/>
                <span>{fileName || "Upload CV (PDF/DOC, max 5MB)"}</span>
              </div>
              <Input
                name="cv"
                type="file"
                accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                className="hidden"
                onChange={(e) => setFileName(e.target.files?.[0]?.name || "")}
                required
              />
              <Upload className="w-5 h-5"/>
            </label>

            {/* Consent */}
            <label className="flex items-start gap-3 text-sm text-gray-600">
              <input name="consent" type="checkbox" required className="mt-1" />
              <span>
                I agree to the processing of my personal data for recruitment purposes and to receive job alerts. See our Privacy Policy.
              </span>
            </label>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <div className="flex items-center gap-3">
              <Button type="submit" disabled={loading}>
                {loading ? "Submitting…" : "Create Alerts"}
              </Button>
              <Button type="button" variant="outline">
                Save without alerts
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <p className="text-xs text-gray-500 mt-3">We’ll only use your information for recruitment and job-matching. You can opt out anytime.</p>
    </div>
  );
}

function Blog() {
  const posts = [
    { title: "5 pitfalls in S/4HANA migrations", time: "6 min read" },
    { title: "Designing a scalable Salesforce data model", time: "8 min read" },
    { title: "Power BI vs. Tableau for exec reporting", time: "5 min read" },
  ];
  return (
    <div className="py-16 px-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Insights</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {posts.map((p) => (
          <Card key={p.title} className="rounded-2xl hover:shadow-lg transition">
            <CardContent className="p-6">
              <p className="text-xs text-gray-500">{p.time}</p>
              <h3 className="font-semibold mt-2">{p.title}</h3>
              <Button className="mt-4" variant="outline">Read</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function Contact() {
  return (
    <div className="py-16 px-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <Input placeholder="Your name" />
          <Input placeholder="Company" />
          <Input type="email" placeholder="Work email" />
          <Input placeholder="Phone (optional)" />
          <Textarea placeholder="How can we help?" />
          <Button className="w-full"><PhoneCall className="mr-2 w-4 h-4"/> Request a callback</Button>
        </div>
        <div className="rounded-2xl border p-6 bg-gray-50">
          <h3 className="font-semibold mb-2">Global Offices</h3>
          <p className="text-sm text-gray-700">UK • India • South Africa • USA</p>
          <div className="mt-4 space-y-2 text-sm text-gray-600">
            <p className="flex items-center gap-2"><Mail className="w-4 h-4"/> chandras@creoinvent-tech.com</p>
            <p className="flex items-center gap-2"><Phone className="w-4 h-4"/> +44 7425392138</p>
            <p className="flex items-center gap-2"><Phone className="w-4 h-4"/> +27 718755180</p>
            <p className="flex items-center gap-2"><Phone className="w-4 h-4"/> +44 7930624958</p>
          </div>
          <div className="mt-6 rounded-xl border bg-white p-4">
            <p className="text-sm font-medium mb-1">Hours</p>
            <p className="text-sm text-gray-600">Mon–Fri: 09:00 – 17:00 (UK)</p>
          </div>
          <div className="mt-6 rounded-xl border bg-white p-4">
            <p className="text-sm font-medium mb-2">Candidates</p>
            <p className="text-sm text-gray-600 mb-3">Want to be notified about roles? Join our Talent Network.</p>
            <Button variant="outline" onClick={() => window.dispatchEvent(new CustomEvent("navigate", { detail: "/talent" }))}>
              <Bell className="mr-2 w-4 h-4"/> Get Job Alerts
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PrototypeApp() {
  const { route, navigate } = useRouter();
  
  if (typeof window !== "undefined") {
    window.addEventListener("navigate", (e: CustomEvent<string>) => {
      navigate(e.detail);
    });
  }
  

  const Page = () => {
    switch (route) {
      case "/":
        return <Home navigate={navigate} />;
      case "/about":
        return <About />;
      case "/services":
        return <Services />;
      case "/cases":
        return <Cases />;
      case "/careers":
        return <Careers navigate={navigate} />;
      case "/talent":
        return <TalentNetwork />;
      case "/blog":
        return <Blog />;
      case "/contact":
        return <Contact />;
      default:
        return <Home navigate={navigate} />;
    }
  };

  return (
    <div className="bg-gray-50 text-gray-900 min-h-screen flex flex-col">
      <NavBar navigate={navigate} route={route} />
      <main className="flex-1">
        <Page />
      </main>
      <Footer />
    </div>
  );
}
