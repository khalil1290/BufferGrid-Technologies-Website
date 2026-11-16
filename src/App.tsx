import { useEffect, useRef, useState } from "react";
import {
  Link,
  NavLink,
  Route,
  Routes,
  useLocation,
  useParams,
} from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Code2,
  Layers3,
  Menu,
  MonitorSmartphone,
  Send,
  X,
  Zap,
} from "lucide-react";
import { projects, services } from "./data";
import Reveal from "./Reveal";

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const close = () => setOpen(false);
  const links = [
    ["Home", "/"],
    ["Services", "/services"],
    ["Our Work", "/work"],
    ["About", "/about"],
    ["Contact", "/contact"],
  ];

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(y > 12);
      if (progressRef.current) {
        const p = max > 0 ? Math.min(y / max, 1) : 0;
        progressRef.current.style.transform = `scaleX(${p})`;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [location.pathname]);

  return (
    <header className={`site-header ${scrolled ? "scrolled" : ""}`}>
      <div className="container nav-wrap">
        <Link to="/" className="brand" onClick={close}>
          <img
            src="/images/logo.png"
            alt="BufferGrid Technologies"
            className="header-logo"
          />
        </Link>
        <button
          className="menu-toggle"
          aria-label="Toggle navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
        <nav className={open ? "nav-links open" : "nav-links"}>
          {links.map(([label, path]) => (
            <NavLink
              key={path}
              to={path}
              onClick={close}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              {label}
            </NavLink>
          ))}
          <Link className="nav-cta" to="/contact" onClick={close}>
            Start a Project <ArrowUpRight size={16} />
          </Link>
        </nav>
      </div>
      <div className="scroll-progress" ref={progressRef} />
    </header>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-main">
        <div>
          <Link to="/" className="brand brand-light">
            <img
              src="/images/logo-light.png"
              alt="BufferGrid Technologies"
              className="header-logo"
            />
          </Link>
          <p className="footer-intro">
            Engineering ideas into digital reality. We build practical digital
            experiences that move businesses forward.
          </p>
        </div>
        <div>
          <h4>Explore</h4>
          <Link to="/services">Services</Link>
          <Link to="/work">Our Work</Link>
          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <div>
          <h4>Get in touch</h4>
          <p>Have a project in mind?</p>
          <Link className="footer-mail" to="/contact">
            Tell us what you're building <ArrowUpRight size={15} />
          </Link>
          <p className="footer-note">Available for remote projects</p>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>
          © {new Date().getFullYear()} BufferGrid Technologies. All rights
          reserved.
        </span>
        <span>Build. Innovate. Grow.</span>
      </div>
    </footer>
  );
}

function SectionHeading({
  eyebrow,
  title,
  text,
  light = false,
}: {
  eyebrow: string;
  title: string;
  text?: string;
  light?: boolean;
}) {
  return (
    <Reveal className={`section-heading ${light ? "light" : ""}`}>
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </Reveal>
  );
}

function ProjectCard({
  project,
  index = 0,
}: {
  project: (typeof projects)[number];
  index?: number;
}) {
  return (
    <Reveal as="article" className="project-card" delay={index * 120}>
      <Link to={`/work/${project.slug}`} className="project-image">
        <img
          src={project.cover}
          alt={`${project.name} website preview`}
          loading="lazy"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.opacity = "0";
          }}
        />
        <div className="image-placeholder">
          <span>PROJECT PREVIEW</span>
          <strong>{project.name}</strong>
        </div>
        <span
          className={`status ${project.status === "Pre-launch" ? "prelaunch" : ""}`}
        >
          {project.status}
        </span>
        <span className="image-arrow">
          <ArrowUpRight size={20} />
        </span>
      </Link>
      <div className="project-info">
        <div className="project-meta">
          {project.category} <span>·</span> {project.status}
        </div>
        <h3>
          <Link to={`/work/${project.slug}`}>{project.name}</Link>
        </h3>
        <p>{project.summary}</p>
        <Link className="text-link" to={`/work/${project.slug}`}>
          View project <ArrowRight size={16} />
        </Link>
      </div>
    </Reveal>
  );
}

function HeroShowcase() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(
      () => setActive((n) => (n + 1) % projects.length),
      3800,
    );
    return () => clearInterval(timer);
  }, []);

  const current = projects[active];
  const address = current.url
    ? current.url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")
    : current.name;

  return (
    <div className="hero-visual" aria-hidden="true">
      <div className="hero-glow" />
      <div className="visual-orbit orbit-one" />
      <div className="visual-orbit orbit-two" />

      <div className="browser">
        <div className="browser-bar">
          <i />
          <i />
          <i />
          <span className="browser-url">{address}</span>
        </div>
        <div className="browser-screen">
          {projects.map((p, i) => (
            <img
              key={p.slug}
              src={p.cover}
              alt=""
              className={i === active ? "on" : ""}
            />
          ))}
        </div>
      </div>

      <div className="float-card card-code">
        <Code2 size={18} />
        <span>{current.status}</span>
        <small>{current.category}</small>
      </div>
      <div className="float-card card-stack">
        <Layers3 size={18} />
        <span>Mobile-first</span>
        <small>Every screen size</small>
      </div>
      <div className="float-card card-zap">
        <Zap size={17} />
      </div>
    </div>
  );
}

function Marquee() {
  const items = [
    "Business websites",
    "E-commerce",
    "WhatsApp checkout",
    "Responsive design",
    "Custom web apps",
    "Performance",
    "Integrations",
  ];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {[...items, ...items].map((item, i) => (
          <span key={i}>
            {item}
            <b>✦</b>
          </span>
        ))}
      </div>
    </div>
  );
}

function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-grid" />
        <div className="container hero-inner">
          <div className="hero-copy">
            <div className="hero-kicker rise" style={{ animationDelay: "0s" }}>
              <span className="pulse-dot" /> WEB DESIGN &amp; DEVELOPMENT
            </div>
            <h1>
              <span className="rise" style={{ animationDelay: ".12s" }}>
                Websites built
              </span>
              <span className="rise" style={{ animationDelay: ".26s" }}>
                to earn <em>trust.</em>
              </span>
            </h1>
            <p className="rise" style={{ animationDelay: ".42s" }}>
              BufferGrid designs and builds fast, responsive websites and online
              stores for businesses that want to be taken seriously, from first
              conversation to launch.
            </p>
            <div
              className="hero-actions rise"
              style={{ animationDelay: ".56s" }}
            >
              <Link className="btn btn-primary" to="/contact">
                Start a Project <ArrowUpRight size={18} />
              </Link>
              <Link className="btn btn-outline" to="/work">
                Explore Our Work <ArrowRight size={17} />
              </Link>
            </div>
            <div className="hero-proof rise" style={{ animationDelay: ".7s" }}>
              <span>
                <Check size={15} /> Live client websites
              </span>
              <span>
                <Check size={15} /> Scope and timeline agreed upfront
              </span>
            </div>
          </div>
          <HeroShowcase />
        </div>
        <Marquee />
      </section>

      <section className="section section-services">
        <div className="container">
          <SectionHeading
            eyebrow="WHAT WE DO"
            title="Digital solutions for real business needs."
            text="From your first professional website to a custom web application, we turn business requirements into useful digital experiences."
          />
          <div className="service-grid">
            {services.slice(0, 4).map((s, i) => (
              <Reveal className="service-card" key={s.number} delay={i * 100}>
                <span className="service-number">{s.number}</span>
                <div className="service-icon">
                  {[<MonitorSmartphone />, <Layers3 />, <Code2 />, <Zap />][i]}
                </div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
                <div className="tag-row">
                  {s.tags.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
          <Link to="/services" className="text-link section-link">
            Explore all services <ArrowRight size={17} />
          </Link>
        </div>
      </section>

      <section className="section work-section">
        <div className="container">
          <div className="section-topline">
            <SectionHeading
              eyebrow="SELECTED WORK"
              title="Built for businesses with ambition."
              text="A look at selected digital projects and the problems they are designed to solve."
            />
          </div>
          <div className="projects-grid">
            {projects.map((p, i) => (
              <ProjectCard key={p.slug} project={p} index={i} />
            ))}
          </div>
          <div className="center-action">
            <Link to="/work" className="btn btn-dark">
              View all projects <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>

      <section className="statement-section glow-section">
        <div className="glow" aria-hidden="true" />
        <div className="container statement-inner">
          <Reveal>
            <span className="eyebrow eyebrow-light">OUR APPROACH</span>
            <h2>
              Your website should work <em>as hard as you do.</em>
            </h2>
          </Reveal>
          <Reveal as="p" delay={150}>
            A good website is not decoration. We start with what your business
            needs it to do, choose the simplest approach that does it well, and
            deliver something your customers can actually use.
          </Reveal>
          <Link to="/about" className="statement-link">
            Get to know us <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>
      <ProcessSection />
      <ContactStrip />
    </>
  );
}

function ProcessSection() {
  const steps = [
    [
      "01",
      "Understand",
      "We learn about your business, goals and the problem you need to solve.",
    ],
    [
      "02",
      "Plan",
      "We define the scope, features, timeline and a clear way forward.",
    ],
    [
      "03",
      "Build",
      "We develop, test and refine the solution with attention to detail.",
    ],
    [
      "04",
      "Deliver",
      "We launch or hand over the project and explain what comes next.",
    ],
  ];
  return (
    <section className="section process-section">
      <div className="container">
        <SectionHeading
          eyebrow="HOW WE WORK"
          title="A clear process. No guesswork."
          text="Good delivery starts with clear communication and a shared understanding of what success looks like."
        />
        <div className="process-grid">
          {steps.map(([n, t, d], i) => (
            <Reveal className="process-step" key={n} delay={i * 120}>
              <span>{n}</span>
              <h3>{t}</h3>
              <p>{d}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactStrip() {
  return (
    <section className="contact-strip glow-section">
      <div className="glow" aria-hidden="true" />
      <div className="container contact-strip-inner">
        <Reveal>
          <span className="eyebrow eyebrow-light">HAVE A PROJECT IN MIND?</span>
          <h2>
            Let's build something
            <br />
            <em>that moves you forward.</em>
          </h2>
        </Reveal>
        <Link to="/contact" className="btn btn-white">
          Let's talk <ArrowUpRight size={18} />
        </Link>
      </div>
    </section>
  );
}

function PageIntro({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: React.ReactNode;
  text: string;
}) {
  return (
    <section className="page-intro">
      <div className="container">
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        <p>{text}</p>
      </div>
    </section>
  );
}

function Services() {
  return (
    <>
      <PageIntro
        eyebrow="OUR SERVICES"
        title={
          <>
            Technology that serves
            <br />
            <em>your business goals.</em>
          </>
        }
        text="We build and improve digital tools that help businesses communicate clearly, serve customers and operate more effectively."
      />
      <section className="section">
        <div className="container service-list">
          {services.map((s) => (
            <Reveal className="service-row" key={s.number}>
              <span className="service-number">{s.number}</span>
              <div>
                <h2>{s.title}</h2>
                <p>{s.text}</p>
                <div className="tag-row">
                  {s.tags.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
              </div>
              <ArrowUpRight className="service-row-arrow" />
            </Reveal>
          ))}
        </div>
      </section>
      <ContactStrip />
    </>
  );
}

function Work() {
  return (
    <>
      <PageIntro
        eyebrow="OUR WORK"
        title={
          <>
            Work shaped around
            <br />
            <em>real-world needs.</em>
          </>
        }
        text="Explore selected projects across corporate websites and e-commerce. Each project is built around the goals and requirements of the business."
      />
      <section className="section work-page">
        <div className="container">
          <div className="projects-grid">
            {projects.map((p, i) => (
              <ProjectCard key={p.slug} project={p} index={i} />
            ))}
          </div>
        </div>
      </section>
      <ContactStrip />
    </>
  );
}

function ProjectDetail() {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);
  if (!project)
    return (
      <div className="container not-found">
        <h1>Project not found</h1>
        <Link to="/work" className="text-link">
          Back to our work <ArrowRight size={16} />
        </Link>
      </div>
    );
  return (
    <>
      <section className="detail-hero">
        <div className="container">
          <Link to="/work" className="back-link">
            ← Back to our work
          </Link>
          <span className="eyebrow">
            {project.category} · {project.status}
          </span>
          <h1>{project.name}</h1>
          <p>{project.summary}</p>
          {project.url && (
            <a
              className="text-link"
              href={project.url}
              target="_blank"
              rel="noreferrer"
            >
              Visit live website <ArrowUpRight size={16} />
            </a>
          )}
        </div>
      </section>
      <section className="section">
        <div className="container detail-layout">
          <Reveal className="detail-preview">
            <img
              src={project.detail}
              alt={`${project.name} project detail`}
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.opacity = "0";
              }}
            />
            <div className="image-placeholder">
              <span>PROJECT PREVIEW</span>
              <strong>{project.name}</strong>
            </div>
          </Reveal>
          <Reveal className="detail-copy" delay={150}>
            <span className="eyebrow">OVERVIEW</span>
            <h2>About the project</h2>
            <p>{project.description}</p>
            <h3>What was delivered</h3>
            <ul className="check-list">
              {project.highlights.map((h) => (
                <li key={h}>
                  <Check size={17} />
                  {h}
                </li>
              ))}
            </ul>
            <h3>Services</h3>
            <div className="tag-row">
              {project.services.map((s) => (
                <span key={s}>{s}</span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
      <ContactStrip />
    </>
  );
}

function About() {
  return (
    <>
      <PageIntro
        eyebrow="ABOUT BUFFERGRID"
        title={
          <>
            We turn ideas into
            <br />
            <em>useful digital experiences.</em>
          </>
        }
        text="BufferGrid Technologies is a technology company focused on helping businesses establish, improve and expand their digital capabilities."
      />
      <section className="section">
        <div className="container about-grid">
          <Reveal>
            <span className="eyebrow">WHO WE ARE</span>
            <h2>
              Practical thinking.
              <br />
              <em>Thoughtful engineering.</em>
            </h2>
          </Reveal>
          <Reveal delay={150}>
            <p className="about-lead">
              Technology should solve a problem, create an opportunity or make
              something work better.
            </p>
            <p>
              That belief shapes how we approach every project. We work with
              businesses to understand what they need, translate those needs
              into a clear plan and build digital solutions with purpose.
            </p>
            <p>
              Our focus is on professional websites, e-commerce experiences and
              selected custom web applications, delivered through a
              collaborative and transparent process.
            </p>
          </Reveal>
        </div>
      </section>
      <section className="values-section">
        <div className="container">
          <SectionHeading
            eyebrow="WHAT GUIDES US"
            title="The principles behind the work."
            light
          />
          <div className="values-grid">
            <Reveal>
              <span>01</span>
              <h3>Clarity</h3>
              <p>
                Clear communication, defined scope and shared expectations from
                the beginning.
              </p>
            </Reveal>
            <Reveal delay={120}>
              <span>02</span>
              <h3>Purpose</h3>
              <p>
                Every feature should serve a real user need or business
                objective.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <span>03</span>
              <h3>Craft</h3>
              <p>
                Careful implementation, responsive experiences and attention to
                the details.
              </p>
            </Reveal>
          </div>
        </div>
      </section>
      <ContactStrip />
    </>
  );
}

function Contact() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    service: "Website Development",
    budget: "",
    message: "",
  });

  const update = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setForm((previous) => ({
      ...previous,
      [e.target.name]: e.target.value,
    }));
    setStatus("idle");
  };

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsSubmitting(true);
    setStatus("idle");

    try {
      const response = await fetch("https://formspree.io/f/mdegalwa", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          ...form,
          _subject: `New project enquiry - ${form.name}`,
        }),
      });

      if (!response.ok) {
        throw new Error("Form submission failed");
      }

      setStatus("success");

      setForm({
        name: "",
        email: "",
        company: "",
        service: "Website Development",
        budget: "",
        message: "",
      });
    } catch (error) {
      console.error("Form submission error:", error);
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <PageIntro
        eyebrow="LET'S TALK"
        title={
          <>
            Have a project?
            <br />
            <em>Let's make it happen.</em>
          </>
        }
        text="Tell us a little about what you're working on. We'll review your enquiry and get back to you to discuss the next steps."
      />

      <section className="section contact-page">
        <div className="container contact-layout">
          <Reveal className="contact-aside">
            <span className="eyebrow">START A CONVERSATION</span>
            <h2>
              Tell us what
              <br />
              you have in mind.
            </h2>
            <p>
              Whether you need a new website, want to improve an existing one or
              have an idea for a custom web solution, we're ready to hear about
              it.
            </p>

            <div className="contact-detail">
              <span>EMAIL</span>
              <strong>hello@buffergrid.tech</strong>
            </div>

            <div className="contact-detail">
              <span>AVAILABILITY</span>
              <strong>Remote projects</strong>
            </div>
          </Reveal>

          <Reveal as="section" delay={150}>
            <form className="contact-form" onSubmit={submit}>
              <div className="form-heading">
                <h3>Project enquiry</h3>
                <p>Fields marked * are required.</p>
              </div>

              <div className="form-grid">
                <label>
                  Your name *
                  <input
                    required
                    name="name"
                    value={form.name}
                    onChange={update}
                    placeholder="Full name"
                  />
                </label>

                <label>
                  Email address *
                  <input
                    required
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={update}
                    placeholder="you@company.com"
                  />
                </label>

                <label>
                  Company / business
                  <input
                    name="company"
                    value={form.company}
                    onChange={update}
                    placeholder="Business name"
                  />
                </label>

                <label>
                  What do you need?
                  <select name="service" value={form.service} onChange={update}>
                    <option>Website Development</option>
                    <option>E-commerce Solutions</option>
                    <option>Custom Web Application</option>
                    <option>Website Improvement & Support</option>
                    <option>Integrations & Functionality</option>
                    <option>Not sure yet</option>
                  </select>
                </label>

                <label className="full-field">
                  Estimated budget (optional)
                  <input
                    name="budget"
                    value={form.budget}
                    onChange={update}
                    placeholder="Your budget range and currency"
                  />
                </label>

                <label className="full-field">
                  Tell us about your project *
                  <textarea
                    required
                    rows={5}
                    name="message"
                    value={form.message}
                    onChange={update}
                    placeholder="What are you looking to build? What problem should it solve?"
                  />
                </label>
              </div>

              <button
                className="btn btn-primary submit-btn"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send enquiry"}
                <Send size={17} />
              </button>

              {status === "success" && (
                <p className="form-note" role="status">
                  Thank you! Your enquiry has been sent successfully. We'll be
                  in touch soon.
                </p>
              )}

              {status === "error" && (
                <p className="form-note" role="alert">
                  We couldn't send your enquiry. Please try again or contact us
                  directly by email.
                </p>
              )}

              <p className="form-disclaimer">
                Your information will be used to respond to your project
                enquiry.
              </p>
            </form>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function NotFound() {
  return (
    <div className="container not-found">
      <span className="eyebrow">404</span>
      <h1>This page doesn't exist.</h1>
      <Link to="/" className="btn btn-dark">
        Back to home
      </Link>
    </div>
  );
}

export default function App() {
  const location = useLocation();
  return (
    <>
      <Header />
      <main key={location.pathname} className="page-fade">
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/work" element={<Work />} />
          <Route path="/work/:slug" element={<ProjectDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
